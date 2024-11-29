import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  



  profileImageUrl: string | ArrayBuffer | null = null;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye";

  constructor(private auth: AuthService, private router: Router,private toastr:ToastrService) {}

  ngOnInit(): void {
    // No need to initialize a form group in template-driven forms
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye-slash" : "fa-eye";
    this.type = this.isText ? "text" : "password";
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result; // This is the Base64 string
      console.log(this.profileImageUrl);
    };

    if (file) {
      reader.readAsDataURL(file); // Converts to Base64
    }
  }

  onSignup(signUpForm: any) {
    if (signUpForm.valid) {
      // Perform logic for signup
      signUpForm.value.ImageUrl = this.profileImageUrl;
      console.log(signUpForm.value);
      this.auth.signUp(signUpForm.value).subscribe({
        next: (res) => {
          // alert(res.Message);
          this.toastr.success('Success','User Registered')

          signUpForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          // alert(err?.error.Message);
          this.toastr.error('Error',err?.error.Message);        
        }
      });
    } else {
      this.validateAllFormFields(signUpForm);
      // Logic for throwing error
    }
  }

  private validateAllFormFields(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      if (control) {
        control.markAsTouched(); // Mark the control as touched to trigger validation messages
      }
    });
  }

}
