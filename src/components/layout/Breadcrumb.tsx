import { Link } from "react-router-dom"

export interface BreadcrumbItem {
  label: string
  to?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Trilha de navegação" data-cid="breadcrumb" className="mb-4 text-[16px]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1">
            {item.to ? (
              <Link to={item.to} className="text-ml-blue hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ml-text-secondary">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span className="text-ml-text-secondary">&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
