export interface IGeoPos {
    setLatLong(lat: number, lng: number): void;

    getLat(): number;

    getLng(): number;
}
