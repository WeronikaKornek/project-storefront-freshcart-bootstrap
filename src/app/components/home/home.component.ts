import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {combineLatest, map, Observable} from "rxjs";
import {CategoriesModel} from "../../models/categories.model";
import {CategoriesService} from "../../services/categories.service";
import {StoreService} from "../../services/store.service";
import {StoreModel} from "../../models/store.model";
import {StoresWithTagsQueryModel} from "../../query-models/stores-with-tags.query-model";
import {StoreTagsModel} from "../../models/store-tags.model";


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


  constructor(private _categoriesService: CategoriesService, private _storeService: StoreService) {
  }
  private _mapToJobWithTagsQuery(store: StoreModel, storeTags: StoreTagsModel[]): StoresWithTagsQueryModel {
    let storeTagsMap = storeTags.reduce((a, c) => {
      return {...a, [c.id]: c};
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
