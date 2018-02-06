import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReservationService} from "../reservation/reservation.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: String;

  constructor(private router: Router, private reservationService: ReservationService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('user');
    this.reservationService.getActiveReservations();
  }

  navigate(url) {
    this.router.navigate(['/dashboard', {outlets: {'dashboard': [url]}}]);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
