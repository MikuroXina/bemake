import { Preview } from "./editor/preview.jsx";

export const Editor = () => {
    const notes = [
        {
            lane: 0,
            id: 1,
            time: 1,
        },
        {
            lane: 1,
            id: 1,
            time: 2,
        },
        {
            lane: 2,
            id: 2,
            time: 3,
        },
        {
            lane: 5,
            id: 2,
            time: 4,
        },
        {
            lane: 4,
            id: 4,
            time: 5,
        },
    ];

    return (
        <div>
            <Preview notes={notes} />
        </div>
    );
};
