import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineDataService {

  constructor(private http: HttpClient) {
  }

  airportDetailsUrl = '/travel/getAirportDetails';
  retrieveFareURL = '/travel/getFare';

  getAirLineData<T>() {
    return this.http.get<T>(this.airportDetailsUrl);
  }

  retrieveFare<T>(originCode, destCode) {
    return this.http.get<T>(this.retrieveFareURL + '/' + originCode + '/' + destCode);
  }


}
