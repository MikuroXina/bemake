import { Note, NoteId, NoteLane, State } from "./editor/notes-context.js";

const LANE_BY_CHANNEL: Record<string, NoteLane | undefined> = {
    "11": "Key1",
    "12": "Key2",
    "13": "Key3",
    "14": "Key4",
    "15": "Key5",
    "16": "Scratch",
    "17": "FreeZone",
    "18": "Key6",
    "19": "Key7",
};

export interface Chart {}

export const stateFromChart = (chart: Chart): State => {
    const notes: Record<NoteId, Note> = {};
    return { notes };
};
