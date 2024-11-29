import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  constructor(public objs : UserService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.objs.getUserList();
 
  }

  onDelete(Id)
  {
   if(confirm("Are you sure? you wanna delete this Customer?"))
   {
     this.objs.deleteUser(Id).subscribe(
       res=>{this.objs.getUserList()
        this.toastr.success('Success','Record Deleted !!!')
       },
      err=>{
        this.toastr.error('Error','Error !!!'+err)

      }
    )
   }
  }

}
