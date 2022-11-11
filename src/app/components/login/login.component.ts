import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor( public fb: FormBuilder, public router: Router,) {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
   }

  ngOnInit(): void {
  }

  navigate(){
    this.router.navigateByUrl('/Servizi');
  }
}
