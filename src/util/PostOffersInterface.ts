export interface PostOffersInterface<T> {
    readonly offers : any []
    readonly posts  :any []
    totalCount : number
    paginatedResult: T[] | []
  }