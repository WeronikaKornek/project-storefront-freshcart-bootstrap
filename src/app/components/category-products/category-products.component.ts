import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {combineLatest, debounceTime, Observable, of, startWith, switchMap} from 'rxjs';
import {CategoriesModel} from '../../models/categories.model';
import {CategoriesService} from '../../services/categories.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductsModel} from "../../models/products.model";
import {map} from "rxjs/operators";
import {ProductsWithRatingOptionsQueryModel} from "../../query-models/products-with-rating-options.query-model";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-category-products',
  styleUrls: ['./category-products.component.scss'],
  templateUrl: './category-products.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent {

  readonly sortingOption$: Observable<string[]> = of(['Featured', 'Price Low', 'Price High', 'Avg. Rating']);
  readonly filters: FormGroup = new FormGroup({sorting: new FormControl('Featured'), priceFrom: new FormControl(''), priceTo: new FormControl(''), rating: new FormControl('1')});
  readonly selectedFilters: Observable<any> = this.filters.valueChanges.pipe(startWith({sorting: 'Featured', priceFrom: null, priceTo: null, rating: '1'}), debounceTime(1000));
  readonly categories$: Observable<CategoriesModel[]> = this._categoriesService.getAll();
  readonly category$: Observable<CategoriesModel> = this._activatedRoute.params.pipe(
    switchMap(data => this._categoriesService.getOneCategoryById(data['categoryId'])));

  readonly products$: Observable<ProductsWithRatingOptionsQueryModel[]> = combineLatest([
    this._activatedRoute.params,
    this._productService.getAll(),
    this.selectedFilters,
  ]).pipe(
    map(([data,products,filters]) => {
      return this.applyFilters(products.filter(product => product.categoryId === data['categoryId']).map((product) => this._mapToProductsWithRatingOptionsQuery(product)), filters);
    })
  );
  readonly paginationData$: Observable<{ limit: number; page: number }> = this._activatedRoute.queryParams.pipe(map(
    (params) => ({
      page: params['page'] ? + params['page'] : 1,
      limit: params['limit'] ? + params['limit'] : 5,
    })
  ));
  readonly productsWithQueryModel$: Observable<ProductsWithRatingOptionsQueryModel[]> = combineLatest([
    this.products$,
    this.paginationData$
  ]).pipe(
    map(([products,paginationData]) => products.slice((paginationData.page-1)*paginationData.limit, paginationData.page* paginationData.limit)));

  readonly limitOption: Observable<number[]> = of([5,10,15]);
  readonly pageOption:Observable<number[]> = combineLatest([
    this.products$,
    this.paginationData$
  ]).pipe(map(([products,paginationData])=> {
    let pageArr: number[] = [];
    for (let i = 1; i <= Math.ceil(products.length/paginationData.limit); i++){
      pageArr.push(i)
    }
    return pageArr;
  }));



  constructor(private _categoriesService: CategoriesService, private _activatedRoute: ActivatedRoute, private _productService: ProductService, private _router: Router) {
  }

  private applyFilters(products: ProductsWithRatingOptionsQueryModel[], filters: any): ProductsWithRatingOptionsQueryModel[] {
    let filteredProducts = products
    filteredProducts = filteredProducts.filter(p => Number(p.ratingValue) >= Number(filters.rating))
    if (filters.priceFrom !== null && filters.priceFrom !== '') {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(filters.priceFrom))
    }
    if (filters.priceTo !== null && filters.priceTo !== ''){
      filteredProducts = filteredProducts.filter(p => p.price <= Number(filters.priceTo))
    }
    if (filters.sorting === 'Price Low') {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
    } else if (filters.sorting === 'Price High') {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
    } else if (filters.sorting === 'Avg. Rating') {
      filteredProducts = filteredProducts.sort((a, b) => parseFloat(b.ratingValue) - parseFloat(a.ratingValue))
    } else {
      filteredProducts = filteredProducts.sort((a, b) => b.featureValue - a.featureValue)
    }
    this.changedPage(1)
    return filteredProducts;
  }

  private _mapToProductsWithRatingOptionsQuery(product: ProductsModel): ProductsWithRatingOptionsQueryModel {
    let ratingOptions: number[] = [];
    let rating = Number(product.ratingValue)
    for (let i = 5; i > 0; i--) {
      if (rating >= 1) {
        ratingOptions.push(1)
      }
      if (rating < 1 && rating >= 0.5) {
        ratingOptions.push(0.5)
      }
      if (rating < 0.5) {
        ratingOptions.push(0)
      }
      rating = rating - 1;
    }
    return {
      ...product,
      ratingOptions: ratingOptions,
    };
  }

  changedLimit(item: number):void {
    combineLatest([
      this.paginationData$,
      this.pageOption
    ]).pipe(
      map(([paginationData,pageOption])=>
        this._router.navigate([],{
          queryParams:{
            page: paginationData.page > pageOption.length ? pageOption.length : paginationData.page,
            limit:item,
          },
        })
      )
    ).subscribe()
  }

  changedPage(item: number):void {
    this.paginationData$.pipe(
      map((paginationData)=>
        this._router.navigate([],{
          queryParams:{
            ...paginationData,
            page:item,
          },
        })
      )
    ).subscribe()

  }


}
