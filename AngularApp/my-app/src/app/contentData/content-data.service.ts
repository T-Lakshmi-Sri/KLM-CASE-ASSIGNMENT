import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentDataService {

  constructor(private http: HttpClient) {
  }

  contentURL = 'assets/content.json';

  getContent<T>() {
    return this.http.get<T>(this.contentURL);
  }

}
