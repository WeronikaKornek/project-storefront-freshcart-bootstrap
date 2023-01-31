import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [CategoryComponent],
  providers: [],
  exports: [CategoryComponent]
})
export class CategoryComponentModule {
}
