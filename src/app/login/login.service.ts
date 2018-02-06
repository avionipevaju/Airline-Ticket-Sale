import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(jsonData: any) {
    this.http.post('http://localhost:8080/user/login', JSON.stringify(jsonData),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          sessionStorage.setItem('user', data['status']);
          if (data['type'] === 'User ') {
            this.router.navigate(['dashboard']);
            sessionStorage.setItem('type', data['type']);
          } else {
            this.router.navigate(['dashboardpro']);
            sessionStorage.setItem('type', data['type']);
          }
        }else {
          alert('Login failed');
        }
      });
  }

  register(jsonData) {
    this.http.post('http://localhost:8080/user/register', JSON.stringify(jsonData),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          sessionStorage.setItem('user', data['status']);
          this.router.navigate(['dashboard']);
        }else {
          alert('Registration failed');
        }
      });
  }

  registerOperator(jsonData) {
    this.http.post('http://localhost:8080/user/registerOperator', JSON.stringify(jsonData),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          alert('Successfully added ' + data['type'] + ' ' + data['status'])
        }else {
          alert('Registration failed');
        }
      });
  }


}
