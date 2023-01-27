import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CategoriesServiceModule} from "./services/categories.service-module";
import {StoreServiceModule} from "./services/store.service-module";
import {ProductServiceModule} from "./services/product.service-module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule,
    CommonModule,
    RouterModule,
    CategoriesServiceModule,
    StoreServiceModule,
    ProductServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
