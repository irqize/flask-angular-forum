export interface GetSubcategoryRes {
  subcategory: Subcategory;
}

export interface Subcategory {
  name: string;
  desc: string;
  threads: Thread[];
}

export interface Thread {
  id: number;
  title: string;
  time_created: number;
  content: string;
  author_name: string;
  is_admin: boolean;
}
