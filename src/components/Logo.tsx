import Link from "next/link";
import { LotusIcon } from "./icons";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 text-ink"
      aria-label="Sumati's Seeds of Wisdom — home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blush-500 to-lotus-500 text-white shadow-soft transition-transform duration-300 group-hover:scale-105">
        <LotusIcon className="h-6 w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-base font-bold sm:text-lg">
          Sumati&rsquo;s
        </span>
        {!compact && (
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-blush-500">
            Seeds of Wisdom
          </span>
        )}
      </span>
    </Link>
  );
}
