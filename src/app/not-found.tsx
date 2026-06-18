import Link from "next/link";
import { ArrowRightIcon, LotusIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <LotusIcon className="h-16 w-16 text-blush-400" />
      <h1 className="mt-6 font-display text-5xl font-bold text-ink">404</h1>
      <p className="mt-3 max-w-md text-muted">
        This path hasn&rsquo;t bloomed yet. Let&rsquo;s return to the garden and
        find a seed of wisdom that speaks to you.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back home
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
