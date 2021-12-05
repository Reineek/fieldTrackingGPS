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
import {FieldWeather} from "./field-weather.ts";
import {IField} from "./models/field.ts";


{
    const field1: Field = new Field();
    field1.setName('Auzas');


    let tmpPoint1: GeoPoint = new GeoPoint(0,0);
    let fieldDevice1: Device = new Device();
    fieldDevice1.setName('Device1');
    tmpPoint1.setLatLong(57.13386537285368, 24.90490366358909);
    fieldDevice1.setCoordinates(tmpPoint1)
    field1.putDevice(fieldDevice1);

    let tmpPoint2: GeoPoint = new GeoPoint(0,0);
    let fieldDevice2: Device = new Device();
    fieldDevice2.setName('Device2');
    tmpPoint2.setLatLong(57.1304648181804, 24.911190694842237);
    fieldDevice2.setCoordinates(tmpPoint2)
    field1.putDevice(fieldDevice2);

    let tmpPoint3: GeoPoint = new GeoPoint(0,0);
    let fieldDevice3: Device = new Device();
    fieldDevice3.setName('Device3');
    tmpPoint3.setLatLong(57.134861907040325, 24.89559299026985);
    fieldDevice3.setCoordinates(tmpPoint3)
    field1.putDevice(fieldDevice3);

    console.table(field1.listDevices())

    let tmpPoint4: GeoPoint = new GeoPoint(0,0);
    let coordArray: IGeoPos[] = []
    tmpPoint4.setLatLong(57.133313235657404, 24.912765133311225);
    coordArray.push(tmpPoint4)
    let tmpPoint5: GeoPoint = new GeoPoint(0,0);
    tmpPoint5.setLatLong(57.13606889653252, 24.884159887439033);
    coordArray.push(tmpPoint5)
    field1.setCoordinates(coordArray);

    console.table(field1.listCoordinates())




    //const localWeather: FieldWeather = new FieldWeather(field1);

    // console.log(localWeather.getFieldCenterPoint(coordArray));

}