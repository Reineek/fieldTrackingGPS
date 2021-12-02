import {IField} from "./models/field.ts";
import {IDevice} from "./models/device.ts";
import {IGeoPos} from "./models/geopoint.ts";

export class Field implements IField {
    fieldDevices: IDevice[] = [];
    fieldName: string = '';
    coordinates: IGeoPos[]  = [];

    setCoordinates(points: IGeoPos[]): void {
        this.coordinates = points;
    }

    listCoordinates(): IGeoPos[] {
        return this.coordinates;
    }

    listDevices(): IDevice[] {
        return this.fieldDevices;
    }

    putDevice(device: IDevice): void {
        this.fieldDevices.push(device);
    }

    setName(name: string): void {
        this.fieldName = name;
    }
}