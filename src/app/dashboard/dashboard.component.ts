import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: String;

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('user')
  }

  navigate() {
    this.router.navigate(['/dashboard', {outlets: {'dashboard': ['reservation']}}]);
  }

}
