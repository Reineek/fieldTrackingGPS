import {IDevice} from "./models/device.ts";
import {IGeoPos} from "./models/geopoint.ts";

export class Device implements IDevice {
    private name: string = '';
    private points!: IGeoPos;
    setName(name: string): void {
        this.name = name;
    }
    setCoordinates(points: IGeoPos): void {
        this.points = points
    }
    listCoordinates(): IGeoPos {
        return this.points
    }
}