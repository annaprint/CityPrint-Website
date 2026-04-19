import Link from "next/link";
import { ArticleFrontmatter } from "@/lib/types";

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  return (
    <Link
      href={`/baza-znaniy/${article.slug}`}
      className="block bg-white rounded-2xl p-6 border border-[var(--color-light-gray)]/80 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <h3 className="font-medium text-[var(--color-dark)] leading-snug">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
        {article.description}
      </p>
      <div className="mt-4 text-sm text-[var(--color-brand)] font-medium">
        Читать &rarr;
      </div>
    </Link>
  );
}
