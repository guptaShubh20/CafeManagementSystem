import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ContactComponent } from './admin/contact/contact.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CartComponent } from './cart/cart.component';
import { HomoComponent } from './homo/homo.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ProductsComponent } from './admin/products/products.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    CategoriesComponent,
    OrdersComponent,
    CustomersComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavComponent,
    FeedbackComponent,
    CartComponent,
    HomoComponent,
    AboutComponent,
    PaymentComponent,
    FooterComponent,
    UserComponent,
    AdminnavComponent,
    PurchaseComponent,
    ProductsComponent,

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // Required animations module
    ToastrModule.forRoot( { timeOut: 5000,
      progressBar: true,      // Duration in milliseconds
      positionClass: 'toast-top-right', // Positioning
      preventDuplicates: true,           // Prevent duplicate toasts
      closeButton: true }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
