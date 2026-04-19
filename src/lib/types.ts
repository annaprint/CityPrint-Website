export interface ArticleFrontmatter {
  title: string;
  description: string;
  section: string;
  slug: string;
  keywords: string[];
  related: string[];
  readingTime: number;
}

export interface Article extends ArticleFrontmatter {
  content: string;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  folder: string;
}
