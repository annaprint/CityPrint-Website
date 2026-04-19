import { Section, ArticleFrontmatter } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

interface SectionBlockProps {
  section: Section;
  articles: ArticleFrontmatter[];
  background?: "white" | "default";
}

export function SectionBlock({ section, articles, background = "default" }: SectionBlockProps) {
  const bg = background === "white" ? "bg-white" : "bg-[var(--color-bg)]";

  return (
    <section className={`py-16 md:py-20 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--color-dark)] tracking-tight">
            {section.name}
          </h2>
          <p className="mt-2 text-[var(--color-muted)] font-light">
            {section.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
