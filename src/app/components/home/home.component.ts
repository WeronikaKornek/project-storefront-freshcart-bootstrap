import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, of} from 'rxjs';
import { CategoriesModel } from '../../models/categories.model';
import { StoreModel } from '../../models/store.model';
import { CategoriesService } from '../../services/categories.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  readonly stores$: Observable<StoreModel[]> = this._storeService.getAll();
  readonly FooterGetToKnowUs$: Observable<string[]> = of(['Company','About','Blog','Help Center','Our Value'])
  constructor(private _categoriesService: CategoriesService, private _storeService: StoreService) {
  }
}
