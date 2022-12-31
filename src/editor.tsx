import { NoteId, initialState, reducer } from "./editor/notes-context.js";
import { useEffect, useReducer } from "react";

import { Preview } from "./editor/preview.jsx";

export const Editor = () => {
    const colorMap: Record<number, string> = {
        0: "crimson",
        1: "white",
        2: "blue",
        3: "white",
        4: "blue",
        5: "white",
        6: "blue",
        7: "white",
    };
    const keyLaneMap: Record<string, number> = {
        ShiftLeft: 0,
        KeyZ: 1,
        KeyS: 2,
        KeyX: 3,
        KeyD: 4,
        KeyC: 5,
        KeyF: 6,
        KeyV: 7,
    };

    const [state, dispatch] = useReducer(reducer, initialState());

    const onSelectNote = (id: NoteId) => {
        dispatch(["SELECT_NOTE", { selected: id }]);
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.repeat || !(e.code in keyLaneMap)) {
                return;
            }
            dispatch(["CHANGE_LANE_OF_SELECTION", { destination: keyLaneMap[e.code] }]);
        };
        document.body.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div>
            <Preview notes={state.notes} colorMap={colorMap} onSelectNote={onSelectNote} />
        </div>
    );
};
