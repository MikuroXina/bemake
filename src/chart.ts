export interface Chart {
    header: Header;
    notes: Notes;
}

declare const objIdNominal: unique symbol;
export type ObjId = number & { [objIdNominal]: never };

export interface ObjTime {
    track: number;
    numerator: number;
    denominator: number;
}

export interface Header {
    title: string;
    artist: string;
    back_bmp: string | null;
    banner: string | null;
    bmp_files: Record<ObjId, BmpFile>;
    bpm: number;
    bpm_changes: Record<ObjId, number>;
    change_options: Record<ObjId, string>;
    comment: string | null;
    difficulty: number;
    total: number | null;
    play_level: number;
    rank: JudgeLevel;
}

export interface BmpFile {
    file: string;
    transparent_color: Argb;
}

export interface Argb {
    alpha: number;
    red: number;
    green: number;
    blue: number;
}

export type JudgeLevel = "VeryHard" | "Hard" | "Normal" | "Easy";

export interface Notes {
    objs: Obj[];
    bpm_changes: BpmChangeObj[];
    section_len_changes: SectionLenChangeObj[];
}

export interface Obj {
    offset: ObjTime;
    kind: NoteKind;
    is_player1: boolean;
    key: Key;
    obj: ObjId;
}

export type NoteKind = "Visible" | "Invisible" | "Long" | "Landmine";

export type Key =
    | "Key1"
    | "Key2"
    | "Key3"
    | "Key4"
    | "Key5"
    | "Key6"
    | "Key7"
    | "Scratch"
    | "FreeZone";

export interface BpmChangeObj {
    time: ObjTime;
    bpm: number;
}

export interface SectionLenChangeObj {
    time: ObjTime;
    length: number;
}
