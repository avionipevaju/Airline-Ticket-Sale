import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ReservationService {

  destinations;
  constructor(private http: HttpClient) { }

  getDestinations() {
    this.http.get('http://localhost:8080/destinations').subscribe(data => {
      this.destinations = data;
    });
  }

}
