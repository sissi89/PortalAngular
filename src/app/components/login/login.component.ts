import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/model/auth';
import { ServiziService } from 'src/app/services/servizi.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  role:any;
  constructor( public fb: FormBuilder, public router: Router, public authService:ServiziService) {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
   }

  ngOnInit(): void {
    this.getRole();
   //localStorage.getItem('role')
  
   

  }

  onSubmit(){
    this.getRole();
    this.router.navigateByUrl('/Servizi');
  }

  getRole(){
    this.authService.getRole().subscribe((data:Auth) =>{

      this.role = data;
      console.log('data: ',data)
      localStorage.setItem('role',this.role[0]["scope"])
      console.log('role',this.role[0]["scope"])
     
 
     })
  }

 

}
