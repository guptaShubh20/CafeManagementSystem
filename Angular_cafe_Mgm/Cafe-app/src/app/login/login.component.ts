import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  // type: string = "password";
  // isText: boolean = false;
  // eyeIcon: string = "fa-eye";

  // loginForm!: FormGroup;
  // constructor(private fb: FormBuilder, private auth: AuthService,private router:Router){ }

  // ngOnInit(): void {
  //   this.loginForm = this.fb.group({
  //     username: ['',Validators.required],
  //     password: ['',Validators.required]
  //   })
  // }

  // hideShowPass(){
  //   this.isText = !this.isText;
  //   this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
  //   this.isText ? this.type = "text" : this.type = "password";
  // }

  // onLogin(){
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value); // Log form data
  //     this.auth.login(this.loginForm.value).subscribe({
  //       next: (res) => {
  //         console.log('Response:', res); // Log the full response object
  //         if (res?.Message) {
  //           alert(res.Message);
  //           this.loginForm.reset();
  //           this.auth.storeToken(res);
            

  //           const tokenPayload = this.auth.decodedToken();

  //           if(tokenPayload.role === "Admin1256"){
  //             this.router.navigate(['dashboard'])
  //           }

  //           else{
  //             this.router.navigate(['homo'])
  //           }

           
  //         } else {
  //           alert("No message found in the response");
          
  //         }
  //       },
  //       error: (err) => {
  //         console.log('Error:', err); // Log the error response
  //         alert(err?.error?.message || "Something went wrong");
  //       }
  //     });
  //   } else {
  //     this.validateAllFormFields(this.loginForm);
  //     alert("Your form is invalid");
  //   }
  // }
  // private validateAllFormFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl) {
  //       control.markAsDirty({onlySelf: true});
  //     }
  //     else if(control instanceof FormGroup) {
  //       this.validateAllFormFields(control)
  //     }
  //   });

  // }



  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye";

  constructor(private auth: AuthService, private router: Router,private toastr : ToastrService) { }

  ngOnInit(): void { }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye-slash" : "fa-eye";
    this.type = this.isText ? "text" : "password";
  }

  onLogin(form: any) {
    if (form.valid) {
      console.log(form.value); // Log form data
      this.auth.login(form.value).subscribe({
        next: (res) => {
          console.log('Response:', res); // Log the full response object
          if (res?.Message) {
          
          this.toastr.success('Success','Login Success',{timeOut: 5000,
            progressBar: true,
          });
            form.reset(); // Reset the form

            this.auth.storeToken(res);
            const tokenPayload = this.auth.decodedToken();

            if (tokenPayload.role === "Admin1256") {
              this.router.navigate(['dashboard']);
            } else {
              this.router.navigate(['homo']);
            }
          } else {
         
            this.toastr.error('Error','No message found in the response')
          }
        },
        error: (err) => {
          console.log('Error:', err); // Log the error response
         
          this.toastr.error('Error','Something went wrong')
        }
      });
    } else {
      this.toastr.error('Error','Your Form is Invalid')
    }
  }

}
