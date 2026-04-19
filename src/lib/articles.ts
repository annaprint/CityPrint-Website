import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Article, ArticleFrontmatter } from "./types";
import { SECTIONS } from "./sections";

const contentDir = path.join(process.cwd(), "content", "baza-znaniy");

export function getAllArticles(): ArticleFrontmatter[] {
  const articles: ArticleFrontmatter[] = [];

  for (const section of SECTIONS) {
    const sectionDir = path.join(contentDir, section.folder);
    if (!fs.existsSync(sectionDir)) continue;

    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(sectionDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      articles.push(data as ArticleFrontmatter);
    }
  }

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  for (const section of SECTIONS) {
    const sectionDir = path.join(contentDir, section.folder);
    if (!fs.existsSync(sectionDir)) continue;

    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const filePath = path.join(sectionDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      if (data.slug === slug) {
        return { ...(data as ArticleFrontmatter), content };
      }
    }
  }

  return null;
}

export function getArticlesBySection(sectionName: string): ArticleFrontmatter[] {
  return getAllArticles().filter((a) => a.section === sectionName);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
