import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReservationService} from "../reservation/reservation.service";
declare var $: any;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit() {

  }

  manageAirplanes() {
    this.reservationService.getAirplanes();
    $('#managedAirplanePanel').show();
    $('#managedDestinationPanel').hide();
    $('#managedFlightsPanel').hide();
  }

  manageDestinations() {
    this.reservationService.getDestinations();
    $('#managedAirplanePanel').hide();
    $('#managedDestinationPanel').show();
    $('#managedFlightsPanel').hide();
  }

  manageFlights() {
    this.reservationService.getDestinations();
    this.reservationService.getAirplanes();
    $('#managedAirplanePanel').hide();
    $('#managedDestinationPanel').hide();
    $('#managedFlightsPanel').show();
  }

  toggleAirplane(registration) {
    $('#airplaneDropdown').html(registration + ' <span class=\"caret\"></span>');
  }

  toggleFromDest(destination) {
    $('#fromDestDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleToDest(destination) {
    $('#toDestDropdown').html(destination + ' <span class=\"caret\"></span>');
  }

  toggleAirplaneManage(registration) {
    $('#airplanesDropdown').html(registration + ' <span class=\"caret\"></span>');
    this.reservationService.getAirplaneByRegistration(registration);
  }

  toggleDestinationManage(airport) {
    $('#destinationDropdown').html(airport + ' <span class=\"caret\"></span>');
    this.reservationService.getDestinationByAirport(airport);
  }

  saveAirplane() {
    const r = $('#rows').val().trim();
    const c = $('#columns').val().trim();
    const s = $('#seats').val().trim();
    if (r * c != s) {
      alert('Something doesnt add up');
      return;
    }
    const jsonData = {};
    jsonData['company'] = $('#company').val().trim();
    jsonData['manufacturer'] = $('#manufacturer').val().trim();
    jsonData['type'] = $('#type').val().trim();
    jsonData['seats'] = $('#seats').val().trim();
    jsonData['rows'] = $('#rows').val().trim();
    jsonData['columns'] = $('#columns').val().trim();
    jsonData['range'] = $('#range').val().trim();
    jsonData['speed'] = $('#speed').val().trim();
    jsonData['registration'] = $('#registration').val().trim();
    this.reservationService.addAirplane(jsonData);
  }

  editAirplane() {
    $('#registration').val(this.reservationService.currentAirplane.registration);
    $('#company').val(this.reservationService.currentAirplane.company);
    $('#manufacturer').val(this.reservationService.currentAirplane.manufacturer);
    $('#type').val(this.reservationService.currentAirplane.type);
    $('#seats').val(this.reservationService.currentAirplane.numberOfSeats);
    $('#rows').val(this.reservationService.currentAirplane.rows);
    $('#columns').val(this.reservationService.currentAirplane.columns);
    $('#range').val(this.reservationService.currentAirplane.flightRange);
    $('#speed').val(this.reservationService.currentAirplane.airSpeed);
  }

  deleteAirplane() {
    this.reservationService.deleteAirplane(this.reservationService.currentAirplane.registration);
  }

  saveDestination() {
    alert('SAVING');
  }

  editDestination() {
    $('#city').val(this.reservationService.currentAirport.city);
    $('#country').val(this.reservationService.currentAirport.country);
    $('#airport').val(this.reservationService.currentAirport.airport);
  }

  saveFlight() {
    const jsonData = {};
    jsonData['number'] = $('#number').val().trim();
    jsonData['registration'] = $('#airplaneDropdown').text().trim();
    jsonData['from'] = $('#fromDestDropdown').text().trim();
    jsonData['to'] = $('#toDestDropdown').text().trim();
    jsonData['departureTime'] = $('#time').val().trim();
    jsonData['flightTime'] = $('#ftime').val().trim();
    jsonData['distance'] = $('#distance').val().trim();
    jsonData['gate'] = $('#gate').val().trim();
    console.log(jsonData);
    this.reservationService.addFlight(jsonData);
  }

}
