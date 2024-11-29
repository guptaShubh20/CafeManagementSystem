import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable,catchError } from 'rxjs';
import { Cart } from '../model/cart.model';

export interface CartItem {
  ProductId : number,
  CartId : number,
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://localhost:44331/api/Carts';  // Replace with your actual API URL
  id:number;

  constructor(private http: HttpClient) {
    this.id = JSON.parse(localStorage.getItem('id'));
  }


  

  getCartItems(userId: number): Observable<CartItem[]> {
    const apiUrl = `https://localhost:44331/api/cartitem/${userId}`;
    return this.http.get<CartItem[]>(apiUrl).pipe(
      catchError(this.handleError<CartItem[]>('getCartItems', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable<T>((observer) => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }


  

  addToCart(cartData: { ProductId: number; Quantity: number; UserId: number }): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, cartData);
  }

  // Update an existing cart
  updateCart(cartId: number, quantity: number,productId : number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = {
      CartId: cartId,
      ProductId: productId,
      UserId: this.id,
      Quantity: quantity
  };
    return this.http.put(`${this.apiUrl}/${cartId}`, payload, { headers });
  }


  // Delete a cart
  deleteCart(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    console.log("2");
    return this.http.delete(url);
  }



  


}
