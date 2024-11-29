import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Service/payment.service';
import { CartService } from '../Service/cart.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../Service/product.service';
import { ToastrService } from 'ngx-toastr';

export interface CartItem {
  ProductId : number,
  CartId : number,
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {
  private apiUrl = 'https://localhost:44331/api/OrderItems';  // Replace with your actual API URL
    model: any = {};
    cartItems: CartItem[] = [];
    id : number; 
    orderData : any;
    orderiData : any;
    p:any;


    submissionMessage: string | null = null; // To display submission messages
    errorMessage: string | null = null; // To display error messages

    constructor(private paymentService: PaymentService, private crt : CartService,private router : Router,private http : HttpClient,private psrv : ProductService,
      private toastr : ToastrService
    ) {}

    ngOnInit(): void {
      this.id = JSON.parse(localStorage.getItem('id'));
      this.loadItems();
    }
 

    loadItems():void{

      this.crt.getCartItems(this.id).subscribe(
        (items) => {
          this.cartItems = items;
        },
        (error) => {
          console.error('Error loading cart items', error);
        }
      );

      this.psrv.getProducts().subscribe((res)=>{

        const productMap = res.reduce((acc, product) => {
          acc[product.ProductId] = product.Price;
          return acc;
        }, {} as { [key: number]: number });
  
        this.p = productMap;
  
        console.log(this.p);
  
      },(err)=>{
        console.log(err);
      });

    }

    get subtotal(): number {
      return this.cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
    }
  
    get shipping(): number {
      return 5.00;
    }


    onSubmit(form: any) {
        if (form.valid) {
          console.log(form.value);
          this.paymentService.processPayment(form.value).subscribe(
            (response) => {
              
              console.log("Order about to be created", response);
              this.createOrder(response.PaymentId);
             this.toastr.success('Success','Order Placed Successfully')
              this.router.navigate(['homo'])
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
console.log("failed");
        }
      }



      createOrder(id : number) :void{

      

      this.orderData = {
         UserId : this.id,
         TotalAmount : this.subtotal,
          Status : "pending",
         PaymentId : id,
         OrderDate : new Date()
         }

              this.paymentService.createOrder(this.orderData).subscribe(
                (response) => {
                     console.log('Order created successfully:', response);
                     for(let t of this.cartItems){

                          this.orderiData = {
                            Quantity : t.Quantity,
                            OrderId : response.OrderId,
                            ProductId : t.ProductId,
                            Price : this.p[t.ProductId]

                          }
                          console.log(this.orderiData);

                          this.paymentService.createOrderItems(this.orderiData).subscribe(res => {
                            console.log(res);
                          },
                        (err)=>{console.log(err);}
                      )
                      
                          this.crt.deleteCart(t.CartId).subscribe((res)=>{
                            console.log(res);
                          },
                        (err)=>{
                          console.log(err);
                        })

                         
                     }
                      // Handle successful response (e.g., display a success message)
                    },
               (error) => {
                     console.error('Error creating order:', error);
                      // Handle error response (e.g., display an error message)
                    }
                     );



      }

}