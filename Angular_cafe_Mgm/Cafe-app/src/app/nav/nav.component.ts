import { Component } from '@angular/core';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

constructor(private auth:AuthService) {}

logout()
{
  this.auth.signOut();
}
LoggedIn(){
  return this.auth.isLoggedIn();
}
}
