import {IField} from './models/field.ts';
import {IGeoPos} from './models/geopoint.ts';
import {GeoPoint} from "./classGeoPoint.ts";
import {IDevice} from "./models/device.ts";
import {Device} from "./classDevice.ts";
import {Field} from "./classField.ts";


interface IFieldWeather {
    displayWeatherForecast(field: IField): void;
}

interface IForecast {
    year: number;
    month: number;
    day: number;
    temperature: number;
}

/**
 * TODO:
 * 1. Find the center of the field
 * 2. Make URL for the MET.NO API
 *    The MET.NO service is open and for free and without keys
 * 3. Fetch Weather for the center of the field. use axios library to fetch remote data. Method is already prepared for you.
 *    I dont know precise interface for the data that is returned, therefore i use "unknown". but if you want, you can explore and make interface yourself
 * 4. explore the api.Learn the data structrure and get AVERAGE WEATHER PER DAY!!!!!
 *    You may open the url in browser and use any JSON extension for chrome to explore data
 *    for example https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en
 * 5. Display Field Weather Forecast in following format (use console.table  IForecast interface)
 *      1. izkasīt datumu
 *          datumu izparsēt un izvilkt gadu, mēnesi un dienu
 *      2. apkopot temperatūru katrai dienai uzvilkt vidējo
 *      3. rezultātu kā tabulā lejā
 *      4. ja paliek laiks - pievienot nokrišņus.
 *
 *         00:00:00
 *               next_1_h
 *               next_6_h .... temparutruru nokrišni
 *         01:00:00
 *               next_1_h
 *               next_6_h
 *         06:00:00
 *               next_6_h
 *         12:00:00
 *               next_6_h
 *
 *         00:00:00
 *               next_6_h
 *         06:00:00
 *               next_6_h
 *      +------+-------+-----+-------------+
 *      | Year | Month | Day | Temperature |
 *      +------+-------+-----+-------------+
 *      | 2021 | 12    |  2  | -1°C        |
 *      +------+-------+-----+-------------+
 */

export class FieldWeather implements IFieldWeather {
    private readonly apiUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/complete.json?altitude=0&lat=$LAT$&lon=$LON$'

    constructor(private field: IField) {
    }

    async displayWeatherForecast(): Promise<void> {
        const geoPos: IGeoPos = this.getFieldCenterPoint(this.field.listCoordinates())
        const weatherData: IForecast[] = await this.fetchWeatherForecast(geoPos);
        this.outputWeatherData(weatherData);
    }

    private getFieldCenterPoint(points: IGeoPos[]): IGeoPos {
        let avgLat: number = 0;
        let avgLng: number = 0;
        points.forEach((element:IGeoPos)  => {
            avgLat = avgLat + element.getLat();
            avgLng = avgLng + element.getLng();
        })
        avgLat = avgLat / points.length;
        avgLng = avgLng / points.length;
        const tmpPoint: GeoPoint = new GeoPoint(0,0);
        tmpPoint.setLatLong(avgLat, avgLng);
        return tmpPoint;
    }

    // 4. Display Field Weather Forecast in following format
    private outputWeatherData(data: IForecast[]) {
        // console.table(data);



        console.table(data)
    }

    // 2. Make URL for the MET.NO API
    private makeUrl(geoPos: IGeoPos): string {
        return this.apiUrl
            .replace('$LAT$', geoPos.getLat().toString())
            .replace('$LON$', geoPos.getLng().toString());
    }

    // 2. Fetch Weather for the center of the field
    private async fetchWeatherForecast(geoPos: IGeoPos): Promise<IForecast[]> {
        const response = await fetch(this.makeUrl(geoPos));
        console.log(this.makeUrl(geoPos))
        const responseJson = await response.json();
        return this.transformVendorDataInToForecast(responseJson);
    }



    private transformVendorDataInToForecast(weatherData: any): IForecast[] {
        const timeSeries = weatherData.properties.timeseries;

        let returnData: any = [];
        let dataEntry: any = {};

        let i = 0;
        let whatHour = -1;
        let sumTemp = 0;

        while (whatHour != 23) {
            whatHour = timeSeries[i].time.slice(11,13);
            //console.log(whatHour);
            sumTemp = sumTemp + timeSeries[i].data.instant.details.air_temperature;
            i++
        };

        dataEntry.year = timeSeries[i-1].time.slice(0, 4);
        dataEntry.month = timeSeries[i-1].time.slice(5, 7);
        dataEntry.day = timeSeries[i-1].time.slice(8, 10);
        dataEntry.temperature = parseFloat((sumTemp / (i-1)).toFixed(1));
        returnData.push({...dataEntry});
        //console.log(returnData[0])
        //console.log('Day! 1');
        sumTemp = 0;

        for (let nextDay = 2; nextDay < 10 ;) {
            do {
                whatHour = timeSeries[i].time.slice(11,13);

                if ( (whatHour == 0) || (whatHour == 6) || (whatHour == 12) || (whatHour == 18)) {      //console.log(whatHour);
                sumTemp = sumTemp + (timeSeries[i].data.next_6_hours.details.air_temperature_max + timeSeries[i].data.next_6_hours.details.air_temperature_min)/2 ;}
                i++
            } while (whatHour != 18);
            dataEntry.year = timeSeries[i-1].time.slice(0, 4);
            dataEntry.month = timeSeries[i-1].time.slice(5, 7);
            dataEntry.day = timeSeries[i-1].time.slice(8, 10);
            dataEntry.temperature = parseFloat((sumTemp/4).toFixed(1));
            returnData.push({...dataEntry});
            //returnData.push(timeSeries[i-1].time.slice(0, 4) +'.'+ timeSeries[i-1].time.slice(5, 7) +'.'+ timeSeries[i-1].time.slice(8, 10) +' '+ (sumTemp/4).toFixed(1) );
            //console.log('Day! - ' + (nextDay));
            sumTemp = 0;
            nextDay++;
        }




        whatHour = timeSeries[i].time.slice(11,13);
        try {
            while (whatHour != 18) {
                whatHour = timeSeries[i].time.slice(11,13);
                console.log(whatHour);
                sumTemp = sumTemp + (timeSeries[i].data.next_6_hours.details.air_temperature_max + timeSeries[i].data.next_6_hours.details.air_temperature_min)/2 ;
                console.log(sumTemp);
                i++
            };
            dataEntry.year = timeSeries[i-1].time.slice(0, 4);
            dataEntry.month = timeSeries[i-1].time.slice(5, 7);
            dataEntry.day = timeSeries[i-1].time.slice(8, 10);
            dataEntry.temperature = parseFloat((sumTemp/4).toFixed(1));
            returnData.push({...dataEntry});
        }
        catch (exception_var) {
            console.log('error: list end');
            switch (whatHour) {
                case 6:
                    dataEntry.temperature = parseFloat((sumTemp).toFixed(1));
                    break;
                case 12:
                    dataEntry.temperature = parseFloat((sumTemp/2).toFixed(1));
                    break;
                case 16:
                    dataEntry.temperature = parseFloat((sumTemp/3).toFixed(1));
                    break;
            }
            dataEntry.year = timeSeries[i-1].time.slice(0, 4);
            dataEntry.month = timeSeries[i-1].time.slice(5, 7);
            dataEntry.day = timeSeries[i-1].time.slice(8, 10);
            returnData.push({...dataEntry});
        }




        return returnData;
    }
}


const device: IDevice = new Device();
device.setName('Device1: Puķes');
device.setCoordinates(new GeoPoint(56.95055180971828, 24.0608632395193));

const field: IField = new Field();
field.setName('LU Botāniskais dārzs');
field.putDevice(device);
const fieldPos: GeoPoint = new GeoPoint(56.95105039638951, 24.059670281190392);
field.setCoordinates([fieldPos])



new FieldWeather(field).displayWeatherForecast();


