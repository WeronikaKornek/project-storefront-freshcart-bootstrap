import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CategoryComponent} from './components/category/category.component';
import {StoreProductsComponent} from './components/store-products/store-products.component';
import {HomeComponentModule} from './components/home/home.component-module';
import {CategoryComponentModule} from './components/category/category.component-module';
import {StoreProductsComponentModule} from './components/store-products/store-products.component-module';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categories/:categoryId', component: CategoryComponent},
  {path: 'stores/:storeId', component: StoreProductsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeComponentModule, CategoryComponentModule, StoreProductsComponentModule],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
