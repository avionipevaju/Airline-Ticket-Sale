import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboardpro',
  templateUrl: './dashboardpro.component.html',
  styleUrls: ['./dashboardpro.component.css']
})
export class DashboardproComponent implements OnInit {

  username;

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('user');
    if (sessionStorage.getItem('type').trim() === 'Operator') {
      $('#adminRights').attr('style', 'visibility:hidden');
    }
  }

  navigate(url) {
    this.router.navigate(['/dashboardpro', {outlets: {'dashboardpro': [url]}}]);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['']);
  }

}
