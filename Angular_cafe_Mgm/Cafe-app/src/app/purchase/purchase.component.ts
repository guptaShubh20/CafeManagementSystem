import { Component } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { Orders } from '../Models/orders.model';
import { ProductService } from '../Service/product.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  orders: Orders[];
  productNames: { [key: string]: string } = {};

  constructor(private orderService : OrderService,private productService:ProductService){}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {

    this.orderService.getOrderHistory().subscribe(orders => {
      console.log(orders);
      this.orders = orders;
      // this.fetchProductNames();
    });
  }

  // fetchProductNames(): void {
  //   const productIds = [...new Set(this.orders.map(order => order.ProductId))]; // Get unique product IDs
  //   productIds.forEach(productId => {
  //     this.productService.getProductById(productId).subscribe(product => {
  //       this.productNames[productId] = product.Name; // Assuming product object has a 'name' property
  //     });
  //   });
  // }

  }
