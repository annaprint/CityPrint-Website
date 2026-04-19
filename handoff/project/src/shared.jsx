// Shared shell components
const { useState, useEffect, useRef, useMemo } = React;

function Placeholder({ label, style, src, alt, objectPosition }) {
  if (src) {
    return (
      <div className="ph has-img" style={style}>
        <img src={src} alt={alt || label || ''} loading="lazy" style={{ objectPosition: objectPosition || 'center' }} />
        {label && <span className="ph-label on-img">{label}</span>}
      </div>
    );
  }
  return (
    <div className="ph" style={style}>
      {label && <span className="ph-label">{label}</span>}
    </div>
  );
}

// Brand logomark — the client's actual logo image.
function Logomark({ size = 32, color }) {
  return (
    <img src="assets/logo-full.jpg" alt="Сити Принт" style={{ height: size, width: 'auto', display: 'block', flexShrink: 0 }} />
  );
}

function Wordmark({ size = 22 }) {
  return (
    <span style={{
      fontFamily: 'var(--font-display)', fontSize: size, fontWeight: 600,
      letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap',
    }}>
      Сити<span style={{ color: 'var(--accent)' }}>·</span>Принт
    </span>
  );
}

function Header({ page, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', on); on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className="site" style={{ boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.03)' : 'none' }}>
      <div className="wrap bar">
        <a className="brand-mark" href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{ alignItems: 'center', gap: 10 }}>
          <Logomark size={44} />
        </a>
        <nav className="primary">
          <a href="#" className={page === 'products' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('products'); }}>Продукция</a>
          <a href="#" className={page === 'portfolio' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('portfolio'); }}>Портфолио</a>
          <a href="#" className={page === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); navigate('about'); }}>О нас</a>
          <a href="#cta" onClick={(e) => { if (page !== 'home') { e.preventDefault(); navigate('home'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({behavior: 'smooth'}), 100); } }}>Контакты</a>
        </nav>
        <div className="header-cta">
          <a href="#" className="btn ghost" style={{ display: 'none' }}>Кабинет</a>
          <a href="#cta" className="btn primary" onClick={(e) => { e.preventDefault(); navigate('home'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({behavior: 'smooth'}), 100); }}>Заказать</a>
        </div>
      </div>
    </header>
  );
}

function Marquee({ items }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <React.Fragment key={i}>
            <span className="marquee-item">{it}</span>
            <span className="marquee-dot" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="clients">
      <div className="clients-track">
        {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => <span key={i}>{c}</span>)}
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site">
      <div className="wrap">
        <div style={{ marginBottom: 28, padding: 16, background: '#fff', borderRadius: 8, display: 'inline-block' }}>
          <Logomark size={80} />
        </div>
        <p className="tagline">Типография полного цикла в Екатеринбурге. Собственное производство, доставка по всей России. С 2006 года.</p>
        <div style={{ height: 48 }} />
        <div className="footer-grid">
          <div>
            <h4>Контакты</h4>
            <ul>
              <li><a href="tel:+73433101337" style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: 22 }}>+7 (343) 310-13-37</a></li>
              <li><a href="mailto:sale@citi-print.ru">sale@citi-print.ru</a></li>
              <li>Екатеринбург, Посадская 16А</li>
              <li style={{ color: 'rgba(255,255,255,0.4)' }}>Пн–Пт 9:00–18:00</li>
            </ul>
          </div>
          <div>
            <h4>Продукция</h4>
            <ul>
              {PRODUCTS.slice(0, 5).map(p => <li key={p.id}><a href="#" onClick={(e) => { e.preventDefault(); navigate('product', p.slug); }}>{p.name}</a></li>)}
            </ul>
          </div>
          <div>
            <h4>Компания</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('about'); }}>О нас</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('portfolio'); }}>Портфолио</a></li>
              <li><a href="#">Как заказать</a></li>
              <li><a href="#">База знаний</a></li>
            </ul>
          </div>
          <div>
            <h4>Следите</h4>
            <ul>
              <li><a href="#">Telegram</a></li>
              <li><a href="#">VK</a></li>
              <li><a href="#">Дзен</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>2006–2026 © Сити Принт</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="#">Политика конфиденциальности</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA({ navigate }) {
  return (
    <div className="mobile-cta">
      <a href="tel:+73433101337" className="ghost">Позвонить</a>
      <a href="#" className="primary" onClick={(e) => { e.preventDefault(); navigate('home'); setTimeout(() => document.getElementById('cta')?.scrollIntoView({behavior:'smooth'}), 100); }}>Заказать</a>
    </div>
  );
}

// Lightbox for portfolio
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose, onPrev, onNext]);
  if (index === null) return null;
  const item = items[index];
  return (
    <div className="lightbox open" onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Закрыть">✕</button>
        <div className="lightbox-image">
          <Placeholder src={item.img} label={`${item.tag} · ${item.year}`} />
        </div>
        <div className="lightbox-caption">
          <div>
            <h4>{item.title}</h4>
            <p>{item.client} · {item.year}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
            <span className="lightbox-counter">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <div className="lightbox-nav">
              <button onClick={onPrev} aria-label="Пред.">←</button>
              <button onClick={onNext} aria-label="След.">→</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reveal hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// Word-reveal for hero
function WordReveal({ words, delay = 60 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll('span');
    spans.forEach((s, i) => { s.style.transitionDelay = (i * delay) + 'ms'; });
    requestAnimationFrame(() => el.classList.add('in'));
  }, [words, delay]);
  return (
    <span className="word-reveal" ref={ref}>
      {words.map((w, i) => (
        <span key={i} className={w.italic ? 'italic' : ''}>{w.text}{i < words.length - 1 ? '\u00A0' : ''}</span>
      ))}
    </span>
  );
}

Object.assign(window, { Placeholder, Header, Marquee, Clients, Footer, MobileCTA, Lightbox, useReveal, WordReveal, Logomark, Wordmark });
