export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}
export interface ILpRequest {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published?: true;
}
export type Tdata = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorid: number;
  createdAt: string;
  updatedAt: string;
};
export interface ILpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Tdata | null;
}

export interface ICreateCommentRequest {
  lpId: number;
  content: string;
}
export interface IUserMe {
  id: number;
  name: string;
  email?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}
export interface IComment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
}
