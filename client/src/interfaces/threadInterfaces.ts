export interface GetThreadResponse {
  thread: Thread;
}

export interface Thread {
  sub_cat_id: number;
  author_id: number;
  title: string;
  time_created: number;
  content: string;
  author_name: string;
  is_admin: boolean;
  posts: Post[];
}

export interface Post {
  id: number;
  content: string;
  time_created: number;
  author_name: string;
  is_admin: boolean;
}
