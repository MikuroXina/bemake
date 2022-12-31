import styles from "./preview.module.css";

export interface Note {
    time: number;
    id: number;
    lane: number;
}

export interface ColorMap {
    [index: number]: string | undefined;
}

export interface PreviewProps {
    notes: Note[];
    colorMap: ColorMap;
}

const LANE_WIDTH = 40;
const LANE_COLOR = "gray";
const NOTE_HEIGHT = 10;
const NOTE_SPEED = 80;

export const Preview = ({ notes, colorMap }: PreviewProps) => {
    const noteElements = notes.map(({ id, time, lane }) => (
        <div
            key={`${lane}${time}${id}`}
            className={styles.note}
            style={{
                left: lane * LANE_WIDTH,
                bottom: time * NOTE_SPEED,
                width: LANE_WIDTH,
                height: NOTE_HEIGHT,
                backgroundColor: colorMap[lane] || LANE_COLOR,
            }}
        ></div>
    ));

    return <div className={styles.preview}>{noteElements}</div>;
};
