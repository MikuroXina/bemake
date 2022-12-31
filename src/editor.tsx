import { NoteId, Preview } from "./editor/preview.jsx";

export const Editor = () => {
    const notes = Object.fromEntries(
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
    );
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

    const onSelectNote = (id: NoteId) => {
        console.log("clicked", id);
    };

    return (
        <div>
            <Preview notes={notes} colorMap={colorMap} onSelectNote={onSelectNote} />
        </div>
    );
};
