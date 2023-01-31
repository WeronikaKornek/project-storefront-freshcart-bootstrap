export interface ProductsWithRatingOptionsQueryModel {
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
  readonly imageUrl: string;
  readonly featureValue: number;
  readonly storeIds:string[];
  readonly id: string;
  readonly ratingValue: string;
  readonly ratingCount: string;
  readonly ratingOptions: number[];
}
