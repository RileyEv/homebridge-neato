
export interface Ability {
    ability: string;
}

export type CleaningStartRequest = Ability & {
    ability: "cleaning.start";
    map: CleaningMap;
    settings: CleaningSettings;
};

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
export type ShapeTrack = [number, number][];
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
export interface Crop {
    bottom: number;
    top: number;
    right: number;
    left: number;
    scale: number;
}
export interface RobotPositionsResponse {
    base: unknown;
    pos: unknown;
}
export interface HistoryResponseEvent {
    floorplan_uuid: string;
    processed_rank_binary: string;
    processed_real_binary: string;
    processed_thumb_rank_binary: string;
    processed_thumb_real_binary: string;
    rank_crop: Crop;
    rank_uuid: string;
    real_crop: Crop;
    robot: RobotPositionsResponse;
    runs: HistoryResponseEventRun[];
    started_by: string;
    thumb_rank_crop: Crop;
    thumb_real_crop: Crop;
    timing: HistoryResponseEventTiming;
    tracks: ZoneResponse[];
}
export type HistoryResponse = HistoryResponseEvent[];
export interface CleaningShowResponse {
    runs: HistoryResponseEventRun[];
}
export interface CleaningCenterSettingsResponse {
    autoextract: boolean;
}
export interface CleaningOptionsResponse {
    force_floorplan: boolean;
}
export interface RobotLanguageResponse {
    available_languages: string[];
    languages: string;
}
export type InfoAbilitiesResponse = Ability & { [ability: string]: string };
export interface InfoRobotResponse {
    firmware: string;
    serial_number: string;
}
export interface InfoWifiResponse {
    ip: string;
    MAC: string;
    SSID: string;
}

export type CleaningPauseRequest = Ability & {
    ability: "cleaning.pause";
};
export type CleaningResumeRequest = Ability & {
    ability: "cleaning.resume";
};
export type CleaningCancelRequest = Ability & {
    ability: "cleaning.cancel";
};
export type CleaningReturnToBaseRequest = Ability & {
    ability: "navigation.return_to_base";
};
export type CleaningShowRequest = Ability & {
    ability: "cleaning.show";
};
export type GetCleaningCenterSettingsRequest = Ability & {
    ability: "extraction.settings_show";
};
export type GetCleaningOptionsRequest = Ability & {
    ability: "settings.cleaning_options";
};
export type GetRobotLanguageRequest = Ability & {
    ability: "settings.robot_language";
};
export type InfoAbilitiesRequest = Ability & {
    ability: "info.abilities";
};
export type InfoRobotRequest = Ability & {
    ability: "info.robot";
};
export type InfoWifiRequest = Ability & {
    ability: "info.wifi";
};
export type LocateRequest = Ability & {
    ability: "utilities.find_me";
};
export interface CleaningOptionsRequest {
    ability: "settings.set_cleaning_options";
    force_floorplan: boolean;
}
export interface SetRobotLanguageRequest {
    ability: "settings.set_robot_language";
    language: string;
}
export type StateShowRequest = Ability & {
    ability: "state.show";
};


export interface StateShowResponse {
    action: string;
    available_commands: AvailableCommands;
    cleaning_center: CleaningCenterResponse;
    details: Details;
    errors: {[a: string]:string}[];
}

export interface AvailableCommands {
    cancel: boolean;
    pause: boolean;
    resume: boolean;
    return_to_base: boolean;
    start: boolean;
}

export interface CleaningCenterResponse {
    bag_status: string;
    base_error: string;
    is_extracting: string;
}

export interface Details {
    base_type: string;
    charge: number;
    is_charging: string;
    is_docker: string;
    is_quickboost: string;
    quickboost_estimate: number;
}
export interface RobotFeatures {
    vacuuming_modes: CleaningMode[];
    extra_care_navigation: boolean;
    max_cleanable_zones: number;
    max_cleaning_zones: number;
    max_floorplans: number;
    max_no_go_zones: number;
}
export type ZoneType = "cleaning" | "no-go";
export interface ZoneResponse {
    cleaning_mode: CleaningMode;
    icon_id: string;
    name: string;
    shapes: ShapeTrack[];
    type: ZoneType;
    track_uuid: string;
}
export type MapsResponse = MapResponse[];
export interface MapResponse {
    processed_rank_binary: string;
    rank_crop: Crop;
    floorplan_uuid: string;
    inserted_at: string;
    last_modifed_at: string;
    name: string;
    map_versions_count: number;
    processed_real_binary: string;
    rank_uuid: string;
    real_crop: Crop;
    robot: RobotPositionsResponse;
    updated_at: string;
}
export type FloorplanMapsResponse = FloorplanMapResponse[];
export interface FloorplanMapResponse {
    inserted_at: string;
    processed_rank_binary: string;
    processed_real_binary: string;
    processed_thumb_rank_binary: string;
    processed_thumb_real_binary: string;
    rank_crop: Crop;
    rank_uuid: string;
    real_crop: Crop;
    robot: RobotPositionsResponse;
    thumb_rank_crop: Crop;
    thumb_real_crop: Crop;
}

export type UserRobotListResponse = UserRobotResponse[];
export interface UserRobotResponse {
    birth_date: string;
    firmware: string;
    mac_address: string;
    model_name: string; // Could be translated into a object with features
    name: string;
    public_key: string;
    robotNumber: string;
    serial: string;
    timezone: string;
    user_id: string;
    uuid: string;
    vendor: string;
}
export interface LoginResponse {
    token: string;
}
