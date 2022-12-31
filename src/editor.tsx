import { NoteId, initialState, reducer } from "./editor/notes-context.js";

import { Preview } from "./editor/preview.jsx";
import { useReducer } from "react";

export const Editor = () => {
    const colorMap = {
        0: "crimson",
        1: "white",
        2: "blue",
        3: "white",
        4: "blue",
        5: "white",
        6: "blue",
        7: "white",
    };

    const [state, dispatch] = useReducer(reducer, initialState());

    const onSelectNote = (id: NoteId) => {
        dispatch(["SELECT_NOTE", { selected: id }]);
    };

    return (
        <div>
            <Preview notes={state.notes} colorMap={colorMap} onSelectNote={onSelectNote} />
        </div>
    );
};
