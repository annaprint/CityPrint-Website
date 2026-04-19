import Link from "next/link";

const productLinks = [
  { label: "Визитки", href: "#" },
  { label: "Буклеты и листовки", href: "#" },
  { label: "Каталоги и журналы", href: "#" },
  { label: "Упаковка", href: "#" },
  { label: "Книги", href: "#" },
  { label: "POS-материалы", href: "#" },
];

const infoLinks = [
  { label: "О типографии", href: "#" },
  { label: "Портфолио", href: "#" },
  { label: "База знаний", href: "/baza-znaniy" },
  { label: "Контакты", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="text-white font-semibold text-lg tracking-wide mb-4">СИТИ ПРИНТ</div>
            <p className="text-sm leading-relaxed">
              Типография в Екатеринбурге. Собственное производство, 20 лет опыта. Офсет, цифра, широкоформат.
            </p>
          </div>

          <div>
            <div className="text-white text-sm font-medium mb-4">Продукция</div>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white text-sm font-medium mb-4">Информация</div>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-white text-sm font-medium mb-4">Контакты</div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="tel:+73432000000" className="hover:text-white transition-colors">
                  +7 (343) 200-00-00
                </a>
              </li>
              <li>
                <a href="mailto:info@citiprint.ru" className="hover:text-white transition-colors">
                  info@citiprint.ru
                </a>
              </li>
              <li>Екатеринбург, ул. Типографская, 1</li>
              <li>Пн-Пт 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-white/40">
          Типография Сити Принт, Екатеринбург
        </div>
      </div>
    </footer>
  );
}
