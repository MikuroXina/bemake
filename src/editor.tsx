import { MouseEvent, useEffect, useReducer } from "react";
import { NoteId, NoteLane, initialState, reducer } from "./editor/notes-context.js";

import { Preview } from "./editor/preview.jsx";

export const Editor = () => {
    const colorMap: Record<NoteLane, string> = {
        Scratch: "crimson",
        FreeZone: "pink",
        Key1: "white",
        Key2: "blue",
        Key3: "white",
        Key4: "blue",
        Key5: "white",
        Key6: "blue",
        Key7: "white",
    };
    const keyLaneMap: Record<string, NoteLane> = {
        ShiftLeft: "Scratch",
        ControlLeft: "FreeZone",
        KeyZ: "Key1",
        KeyS: "Key2",
        KeyX: "Key3",
        KeyD: "Key4",
        KeyC: "Key5",
        KeyF: "Key6",
        KeyV: "Key7",
    };
    const offsetMap: Record<NoteLane, number> = {
        Scratch: 0 * 40,
        FreeZone: 1 * 40,
        Key1: 2 * 40,
        Key2: 3 * 40,
        Key3: 4 * 40,
        Key4: 5 * 40,
        Key5: 6 * 40,
        Key6: 7 * 40,
        Key7: 8 * 40,
    };

    const [state, dispatch] = useReducer(reducer, initialState());

    const onSelectNote = (e: MouseEvent, id: NoteId) => {
        if (!e.metaKey) {
            dispatch(["DESELECT_ALL", {}]);
        }
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
            <Preview
                notes={state.notes}
                colorMap={colorMap}
                noteLaneOffsetMap={offsetMap}
                onSelectNote={onSelectNote}
            />
        </div>
    );
};
