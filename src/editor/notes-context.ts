import { produce } from "immer";

declare const noteIdNominal: unique symbol;
export type NoteId = string & { [noteIdNominal]: never };

export const noteLanes = [
    "Key1",
    "Key2",
    "Key3",
    "Key4",
    "Key5",
    "Key6",
    "Key7",
    "Scratch",
    "FreeZone",
] as const;
export type NoteLane = typeof noteLanes[number];

export interface Note {
    time: number;
    objId: number;
    lane: NoteLane;
    selected: boolean;
}

export interface State {
    notes: Record<NoteId, Note>;
}

export const initialState = (): State => ({
    notes: Object.fromEntries(
        (
            [
                {
                    lane: "Key1",
                    objId: 1,
                    time: 1,
                },
                {
                    lane: "Key2",
                    objId: 1,
                    time: 2,
                },
                {
                    lane: "Key3",
                    objId: 2,
                    time: 3,
                },
                {
                    lane: "Key6",
                    objId: 2,
                    time: 4,
                },
                {
                    lane: "Key5",
                    objId: 4,
                    time: 5,
                },
            ] as const
        ).map((note) => [`${note.lane}${note.time}${note.objId}`, { ...note, selected: false }]),
    ),
});

const reducers = {
    DESELECT_ALL: (state: State) =>
        produce(state, (draft) => {
            for (const noteId in draft.notes) {
                const note = draft.notes[noteId as NoteId];
                note.selected = false;
            }
        }),
    SELECT_NOTE: (state: State, { selected }: { selected: NoteId }) =>
        produce(state, (draft) => {
            draft.notes[selected].selected = !draft.notes[selected].selected;
        }),
    CHANGE_LANE_OF_SELECTION: (state: State, { destination }: { destination: NoteLane }) =>
        produce(state, (draft) => {
            for (const noteId in draft.notes) {
                const note = draft.notes[noteId as NoteId];
                if (note.selected) {
                    note.lane = destination;
                }
            }
        }),
} as const;

type Reducers = typeof reducers;
type Payload<K extends keyof Reducers> = Reducers[K] extends (
    state: State,
    action: infer A,
) => State
    ? A
    : never;

export type Action = {
    [K in keyof Reducers]: [K, Payload<K>];
}[keyof Reducers];

export type Dispatcher = (action: Action) => void;

export const reducer = (state: State, [kind, payload]: Action): State =>
    reducers[kind](state, payload as Payload<typeof kind>);
