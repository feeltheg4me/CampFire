import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private r:Router){}


  login= new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(3)]),
    password: new FormControl('',[Validators.required,Validators.pattern('^[A-Z].*')]),
  })

  get username() {
    return this.login.get('username');
  }

  get password() {
    return this.login.get('password');
  }

  VersProjects() {
    this.r.navigate(['/projects'])
  }
}
