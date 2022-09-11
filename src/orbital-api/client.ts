import axios from "axios";
import qs from "qs";

/*
 * Client for the Neato Orbital API
 * As defined in https://github.com/RileyEv/neato-api
 */

const ORBITAL_API_ENDPOINT = "https://orbital.neatocloud.com";
const ORBITAL_API_DEFAULT_HEADERS = {
    Accept: "application/vnd.neato.orbital-http.v1+json",
};

export interface LoginResponse {
    token: string;
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

export class OrbitalClient {
    token?: string;

    authorize(email: string, password: string, force: boolean, callback: (error: null | any) => void ) {
        let promise: Promise<string>;
        if (this.token && !force) {
            promise = Promise.resolve(this.token);
        } else {
            promise = axios.post<LoginResponse>(
                ORBITAL_API_ENDPOINT + "/vendors/neato/sessions",
                qs.stringify({email: email, password: password}),
                {headers: {...ORBITAL_API_DEFAULT_HEADERS, "content-type": "application/x-www-form-urlencoded"}},
            ).then(res => {
                this.token = res.data.token;
                return this.token;
            });
        }
        promise.catch(err => err).then(val => callback(val));
    }

    getRobots(callback: (error: null | any, robots: Robot[]) => void) {
        const token = this.token;
        if (token === undefined) {
            callback("No token set. Did you authorise?", []);
            return;
        }

        axios.get<UserRobotListResponse>(
            ORBITAL_API_ENDPOINT + "/users/me/robots",
            {headers: {...ORBITAL_API_DEFAULT_HEADERS, Authorization: "Token " + token}},
        ).then(res => {
            callback(null, res.data.map(userRobotResponse => new Robot(token, userRobotResponse)));
        });
    }
}

type Error = any | undefined

interface RobotState {
    test: string;
}
interface Schedule {
    test: string;
}

export class Robot {
    private token: string;
    private state: UserRobotResponse;

    public isBinFull = false;
    public isCharging = false;
    public isDocked = false;
    public isScheduleEnabled = false;
    public dockHasBeenSeen = false;
    public charge = 0;
    public canStart = false;
    public canStop = false;
    public canPause = false;
    public canResume = false;
    public canGoToBase = false;
    public eco = false;
    public noGoLines = false;
    public navigationMode = 1;

    public meta: unknown;
    public _serial: string;
    public name: string;
    public availableServices: string;


    constructor(token: string, userRobotResponse: UserRobotResponse){
        this.token = token;
        this.state = userRobotResponse;
    }

    getState(callback: (error: Error, state: RobotState | undefined) => void) {
        callback(undefined, undefined);
    }

    getSchedule(detailed: boolean, callback: (error: Error, schedule: boolean | Schedule | undefined) => void) {
        callback(undefined, undefined);
    }

    enableSchedule() {
        return;
    }

    disableSchedule() {
        return;
    }

    startCleaning () {
        return;
    }

    startSpotCleaning () {
        return;
    }

    // stopCleaning() {
    //     return;
    // }

    pauseCleaning() {
        return;
    }

    resumeCleaning() {
        return;
    }

    getPersistentMaps() {
        return;
    }

    getMapBoundaries() {
        return;
    }

    // setMapBoundaries() {
    //     return;
    // }

    // startCleaningBoundary() {
    //     return;
    // }

    sendToBase() {
        return;
    }

    findMe() {
        return;
    }
}
