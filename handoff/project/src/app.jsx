// App shell, routing, Tweaks integration
const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

function TweaksPanel({ open, onClose, settings, update }) {
  return (
    <div className={`tweaks-panel ${open ? 'open' : ''}`}>
      <div className="title">
        <span>Tweaks</span>
        <span className="close" onClick={onClose}>✕</span>
      </div>

      <div className="group">
        <h5>Арт-направление</h5>
        <div className="tweaks-options">
          <button className={settings.style === 'atelier' ? 'active' : ''} onClick={() => update('style', 'atelier')}>Atelier</button>
          <button className={settings.style === 'presse' ? 'active' : ''} onClick={() => update('style', 'presse')}>Presse</button>
          <button className={settings.style === 'riso' ? 'active' : ''} onClick={() => update('style', 'riso')}>Risograph</button>
        </div>
      </div>

      <div className="group">
        <h5>Hero-вариант</h5>
        <div className="tweaks-options">
          <button className={settings.hero === 'stats' ? 'active' : ''} onClick={() => update('hero', 'stats')}>Статистика</button>
          <button className={settings.hero === 'image' ? 'active' : ''} onClick={() => update('hero', 'image')}>Изображение</button>
          <button className={settings.hero === 'calc' ? 'active' : ''} onClick={() => update('hero', 'calc')}>Калькулятор</button>
        </div>
      </div>

      <div className="group">
        <h5>Акцентный цвет</h5>
        <div className="tweaks-swatches">
          {[
            { k: 'red', c: '#b8472c' },
            { k: 'black', c: '#1a1a1a' },
            { k: 'blue', c: '#1e3a8a' },
            { k: 'green', c: '#4a5d3a' },
          ].map(s => (
            <button key={s.k} className={settings.accent === s.k ? 'active' : ''} style={{ background: s.c }} onClick={() => update('accent', s.k)} aria-label={s.k} />
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 8, lineHeight: 1.5 }}>
        Переключайте варианты — они сохранятся. Всё работает на одной странице.
      </div>
    </div>
  );
}

function App() {
  // In-page routing state. {page, params}
  const [route, setRoute] = useStateA(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('citi-route') || '{}');
      return saved.page ? saved : { page: 'home' };
    } catch { return { page: 'home' }; }
  });

  // Tweaks state
  const [settings, setSettings] = useStateA(() => ({
    style: document.body.dataset.style || 'atelier',
    accent: document.body.dataset.accent || 'red',
    hero: document.body.dataset.hero || 'stats',
  }));
  const [tweaksOpen, setTweaksOpen] = useStateA(false);

  // Apply settings to body
  useEffectA(() => {
    document.body.dataset.style = settings.style;
    document.body.dataset.accent = settings.accent;
    document.body.dataset.hero = settings.hero;
  }, [settings]);

  // Persist route
  useEffectA(() => {
    localStorage.setItem('citi-route', JSON.stringify(route));
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  // Parent postMessage edit mode
  useEffectA(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const navigate = (page, param) => {
    setRoute({ page, param });
  };

  const update = (k, v) => {
    const next = { ...settings, [k]: v };
    setSettings(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*'); } catch {}
  };

  // Lightbox
  const [lbItems, setLbItems] = useStateA(PORTFOLIO);
  const [lbIndex, setLbIndex] = useStateA(null);
  const openLightbox = (index, items = PORTFOLIO) => { setLbItems(items); setLbIndex(index); };
  const closeLightbox = () => setLbIndex(null);
  const prevLightbox = () => setLbIndex((lbIndex - 1 + lbItems.length) % lbItems.length);
  const nextLightbox = () => setLbIndex((lbIndex + 1) % lbItems.length);

  return (
    <React.Fragment>
      <Header page={route.page} navigate={navigate} />

      {route.page === 'home' && <HomePage navigate={navigate} heroVariant={settings.hero} openLightbox={openLightbox} />}
      {route.page === 'products' && <ProductsListPage navigate={navigate} />}
      {route.page === 'product' && <ProductPage slug={route.param} navigate={navigate} openLightbox={openLightbox} />}
      {route.page === 'portfolio' && <PortfolioPage navigate={navigate} openLightbox={openLightbox} />}
      {route.page === 'about' && <AboutPage navigate={navigate} />}

      <Footer navigate={navigate} />
      <MobileCTA navigate={navigate} />

      <Lightbox items={lbItems} index={lbIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />

      <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} settings={settings} update={update} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
