import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/services/auth-service.service';
import { ServiziService } from 'src/app/services/servizi.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  role:any;
  loading = false;
  submitted = false;
  error = '';
  
  constructor( public fb: FormBuilder, public router: Router, public toast:ToastService,  private route: ActivatedRoute, public authentication :AuthService) {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
   }

  ngOnInit(): void {
    
   //localStorage.getItem('role')
  
   

  }

  onSubmit(){
   
    this.submitted = true;
    let values = this.loginForm.value;
 
    // se i campi sono truty
    if(values.username && values.password){
      this.error = '';
        this.loading = true;

      this.authentication.login(values.username, values.password)
      .pipe(first())
      .subscribe({
        
          next: () => {
             
              this.router.navigateByUrl('/Servizi');
         
          },
          error: (error: string) => {
              this.error = error;
              console.log(error,'err')
              this.loading = false;
          }
      });
     
    }else{
     
     this.toast.snackBar('Compilare tutti i campi','bg-danger')

    }
    
  }






 

}
