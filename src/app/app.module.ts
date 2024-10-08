import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment.development';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutPageComponent,
    MyOrdersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,CarouselModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ], providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
