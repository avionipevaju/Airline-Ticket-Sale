import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ReservationService {

  destinations;
  flights;
  details;
  constructor(private http: HttpClient) { }

  getDestinations() {
    this.http.get('http://localhost:8080/destinations').subscribe(data => {
      this.destinations = data;
    });
  }

  getAllFlights(start, destination) {
    let params = new HttpParams();
    params = params.append('start', start);
    params = params.append('destination', destination);
    this.http.get('http://localhost:8080/flights/airport', {params: params}).subscribe(data => {
      this.flights = data;
    });
  }

  getFlightDetails(number, departureTime) {
    let params = new HttpParams();
    params = params.append('number', number);
    params = params.append('departureTime', departureTime);
    this.http.get('http://localhost:8080/flights/details', {params: params}).subscribe(data => {
      this.details = data;
    });
  }

}
