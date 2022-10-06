import axios from "axios";
import qs from "qs";

import * as types from "./api-types";

const ORBITAL_API_ENDPOINT = "https://orbital.neatocloud.com";
const ORBITAL_API_DEFAULT_HEADERS = {
    Accept: "application/vnd.neato.orbital-http.v1+json",
};


function makeHeaders(extraHeaders?: {[key: string]: string}): {[key: string]: string} {
    return {...ORBITAL_API_DEFAULT_HEADERS, ...extraHeaders}
}

function makeHeadersWithAuth(token: string, extraHeaders?: {[key: string]: string}): {[key: string]: string} {
    return makeHeaders({...extraHeaders, Authorization: `Token ${token}`});
}




export async function getRequest<R>(uri: string, token: string): Promise<R> {
    let response = await axios.get<R>(
        ORBITAL_API_ENDPOINT + uri,
        {headers: makeHeadersWithAuth(token)}
    )
    return response.data;
}

export async function postRequest<P, R>(uri: string, token: string, payload: P): Promise<R> {
    let response = await axios.post<R>(
        ORBITAL_API_ENDPOINT + uri,
        payload,
        {headers: makeHeadersWithAuth(token)}
    )
    return response.data;
}


export async function messageRequest<P, R>(vendor: string, robotSerialNumber: string, token: string, payload: P): Promise<R> {
    return postRequest(`/vendors/${vendor}/robots/${robotSerialNumber}/messages`, token, payload);
}


// OrbitalRobotAPI
export const cleaningShow: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningShowRequest) => Promise<types.CleaningShowResponse> = messageRequest;
export const cleaningStart: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningStartRequest) => Promise<types.Ability> = messageRequest;
export const cleaningPause: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningPauseRequest) => Promise<types.Ability> = messageRequest;
export const cleaningResume: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningResumeRequest) => Promise<types.Ability> = messageRequest;
export const cleaningCancel: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningCancelRequest) => Promise<types.Ability> = messageRequest;
export const cleaningReturnToBase: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningReturnToBaseRequest) => Promise<types.Ability> = messageRequest;
export const getCleaningCenterSettings: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.GetCleaningCenterSettingsRequest) => Promise<types.CleaningCenterSettingsResponse> = messageRequest;
export const getCleaningOptions: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.GetCleaningOptionsRequest) => Promise<types.CleaningOptionsResponse> = messageRequest;
export const getRobotLanguage: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.GetRobotLanguageRequest) => Promise<types.RobotLanguageResponse> = messageRequest;
export const infoAbilities: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.InfoAbilitiesRequest) => Promise<types.InfoAbilitiesResponse> = messageRequest;
export const infoFeatures: (robotId: string, token: string) => Promise<types.RobotFeatures> = (robotId, token) => getRequest(`/robots/${robotId}/features`, token);
export const infoRobot: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.InfoRobotRequest) => Promise<types.InfoRobotResponse> = messageRequest;
export const infoWifi: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.InfoWifiRequest) => Promise<types.InfoWifiResponse> = messageRequest;
export const locate: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.LocateRequest) => Promise<types.Ability> = messageRequest;
export const saveCleaningOption: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.CleaningOptionsRequest) => Promise<types.Ability> = messageRequest;
export const setRobotLanguage: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.SetRobotLanguageRequest) => Promise<types.Ability> = messageRequest;
export const stateShow: (vendor: string, robotSerialNumber: string, token: string, cleaningStartRequest: types.StateShowRequest) => Promise<types.StateShowResponse> = messageRequest;


// OrbitalMapAPI
export const fetchTrackOf: (trackUuid: string, token: string) => Promise<types.ZoneResponse[]> = (trackUuid, token) => getRequest(`/maps/floorplans/${trackUuid}/tracks`, token);
export const getCleaningMap: (robotId: string, rankId: string, token: string) => Promise<types.HistoryResponseEvent> = (robotId, rankId, token) => getRequest(`/robots/${robotId}/cleaningmaps/${rankId}`, token);
export const getFloorplan: (robotId: string, floorplanId: string, token: string) => Promise<types.MapResponse> = (robotId, floorplanId, token) => getRequest(`/robots/${robotId}/floorplans/${floorplanId}`, token);
export const getHistoryMapDetail: (robotId: string, eventId: string, token: string) => Promise<types.HistoryResponseEvent> = (robotId, eventId, token) => getRequest(`/robots/${robotId}/cleaningmaps/${eventId}`, token);
export const getHistoryMaps: (robotId: string, token: string) => Promise<types.HistoryResponse> = (robotId, token) => getRequest(`/robots/${robotId}/cleaningmaps`, token);
export const getMapsOfFloorplans: (floorplanId: string, token: string) => Promise<types.FloorplanMapsResponse> = (floorplanId, token) => getRequest(`/maps/floorplans/${floorplanId}`, token);
export const showFloorplans: (robotId: string, token: string) => Promise<types.MapsResponse> = (robotId, token) => getRequest(`/robots/${robotId}/floorplans`, token);

// OrbitalAPI
export const getRobots: (token: string) => Promise<types.UserRobotListResponse> = (token) => getRequest(`/users/me/robots`, token);

export const login: (email: string, password: string) => Promise<types.LoginResponse> = async (email, password) => {
    let response = await axios.post<types.LoginResponse>(
        ORBITAL_API_ENDPOINT + "/vendors/neato/sessions",
        qs.stringify({email: email, password: password}),
        {headers: makeHeaders()}
    )
    return response.data;
}
