import { WheelEvent, useState } from "react";

import styles from "./preview.module.css";

declare const noteIdNominal: unique symbol;
export type NoteId = string & { [noteIdNominal]: never };

export interface Note {
    time: number;
    objId: number;
    lane: number;
    selected: boolean;
}

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

export const Preview = ({ notes, colorMap, onSelectNote }: PreviewProps) => {
    const [currentTime, setCurrentTime] = useState(0);

    const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) {
            return;
        }
        setCurrentTime((t) => Math.max(0, t - e.deltaY * SCROLL_SPEED));
    };

    const noteElements = (Object.entries(notes) as [NoteId, Note][]).map(([id, { time, lane }]) => (
        <div
            key={id}
            className={styles.note}
            style={{
                left: lane * LANE_WIDTH,
                bottom: (time - currentTime) * NOTE_SPEED,
                width: LANE_WIDTH,
                height: NOTE_HEIGHT,
                backgroundColor: colorMap[lane] || LANE_COLOR,
            }}
            onClick={() => onSelectNote(id)}
        ></div>
    ));

    return (
        <div className={styles.preview} onWheel={onWheel}>
            {noteElements}
        </div>
    );
};
