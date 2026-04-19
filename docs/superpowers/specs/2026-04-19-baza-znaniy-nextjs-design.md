# База знаний: техническая реализация на Next.js

## Цель

Реализовать раздел «База знаний» как статический Next.js сайт: главная страница раздела + 26 страниц статей. Минимальный layout (шапка, футер), деплой на Vercel.

## Архитектура

Next.js 14 App Router с SSG. Все страницы генерируются при сборке. Markdown-статьи из `content/baza-znaniy/` читаются через `fs`, парсятся `gray-matter`, рендерятся `next-mdx-remote`. Tailwind CSS для стилей.

## Tech Stack

- Next.js 14 (App Router, SSG)
- TypeScript
- Tailwind CSS 3
- gray-matter (парсинг frontmatter)
- next-mdx-remote (рендеринг markdown)
- Inter + Fraunces (Google Fonts)
- Vercel (деплой)

## Стиль

Направление atelier (из Claude Design handoff):
- Фон: теплый белый `#fafaf8`
- Текст: `#1a1a1a`, вторичный `#888888`
- Акцент: фирменный красный `#c41e2a` -- точечно (CTA, ссылки)
- Типографика: Inter (body), Fraunces (заголовки статей, опционально)
- Много воздуха, чистые линии, без декоративных эффектов

## Структура файлов

```
src/
  app/
    layout.tsx              -- корневой layout: шрифты, метаданные, Header + Footer
    page.tsx                -- заглушка главной: редирект или ссылка на /baza-znaniy
    baza-znaniy/
      page.tsx              -- главная базы знаний: 5 разделов с карточками статей
      [slug]/
        page.tsx            -- шаблон статьи: generateStaticParams для 26 страниц
  components/
    Header.tsx              -- шапка: логотип, навигация (Продукция, Портфолио, О нас, База знаний, Контакты), кнопка «Заказать»
    Footer.tsx              -- футер: контакты, навигация, мессенджеры, атрибуция «технологи Сити Принт»
    ArticleLayout.tsx       -- layout статьи: sidebar (desktop) + основной контент + CTA
    ArticleCard.tsx         -- карточка статьи: заголовок, описание, «Читать ->», опциональное фото
    SectionBlock.tsx        -- блок раздела на главной: иконка, название, описание, сетка ArticleCard
    TableOfContents.tsx     -- оглавление статьи из H2: якорные ссылки, sticky на desktop
    CTABlock.tsx            -- красный блок: заголовок, текст, кнопки Telegram/WhatsApp/телефон
    Breadcrumbs.tsx         -- хлебные крошки: Главная > База знаний > Название статьи
    RelatedArticles.tsx     -- блок «Читайте также»: 2-3 карточки связанных статей
    AuthorBlock.tsx         -- блок автора: «Типография Сити Принт, Екатеринбург, 20 лет»
  lib/
    articles.ts             -- getArticleBySlug(), getAllArticles(), getArticlesBySection()
    types.ts                -- Article interface (title, description, slug, section, keywords, related, readingTime, content)
    sections.ts             -- SECTIONS constant: name, slug, icon, description для 5 разделов
  styles/
    globals.css             -- @tailwind directives + prose стили для статей + atelier кастомизация
content/
  baza-znaniy/              -- 26 markdown-статей (уже написаны)
tailwind.config.ts          -- цвета brand/bg/dark/muted, шрифты Inter
next.config.mjs             -- output: 'export' для SSG
```

## Компоненты: что делает каждый

### Header.tsx
- Фиксированная шапка `fixed top-0`, полупрозрачный фон с blur
- Логотип слева (img/logo.jpg)
- Навигация по центру: Продукция, Портфолио, О нас, База знаний (активный), Контакты
- Кнопка «Заказать» справа (красная, rounded-full)
- Мобильное: бургер-меню
- Ссылки на несуществующие страницы ведут на `#` (заглушки)

### Footer.tsx
- Тёмный фон (#1a1a1a)
- 4 колонки: О компании, Продукция, Информация, Контакты
- Внизу: «Материалы подготовлены технологами типографии Сити Принт. 20 лет опыта в полиграфии.»

### ArticleLayout.tsx
- Desktop: sidebar слева (250px) + контент справа (max-w-3xl)
- Sidebar: TableOfContents + навигация по разделу (список статей текущего раздела)
- Mobile: sidebar скрыт, только контент
- После контента: AuthorBlock + RelatedArticles

### lib/articles.ts
- `getAllArticles()` -- читает все .md файлы из content/baza-znaniy/*/*.md, парсит frontmatter
- `getArticleBySlug(slug)` -- находит статью по slug, возвращает frontmatter + content
- `getArticlesBySection(section)` -- фильтрует по полю section из frontmatter
- Кеширование через Next.js build-time execution

## Роутинг

| URL | Компонент | Данные |
|-----|-----------|--------|
| `/` | page.tsx | Заглушка с ссылкой на /baza-znaniy |
| `/baza-znaniy` | baza-znaniy/page.tsx | getAllArticles() сгруппированные по section |
| `/baza-znaniy/[slug]` | baza-znaniy/[slug]/page.tsx | getArticleBySlug(slug), generateStaticParams |

## SEO

- `generateMetadata()` в каждом роуте -- title и description из frontmatter
- Schema.org `Article` разметка через `<script type="application/ld+json">` в каждой статье
- Open Graph теги: og:title, og:description, og:type=article
- Канонические URL
- sitemap.xml через next-sitemap (или вручную)

## Деплой

- Vercel: подключить GitHub-репозиторий annaprint/CityPrint-Website
- SSG output: `next.config.mjs` с `output: 'export'` (опционально, Vercel работает и без)
- Домен: настроить позже (citi-print.ru или поддомен)

## Что НЕ входит в этот этап

- Остальные 14 страниц сайта (главная, продуктовые, портфолио и т.д.)
- Калькулятор в hero
- Форма заявки с отправкой в Битрикс24
- Личный кабинет
- Фотографии (заглушки, как в прототипе)

## Зависимости от прототипов

- HTML-прототип главной базы знаний: `prototype/baza-znaniy.html` -- эталон для вёрстки
- HTML-прототип статьи: `prototype/article-bumaga.html` -- эталон для layout статьи
- Claude Design handoff: `handoff/` -- стиль atelier для шапки и футера
