import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../reservation/reservation.service";

@Component({
  selector: 'app-activereservations',
  templateUrl: './activereservations.component.html',
  styleUrls: ['./activereservations.component.css']
})
export class ActivereservationsComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {

  }

  voidReservation(number, date, seat) {
    const today = sessionStorage.getItem('today');
    // console.log(Number(today[today.length - 2] + today[today.length - 1]) - 1);
    if (sessionStorage.getItem('today') < date) {
      this.reservationService.deleteReservation(sessionStorage.getItem('user'), number, date, seat);
    } else {
      alert('Can\'t void this reservation');
    }
  }

  getBoardingTicket(number, date, seat) {
    this.reservationService.addBoardingTicket(sessionStorage.getItem('user'), number, date, seat);
  }

}
