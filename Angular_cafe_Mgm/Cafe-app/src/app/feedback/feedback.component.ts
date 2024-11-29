import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  readonly ppApiUrl='https://localhost:44331/api/Contacts';

  constructor(private http: HttpClient,private toastr: ToastrService) {}

  onSubmit(form: any) {
    const requestBody = {
      ...form.value, 
      CreatedDate: new Date().toISOString() 
    };
   console.log(form.value);
    this.http.post(this.ppApiUrl, requestBody)
      .subscribe({
        next: response => {
          console.log('Success!', response);
          this.toastr.success('Success','Form Submitted Successfully');

          form.reset(); 
        },
        error: error => {
          console.error('Error occurred:', error);
        }
      });
  }
}
