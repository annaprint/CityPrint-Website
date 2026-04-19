import Link from "next/link";

const navLinks = [
  { label: "Продукция", href: "#" },
  { label: "Портфолио", href: "#" },
  { label: "О нас", href: "#" },
  { label: "База знаний", href: "/baza-znaniy", active: true },
  { label: "Контакты", href: "#" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-light-gray)]/60">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-wide text-[var(--color-dark)]">
          СИТИ ПРИНТ
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "text-sm text-[var(--color-dark)] font-medium"
                  : "text-sm text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#"
          className="bg-[var(--color-brand)] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[var(--color-brand-dark)] transition-colors"
        >
          Заказать
        </Link>
      </div>
    </header>
  );
}
