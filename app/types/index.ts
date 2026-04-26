
export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  username: string;
  phone: string;
  website: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface NewPost {
  title: string;
  body: string;
}
