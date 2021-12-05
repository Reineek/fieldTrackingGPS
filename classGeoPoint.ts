import {IGeoPos} from "./models/geopoint.ts";

export class GeoPoint implements IGeoPos {
    private lat: number = 0;
    private lng: number = 0;

    constructor(lat: number, lng: number) {
        this.lat = lat;
        this.lng = lng;
    }

    getLat(): number {
        return this.lat;
    }

    getLng(): number {
        return this.lng;
    }

    setLatLong(lat: number, lng: number): void {
        this.lat=lat;
        this.lng=lng;
    }
}