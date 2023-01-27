import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, combineLatest, take} from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesModel } from '../../models/categories.model';
import { StoresWithTagsQueryModel } from '../../query-models/stores-with-tags.query-model';
import { StoreModel } from '../../models/store.model';
import { StoreTagsModel } from '../../models/store-tags.model';
import { ProductsModel } from '../../models/products.model';
import { CategoriesService } from '../../services/categories.service';
import { StoreService } from '../../services/store.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  readonly storesWithTags$: Observable<StoresWithTagsQueryModel[]> = combineLatest([
    this._storeService.getAll(),
    this._storeService.getAllStoreTags()
  ]).pipe(
    map(([stores, storeTags]: [StoreModel[], StoreTagsModel[]]) => {
      return stores.map((store) => this._mapToJobWithTagsQuery(store, storeTags));
    })
  );

  readonly products$: Observable<ProductsModel[]> = this._productService.getAll();
  readonly fruitsVegetables$:  Observable<ProductsModel[]> = this.products$.pipe(
    map((products)=>products.filter(product=>product.categoryId==="5").sort(product => product.featureValue).slice(0,5)));
  readonly snackMunchies$:  Observable<ProductsModel[]> = this.products$.pipe(
    map((products)=>products.filter(product=>product.categoryId==="2").sort(product => product.featureValue).slice(0,5)));

  constructor(private _categoriesService: CategoriesService, private _storeService: StoreService, private _productService: ProductService) {
  }
  private _mapToJobWithTagsQuery(store: StoreModel, storeTags: StoreTagsModel[]): StoresWithTagsQueryModel {
    let storeTagsMap = storeTags.reduce((a, c) => {
      return { ...a, [c.id]: c };
    }, {}) as Record<string, StoreTagsModel>
    return {
      storeName: store.name,
      logoUrl: store.logoUrl,
      distanceInMeters: store.distanceInMeters,
      tags: store.tagIds.map((sId) => storeTagsMap[sId].name),
      id: store.id
    };
  }

}
