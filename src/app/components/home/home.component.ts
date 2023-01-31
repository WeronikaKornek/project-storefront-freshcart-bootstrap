import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs";
import {CategoriesModel} from "../../models/categories.model";
import {CategoriesService} from "../../services/categories.service";
import {StoreService} from "../../services/store.service";


@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  constructor(private _categoriesService: CategoriesService, private _storeService: StoreService) {
  }

}
