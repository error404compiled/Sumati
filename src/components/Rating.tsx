import { StarIcon } from "./icons";

export function Rating({ value = 0 }: { value?: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rating: ${value} out of 3`}>
      <span className="text-xs font-medium text-muted">Rating:</span>
      <span className="flex items-center gap-0.5">
        {[1, 2, 3].map((i) => (
          <StarIcon
            key={i}
            className={`h-3.5 w-3.5 ${
              i <= value ? "text-amber-400" : "text-blush-100"
            }`}
          />
        ))}
      </span>
    </span>
  );
}
