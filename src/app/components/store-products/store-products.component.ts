import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, debounceTime, Observable, startWith, switchMap} from 'rxjs';
import {StoreModel} from '../../models/store.model';
import {ProductsModel} from '../../models/products.model';
import {StoreService} from '../../services/store.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-store-products',
  styleUrls: ['./store-products.component.scss'],
  templateUrl: './store-products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreProductsComponent {
  readonly stores$: Observable<StoreModel> = this._activatedRoute.params.pipe(
    switchMap(data => this._storeService.getOneStoreById(data['storeId'])));
  readonly search: FormControl = new FormControl('');

  readonly products$: Observable<ProductsModel[]> = combineLatest([
    this._productService.getAll(),
    this._activatedRoute.params,
    this.search.valueChanges.pipe(
      debounceTime(1000), startWith(""))
  ]).pipe(
    map(([products, data, search]) => search !== "" ? products
      .filter(product => product.storeIds
        .includes(data['storeId'])).filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort(product => product.featureValue)
      .slice(0, 6) : products.filter(product => product.storeIds.includes(data['storeId'])).sort(product => product.featureValue).slice(0, 6)));

  constructor(private _storeService: StoreService, private _productService: ProductService, private _activatedRoute: ActivatedRoute) {
  }
}
