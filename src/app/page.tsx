import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
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
