import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  register() {
    const firstNameField = document.getElementById('firstName') as HTMLInputElement;
    const lastNameField = document.getElementById('lastName') as HTMLInputElement;
    const usernameField = document.getElementById('username') as HTMLInputElement;
    const emailField = document.getElementById('email') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordField = document.getElementById('confPassword') as HTMLInputElement;
    if (passwordField.value !== confirmPasswordField.value) {
      alert('Passwords dont match');
      return;
    }
    const json = {'firstname': firstNameField.value, 'lastname': lastNameField.value, 'username': usernameField.value, 'email': emailField.value, 'password': passwordField.value};
    this.loginService.register(json);
  }

}
