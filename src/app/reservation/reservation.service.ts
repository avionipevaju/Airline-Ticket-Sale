import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ReservationService {

  destinations;
  flights;
  details;
  airplanes;
  currentAirplane;
  currentAirport;
  reservations;
  activeReservations;
  users;
  constructor(private http: HttpClient) { }

  getDestinations() {
    this.http.get('http://localhost:8080/destinations').subscribe(data => {
      this.destinations = data;
    });
  }

  getDestinationByAirport(airport) {
    let params = new HttpParams();
    params = params.append('airport', airport);
    this.http.get('http://localhost:8080/destinations/airport', {params: params}).subscribe(data => {
      this.currentAirport = data;
    });
  }

  getAirplanes() {
    this.http.get('http://localhost:8080/airplanes').subscribe(data => {
      this.airplanes = data;
    });
  }

  getAirplaneByRegistration(registration) {
    let params = new HttpParams();
    params = params.append('registration', registration);
    this.http.get('http://localhost:8080/airplanes/registration', {params: params}).subscribe(data => {
      this.currentAirplane = data;
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

  addAirplane(jsonData) {
    this.http.post('http://localhost:8080/airplanes/add', JSON.stringify(jsonData),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          alert('Successfully added airplane');
        } else {
          alert('Adding failed');
        }
      });
   }

   deleteAirplane(registration) {
     let params = new HttpParams();
     params = params.append('registration', registration);
     this.http.get('http://localhost:8080/airplanes/delete', {params: params}).subscribe(data => {
       console.log(data['status']);
       if (data['status'] !== 'FAIL') {
         alert('Successfully deleted airplane');
       } else {
         alert('Deleting failed');
       }
     });
   }

    reserveSeat(seat, date) {
      let params = new HttpParams();
      params = params.append('seat', seat);
      params = params.append('user', sessionStorage.getItem('user'));
      params = params.append('flight', sessionStorage.getItem('flight'));
      params = params.append('date', sessionStorage.getItem('date'));
      this.http.get('http://localhost:8080/reservations/add', {params: params}).subscribe(data => {
        if (data['status'] !== 'FAIL') {
          this.getActiveReservations();
          alert('Successfully reserved ticket');
        } else {
          alert('Reservation failed');
        }
      });
    }

    getReservations(number) {
      let params = new HttpParams();
      params = params.append('number', number);
      params = params.append('date', sessionStorage.getItem('date'));
      this.http.get('http://localhost:8080/reservations/flightNumber', {params: params}).subscribe(data => {
        this.reservations = data;
        console.log(data);
      });
    }

    addFlight(jsonData) {
      this.http.post('http://localhost:8080/flights/add', JSON.stringify(jsonData),
        {headers: {'Content-Type': 'application/json'}})
        .subscribe(data => {
          if (data['status'] !== 'FAIL') {
            alert('Successfully added flight');
          } else {
            alert('Adding failed');
          }
        });
    }

    getActiveReservations() {
      let params = new HttpParams();
      params = params.append('user', sessionStorage.getItem('user'));
      this.http.get('http://localhost:8080/reservations/user', {params: params}).subscribe(data => {
        this.activeReservations = data;
      });
    }

    getActiveReservationsUser(username) {
      let params = new HttpParams();
      params = params.append('user', username);
      this.http.get('http://localhost:8080/reservations/user', {params: params}).subscribe(data => {
        this.activeReservations = data;
      });
    }

    deleteReservation(user, number, date, seat) {
      let params = new HttpParams();
      params = params.append('user', user);
      params = params.append('number', number);
      params = params.append('date', date);
      params = params.append('seat', seat);
      this.http.get('http://localhost:8080/reservations/find', {params: params}).subscribe(data => {
        if (data['status'] !== 'FAIL') {
          alert('Successfully voided reservation');
          this.getActiveReservations();
        } else {
          alert('Voiding failed');
        }
      });
    }

    addBoardingTicket(user, number, date, seat) {
      let params = new HttpParams();
      params = params.append('user', user);
      params = params.append('number', number);
      params = params.append('date', date);
      params = params.append('seat', seat);
      this.http.get('http://localhost:8080/reservations/boarding', {params: params}).subscribe(data => {
        if (data['status'] !== 'FAIL') {
          alert('Successfully taken out board pass');
        } else {
          alert('Boarding pass failed');
        }
      });
    }

    getAllUsers() {
      this.http.get('http://localhost:8080/user').subscribe(data => {
        this.users = data;
      });
    }

}
