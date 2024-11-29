import { Component } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user: User | undefined;

  constructor(public objs:UserService){}

  ngOnInit(): void {
   
    // this.objs.getUserListById();
    this.objs.getUserListById().subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
 
  }

}
