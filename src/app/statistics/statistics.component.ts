import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../reservation/reservation.service';
declare var $: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getDestinations();
    this.reservationService.getAllUsers();
  }

  toggleFrom(destination) {
    $('#fromDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleTo(destination) {
    $('#toDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleUser(user) {
    $('#userDropdown').html(user + ' <span class=\"caret\"></span>');
    this.reservationService.getActiveReservationsUser(user);
    $('#userDetails').attr('style', 'visibility: visible');
  }

  listFlights() {
    const fromDropdown = document.getElementById('fromDropdown') as HTMLInputElement;
    const toDropdown = document.getElementById('toDropdown') as HTMLInputElement;
    this.reservationService.getAllFlights(fromDropdown.innerText, toDropdown.innerText);
    $('#flightPanel').attr('style', 'visibility: visible');
  }

  chooseFlight(flightNumber, departureTime) {
    this.reservationService.getFlightDetails(flightNumber, departureTime);
    const departureDateValue = $('#departure').val();
    if (departureDateValue == '') {
      alert('Select a date');
      return;
    }
    $('#flightDetails').attr('style', 'visibility: visible');
    sessionStorage.setItem('flight', flightNumber);
    sessionStorage.setItem('date', departureDateValue);
    this.reservationService.getReservations(flightNumber);
  }

  drawSeatingConfiguration() {
    $('#seating tr').remove();
    $('#seating th').remove();
    const table = $('#seating');
    const tableHeader = $('<thead ></thead>');
    const takenSeats = [];
    for (let i = 0; i < this.reservationService.reservations.length; i++) {
      takenSeats[i] = (this.reservationService.reservations[i].seat);
    }
    for (let j = 0; j < this.reservationService.details.rows; j++) {
      const seat = String.fromCharCode(j + 65);
      tableHeader.append('<th class="text-center">' + seat + '</th>');
    }
    table.append(tableHeader);
    const tableBody = $('<tbody></tbody>');
    for (let i = 0; i < this.reservationService.details.columns; i++) {
      const row = $('<tr></tr>');
      for (let j = 0; j < this.reservationService.details.rows; j++) {
        const seat = String.fromCharCode(j + 65) + (i + 1);
        let rowData = null;
        if (takenSeats.includes(seat)) {
          rowData = $('<td style="color:red;">X</td>');
        } else {
          rowData = $('<td></td>');
        }
        row.append(rowData);
      }
      tableBody.append(row);
    }
    table.append(tableBody);
  }

  listUsers() {

  }

}
