import { Note, NoteId } from "./notes-context.js";
import { WheelEvent, useState } from "react";

import styles from "./preview.module.css";

export interface ColorMap {
    [index: number]: string | undefined;
}

export interface PreviewProps {
    notes: Record<NoteId, Note>;
    colorMap: ColorMap;
    onSelectNote: (note: NoteId) => void;
}

const LANE_WIDTH = 40;
const LANE_COLOR = "gray";
const NOTE_HEIGHT = 10;
const NOTE_SPEED = 80;
const SCROLL_SPEED = 0.01;
const SELECTION_COLOR = "#59b9bf";

export const Preview = ({ notes, colorMap, onSelectNote }: PreviewProps) => {
    const [currentTime, setCurrentTime] = useState(0);

    const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) {
            return;
        }
        setCurrentTime((t) => Math.max(0, t - e.deltaY * SCROLL_SPEED));
    };

    const noteElements = (Object.entries(notes) as [NoteId, Note][]).map(
        ([id, { time, lane, selected }]) => (
            <div
                key={id}
                className={styles.note}
                style={{
                    left: lane * LANE_WIDTH,
                    bottom: (time - currentTime) * NOTE_SPEED,
                    width: LANE_WIDTH,
                    height: NOTE_HEIGHT,
                    backgroundColor: colorMap[lane] || LANE_COLOR,
                    outlineColor: selected ? SELECTION_COLOR : "transparent",
                }}
                onClick={() => onSelectNote(id)}
            ></div>
        ),
    );

    return (
        <div className={styles.preview} onWheel={onWheel}>
            {noteElements}
        </div>
    );
};
