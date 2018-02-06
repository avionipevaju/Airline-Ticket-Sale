import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from "@angular/router";
import {log} from "util";
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    const username = sessionStorage.getItem('user');
    this.getCurrentDate();
    if (username != null) {
      this.router.navigate(['/dashboard']);
    }
  }

  setLoginType(name: String) {
    $('#loginTypeButton').html(name + ' <span class=\"caret\"></span>');
  }

  login() {
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const loginTypeField = document.getElementById('loginTypeButton') as HTMLInputElement;
    const valid = ['User', 'Admin', 'Operator'];
    if (valid.includes(loginTypeField.innerText.trim())) {
      const json = {'username': usernameField.value, 'password': passwordField.value, 'type': loginTypeField.innerText};
      this.loginService.login(json);
    } else {
      alert('Choose login type');
    }

  }

  getCurrentDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    let dday;
    let mmonth
    if (dd < 10) {
      dday = '0' + dd;
    }
    if (mm < 10) {
      mmonth = '0' + mm;
    }
    const todayString = yyyy + '-' + mmonth + '-' + dday;
    sessionStorage.setItem('today', todayString);
  }


}
