import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../Models/orders.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:44331/api/Orders";
  constructor(private http:HttpClient) { }
  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  updateOrderStatus(order:Orders): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${order.OrderId}`,order, { headers });
  }

  //purchase history
  getOrderHistory(): Observable<any> {
    // Retrieve UserId from localStorage
    const UserId = localStorage.getItem('id');
    
    if (!UserId) {
      throw new Error('UserId not found in local storage');
    }

    // Send request with the UserId
    return this.http.get(`${this.apiUrl}/history/${UserId}`);
  }
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
