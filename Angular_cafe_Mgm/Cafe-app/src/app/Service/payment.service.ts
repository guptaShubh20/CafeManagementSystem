import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from './cart.service';

export interface Payment {
 
    name: string;
    CardNo: string;
    CvvNo: string;
    ExpiryDate: string;
    address: string;
    paymentMode: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = 'https://localhost:44331/api/Payments'; // Adjust URL as needed
    private apiUrl1 = 'https://localhost:44331/api/OrderItems';  // Replace with your actual API URL


    constructor(private http: HttpClient,private crt : CartService) { }

    submitPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(this.apiUrl, payment).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Customize the error message based on the error response
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // return throwError(errorMessage);
        return throwError(() => new Error(errorMessage));
    }



    processPayment(paymentData: any): Observable<any> {
        // Send a POST request with the payment data
        console.log(paymentData);
        return this.http.post(this.apiUrl, {...paymentData , Address : "5b"});
      }

    
  createOrder(orderData: any): Observable<any> {
    var url = 'https://localhost:44331/api/Orders';

    return this.http.post(url, orderData);
  }

  createOrderItems(itemData: any): Observable<any> {
    

    return this.http.post(this.apiUrl1, itemData);
  }


  getPayments(): Observable<any> {
    

    return this.http.get(this.apiUrl);
  }

 




}