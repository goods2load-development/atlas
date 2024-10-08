export interface Blog {
  authorId: string | null;
  authorName: string;
  blogTypeId: string;
  blogTypeName: string;
  content: string;
  createdAt: string;
  description: string;
  id: string;
  mainImageUrl: string | null;
  publishDate: string | null;
  published: boolean;
  readingTime: number;
  slug: string;
  title: string;
  updatedAt: string;
  weight: number;
}

export interface BlogComment {
  id: string;
  comment: string;
  likeCount: number;
  dislikeCount: number;
  date: Date;
  user: any;
  userId: string;
  blog: Blog;
  blogId: string;
  parentComment?: BlogComment | null;
  parentCommentId?: string | null;
  replies: BlogComment[];
  approved: boolean;
}
