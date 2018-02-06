import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
declare var $: any;

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  register() {
    const firstNameField = document.getElementById('firstName') as HTMLInputElement;
    const lastNameField = document.getElementById('lastName') as HTMLInputElement;
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordField = document.getElementById('confPassword') as HTMLInputElement;
    if (passwordField.value !== confirmPasswordField.value) {
      alert('Passwords dont match');
      return;
    }
    const json = {'firstname': firstNameField.value, 'lastname': lastNameField.value, 'username': usernameField.value,
      'checkbox': $('#checkbox').is(':checked'), 'password': passwordField.value};
     this.loginService.registerOperator(json);
  }

}
