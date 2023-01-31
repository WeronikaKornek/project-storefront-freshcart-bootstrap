import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import { CategoriesModel } from '../../models/categories.model';
import { CategoriesService } from '../../services/categories.service';
import {ActivatedRoute} from "@angular/router";


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
  constructor(private _categoriesService: CategoriesService,private _activatedRoute: ActivatedRoute) {
  }
}
