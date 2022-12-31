import { produce } from "immer";

declare const noteIdNominal: unique symbol;
export type NoteId = string & { [noteIdNominal]: never };

export interface Note {
    time: number;
    objId: number;
    lane: number;
    selected: boolean;
}

export interface State {
    notes: Record<NoteId, Note>;
}

export const initialState = (): State => ({
    notes: Object.fromEntries(
        [
            {
                lane: 0,
                objId: 1,
                time: 1,
            },
            {
                lane: 1,
                objId: 1,
                time: 2,
            },
            {
                lane: 2,
                objId: 2,
                time: 3,
            },
            {
                lane: 5,
                objId: 2,
                time: 4,
            },
            {
                lane: 4,
                objId: 4,
                time: 5,
            },
        ].map((note) => [`${note.lane}${note.time}${note.objId}`, { ...note, selected: false }]),
    ),
});

const reducers = {
    SELECT_NOTE: (state: State, { selected }: { selected: NoteId }) =>
        produce(state, (draft) => {
            draft.notes[selected].selected = !draft.notes[selected].selected;
        }),
    CHANGE_LANE_OF_SELECTION: (state: State, { destination }: { destination: number }) =>
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
