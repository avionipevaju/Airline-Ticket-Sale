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

  reserveSeat() {
    const seatField = document.getElementById('seat') as HTMLInputElement;
    const seatValue = seatField.value;
    const rows = this.reservationService.details.rows;
    const columns = this.reservationService.details.columns;
    if (seatValue[0] > String.fromCharCode(rows + 65) || seatValue[1] > columns) {
      alert('Seat doesnt exist');
      return;
    }
    if (seatValue === '') {
      alert('Seat value not valid');
      return;
    }
    this.reservationService.reserveSeat(seatValue, sessionStorage.getItem('date'));;
  }

}
