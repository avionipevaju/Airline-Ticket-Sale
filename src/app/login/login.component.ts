import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  setLoginType(name: String) {
    $('#loginTypeButton').html(name + ' <span class=\"caret\"></span>');
  }

  login() {
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const loginTypeField = document.getElementById('loginTypeButton') as HTMLInputElement;
    const json = {'username': usernameField.value, 'password': passwordField.value, 'type': loginTypeField.innerText};
    this.loginService.login(json);
  }



}
