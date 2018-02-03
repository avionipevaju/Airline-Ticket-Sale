import { Component, OnInit } from '@angular/core';
import {ReservationService} from './reservation.service';
declare var $: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getDestinations();
  }

  toggleFrom(destination) {
    $('#fromDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleTo(destination) {
    $('#toDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  listFlights() {
    const fromDropdown = document.getElementById('fromDropdown') as HTMLInputElement;
    const toDropdown = document.getElementById('toDropdown') as HTMLInputElement;
    this.reservationService.getAllFlights(fromDropdown.innerText, toDropdown.innerText);
    $('.panel').attr('style', 'visibility: visible');
  }

  chooseFlight(flightNumber, departureTime) {
    this.reservationService.getFlightDetails(flightNumber, departureTime);
  }

}
