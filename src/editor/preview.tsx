import { MouseEvent, WheelEvent, useState } from "react";
import { Note, NoteId, NoteLane } from "./notes-context.js";

import styles from "./preview.module.css";

export type NoteLaneOffsetMap = Record<NoteLane, number>;

export type ColorMap = Record<NoteLane, string | undefined>;

export interface PreviewProps {
    notes: Record<NoteId, Note>;
    noteLaneOffsetMap: NoteLaneOffsetMap;
    colorMap: ColorMap;
    onSelectNote: (e: MouseEvent, note: NoteId) => void;
}

const LANE_WIDTH = 40;
const LANE_COLOR = "gray";
const NOTE_HEIGHT = 10;
const NOTE_SPEED = 80;
const SCROLL_SPEED = 0.01;
const SELECTION_COLOR = "#59b9bf";

export const Preview = ({ notes, noteLaneOffsetMap, colorMap, onSelectNote }: PreviewProps) => {
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
                    left: noteLaneOffsetMap[lane],
                    bottom: (time - currentTime) * NOTE_SPEED,
                    width: LANE_WIDTH,
                    height: NOTE_HEIGHT,
                    backgroundColor: colorMap[lane] || LANE_COLOR,
                    outlineColor: selected ? SELECTION_COLOR : "transparent",
                }}
                onClick={(e) => onSelectNote(e, id)}
            ></div>
        ),
    );

    return (
        <div className={styles.preview} onWheel={onWheel}>
            {noteElements}
        </div>
    );
};
