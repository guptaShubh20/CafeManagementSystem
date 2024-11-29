import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router,private auth : AuthService) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      const userpayload = this.auth.decodedToken()
      if (userpayload.role.includes('Admin1256')) {
        return true; 
      }
    }
    alert("Only Admin is allowed")
    this.router.navigate(['/login'])
    return false;
  }
}