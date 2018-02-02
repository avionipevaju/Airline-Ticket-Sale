import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(jsonData: any) {
    this.http.post('http://localhost:8080/user/login', JSON.stringify(jsonData),
      {headers: {'Content-Type': 'application/json'}})
      .subscribe(data => {
        console.log(data['status']);
        if (data['status'] !== 'FAIL') {
          /*sessionStorage.setItem('user', data['status']);
          this.router.navigate(['./dashboard']);*/
          alert('Login success!');
        }else {
          alert('Login failed');
        }
      });

  }


}
