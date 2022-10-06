import axios from "axios";
import qs from "qs";

import * as types from "./api-types";
import {login, getRobots} from "./api"



export class OrbitalClient {
    token?: string;

    authorize(email: string, password: string, force: boolean, callback: (error: null | any) => void ) {
        let promise: Promise<string>;
        if (this.token && !force) {
            promise = Promise.resolve(this.token);
        } else {
            promise = login(email, password).then(res => {
                this.token = res.token;
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

        getRobots(token).then(res => {
            callback(null, res.map(userRobotResponse => new Robot(token, userRobotResponse)));
        });
    }
}

type Error = any | undefined;

interface RobotState {
    test: string;
}
interface Schedule {
    test: string;
}

interface AvailableServices {
    test: string;
}

export class Robot {
    private token: string;
    private state: types.UserRobotResponse;

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
    public availableServices: AvailableServices;


    constructor(token: string, userRobotResponse: types.UserRobotResponse){
        this.token = token;
        this.state = userRobotResponse;

        this.meta = "";
        this._serial = userRobotResponse.serial;
        this.name = userRobotResponse.name;
        this.availableServices = {test: ""};
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
