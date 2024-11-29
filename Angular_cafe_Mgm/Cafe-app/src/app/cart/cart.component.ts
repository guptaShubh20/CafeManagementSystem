import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../Service/cart.service';

export interface CartItem {
  ProductId : number,
  CartId : number,
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  id : number; 

  @Input() items: any[] = [];
 

  constructor(private http: HttpClient, public crt : CartService) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id'));
    this.loadCartItems();
  }


  loadCartItems(): void {
    this.crt.getCartItems(this.id).subscribe(
      (items) => {
        this.cartItems = items;
        console.log(this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }



  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.Quantity, 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  }

  get shipping(): number {
    return 5.00;
  }

  removeItem(item: CartItem): void {
    if(item.Quantity == 1){
      console.log("1");
      this.crt.deleteCart(item.CartId).subscribe(
        (response) => {
          console.log('Cart removed successfully', response);
          this.loadCartItems();
  
        },
        (error) => {
          console.error('Error updating cart', error);
        }
      );

    }
    else{
    this.crt.updateCart(item.CartId,item.Quantity-1,item.ProductId).subscribe(
      (response) => {
        console.log('Cart updated successfully', response);
        this.loadCartItems();

      },
      (error) => {
        console.error('Error updating cart', error);
      }
    );
  }

  }

  addItem(item: CartItem): void {
     this.crt.updateCart(item.CartId,item.Quantity+1,item.ProductId).subscribe(
      (response) => {
        console.log('Cart updated successfully', response);
        this.loadCartItems();

      },
      (error) => {
        console.error('Error updating cart', error);
      }
    );
  }




}
