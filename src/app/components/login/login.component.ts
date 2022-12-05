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
  
  constructor( public fb: FormBuilder, public router: Router, public authService:ServiziService, public toast:ToastService,  private route: ActivatedRoute, public authentication :AuthService) {
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
   }

  ngOnInit(): void {
    
   //localStorage.getItem('role')
  
   

  }

  onSubmit(){
    console.log('ho cliccato')
    this.submitted = true;
    let values = this.loginForm.value;
    // se i campi sono truty
    if(values.username && values.password){
      this.error = '';
        this.loading = true;
      /* this.getRole();
      this.router.navigateByUrl('/Servizi'); */
      this.authentication.login(values.username, values.password)
      .pipe(first())
      .subscribe({
        
          next: () => {
      
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
           
              this.router.navigate([returnUrl]);
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




  getRole(){
    this.authService.getRole().subscribe((data:Auth) =>{
    // iniserisco data nella variabile
      this.role = data;
     // aggiungo nel local storage
     localStorage.setItem('Fiduciario',this.role[0]["fiduciario"])
      localStorage.setItem('role',this.role[0]["scope"])
    // console.log('role',this.role[0]["scope"])
     
 
     })
  }

 

}
