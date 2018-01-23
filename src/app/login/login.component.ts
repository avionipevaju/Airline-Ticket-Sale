import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  setLoginType(name: String) {
    $('#loginTypeButton').html(name + ' <span class=\"caret\"></span>');
    console.log(name);
  }

}
