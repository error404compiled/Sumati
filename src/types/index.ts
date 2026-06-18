export interface Author {
  slug: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  socials: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  seoTitle?: string;
  seoDescription?: string;
  rating?: number;
  featured?: boolean;
  draft?: boolean;
}

export interface Post extends PostFrontmatter {
  contentHtml: string;
  readingTime: string;
  views: number;
}

export interface PostMeta extends PostFrontmatter {
  readingTime: string;
  views: number;
}
