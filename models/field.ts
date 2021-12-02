import {IDevice} from './device.ts';
import {IGeoPos} from './geopoint.ts';

export interface IField {
    setName(name: string): void;

    putDevice(device: IDevice): void;

    listDevices(): IDevice[];

    setCoordinates(points: IGeoPos[]): void; //IGeoPos[]): void;

    listCoordinates(): IGeoPos[];
}
