/*
 1. Uztaisīt lauks: Field
          Nosaukums
          Masīvs ar koordinātēm.  {lat:60.203, lng: 15.1239}[]
          Masīvs ar iekārtām

 2. Laukā var ievietot iekārtas ar GPS trekeriem
          Nosaukums
          Koordinātes: {lat:60.3123, lng: 15.123}

 3. uzrakstīt scenāriju, kur: ar deno run index.ts es:
       1 izveidot lauku
       2 laukam pievienot 3 iekārtas
       3 laukam pievienot GPS koordinātu tīklu
       4 katrai iekārtai pievienot gps koordinātes
       5 redzēt pilnu lauka informāciju ar visām iekārtām un to koordinātēm.
 */

import {IGeoPos} from './models/geopoint.ts';
import {Field} from "./classField.ts";
import {Device} from "./classDevice.ts";
import {GeoPoint} from "./classGeoPoint.ts";



{
    const field1: Field = new Field();
    field1.setName('Auzas');


    const tmpPoint: GeoPoint = new GeoPoint();
    const fieldDevice: Device = new Device();

    fieldDevice.setName('Device1');
    tmpPoint.setLatLong(57.13386537285368, 24.90490366358909);
    fieldDevice.setCoordinates(tmpPoint)
    field1.putDevice(fieldDevice);

    fieldDevice.setName('Device2');
    tmpPoint.setLatLong(57.1304648181804, 24.911190694842237);
    fieldDevice.setCoordinates(tmpPoint)
    field1.putDevice(fieldDevice);

    fieldDevice.setName('Device3');
    tmpPoint.setLatLong(57.134861907040325, 24.89559299026985);
    fieldDevice.setCoordinates(tmpPoint)
    field1.putDevice(fieldDevice);

    console.table(field1.listDevices())


    const coordArray: IGeoPos[] = []
    tmpPoint.setLatLong(57.13386537285368, 24.90490366358909);
    coordArray.push(tmpPoint)
    tmpPoint.setLatLong(57.135618083149254, 24.88763586249546);
    coordArray.push(tmpPoint)
    field1.setCoordinates(coordArray);

    console.table(field1.listCoordinates())

}