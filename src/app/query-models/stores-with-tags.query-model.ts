export interface StoresWithTagsQueryModel {
  readonly storeName: string;
  readonly logoUrl: string;
  readonly distanceInMeters:number;
  readonly id:string,
  readonly tags: string[]
}
