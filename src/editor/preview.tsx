import styles from "./preview.module.css";

export interface Note {
    time: number;
    id: number;
    lane: number;
}

export interface PreviewProps {
    notes: Note[];
}

const LANE_WIDTH = 40;
const LANE_COLOR = "gray";
const NOTE_HEIGHT = 10;
const NOTE_SPEED = 80;

export const Preview = ({ notes }: PreviewProps) => {
    const noteElements = notes.map(({ id, time, lane }) => (
        <div
            key={`${lane}${time}${id}`}
            className={styles.note}
            style={{
                left: lane * LANE_WIDTH,
                bottom: time * NOTE_SPEED,
                width: LANE_WIDTH,
                height: NOTE_HEIGHT,
                backgroundColor: LANE_COLOR,
            }}
        ></div>
    ));

    return <div className={styles.preview}>{noteElements}</div>;
};
