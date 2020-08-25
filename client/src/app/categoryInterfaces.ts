export interface GetCategoriesResponse{
  categories: Category[]
}

export interface Category{
  id: number,
  desc: string,
  name: string,
  subcategories: Subcategory[]
}

export interface Subcategory{
  id: number,
  desc: string,
  name: string
}