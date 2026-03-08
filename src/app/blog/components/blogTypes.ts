export type ArticleType = 'IN-DEPTH' | 'Q&A' | 'SCIENCE' | 'GUIDE' | 'REAL STORY' | 'EXCLUSIVE';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  authorAvatar?: string;
  authorTitle?: string;
  readTime: string;
  image: string;
  isTrending: boolean;
  views: string;
  likes: number;
  comments: number;
  tags: string[];
  articleType?: ArticleType;
}

export interface Category {
  name: string;
  count: number;
  emoji?: string;
}
