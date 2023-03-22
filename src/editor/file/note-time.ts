import type { Notes, ObjTime } from "./chart.js";

interface TrackInfo {
    absoluteOffset: number;
    bpm: number;
    sectionLength: number;
}

export class NoteTimeCalculator {
    constructor(notes: Notes) {
        const timeEvents = [...notes.bpm_changes, ...notes.section_len_changes];
        const totalTracks =
            [
                ...notes.bpm_changes.map((change) => change.time.track),
                ...notes.section_len_changes.map(({ track }) => track),
                ...notes.objs.map((obj) => obj.offset.track),
            ].reduce((prev, track) => Math.max(prev, track), 0) + 1;
        this.trackInfos = [];
        let lastTrack = 0;
        let currentSectionLen = 4 / 4;
        let currentBpm = 120.0;
        for (const timeEvent of timeEvents) {
            if ("length" in timeEvent) {
                currentSectionLen = timeEvent.length;
            } else {
                currentBpm = timeEvent.bpm;
            }
            const currentTrack = "length" in timeEvent ? timeEvent.track : timeEvent.time.track;
            if (lastTrack !== currentTrack) {
                for (; lastTrack < currentTrack - 1; ++lastTrack) {
                    const lastSeconds = this.trackInfos.at(-1)?.absoluteOffset ?? 0;
                    const deltaSeconds = (currentSectionLen * (currentBpm * 4)) / 60;
                    this.trackInfos.push({
                        absoluteOffset: lastSeconds + deltaSeconds,
                        bpm: currentBpm,
                        sectionLength: currentSectionLen,
                    });
                }
            }
            currentSectionLen = 4 / 4;
        }
        for (; lastTrack < totalTracks; ++lastTrack) {
            const lastSeconds = this.trackInfos.at(-1)?.absoluteOffset ?? 0;
            const deltaSeconds = (currentBpm * 4) / 60;
            this.trackInfos.push({
                absoluteOffset: lastSeconds + deltaSeconds,
                bpm: currentBpm,
                sectionLength: currentSectionLen,
            });
        }
    }

    private trackInfos: TrackInfo[];

    /**
     * Calculates actual seconds of a note on `time` from the start of `Chart`.
     *
     * @param time - To find seconds of the object time.
     * @returns The found seconds.
     */
    seconds_by_time(time: ObjTime): number {
        const now = this.trackInfos.at(time.track);
        if (!now) {
            const last = this.trackInfos.at(-1);
            return last?.absoluteOffset ?? 0.0;
        }
        return (
            now.absoluteOffset +
            (((now.sectionLength * now.bpm * 4) / 60) * time.numerator) / time.denominator
        );
    }
}
