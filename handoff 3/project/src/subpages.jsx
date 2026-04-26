// Subpages: Product detail, Portfolio list, About
const { useState: useStateS } = React;

function OldProductPage({ slug, navigate, openLightbox }) {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const [img, setImg] = useStateS(0);
  const [paper, setPaper] = useStateS('standard');
  const [finish, setFinish] = useStateS('none');
  const [qty, setQty] = useStateS(100);

  const base = PRICE_BASE[product.id] || { base: 100, per: 50 };
  const paperMult = paper === 'premium' ? 1.6 : paper === 'eco' ? 1.2 : 1;
  const finishMult = finish === 'foil' ? 1.35 : finish === 'emboss' ? 1.25 : finish === 'laminate' ? 1.1 : 1;
  const total = Math.round(base.base * paperMult + base.per * paperMult * finishMult * qty);

  return (
    <div className="page active" data-screen-label={`02 Продукт: ${product.name}`}>
      <section className="pd-hero">
        <div className="wrap">
          <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--muted)' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ color: 'var(--muted)' }}>Главная</a>
            <span style={{ margin: '0 8px' }}>→</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); setTimeout(() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'}), 100); }} style={{ color: 'var(--muted)' }}>Продукция</a>
            <span style={{ margin: '0 8px' }}>→</span>
            <span style={{ color: 'var(--fg)' }}>{product.name}</span>
          </div>
          <div className="pd-grid">
            <div>
              <div className="pd-image">
                <Placeholder src={product.img} label={product.name} />
              </div>
              <div className="pd-gallery">
                {[product.img, IMG.paperSwatches, IMG.inkClose, IMG.bindery].map((src, i) => (
                  <div key={i} className={`ph has-img ${img === i ? 'active' : ''}`} onClick={() => setImg(i)}
                    style={{ position: 'relative' }}>
                    <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="eyebrow">{product.lead}</div>
              <h1 className="pd-title">{product.name}</h1>
              <p className="pd-lead">Полный цикл производства под ключ: от подготовки макета до доставки тиража. Подберём бумагу, отделку и технологию под вашу задачу и бюджет.</p>

              <div style={{ marginTop: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Бумага</div>
                <div className="options-chips">
                  <button className={paper === 'standard' ? 'active' : ''} onClick={() => setPaper('standard')}>Стандартная</button>
                  <button className={paper === 'eco' ? 'active' : ''} onClick={() => setPaper('eco')}>Эко</button>
                  <button className={paper === 'premium' ? 'active' : ''} onClick={() => setPaper('premium')}>Премиум</button>
                </div>
              </div>
              <div style={{ marginTop: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 10 }}>Отделка</div>
                <div className="options-chips">
                  <button className={finish === 'none' ? 'active' : ''} onClick={() => setFinish('none')}>Без отделки</button>
                  <button className={finish === 'laminate' ? 'active' : ''} onClick={() => setFinish('laminate')}>Ламинация</button>
                  <button className={finish === 'foil' ? 'active' : ''} onClick={() => setFinish('foil')}>Тиснение фольгой</button>
                  <button className={finish === 'emboss' ? 'active' : ''} onClick={() => setFinish('emboss')}>Конгрев</button>
                </div>
              </div>

              <div style={{ marginTop: 32, display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 20, padding: '24px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div>
                  <div className="eyebrow">Тираж</div>
                  <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))}
                    style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, background: 'transparent', border: 'none', outline: 'none', width: 160 }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="eyebrow">Оценка</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                    {total.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              </div>
              <a href="#" className="btn primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); navigate('home'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({behavior:'smooth'}), 100); }}>Отправить бриф →</a>

              <div className="spec-table">
                <div className="spec-row"><div className="k">Формат</div><div>A4, A5, A3, под заказ</div></div>
                <div className="spec-row"><div className="k">Цвета</div><div>CMYK 4+4, Pantone по запросу</div></div>
                <div className="spec-row"><div className="k">Тираж</div><div>{product.note}</div></div>
                <div className="spec-row"><div className="k">Срок</div><div>от 3 рабочих дней</div></div>
                <div className="spec-row"><div className="k">Технолог</div><div>Консультация бесплатно</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="portfolio">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Примеры</div>
              <h2>Работы в этой категории</h2>
            </div>
          </div>
          <div className="portfolio-grid">
            {PORTFOLIO.slice(0, 5).map((it, i) => (
              <div key={it.id} className="portfolio-item" onClick={() => openLightbox(i)}>
                <Placeholder src={it.img} label={`${it.tag} · ${it.year}`} />
                <div className="caption"><h4>{it.title}</h4><p>{it.client} · {it.year}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductPage({ slug, navigate, openLightbox }) {
  const product = PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  const data = LANDING_DATA[product.id];

  if (!data) {
    return OldProductPage({ slug, navigate, openLightbox });
  }

  const dataWithSlug = { ...data, slug };

  return (
    <div className="page active" data-screen-label={'Landing: ' + product.name}>
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
      <LandingUniqueBlock data={data} />
      <LandingWhyMatters quote={data.quote} commonMistake={data.commonMistake} />
      <LandingRiskRemoval />
      <LandingCases cases={data.cases} title={'Примеры: ' + product.name.toLowerCase()} openLightbox={openLightbox} />
      {product.id === 'books' && <LandingRestoration />}
      <LandingProcess />
      <LandingPriceFactors factors={data.priceFactors} productId={product.id} priceIntro={data.priceIntro} calcNeeded={data.calcNeeded} calcChecklist={data.calcChecklist} />
      <LandingTechReqs reqs={data.techReqs} />
      <LandingFAQ items={data.faq} />
      <LandingCrossLinks productIds={data.crossLinks} navigate={navigate} />
      <LandingCTA title={data.ctaTitle} text={data.ctaText} />
    </div>
  );
}

function PortfolioPage({ navigate, openLightbox }) {
  const [filter, setFilter] = useStateS('all');
  const filters = ['all', 'КАТАЛОГ', 'КНИГА', 'УПАКОВКА', 'СУВЕНИРЫ', 'КАЛЕНДАРЬ'];
  const fnames = { all: 'Все', КАТАЛОГ: 'Каталоги', КНИГА: 'Книги', УПАКОВКА: 'Упаковка', СУВЕНИРЫ: 'Сувениры', КАЛЕНДАРЬ: 'Календари' };

  // Extend with a few more items, keeping real-client feel
  const extended = [
    ...PORTFOLIO,
    { id: 10, title: 'Годовой отчёт',   tag: 'КНИГА',     year: '2024', client: 'Атомстройкомплекс', img: IMG.openBook },
    { id: 11, title: 'Меню ресторана',  tag: 'КАТАЛОГ',   year: '2025', client: 'Частный клиент',    img: IMG.magazines2 },
    { id: 12, title: 'Перекидной 2026', tag: 'КАЛЕНДАРЬ', year: '2025', client: 'Сбербанк',           img: IMG.calendar },
    { id: 13, title: 'Блокноты мерч',   tag: 'СУВЕНИРЫ',  year: '2025', client: '2ГИС',               img: IMG.notebook },
    { id: 14, title: 'Фотокнига',       tag: 'КНИГА',     year: '2024', client: 'Частный клиент',    img: IMG.booksStack },
    { id: 15, title: 'Упаковка подарков', tag: 'УПАКОВКА', year: '2024', client: 'УГМК',              img: IMG.packaging2 },
  ];
  const shown = filter === 'all' ? extended : extended.filter(it => it.tag === filter);

  return (
    <div className="page active" data-screen-label="03 Портфолио">
      <section className="pd-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>Портфолио · 2024—2026</div>
          <h1 className="pd-title" style={{ maxWidth: 900 }}>Работы, которые мы <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>напечатали</em> и которыми гордимся.</h1>
          <div style={{ height: 48 }} />
          <div className="pf-filter">
            {filters.map(f => (
              <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{fnames[f]}</button>
            ))}
          </div>
          <div className="pf-page-grid">
            {shown.map((it) => {
              const origIndex = extended.findIndex(e => e.id === it.id);
              return (
                <div key={it.id} className="portfolio-item" onClick={() => openLightbox(origIndex, extended)}>
                  <Placeholder src={it.img} label={`${it.tag} · ${it.year}`} />
                  <div className="caption"><h4>{it.title}</h4><p>{it.client} · {it.year}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage({ navigate }) {
  return (
    <div className="page active" data-screen-label="04 О нас">
      <section className="about-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 28 }}>О компании</div>
          <p className="about-lede">
            Типография с производственной экспертизой <em>с 1997 года</em>. Собственное производство в Екатеринбурге. Более 40 человек в команде.
          </p>
        </div>
      </section>

      <section className="about-body">
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="label">История</div>
          </div>
          <div>
            <p>Наш путь начался задолго до открытия собственной типографии. Основной костяк команды прошёл школу реального производства: работали наёмными управляющими, мастерами и печатниками в типографиях Екатеринбурга. Поэтому с самого начала понимали полиграфию не только как бизнес, но и как ремесло, где важны точность, ответственность и уважение к технологии.</p>
            <p>В 2006 году мы открыли собственную типографию. Уже на старте — полноценная производственная база: офсетная печатная машина и оборудование для послепечатной обработки. Не посредник, а самостоятельное производство, которое отвечает за результат на каждом этапе.</p>
          </div>
        </div>
      </section>

      <section className="about-body" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="label">Философия</div>
          </div>
          <div>
            <p>Хорошая типография — это не набор станков. Это люди, процессы и отношение к делу.</p>
            <p>Печатная продукция — инструмент, который помогает бизнесу быть заметнее, образовательным проектам — доносить знания, авторам — превращать рукописи в книги, а брендам — создавать впечатление, которое хочется сохранить.</p>
            <p>Мы стараемся быть для клиентов не исполнителем, а производственным партнёром. Понять задачу, подобрать технологию, предупредить о рисках и сделать так, чтобы заказ был не только красивым, но и полезным для цели клиента.</p>
          </div>
        </div>
      </section>

      <section className="about-body" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="label">Сегодня</div>
          </div>
          <div>
            <p>Ситипринт объединяет офсетную и цифровую печать, книжное производство, твёрдый переплёт, упаковку, послепечатную обработку и сувенирную продукцию.</p>
            <p>Это позволяет решать разные задачи в одном производственном контуре: от буклетов и каталогов до книг, календарей, коробок, блокнотов и брендированной продукции.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Хронология</div>
              <h2>От ремесла к производству</h2>
            </div>
          </div>
          <div className="timeline">
            {TIMELINE.map((t, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-title">{t.title}</div>
                <div className="timeline-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="material">
        <div className="wrap">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{ marginBottom: 14, color: 'rgba(255,255,255,0.5)' }}>Команда</div>
              <h2>Более 40 человек, одна типография</h2>
            </div>
            <p className="sub">Менеджеры, технологи, дизайнеры, печатники, переплётчики, специалисты по вырубке, сборке, упаковке и логистике.</p>
          </div>
          <div className="about-team-desc" style={{ maxWidth: 700, color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.7, marginTop: 24 }}>
            <p>За каждым заказом стоит не один человек, а слаженная производственная цепочка. Одни помогают сформулировать задачу и выбрать решение, другие готовят макеты, контролируют цвет, печать, отделку, переплёт, упаковку и сроки.</p>
            <p style={{ marginTop: 12 }}>В полиграфии нет мелочей: важны бумага, цвет, точность реза, качество переплёта, аккуратность упаковки и соблюдение обещанного срока.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductsListPage({ navigate }) {
  return (
    <div className="page active" data-screen-label="05 Продукция">
      <section className="pd-hero">
        <div className="wrap">
          <div className="eyebrow" style={{ marginBottom: 20 }}>Каталог продукции</div>
          <h1 className="pd-title" style={{ maxWidth: 900 }}>Восемь направлений, <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>сотни</em> комбинаций.</h1>
          <div style={{ height: 48 }} />
          <div className="products-grid">
            {PRODUCTS.map((p) => (
              <a key={p.id} href="#" className="product-card" onClick={(e) => { e.preventDefault(); navigate('product', p.slug); }}>
                <Placeholder src={p.img} label={p.name} />
                <div className="meta">
                  <h3>{p.name}</h3>
                  <p className="note">{p.note}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ProductPage, PortfolioPage, AboutPage, ProductsListPage });
