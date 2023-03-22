import type { Note, NoteId, State } from "../notes-context.js";

import type { Chart } from "./chart.js";
import { NoteTimeCalculator } from "./note-time.js";

export const stateFromChart = (chart: Chart): State => {
    const calc = new NoteTimeCalculator(chart.notes);
    const notes: Record<NoteId, Note> = {};
    let id = 0;
    for (const note of chart.notes.objs) {
        notes[`${id}` as NoteId] = {
            objId: note.obj,
            lane: note.key,
            time: calc.seconds_by_time(note.offset),
            selected: false,
        };
        id += 1;
    }
    return { notes };
};
