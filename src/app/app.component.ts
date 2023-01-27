import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {CategoriesModel} from "./models/categories.model";
import {StoreModel} from "./models/store.model";
import {CategoriesService} from "./services/categories.service";
import {StoreService} from "./services/store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-freshcard-bootstrap-theme';

  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();
  readonly FooterGetToKnowUs$: Observable<string[]> = of(['Company','About','Blog','Help Center','Our Value'])
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  constructor(private _categoriesService: CategoriesService, private _storeService: StoreService) {
  }
}
