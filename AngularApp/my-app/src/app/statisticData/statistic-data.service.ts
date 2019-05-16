import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticDataService {

  constructor(private http: HttpClient) {
  }

  statisticsUrl = '/travel/getStatisticData';

  getStatistics<T>() {
    return this.http.get<T>(this.statisticsUrl);
  }

}
