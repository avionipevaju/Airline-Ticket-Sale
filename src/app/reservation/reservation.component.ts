import { Component, OnInit } from '@angular/core';
import {ReservationService} from "./reservation.service";
declare var $: any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  destinations;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getDestinations();
    this.destinations = this.reservationService.destinations;
  }

  toggleFrom(destination) {
    $('#fromDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleTo(destination) {
    $('#toDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

}
