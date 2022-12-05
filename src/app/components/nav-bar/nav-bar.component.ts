import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/auth';
import { AuthService} from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 links:string[] =['Login']

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   this.isUser()
  }

  logout() {
    this.authService.logout();
}

isUser(){
  let user = this.authService.userValue;

  return user?.role
  

}






}
