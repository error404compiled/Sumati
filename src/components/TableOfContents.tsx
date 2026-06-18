import { SparkleIcon } from "./icons";

export interface TocItem {
  id: string;
  text: string;
}

/** Extracts h2 headings from generated HTML to build a table of contents. */
export function extractHeadings(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const slugCount: Record<string, number> = {};

  const withIds = html.replace(
    /<h2>(.*?)<\/h2>/g,
    (_match, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (slugCount[id] != null) {
        slugCount[id] += 1;
        id = `${id}-${slugCount[id]}`;
      } else {
        slugCount[id] = 0;
      }
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    }
  );

  return { html: withIds, toc };
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="card p-5">
      <h2 className="section-title mb-3">
        <SparkleIcon className="h-4 w-4 text-blush-500" />
        On this page
      </h2>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted transition hover:text-blush-600"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
