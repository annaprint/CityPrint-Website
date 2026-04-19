# База знаний Next.js: план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Реализовать раздел «База знаний» сайта типографии Сити Принт как статический Next.js сайт с 26 страницами статей из markdown.

**Architecture:** Next.js 14 App Router + SSG. Markdown-статьи читаются из `content/baza-znaniy/` при сборке через gray-matter + next-mdx-remote. Tailwind CSS для стилей в направлении atelier. Деплой на Vercel.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, gray-matter, next-mdx-remote, Inter (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-04-19-baza-znaniy-nextjs-design.md`

**Прототипы-эталоны:**
- `prototype/baza-znaniy.html` -- главная базы знаний
- `prototype/article-bumaga.html` -- шаблон статьи

---

### Task 1: Инициализация Next.js проекта

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/styles/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Создать Next.js проект**

```bash
cd "/Users/annakorotkih/Documents/citi-print/Сайт. "
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Флаг `--no-git` важен -- git уже инициализирован.

- [ ] **Step 2: Настроить tailwind.config.ts**

Заменить содержимое `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#c41e2a",
        "brand-dark": "#a01822",
        bg: "#fafaf8",
        dark: "#1a1a1a",
        muted: "#888888",
        "light-gray": "#f0efed",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Настроить globals.css**

Заменить `src/styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  color: #1a1a1a;
  background: #fafaf8;
}

.prose h2 {
  scroll-margin-top: 5rem;
}

.prose table {
  @apply w-full text-sm;
}

.prose thead tr {
  @apply border-b border-light-gray;
}

.prose thead th {
  @apply text-left py-3 pr-4 font-medium text-dark;
}

.prose tbody td {
  @apply py-3 pr-4 text-dark/70;
}

.prose tbody tr {
  @apply border-b border-light-gray/50;
}

.prose blockquote {
  @apply p-5 bg-white rounded-xl border border-light-gray/80 not-italic;
}

.prose blockquote p {
  @apply text-sm text-dark/70 leading-relaxed m-0;
}
```

- [ ] **Step 4: Настроить корневой layout.tsx**

Заменить `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: {
    default: "База знаний -- Типография Сити Принт",
    template: "%s -- Сити Принт",
  },
  description: "Всё о полиграфии: от выбора бумаги до получения тиража. Статьи технологов типографии с 20-летним опытом.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Создать заглушку главной страницы**

Заменить `src/app/page.tsx`:

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-light text-dark">Сити Принт</h1>
        <p className="mt-4 text-muted">Сайт в разработке</p>
        <Link
          href="/baza-znaniy"
          className="mt-6 inline-block bg-brand text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-brand-dark transition-colors"
        >
          База знаний
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Проверить, что dev server запускается**

```bash
npm run dev
```

Открыть http://localhost:3000 -- должна быть заглушка с кнопкой «База знаний».

- [ ] **Step 7: Обновить .gitignore и commit**

Добавить в `.gitignore`:

```
node_modules/
.next/
out/
```

```bash
git add -A
git commit -m "Init Next.js project with Tailwind and atelier colors"
git push
```

---

### Task 2: Библиотека статей (lib/articles.ts)

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/sections.ts`
- Create: `src/lib/articles.ts`

- [ ] **Step 1: Установить зависимости**

```bash
npm install gray-matter next-mdx-remote
```

- [ ] **Step 2: Создать types.ts**

```typescript
// src/lib/types.ts

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
```

- [ ] **Step 3: Создать sections.ts**

```typescript
// src/lib/sections.ts

import { Section } from "./types";

export const SECTIONS: Section[] = [
  {
    id: "bumaga",
    name: "Бумага и материалы",
    description: "Что из чего делают и как выбрать",
    folder: "01-bumaga-i-materialy",
  },
  {
    id: "maket",
    name: "Подготовка макета",
    description: "Как подготовить файл, чтобы всё напечаталось правильно",
    folder: "02-podgotovka-maketa",
  },
  {
    id: "tsvet",
    name: "Цвет в печати",
    description: "Почему цвет на экране и на бумаге -- не одно и то же",
    folder: "03-tsvet-v-pechati",
  },
  {
    id: "tekhnologii",
    name: "Технологии печати и отделка",
    description: "Какой способ печати выбрать и чем украсить",
    folder: "04-tekhnologii-i-otdelka",
  },
  {
    id: "zakaz",
    name: "Заказ и экономика",
    description: "Стоимость, сроки и как не переплатить",
    folder: "05-zakaz-i-ekonomika",
  },
];
```

- [ ] **Step 4: Создать articles.ts**

```typescript
// src/lib/articles.ts

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
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/ package.json package-lock.json
git commit -m "Add article library: types, sections, markdown reader"
git push
```

---

### Task 3: Общие компоненты (Header, Footer, Breadcrumbs, CTA)

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Create: `src/components/Breadcrumbs.tsx`
- Create: `src/components/CTABlock.tsx`
- Create: `src/components/AuthorBlock.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Создать Header.tsx**

Взять за основу шапку из `prototype/baza-znaniy.html`. Конвертировать HTML в JSX:
- Фиксированная шапка с blur-фоном
- Логотип (пока текст «СИТИ ПРИНТ», позже заменим на img)
- Навигация: 5 пунктов, «База знаний» выделен
- Кнопка «Заказать» -- красная, rounded-full
- Мобильное: пока скрыть навигацию на sm (бургер добавим позже)

- [ ] **Step 2: Создать Footer.tsx**

Из `prototype/baza-znaniy.html`: тёмный футер, 4 колонки, атрибуция внизу.

- [ ] **Step 3: Создать Breadcrumbs.tsx**

```tsx
// src/components/Breadcrumbs.tsx

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-muted mb-8">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-dark transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-dark">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Создать CTABlock.tsx**

Красный блок с заголовком, текстом и кнопками Telegram/WhatsApp/Телефон. Из прототипа `article-bumaga.html`.

- [ ] **Step 5: Создать AuthorBlock.tsx**

Блок автора: аватар-заглушка «СП», название типографии, описание.

- [ ] **Step 6: Подключить Header и Footer в layout.tsx**

```tsx
// src/app/layout.tsx -- обновить
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// В body:
<Header />
<main className="pt-16">{children}</main>
<Footer />
```

- [ ] **Step 7: Проверить в браузере и commit**

```bash
npm run dev
# Проверить: шапка фиксирована, футер отображается, кнопка «Заказать» красная
git add src/components/ src/app/layout.tsx
git commit -m "Add Header, Footer, Breadcrumbs, CTA, Author components"
git push
```

---

### Task 4: Главная страница базы знаний

**Files:**
- Create: `src/components/ArticleCard.tsx`
- Create: `src/components/SectionBlock.tsx`
- Create: `src/app/baza-znaniy/page.tsx`

- [ ] **Step 1: Создать ArticleCard.tsx**

Карточка статьи: заголовок, описание, «Читать ->». Из `prototype/baza-znaniy.html` -- класс `article-card`. Hover: translateY(-2px) + shadow.

```tsx
// src/components/ArticleCard.tsx

import Link from "next/link";
import { ArticleFrontmatter } from "@/lib/types";

export function ArticleCard({ article }: { article: ArticleFrontmatter }) {
  return (
    <Link
      href={`/baza-znaniy/${article.slug}`}
      className="block bg-white rounded-2xl p-6 border border-light-gray/80 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      <h3 className="font-medium text-dark leading-snug">
        {article.title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        {article.description}
      </p>
      <div className="mt-4 text-sm text-brand font-medium">
        Читать &rarr;
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Создать SectionBlock.tsx**

Блок раздела: заголовок, описание, сетка ArticleCard. Из прототипа -- структура с иконкой и описанием.

```tsx
// src/components/SectionBlock.tsx

import { ArticleFrontmatter, Section } from "@/lib/types";
import { ArticleCard } from "./ArticleCard";

interface SectionBlockProps {
  section: Section;
  articles: ArticleFrontmatter[];
  background?: "default" | "white";
}

export function SectionBlock({ section, articles, background = "default" }: SectionBlockProps) {
  const bgClass = background === "white" ? "bg-white" : "";

  return (
    <section className={`py-12 md:py-16 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-medium tracking-tight">
            {section.name}
          </h2>
          <p className="text-sm text-muted mt-1">{section.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Создать страницу /baza-znaniy**

```tsx
// src/app/baza-znaniy/page.tsx

import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { SECTIONS } from "@/lib/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionBlock } from "@/components/SectionBlock";
import { CTABlock } from "@/components/CTABlock";

export const metadata: Metadata = {
  title: "База знаний о полиграфии",
  description: "Всё, что нужно знать заказчику: от выбора бумаги до получения тиража. 26 статей от технологов типографии Сити Принт.",
};

export default function BazaZnaniyPage() {
  const allArticles = getAllArticles();

  return (
    <>
      <section className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "База знаний" },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight text-dark">
              База знаний<br />
              <span className="text-muted">о полиграфии</span>
            </h1>
            <p className="mt-5 text-lg text-muted font-light leading-relaxed max-w-xl">
              Всё, что нужно знать заказчику: от выбора бумаги до получения
              тиража. Без жаргона, с примерами и чек-листами.
            </p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section, i) => (
        <SectionBlock
          key={section.id}
          section={section}
          articles={allArticles.filter((a) => a.section === section.name)}
          background={i % 2 === 1 ? "white" : "default"}
        />
      ))}

      <CTABlock
        title="Не нашли ответ на свой вопрос?"
        text="Напишите нам -- технологи типографии Сити Принт помогут разобраться с любой задачей."
      />
    </>
  );
}
```

- [ ] **Step 4: Проверить в браузере и commit**

```bash
npm run dev
# Открыть http://localhost:3000/baza-znaniy
# Должно быть: 5 разделов, карточки статей, CTA внизу
git add src/components/ArticleCard.tsx src/components/SectionBlock.tsx src/app/baza-znaniy/
git commit -m "Add knowledge base main page with 5 sections"
git push
```

---

### Task 5: Страница статьи (/baza-znaniy/[slug])

**Files:**
- Create: `src/components/TableOfContents.tsx`
- Create: `src/components/RelatedArticles.tsx`
- Create: `src/app/baza-znaniy/[slug]/page.tsx`

- [ ] **Step 1: Создать TableOfContents.tsx**

Извлекает H2-заголовки из markdown-контента, рендерит как якорные ссылки. Sticky на desktop.

```tsx
// src/components/TableOfContents.tsx

interface TocItem {
  id: string;
  text: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="text-xs font-medium uppercase tracking-wider text-muted mb-3">
        Содержание
      </div>
      <div className="space-y-2 text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="block text-muted leading-snug hover:text-brand transition-colors"
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Создать RelatedArticles.tsx**

```tsx
// src/components/RelatedArticles.tsx

import Link from "next/link";
import { ArticleFrontmatter } from "@/lib/types";

export function RelatedArticles({ articles }: { articles: ArticleFrontmatter[] }) {
  if (articles.length === 0) return null;

  return (
    <div className="mt-12 pt-10 border-t border-light-gray">
      <h3 className="text-lg font-medium text-dark mb-6">Читайте также</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/baza-znaniy/${a.slug}`}
            className="block bg-white rounded-xl p-5 border border-light-gray/80 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
          >
            <h4 className="font-medium text-dark text-sm leading-snug">
              {a.title}
            </h4>
            <div className="mt-3 text-xs text-brand font-medium">
              Читать &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Создать страницу [slug]/page.tsx**

```tsx
// src/app/baza-znaniy/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticleBySlug, getAllSlugs, getAllArticles } from "@/lib/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { CTABlock } from "@/components/CTABlock";
import { AuthorBlock } from "@/components/AuthorBlock";
import { RelatedArticles } from "@/components/RelatedArticles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

function extractHeadings(content: string): { id: string; text: string }[] {
  const headingRegex = /^## (.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s-]/gi, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text });
  }

  return headings;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const headings = extractHeadings(article.content);
  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter((a) =>
    article.related?.includes(a.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Organization",
      name: "Типография Сити Принт",
      url: "https://citi-print.ru",
    },
    publisher: {
      "@type": "Organization",
      name: "Типография Сити Принт",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 pb-16 md:pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "База знаний", href: "/baza-znaniy" },
              { label: article.title },
            ]}
          />

          <div className="flex gap-12">
            {/* Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={headings} />
              </div>
            </aside>

            {/* Article */}
            <article className="flex-1 min-w-0 max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-light leading-[1.2] tracking-tight text-dark">
                {article.title}
              </h1>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                <span>Типография Сити Принт</span>
                <span className="w-1 h-1 rounded-full bg-muted/50" />
                <span>{article.readingTime} мин чтения</span>
              </div>

              <div className="mt-8 prose prose-neutral max-w-none">
                <MDXRemote source={article.content} />
              </div>

              <CTABlock
                title="Нужна помощь с полиграфией?"
                text="Технологи типографии Сити Принт в Екатеринбурге помогут с выбором материалов, подготовкой макета и расчётом стоимости. Бесплатно."
                compact
              />

              <AuthorBlock />

              <RelatedArticles articles={relatedArticles} />
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 4: Установить @tailwindcss/typography для prose-стилей**

```bash
npm install @tailwindcss/typography
```

Добавить в `tailwind.config.ts` в plugins:

```typescript
plugins: [require("@tailwindcss/typography")],
```

- [ ] **Step 5: Проверить в браузере и commit**

```bash
npm run dev
# Открыть http://localhost:3000/baza-znaniy/kakuyu-bumagu-vybrat-dlya-pechati
# Должно быть: шапка, хлебные крошки, sidebar с оглавлением, статья с таблицами, CTA, автор, связанные
git add -A
git commit -m "Add article page with MDX rendering, TOC, Schema.org"
git push
```

---

### Task 6: Финальная сборка и деплой

**Files:**
- Modify: `next.config.mjs`
- Create: `.vercelignore` (опционально)

- [ ] **Step 1: Проверить production build**

```bash
npm run build
```

Ожидание: все 26 статей + главная базы знаний генерируются как статические страницы. Не должно быть ошибок.

- [ ] **Step 2: Проверить production preview**

```bash
npm start
```

Открыть http://localhost:3000/baza-znaniy -- проверить, что всё работает как в dev.

- [ ] **Step 3: Commit финальной версии**

```bash
git add -A
git commit -m "Production build verified: 27 static pages"
git push
```

- [ ] **Step 4: Деплой на Vercel**

```bash
npx vercel --yes
```

Или подключить репозиторий через vercel.com:
1. Зайти на vercel.com
2. Import Git Repository -> annaprint/CityPrint-Website
3. Framework: Next.js (автоопределение)
4. Deploy

- [ ] **Step 5: Проверить деплой и записать URL**

Открыть URL от Vercel, проверить:
- Главная база знаний загружается
- Статья загружается
- Навигация работает
- Мобильная версия выглядит нормально

---

## Итого

| Task | Что делаем | Файлов |
|------|-----------|--------|
| 1 | Инициализация Next.js + Tailwind | 8 |
| 2 | Библиотека статей (lib/) | 3 |
| 3 | Общие компоненты | 6 |
| 4 | Главная базы знаний | 3 |
| 5 | Страница статьи | 3 |
| 6 | Сборка и деплой | 1-2 |

**6 задач, ~30 шагов. Результат: работающий сайт с 27 страницами на Vercel.**
