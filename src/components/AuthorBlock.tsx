export function AuthorBlock() {
  return (
    <div className="mt-8 flex items-center gap-4 p-5 bg-white rounded-xl border border-[var(--color-light-gray)]/80">
      <div className="w-10 h-10 rounded-full bg-[var(--color-light-gray)] flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-[var(--color-muted)]">СП</span>
      </div>
      <div>
        <div className="text-sm font-medium text-[var(--color-dark)]">Типография Сити Принт</div>
        <div className="text-xs text-[var(--color-muted)]">
          Екатеринбург. 20 лет опыта в полиграфии. Собственное производство.
        </div>
      </div>
    </div>
  );
}
