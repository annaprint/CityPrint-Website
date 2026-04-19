import { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { SECTIONS } from "@/lib/sections";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionBlock } from "@/components/SectionBlock";
import { CTABlock } from "@/components/CTABlock";

export const metadata: Metadata = {
  title: "База знаний о полиграфии",
  description:
    "Всё, что нужно знать заказчику: от выбора бумаги до получения тиража. 26 статей от технологов типографии Сити Принт.",
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight text-[var(--color-dark)]">
              База знаний
              <br />
              <span className="text-[var(--color-muted)]">о полиграфии</span>
            </h1>
            <p className="mt-5 text-lg text-[var(--color-muted)] font-light leading-relaxed max-w-xl">
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

      <CTABlock />
    </>
  );
}
