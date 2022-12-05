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
 user?: User | null;
  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {

  }

  logout() {
    this.authenticationService.logout();
}


}
