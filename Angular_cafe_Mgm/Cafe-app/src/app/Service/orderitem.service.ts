import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {
  readonly apiUrl = 'https://localhost:44331/api/OrderItems';

  constructor(private http : HttpClient) { }

  getOrderItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
