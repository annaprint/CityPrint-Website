# Product Landings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Превратить простые карточки продуктов в полноценные продуктовые лендинги из 11 блоков, начиная с эталонного "Печать каталогов и журналов", затем тиражировать на остальные 8 продуктов.

**Architecture:** Новые файлы с компонентами блоков (`landing-blocks.jsx`) и контентными данными (`landing-data.jsx`) добавляются в существующий Babel standalone стек. Текущий `ProductPage` в `subpages.jsx` заменяется на `ProductLandingPage`, который собирается из переиспользуемых блоков + уникальные данные из `landing-data.jsx`. Все CSS добавляются в `<style>` блок главного HTML файла.

**Tech Stack:** React 18 (CDN), Babel standalone, JSX, CSS (в HTML), Google Fonts (Fraunces, Manrope, Space Grotesk, JetBrains Mono)

**Spec:** `docs/superpowers/specs/2026-04-25-product-landings-design.md`

**Прототип:** `handoff 3/project/` — текущая кодовая база

**Контекст для разработчика:**
- Проект — статический HTML с JSX, транспилируемым через Babel standalone
- Каждый `.jsx` файл — отдельный `<script type="text/babel">` в главном HTML
- Экспорт через `Object.assign(window, { ... })` в конце каждого файла
- CSS живёт в `<style>` внутри `Сити Принт.html`
- Стили переключаются через `document.body.dataset.style` (atelier/presse/riso)
- Фото через Unsplash CDN (stable URLs), одно реальное фото в `assets/`
- Тестов нет — проверка визуальная, через открытие HTML в браузере

---

## File Structure

### Новые файлы

- `src/landing-blocks.jsx` — 12 переиспользуемых компонентов блоков лендинга
- `src/landing-data.jsx` — контентные данные для всех 9 лендингов (сценарии, варианты, цитаты, FAQ, кейсы, факторы цены, требования к макету, перелинковка)

### Модифицируемые файлы

- `Сити Принт.html` — добавить `<script>` теги для новых файлов + CSS для блоков лендинга
- `src/subpages.jsx` — заменить `ProductPage` на `ProductLandingPage`
- `src/data.jsx` — расширить `PRODUCTS` массив (добавить поле `url` для ЧПУ)

---

## Task 1: Данные для лендинга каталогов

**Files:**
- Create: `src/landing-data.jsx`
- Modify: `src/data.jsx`

- [ ] **Step 1: Добавить поле `url` в PRODUCTS (data.jsx)**

В `src/data.jsx` добавить поле `url` к каждому элементу массива `PRODUCTS`:

```jsx
const PRODUCTS = [
  { id: 'books',       name: 'Печать книг',           note: 'от 5 экз.',    lead: 'Офсет и цифра',                  slug: 'books',       img: 'assets/efremov-books.jpg', url: '/pechat-knig/' },
  { id: 'catalogs',    name: 'Каталоги и журналы',    note: 'от 50 экз.',   lead: 'Многотиражка',                   slug: 'catalogs',    img: IMG.magazine, url: '/pechat-katalogov/' },
  { id: 'flyers',      name: 'Листовки и флаеры',     note: 'от 2 дней',    lead: 'Цифровая печать',                slug: 'flyers',      img: IMG.flyers, url: '/listovki/' },
  { id: 'cards',       name: 'Визитки',               note: 'от 300 экз.',  lead: 'С отделкой и без',               slug: 'cards',       img: IMG.businessCards, url: '/vizitki/' },
  { id: 'calendars',   name: 'Календари',             note: 'от 50 экз.',   lead: 'Квартальные, настенные, домики', slug: 'calendars',   img: IMG.calendar, url: '/kalendari/' },
  { id: 'packaging',   name: 'Упаковка',              note: 'от 5 дней',    lead: 'Картонная и премиум',            slug: 'packaging',   img: IMG.packagingBox, url: '/upakovka/' },
  { id: 'souvenirs',   name: 'Сувенирная продукция',  note: 'новое',        lead: 'Блокноты, ежедневники, мерч',    slug: 'souvenirs',   img: IMG.notebook, url: '/bloknoty/' },
  { id: 'restoration', name: 'Реставрация книг',      note: 'от 2 000 ₽',   lead: 'Ручной переплёт',                slug: 'restoration', img: IMG.restoration, url: '/restavracija/' },
];
```

- [ ] **Step 2: Создать landing-data.jsx с данными для каталогов**

Создать `src/landing-data.jsx`:

```jsx
const LANDING_DATA = {
  catalogs: {
    // Hero
    hero: {
      eyebrow: 'Каталоги и журналы',
      h1: 'Печать каталогов для бизнеса',
      subtitle: 'Напечатаем каталоги продукции, журналы и многостраничные издания. Проверим макет, подберём бумагу и доведём заказ до готового тиража.',
      markers: ['от 50 экз.', 'от 3 дней', 'CMYK + Pantone'],
      cta1: 'Рассчитать стоимость',
      cta2: 'Отправить макет',
    },

    // Scenarios (block 2)
    scenarios: [
      'Каталог продукции для отдела продаж',
      'Презентационный каталог к выставке',
      'Журнал для клиентов и партнёров',
      'Имиджевое издание компании',
      'Каталог с премиальной отделкой',
      'Первый каталог для малого бренда',
      'Каталог выставки для галереи',
      'Прайс-каталог',
    ],

    // Product variants (block 3)
    variants: {
      title: 'Что можно заказать',
      groups: [
        {
          items: [
            { label: 'СКОБА', name: 'Скрепление на скобу', desc: 'до 80 полос, A4/A5' },
            { label: 'КБС', name: 'Клеевое бесшвейное', desc: 'от 48 полос, мягкая обложка' },
            { label: 'ПРУЖИНА', name: 'На пружину', desc: 'перекидные, удобно для каталогов' },
          ],
        },
        {
          items: [
            { label: 'БУМАГА', name: null, desc: 'Мелованная, офсетная, дизайнерская' },
            { label: 'ОТДЕЛКА', name: null, desc: 'Ламинация, лак, тиснение, фольга' },
            { label: 'ФОРМАТ', name: null, desc: 'A4, A5, A3, нестандартный' },
          ],
        },
      ],
    },

    // Why it matters (block 4)
    quote: {
      text: 'Если каталог выглядит дёшево, страдает не типография — страдает бренд и человек, который отвечал за проект.',
      body: 'Каталог — это инструмент продаж. Партнёры, клиенты и сотрудники оценивают компанию по тому, что держат в руках. Правильная бумага, аккуратная печать и надёжное скрепление — это не детали, а основа доверия.',
    },

    // Cases (block 6)
    cases: [
      { tag: 'ПРОИЗВОДСТВО', title: 'Каталог оборудования, 64 полосы', params: '500 шт. / мелованная / КБС / 5 дней', img: IMG.magazine },
      { tag: 'ЗАСТРОЙЩИК', title: 'Презентационный каталог ЖК', params: '1000 шт. / дизайнерская / тиснение / 7 дней', img: IMG.magazines2 },
    ],

    // Price factors (block 8)
    priceFactors: [
      { name: 'Тираж', note: 'чем больше, тем дешевле за экземпляр' },
      { name: 'Количество полос', note: 'от 8 до 300+' },
      { name: 'Бумага', note: 'стандарт / эко / премиум' },
      { name: 'Отделка', note: 'ламинация, лак, фольга' },
      { name: 'Срочность', note: 'экспресс +30%' },
    ],

    // Tech requirements (block 9)
    techReqs: [
      { value: 'PDF', label: 'Формат файла' },
      { value: 'CMYK', label: 'Цветовая модель' },
      { value: '3 мм', label: 'Вылеты' },
    ],

    // FAQ (block 10)
    faq: [
      { q: 'Какой минимальный тираж каталогов?', a: 'От 50 экземпляров для офсетной печати, от 1 экземпляра для цифровой. Оптимальный тираж по цене за экземпляр — от 300 штук.' },
      { q: 'Можно ли сделать каталог срочно?', a: 'Да. Минимальный срок — 3 рабочих дня для цифровой печати, 5 дней для офсета. Срочность увеличивает стоимость на 20-30%.' },
      { q: 'Какую бумагу выбрать для каталога?', a: 'Зависит от задачи. Мелованная — для ярких фото и насыщенных цветов. Офсетная — для текстовых изданий. Дизайнерская — для премиальных каталогов. Подскажем лучший вариант под ваш бюджет.' },
      { q: 'Поможете ли с макетом?', a: 'Мы проверяем каждый макет перед печатью: вылеты, цветовые профили, шрифты, разрешение. Если нужна доработка — подскажем, что исправить. Вёрстку с нуля не делаем, но можем порекомендовать дизайнера.' },
      { q: 'Можно ли сделать пробный экземпляр?', a: 'Да. Цифровая проба — от 1 экземпляра. Рекомендуем для тиражей от 500 шт. и для каталогов с критичной цветопередачей.' },
      { q: 'Какие виды скрепления доступны?', a: 'Скоба (до 80 полос), КБС — клеевое бесшвейное (от 48 полос), пружина, твёрдый переплёт. Подберём оптимальный вариант по бюджету и назначению.' },
      { q: 'Есть ли доставка?', a: 'Да. По Екатеринбургу — курьером, по России — транспортной компанией. Стоимость доставки рассчитываем отдельно.' },
      { q: 'Что делать, если я не знаю точные параметры?', a: 'Напишите или позвоните — менеджер поможет определить формат, бумагу и тираж исходя из вашей задачи и бюджета. Это бесплатно.' },
    ],

    // Cross-links (related products)
    crossLinks: ['books', 'packaging', 'souvenirs'],

    // CTA
    ctaTitle: 'Рассчитаем ваш каталог',
    ctaText: 'Отправьте макет или опишите задачу. Мы проверим параметры, предупредим о рисках и предложим оптимальный вариант.',
  },
};

Object.assign(window, { LANDING_DATA });
```

- [ ] **Step 3: Проверить, что файл подключается без ошибок**

Открыть `Сити Принт.html` в браузере, проверить консоль на отсутствие ошибок. Данные ещё не используются — просто убедиться, что `LANDING_DATA` доступен в `window`.

- [ ] **Step 4: Коммит**

```
feat: add landing data for catalogs

- landing-data.jsx with content for catalogs landing
- url field added to PRODUCTS array
```

---

## Task 2: Компоненты блоков лендинга (блоки 1-6)

**Files:**
- Create: `src/landing-blocks.jsx`

- [ ] **Step 1: Создать файл с компонентами Hero, Scenarios, Variants, WhyMatters, RiskRemoval, Cases**

Создать `src/landing-blocks.jsx`:

```jsx
// Landing page block components
// Uses shared components: Placeholder, useReveal, WordReveal from shared.jsx
// Uses data: LANDING_DATA from landing-data.jsx, PRODUCTS from data.jsx

const { useState: useStateL, useRef: useRefL } = React;

// Block 1: Hero
function LandingHero({ data, navigate }) {
  const product = PRODUCTS.find(p => p.slug === data.slug) || PRODUCTS[0];
  return (
    <section className="landing-hero">
      <div className="wrap">
        <div className="landing-hero-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="reg-mark">&#8853;</span> {data.hero.eyebrow}
            </div>
            <h1 className="landing-h1">{data.hero.h1}</h1>
            <p className="landing-subtitle">{data.hero.subtitle}</p>
            <div className="landing-markers">
              {data.hero.markers.map((m, i) => <span key={i}>{m}</span>)}
            </div>
            <div className="landing-cta-row">
              <a href="#landing-cta" className="btn primary" onClick={(e) => { e.preventDefault(); document.getElementById('landing-cta')?.scrollIntoView({behavior:'smooth'}); }}>{data.hero.cta1}</a>
              <a href="#landing-cta" className="btn ghost" onClick={(e) => { e.preventDefault(); document.getElementById('landing-cta')?.scrollIntoView({behavior:'smooth'}); }}>{data.hero.cta2}</a>
            </div>
          </div>
          <div>
            <Placeholder src={product.img} label={product.name} style={{ aspectRatio: '4/5', borderRadius: 18 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Block 2: Scenarios
function LandingScenarios({ scenarios }) {
  const ref = useReveal();
  return (
    <section className="landing-scenarios reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 01 — ЗАДАЧИ
        </div>
        <h2 className="landing-h2">С какими задачами приходят</h2>
        <div className="scenario-pills">
          {scenarios.map((s, i) => <span key={i} className="pill">{s}</span>)}
        </div>
      </div>
    </section>
  );
}

// Block 3: Product Variants
function LandingVariants({ variants }) {
  const ref = useReveal();
  return (
    <section className="landing-variants reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 02 — ВАРИАНТЫ
        </div>
        <h2 className="landing-h2">{variants.title}</h2>
        {variants.groups.map((group, gi) => (
          <div key={gi} className="variant-grid">
            {group.items.map((item, ii) => (
              <div key={ii} className="variant-card">
                <div className="variant-label">{item.label}</div>
                {item.name && <div className="variant-name">{item.name}</div>}
                <div className="variant-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// Block 4: Why It Matters
function LandingWhyMatters({ quote }) {
  const ref = useReveal();
  return (
    <section className="landing-why-matters reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 03 — ВАЖНО
        </div>
        <div className="why-matters-content">
          <blockquote className="why-matters-quote">{quote.text}</blockquote>
          <p className="why-matters-body">{quote.body}</p>
        </div>
      </div>
    </section>
  );
}

// Block 5: Risk Removal (shared across all landings)
function LandingRiskRemoval() {
  const ref = useReveal();
  const items = [
    { title: 'Проверка макета', desc: 'Найдём ошибки до печати, предупредим о рисках' },
    { title: 'Фиксированный срок', desc: 'Называем дату — держим. Если наш косяк — переделка за наш счёт' },
    { title: 'Подбор материалов', desc: 'Подскажем бумагу и отделку под задачу и бюджет' },
    { title: 'Контроль цвета', desc: 'Цветопроба, денситометрия, приладка на каждом тираже' },
    { title: 'Упаковка и доставка', desc: 'Упакуем аккуратно, доставим по городу или отправим по России' },
    { title: 'Один менеджер', desc: 'Ведёт заказ от заявки до выдачи. Не нужно объяснять задачу заново' },
  ];
  return (
    <section className="landing-risk-removal reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8, color: 'rgba(255,255,255,0.4)' }}>
          <span className="reg-mark">&#8853;</span> 04 — ГАРАНТИИ
        </div>
        <h2 className="landing-h2" style={{ color: '#fff' }}>Что мы берём на себя</h2>
        <div className="risk-grid">
          {items.map((item, i) => (
            <div key={i} className="risk-item">
              <div className="risk-title">{item.title}</div>
              <div className="risk-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Block 6: Cases
function LandingCases({ cases, title, openLightbox }) {
  const ref = useReveal();
  return (
    <section className="landing-cases reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 05 — КЕЙСЫ
        </div>
        <h2 className="landing-h2">{title || 'Примеры работ'}</h2>
        <div className="cases-grid">
          {cases.map((c, i) => (
            <div key={i} className="case-card" onClick={() => openLightbox && openLightbox(i, cases.map((cc, ii) => ({ id: ii, title: cc.title, tag: cc.tag, year: '2025', client: cc.tag, img: cc.img })))}>
              <Placeholder src={c.img} label={c.tag} style={{ aspectRatio: '16/10' }} />
              <div className="case-body">
                <div className="case-tag">{c.tag}</div>
                <div className="case-title">{c.title}</div>
                <div className="case-params">{c.params}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LandingHero, LandingScenarios, LandingVariants, LandingWhyMatters, LandingRiskRemoval, LandingCases });
```

- [ ] **Step 2: Проверить в браузере, что файл загружается без ошибок**

- [ ] **Step 3: Коммит**

```
feat: add landing block components (1-6)

- LandingHero, LandingScenarios, LandingVariants
- LandingWhyMatters, LandingRiskRemoval, LandingCases
- Reuse shared components (Placeholder, useReveal)
```

---

## Task 3: Компоненты блоков лендинга (блоки 7-11 + перелинковка)

**Files:**
- Modify: `src/landing-blocks.jsx`

- [ ] **Step 1: Добавить компоненты Process, PriceFactors, TechRequirements, FAQ, CTA, CrossLinks**

Дописать в конец `src/landing-blocks.jsx` (перед `Object.assign`):

```jsx
// Block 7: Process (shared)
function LandingProcess() {
  const ref = useReveal();
  const steps = [
    { num: '1', title: 'Заявка', desc: 'Описываете задачу или присылаете макет' },
    { num: '2', title: 'Проверка', desc: 'Менеджер проверяет файл и уточняет параметры' },
    { num: '3', title: 'Расчёт', desc: 'Предлагаем 2-3 варианта по бюджету' },
    { num: '4', title: 'Печать', desc: 'Производство с контролем цвета и качества' },
    { num: '5', title: 'Доставка', desc: 'Упаковка и отправка по городу или России' },
  ];
  return (
    <section className="landing-process reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 06 — ПРОЦЕСС
        </div>
        <h2 className="landing-h2">Как проходит заказ</h2>
        <div className="process-steps">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="process-connector" />}
              <div className="process-step">
                <div className="process-num">{s.num}</div>
                <div className="process-title">{s.title}</div>
                <div className="process-desc">{s.desc}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// Block 8: Price Factors + mini calculator
function LandingPriceFactors({ factors, productId }) {
  const ref = useReveal();
  const [qty, setQty] = useStateL(500);
  const base = PRICE_BASE[productId] || { base: 100, per: 50 };
  const total = Math.round(base.base + base.per * qty);
  const fmt = (n) => n.toLocaleString('ru-RU');

  return (
    <section className="landing-price reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 07 — СТОИМОСТЬ
        </div>
        <h2 className="landing-h2">Что влияет на цену</h2>
        <div className="price-grid">
          <div className="price-factors">
            {factors.map((f, i) => (
              <div key={i} className="price-factor-row">
                <span className="price-factor-name">{f.name}</span>
                <span className="price-factor-note">{f.note}</span>
              </div>
            ))}
          </div>
          <div className="price-calc">
            <div className="price-calc-label">БЫСТРЫЙ РАСЧЁТ</div>
            <div className="price-calc-title">Оценка стоимости</div>
            <div className="price-calc-field">
              <label>Тираж</label>
              <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
            </div>
            <div className="price-calc-result">
              <div className="price-calc-amount">от {fmt(total)} &#8381;</div>
              <div className="price-calc-note">Точная цена — после проверки макета</div>
            </div>
            <a href="#landing-cta" className="btn primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={(e) => { e.preventDefault(); document.getElementById('landing-cta')?.scrollIntoView({behavior:'smooth'}); }}>Получить точный расчёт</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Block 9: Tech Requirements
function LandingTechReqs({ reqs }) {
  const ref = useReveal();
  return (
    <section className="landing-tech reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 08 — МАКЕТ
        </div>
        <h2 className="landing-h2">Требования к макету</h2>
        <div className="tech-cards">
          {reqs.map((r, i) => (
            <div key={i} className="tech-card">
              <div className="tech-value">{r.value}</div>
              <div className="tech-label">{r.label}</div>
            </div>
          ))}
        </div>
        <div className="tech-hint">
          <strong>Не знаете требований?</strong> Пришлите макет как есть — мы проверим и подскажем, что нужно поправить. Бесплатно.
        </div>
      </div>
    </section>
  );
}

// Block 10: FAQ
function LandingFAQ({ items }) {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useStateL(null);
  return (
    <section className="landing-faq reveal" ref={ref}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          <span className="reg-mark">&#8853;</span> 09 — ВОПРОСЫ
        </div>
        <h2 className="landing-h2">Частые вопросы</h2>
        <div className="faq-list">
          {items.map((item, i) => (
            <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <div className="faq-question">
                <span>{item.q}</span>
                <span className="faq-toggle">{openIdx === i ? '−' : '+'}</span>
              </div>
              {openIdx === i && <div className="faq-answer">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Cross-links
function LandingCrossLinks({ productIds, navigate }) {
  const links = productIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  if (!links.length) return null;
  const ref = useReveal();
  return (
    <section className="landing-crosslinks reveal" ref={ref}>
      <div className="wrap">
        <h3 className="landing-h3">Также может быть полезно</h3>
        <div className="crosslinks-grid">
          {links.map((p) => (
            <a key={p.id} href="#" className="crosslink-card" onClick={(e) => { e.preventDefault(); navigate('product', p.slug); }}>
              <Placeholder src={p.img} label={p.name} style={{ aspectRatio: '16/10' }} />
              <div className="crosslink-body">
                <div className="crosslink-name">{p.name}</div>
                <div className="crosslink-note">{p.note}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// Block 11: CTA
function LandingCTA({ title, text }) {
  const [form, setForm] = useStateL({ name: '', phone: '', task: '' });
  const [sent, setSent] = useStateL(false);
  const update = (k, v) => setForm({ ...form, [k]: v });

  if (sent) {
    return (
      <section className="landing-cta-section" id="landing-cta">
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto', padding: '80px 0' }}>
          <h2 className="landing-h2" style={{ color: '#fff' }}>Заявка отправлена</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 16 }}>Менеджер свяжется с вами в течение часа. Спасибо!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="landing-cta-section" id="landing-cta">
      <div className="wrap">
        <div className="landing-cta-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8, color: 'rgba(255,255,255,0.4)' }}>
              <span className="reg-mark">&#8853;</span> КОНТАКТЫ
            </div>
            <h2 className="landing-h2" style={{ color: '#fff' }}>{title}</h2>
            <p className="landing-cta-text">{text}</p>
            <div className="landing-cta-contacts">
              <div>Telegram / WhatsApp</div>
              <div><a href="tel:+73433101337" style={{ color: '#fff' }}>+7 (343) 310-13-37</a></div>
              <div><a href="mailto:sale@citi-print.ru" style={{ color: '#fff' }}>sale@citi-print.ru</a></div>
            </div>
          </div>
          <div className="landing-cta-form">
            <div className="landing-cta-form-title">Быстрая заявка</div>
            <div className="field"><input type="text" placeholder="Имя" value={form.name} onChange={(e) => update('name', e.target.value)} /></div>
            <div className="field"><input type="tel" placeholder="Телефон" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></div>
            <div className="field"><textarea placeholder="Что нужно напечатать" value={form.task} onChange={(e) => update('task', e.target.value)} /></div>
            <button className="btn primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { if (form.name && form.phone) setSent(true); }} disabled={!form.name || !form.phone}>Отправить заявку</button>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, lineHeight: 1.4 }}>Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Обновить Object.assign в конце файла**

```jsx
Object.assign(window, {
  LandingHero, LandingScenarios, LandingVariants, LandingWhyMatters,
  LandingRiskRemoval, LandingCases, LandingProcess, LandingPriceFactors,
  LandingTechReqs, LandingFAQ, LandingCrossLinks, LandingCTA,
});
```

- [ ] **Step 3: Коммит**

```
feat: add landing block components (7-11)

- LandingProcess, LandingPriceFactors, LandingTechReqs
- LandingFAQ (accordion), LandingCrossLinks, LandingCTA
- Mini calculator in price factors block
```

---

## Task 4: CSS для блоков лендинга

**Files:**
- Modify: `Сити Принт.html`

- [ ] **Step 1: Добавить CSS для всех landing-блоков**

В `<style>` блок `Сити Принт.html` добавить CSS. Стили должны корректно работать со всеми тремя арт-направлениями (atelier/presse/riso), но оптимизированы для atelier + presse графики.

Ключевые классы:

```css
/* Landing Hero */
.landing-hero { padding: 100px 0 60px; }
.landing-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
.landing-h1 { font-family: var(--font-display); font-size: clamp(32px, 5vw, 56px); font-weight: 300; line-height: 1.15; letter-spacing: -0.02em; }
.landing-subtitle { font-size: 16px; color: var(--muted); line-height: 1.7; margin-top: 16px; max-width: 480px; }
.landing-markers { display: flex; gap: 20px; font-family: var(--font-mono); font-size: 12px; color: var(--muted); margin-top: 20px; letter-spacing: 0.02em; }
.landing-cta-row { display: flex; gap: 12px; margin-top: 32px; flex-wrap: wrap; }
.reg-mark { opacity: 0.3; margin-right: 6px; }
.landing-h2 { font-family: var(--font-display); font-size: clamp(24px, 3.5vw, 40px); font-weight: 300; line-height: 1.2; letter-spacing: -0.01em; margin-top: 8px; }
.landing-h3 { font-family: var(--font-display); font-size: 20px; font-weight: 400; margin-bottom: 20px; }

/* Scenarios */
.landing-scenarios { padding: 60px 0; }
.scenario-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.pill { background: var(--bg); border: 1px solid var(--line); padding: 10px 18px; border-radius: 24px; font-size: 14px; cursor: default; transition: border-color 0.2s; }
.pill:hover { border-color: var(--accent); }

/* Variants */
.landing-variants { padding: 60px 0; }
.variant-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 20px; }
.variant-grid + .variant-grid { margin-top: 12px; }
.variant-card { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 20px; }
.variant-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 8px; }
.variant-name { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
.variant-desc { font-size: 13px; color: var(--muted); }

/* Why Matters */
.landing-why-matters { padding: 60px 0; }
.why-matters-content { max-width: 640px; }
.why-matters-quote { font-family: var(--font-display); font-size: clamp(20px, 3vw, 28px); font-weight: 300; font-style: italic; line-height: 1.4; color: var(--fg); margin: 24px 0; padding: 0; border: none; }
.why-matters-body { font-size: 15px; color: var(--muted); line-height: 1.7; }

/* Risk Removal */
.landing-risk-removal { padding: 80px 0; background: var(--fg); color: #fff; }
.risk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
.risk-item { border-left: 2px solid var(--accent); padding-left: 16px; }
.risk-title { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
.risk-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

/* Cases */
.landing-cases { padding: 60px 0; }
.cases-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 24px; }
.case-card { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; cursor: pointer; transition: box-shadow 0.2s; }
.case-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.case-body { padding: 16px 20px; }
.case-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 6px; }
.case-title { font-size: 15px; font-weight: 500; margin-bottom: 4px; }
.case-params { font-size: 13px; color: var(--muted); }

/* Process */
.landing-process { padding: 60px 0; }
.process-steps { display: flex; align-items: flex-start; gap: 0; margin-top: 32px; }
.process-step { flex: 1; text-align: center; }
.process-num { width: 40px; height: 40px; border-radius: 50%; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-family: var(--font-mono); font-size: 16px; }
.process-title { font-size: 14px; font-weight: 500; }
.process-desc { font-size: 12px; color: var(--muted); margin-top: 4px; max-width: 140px; margin-left: auto; margin-right: auto; }
.process-connector { width: 40px; border-top: 1px dashed var(--line); margin-top: 20px; flex-shrink: 0; }

/* Price Factors */
.landing-price { padding: 60px 0; }
.price-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 24px; }
.price-factor-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
.price-factor-name { color: var(--fg); }
.price-factor-note { color: var(--muted); font-size: 13px; }
.price-calc { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 24px; }
.price-calc-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 12px; }
.price-calc-title { font-size: 16px; font-weight: 500; margin-bottom: 16px; }
.price-calc-field { margin-bottom: 12px; }
.price-calc-field label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 4px; }
.price-calc-field input { width: 100%; padding: 8px 12px; border: 1px solid var(--line); border-radius: 6px; font-size: 14px; background: transparent; }
.price-calc-result { margin-top: 16px; }
.price-calc-amount { font-family: var(--font-display); font-size: 28px; font-weight: 300; color: var(--accent); }
.price-calc-note { font-size: 12px; color: var(--muted); margin-top: 4px; }

/* Tech Requirements */
.landing-tech { padding: 60px 0; }
.tech-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 24px; }
.tech-card { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 20px; text-align: center; }
.tech-value { font-family: var(--font-mono); font-size: 24px; color: var(--accent); margin-bottom: 8px; letter-spacing: 0.02em; }
.tech-label { font-size: 13px; color: var(--muted); }
.tech-hint { margin-top: 16px; padding: 16px 20px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px; font-size: 14px; color: var(--muted); }
.tech-hint strong { color: var(--fg); }

/* FAQ */
.landing-faq { padding: 60px 0; }
.faq-list { margin-top: 24px; border-top: 1px solid var(--line); }
.faq-item { border-bottom: 1px solid var(--line); cursor: pointer; }
.faq-question { display: flex; justify-content: space-between; align-items: center; padding: 16px 0; font-size: 15px; }
.faq-toggle { font-family: var(--font-mono); font-size: 18px; color: var(--muted); flex-shrink: 0; margin-left: 16px; }
.faq-answer { padding: 0 0 16px; font-size: 14px; color: var(--muted); line-height: 1.7; }

/* Cross-links */
.landing-crosslinks { padding: 40px 0 60px; }
.crosslinks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.crosslink-card { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; text-decoration: none; color: var(--fg); transition: box-shadow 0.2s; }
.crosslink-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
.crosslink-body { padding: 12px 16px; }
.crosslink-name { font-size: 15px; font-weight: 500; }
.crosslink-note { font-size: 13px; color: var(--muted); margin-top: 2px; }

/* CTA */
.landing-cta-section { padding: 80px 0; background: var(--fg); color: #fff; }
.landing-cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.landing-cta-text { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-top: 16px; }
.landing-cta-contacts { margin-top: 32px; font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.4); line-height: 2; }
.landing-cta-form { background: rgba(255,255,255,0.08); border-radius: 8px; padding: 24px; }
.landing-cta-form-title { font-size: 16px; margin-bottom: 16px; }
.landing-cta-form .field { margin-bottom: 8px; }
.landing-cta-form input,
.landing-cta-form textarea { width: 100%; padding: 10px 14px; border: none; border-radius: 6px; background: rgba(255,255,255,0.1); color: #fff; font-size: 14px; }
.landing-cta-form textarea { min-height: 60px; resize: vertical; }
.landing-cta-form input::placeholder,
.landing-cta-form textarea::placeholder { color: rgba(255,255,255,0.4); }

/* Mobile */
@media (max-width: 860px) {
  .landing-hero-grid { grid-template-columns: 1fr; }
  .variant-grid { grid-template-columns: 1fr 1fr; }
  .risk-grid { grid-template-columns: 1fr; }
  .cases-grid { grid-template-columns: 1fr; }
  .process-steps { flex-direction: column; align-items: flex-start; gap: 16px; }
  .process-step { text-align: left; display: flex; gap: 12px; align-items: flex-start; }
  .process-num { margin: 0; flex-shrink: 0; }
  .process-desc { max-width: none; margin: 0; }
  .process-connector { width: 0; height: 16px; border-top: none; border-left: 1px dashed var(--line); margin: 0 0 0 20px; }
  .price-grid { grid-template-columns: 1fr; }
  .tech-cards { grid-template-columns: 1fr; }
  .crosslinks-grid { grid-template-columns: 1fr; }
  .landing-cta-grid { grid-template-columns: 1fr; }
  .landing-markers { flex-wrap: wrap; gap: 12px; }
}

@media (max-width: 480px) {
  .variant-grid { grid-template-columns: 1fr; }
  .scenario-pills { gap: 6px; }
  .pill { padding: 8px 14px; font-size: 13px; }
}
```

- [ ] **Step 2: Проверить визуально в браузере**

- [ ] **Step 3: Коммит**

```
style: add CSS for all landing block components

- Responsive grid layouts for all 11 blocks
- Mobile-first breakpoints at 860px and 480px
- Presse-style mono labels and registration marks
- Dark sections for risk-removal and CTA
```

---

## Task 5: Собрать ProductLandingPage и подключить

**Files:**
- Modify: `src/subpages.jsx`
- Modify: `Сити Принт.html`

- [ ] **Step 1: Добавить ProductLandingPage в subpages.jsx**

Заменить существующую функцию `ProductPage` на `ProductLandingPage` в `src/subpages.jsx`:

```jsx
function ProductPage({ slug, navigate, openLightbox }) {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const data = LANDING_DATA[product.id];

  // Fallback to old simple page if no landing data
  if (!data) {
    return OldProductPage({ slug, navigate, openLightbox });
  }

  // Add slug to data for hero
  const dataWithSlug = { ...data, slug };

  return (
    <div className="page active" data-screen-label={`Лендинг: ${product.name}`}>
      {/* Breadcrumbs */}
      <div className="wrap" style={{ paddingTop: 90 }}>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: 'var(--muted)' }}>Главная</a>
          <span style={{ margin: '0 8px' }}>&rarr;</span>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('products'); }} style={{ color: 'var(--muted)' }}>Продукция</a>
          <span style={{ margin: '0 8px' }}>&rarr;</span>
          <span style={{ color: 'var(--fg)' }}>{product.name}</span>
        </div>
      </div>

      <LandingHero data={dataWithSlug} navigate={navigate} />
      <LandingScenarios scenarios={data.scenarios} />
      <LandingVariants variants={data.variants} />
      <LandingWhyMatters quote={data.quote} />
      <LandingRiskRemoval />
      <LandingCases cases={data.cases} title={'Примеры: ' + product.name.toLowerCase()} openLightbox={openLightbox} />
      <LandingProcess />
      <LandingPriceFactors factors={data.priceFactors} productId={product.id} />
      <LandingTechReqs reqs={data.techReqs} />
      <LandingFAQ items={data.faq} />
      <LandingCrossLinks productIds={data.crossLinks} navigate={navigate} />
      <LandingCTA title={data.ctaTitle} text={data.ctaText} />
    </div>
  );
}
```

Переименовать старую `ProductPage` в `OldProductPage` (оставить как fallback для продуктов без landing data).

- [ ] **Step 2: Подключить новые script-теги в HTML**

В `Сити Принт.html` добавить перед `src/subpages.jsx`:

```html
<script type="text/babel" src="src/landing-data.jsx"></script>
<script type="text/babel" src="src/landing-blocks.jsx"></script>
```

Порядок загрузки:
1. `src/data.jsx`
2. `src/shared.jsx`
3. `src/landing-data.jsx`
4. `src/landing-blocks.jsx`
5. `src/home.jsx`
6. `src/subpages.jsx`
7. `src/app.jsx`

- [ ] **Step 3: Открыть в браузере, перейти на страницу каталогов**

Открыть `Сити Принт.html`, нажать "Продукция" → "Каталоги и журналы". Проверить:
- Все 11 блоков отрисовываются
- Ритм светлый/тёмный/светлый правильный
- Аккордеон FAQ работает
- Калькулятор считает
- Форма CTA работает (показывает "Заявка отправлена")
- Перелинковка ведёт на другие продукты
- Мобильная версия корректна (сжать браузер до 375px)

- [ ] **Step 4: Коммит**

```
feat: catalogs product landing page

- Replace simple ProductPage with full 11-block landing
- Breadcrumbs, hero, scenarios, variants, risk removal
- Process, price factors, tech reqs, FAQ, CTA, cross-links
- Fallback to old page for products without landing data
```

---

## Task 6: Данные для остальных 8 лендингов

**Files:**
- Modify: `src/landing-data.jsx`

- [ ] **Step 1: Добавить данные для книг (books)**

Добавить в объект `LANDING_DATA` ключ `books` по аналогии с `catalogs`. Уникальные элементы:
- Hero: "Печать книг и многостраничных изданий от 1 экземпляра"
- Сценарии: рукопись автора, учебное пособие, фотокнига, корпоративное издание, семейная книга, сборник стихов, методичка, подарочная книга
- Варианты: переплёт (мягкий КБС / твёрдый / пружина / скоба), блок (ч-б / цвет), бумага (офсетная / мелованная / дизайнерская)
- Цитата: "Книгу должно быть приятно держать в руках. Помогаем выбрать не самую дорогую, а правильную бумагу."
- FAQ: минимальный тираж (от 1), пробный экземпляр, выбор бумаги, переплёт, подготовка файла, сроки
- Перелинковка: catalogs, souvenirs, packaging

- [ ] **Step 2: Добавить данные для упаковки (packaging)**

Уникальные элементы:
- Hero: "Печать упаковки и коробок для брендов и товаров"
- Сценарии: упаковка для маркетплейса, подарочный набор, косметика, продуктовый бренд, корпоративные подарки, локальный бренд
- Варианты: конструкции (коробка / обечайка / вкладыш / дисплей), материал (картон / микрогофра / каширование), отделка
- Цитата: "Упаковка — это конструкция, а не просто красивая картинка. Она должна держать форму, защищать продукт и стабильно производиться."
- Перелинковка: stickers (id надо уточнить — сейчас нет в PRODUCTS, будет добавлен), packaging, catalogs

- [ ] **Step 3: Добавить данные для наклеек, календарей, блокнотов**

По аналогии. Ключи: `stickers` (нужно добавить в PRODUCTS), `calendars`, `souvenirs`.

- [ ] **Step 4: Добавить данные для презентационных, выставок, пакетов**

Нужно добавить новые продукты в массив `PRODUCTS` в `data.jsx`:
- `{ id: 'stickers', name: 'Наклейки и стикеры', slug: 'stickers', ... }`
- `{ id: 'presentations', name: 'Презентационные материалы', slug: 'presentations', ... }`
- `{ id: 'events', name: 'Полиграфия для мероприятий', slug: 'events', ... }`
- `{ id: 'bags', name: 'Пакеты', slug: 'bags', ... }`

И соответствующие данные в `LANDING_DATA`.

- [ ] **Step 5: Проверить все 9 лендингов в браузере**

Пройти по каждому из 9 продуктов, проверить что:
- Все блоки отрисовываются с корректным контентом
- Перелинковка ведёт на существующие страницы
- Нет ошибок в консоли

- [ ] **Step 6: Коммит**

```
feat: add landing data for all 9 products

- books, packaging, stickers, calendars, souvenirs
- presentations, events, bags
- New product entries in PRODUCTS array
- Cross-links between all landings
```

---

## Task 7: FAQ Schema разметка

**Files:**
- Modify: `src/landing-blocks.jsx`

- [ ] **Step 1: Добавить JSON-LD в LandingFAQ**

В компонент `LandingFAQ` добавить генерацию JSON-LD разметки:

```jsx
// Inside LandingFAQ, add after the faq-list div:
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a,
    }
  }))
}) }} />
```

- [ ] **Step 2: Проверить в браузере через DevTools**

В Elements найти `<script type="application/ld+json">` и убедиться что JSON валидный.

- [ ] **Step 3: Коммит**

```
feat: add FAQ Schema.org JSON-LD markup

- FAQPage structured data for SEO/AIO
- Auto-generated from landing FAQ data
```

---

## Summary

| Task | Описание | Файлы |
|------|----------|-------|
| 1 | Данные для каталогов | landing-data.jsx, data.jsx |
| 2 | Компоненты блоков 1-6 | landing-blocks.jsx |
| 3 | Компоненты блоков 7-11 | landing-blocks.jsx |
| 4 | CSS для всех блоков | Сити Принт.html |
| 5 | Сборка и подключение | subpages.jsx, Сити Принт.html |
| 6 | Данные для 8 остальных лендингов | landing-data.jsx, data.jsx |
| 7 | FAQ Schema разметка | landing-blocks.jsx |
