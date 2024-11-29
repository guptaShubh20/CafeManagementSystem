import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { CategoriesService } from '../../Service/categories.service';
import { ProductService } from '../../Service/product.service';
import { OrderService } from '../../Service/order.service';
import { UserService } from '../../Service/user.service';
import { FeedbackService } from '../../Service/feedback.service';
import { OrderitemService } from '../../Service/orderitem.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cl = 1;
  pl = 1;
  ol = 1;
  ul = 1;
  fl = 1;
  tp = 0; // Total price
  oList: any;
  pList: any;
  pi = 0; // Pending orders
  ci = 0; // Completed orders
  
  constructor(
    private c: CategoriesService,
    private p: ProductService,
    private o: OrderService,
    private u: UserService,
    private f: FeedbackService,
    private oo: OrderitemService
  ) {
    this.onLoad();
  }
  
  onLoad() {
    // Load categories
    this.c.getcategoryList1().subscribe(
      (res) => (this.cl = res.length), 
      (err) => console.log(err)
    );
  
    // Load products
    this.p.getProducts().subscribe(
      (res1) => {
        this.pl = res1.length; // Products length
        this.pList = res1;
  
        // Load orders
        this.o.getOrders().subscribe(
          (res2) => {
            this.ol = res2.length; // Orders length
  
            // Load order items
            this.oo.getOrderItems().subscribe(
              (res3) => {
                const productMap = res3.reduce((acc, item) => {
                  acc[item.ProductId] = item.Price;
                  return acc;
                }, {} as { [key: number]: number });
  
                // Calculate total price
                this.tp = res3.reduce((total, item) => {
                  const productPrice = productMap[item.ProductId] || 0;
                  return total + productPrice * item.Quantity;
                }, 0);
  
                // Count pending and completed orders
                res2.forEach((order) => {
                  if (order.Status === 'pending') {
                    this.pi += 1;
                  } else {
                    this.ci += 1;
                  }
                });
              },
              (err) => {
                console.log(err);
              }
            ); // End of getOrderItems
          },
          (err) => console.log(err) // Error handling for getOrders
        ); // End of getOrders
      },
      (err) => console.log(err) // Error handling for getProducts
    ); // End of getProducts
  
    // Load user list
    this.u.getUserList1().subscribe(
      (res) => (this.ul = res.length),
      (err) => console.log(err)
    );
  
    // Load feedback
    this.f.getFeedback().subscribe(
      (res) => (this.fl = res.length),
      (err) => console.log(err)
    );
  }
  
  toggle = false;
  toggleSidebar() {
    this.toggle = !this.toggle;
  }
  
}
