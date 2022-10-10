import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './navigation/navigation.module';
import {ProductListModule} from './products/product-list/product-list.module';
import {ProductDetailModule} from './products/product-detail/product-detail.module';
import {CommonModule} from '@angular/common';
import {ProductsModule} from './products/products.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    NavigationModule,
    ProductsModule,
    ProductListModule,
    ProductDetailModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
