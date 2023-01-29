import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {combineLatest, debounceTime, Observable, startWith, switchMap} from 'rxjs';
import { CategoriesModel } from '../../models/categories.model';
import { CategoriesService } from '../../services/categories.service';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductsModel} from "../../models/products.model";
import {map} from "rxjs/operators";
import {StoreModel} from "../../models/store.model";
import {StoreTagsModel} from "../../models/store-tags.model";
import {StoresWithTagsQueryModel} from "../../query-models/stores-with-tags.query-model";
import {ProductsWithRatingOptionsQueryModel} from "../../query-models/products-with-rating-options.query-model";


@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  readonly category$: Observable<CategoriesModel> = this._activatedRoute.params.pipe(
    switchMap(data => this._categoriesService.getOneCategoryById(data['categoryId'])));

  readonly products$: Observable<ProductsWithRatingOptionsQueryModel[]> = this._productService.getAll().pipe(
    map((products) => {
      return products.map((product) => this._mapToProductsWithRatingOptionsQuery(product));
    })
  );

  readonly productsWithQueryModel$: Observable<ProductsWithRatingOptionsQueryModel[]> = combineLatest([
    this.products$,
    this._activatedRoute.params
  ]).pipe(
    map(([products, data]) => products.filter(product => product.categoryId === data['categoryId'])));

  constructor(private _categoriesService: CategoriesService,private _activatedRoute: ActivatedRoute,private _productService: ProductService) {
  }

  private _mapToProductsWithRatingOptionsQuery(product: ProductsModel): ProductsWithRatingOptionsQueryModel {
    let ratingOptions: number[] = [];
    let rating = Number(product.ratingValue)
    for (let i = 5; i > 0; i--){
      if (rating >= 1){
        ratingOptions.push(1)
      }
      if (rating < 1 && rating >= 0.5){
        ratingOptions.push(0.5)
      }
      if (rating <0.5) {
        ratingOptions.push(0)
      }
      rating = rating - 1;
    }
    return {
      ...product,
      ratingOptions: ratingOptions,
    };
  }
}
