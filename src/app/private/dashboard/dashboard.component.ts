import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/public/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  authService = inject( AuthService )

  public currentUser = this.authService.getLoggedUser()

  
}
