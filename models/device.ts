import {IGeoPos} from './geopoint.ts';

export interface IDevice {
    setName(name: string): void;

    setCoordinates(points: IGeoPos): void;

    listCoordinates(): IGeoPos;
}
