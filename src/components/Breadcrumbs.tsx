import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-[var(--color-muted)] mb-8">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--color-dark)] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--color-dark)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
