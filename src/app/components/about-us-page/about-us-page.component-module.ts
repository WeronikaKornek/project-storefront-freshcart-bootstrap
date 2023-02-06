import { NgModule } from '@angular/core';
import { AboutUsPageComponent } from './about-us-page.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AboutUsPageComponent],
  providers: [],
  exports: [AboutUsPageComponent]
})
export class AboutUsPageComponentModule {
}
