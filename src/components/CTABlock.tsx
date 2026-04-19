interface CTABlockProps {
  compact?: boolean;
}

export function CTABlock({ compact = false }: CTABlockProps) {
  if (compact) {
    return (
      <div className="my-8 rounded-2xl bg-[var(--color-brand)] text-white p-6">
        <h3 className="text-lg font-semibold mb-2">Нужна консультация?</h3>
        <p className="text-sm text-white/80 mb-4">
          Поможем выбрать материалы, рассчитаем стоимость, подготовим макет.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://t.me/citiprint"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-brand)] text-sm font-medium px-4 py-2 rounded-full hover:bg-white/90 transition-colors"
          >
            Telegram
          </a>
          <a
            href="https://wa.me/73432000000"
            className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="tel:+73432000000"
            className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            +7 (343) 200-00-00
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[var(--color-brand)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Готовы обсудить ваш проект?</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Расскажите, что нужно напечатать. Рассчитаем стоимость, подберём материалы и технологию.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://t.me/citiprint"
            className="inline-flex items-center gap-2 bg-white text-[var(--color-brand)] font-medium px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Telegram
          </a>
          <a
            href="https://wa.me/73432000000"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-medium px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="tel:+73432000000"
            className="inline-flex items-center gap-2 bg-white/20 text-white font-medium px-6 py-3 rounded-full hover:bg-white/30 transition-colors"
          >
            +7 (343) 200-00-00
          </a>
        </div>
      </div>
    </section>
  );
}
