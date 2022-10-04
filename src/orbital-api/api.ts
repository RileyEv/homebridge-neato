import axios from "axios";


const ORBITAL_API_ENDPOINT = "https://orbital.neatocloud.com";
const ORBITAL_API_DEFAULT_HEADERS = {
    Accept: "application/vnd.neato.orbital-http.v1+json",
};

function makeHeadersWithAuth(token: string, extraHeaders?: {[key: string]: string}): {[key: string]: string} {
    return {...ORBITAL_API_DEFAULT_HEADERS, ...extraHeaders, Authorization: `Token ${token}`}
}

export interface Ability {
    ability: string
}

export type CleaningStartRequest = Ability & {
    ability: "cleaning.start"
    map: CleaningMap;
    settings: CleaningSettings;
}

export interface CleaningMap {
    rank_id: string;
    nogo_enabled: boolean;
    track_id: string | null;
}

export interface CleaningSettings {
    mode: CleaningMode;
    navigation_mode: NavigationMode;
}

export type CleaningMode = "auto" | "eco" | "turbo" | "max";
export type NavigationMode = "normal" | "gentle";

export interface HistoryResponseEventStats {
    area: number;
    pickup_count: number;
}

export interface HistoryResponseEventTiming {
    charging: number;
    end: string;
    error: number;
    start: string;
}
export type ShapeTrack = [number, number][]

export interface HistoryResponseEventRun {
    autonomous_dock: boolean;
    settings: CleaningSettings;
    state: string;
    stats: HistoryResponseEventStats;
    timing: HistoryResponseEventTiming;
    track_icon_id: string;
    track_name: string;
    track_shapes: ShapeTrack[];
    track_uuid: string;
}

export interface CleaningShowResponse {
    runs: HistoryResponseEventRun[];
}
export type CleaningPauseRequest = Ability & {
    ability: "cleaning.pause";
}
export type CleaningResumeRequest = Ability & {
    ability: "cleaning.resume";
}
export type CleaningCancelRequest = Ability & {
    ability: "cleaning.cancel";
}
export type CleaningReturnToBaseRequest = Ability & {
    ability: "navigation.return_to_base";
}
export type CleaningShowRequest = Ability & {
    ability: "cleaning.show";
}

export async function messageRequest<P, R>(vendor: string, robotSerialNumber: string, token: string, payload: P): Promise<R> {
    let response = await axios.post<R>(
        ORBITAL_API_ENDPOINT + `/vendors/${vendor}/robots/${robotSerialNumber}/messages`,
        payload,
        {headers: makeHeadersWithAuth(token)}
    )
    return response.data;
}


export const cleaningShow: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningShowRequest) => Promise<CleaningShowResponse> = messageRequest;
export const cleaningStart: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningStartRequest) => Promise<Ability> = messageRequest;
export const cleaningPause: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningPauseRequest) => Promise<Ability> = messageRequest;
export const cleaningResume: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningResumeRequest) => Promise<Ability> = messageRequest;
export const cleaningCancel: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningCancelRequest) => Promise<Ability> = messageRequest;
export const cleaningReturnToBase: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: CleaningReturnToBaseRequest) => Promise<Ability> = messageRequest;
