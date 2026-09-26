import { cn } from "@/lib/utils";

export function BasketballMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("text-primary", className)}
    >
      <circle cx="16" cy="16" r="13.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 2.5c0 0-3.2 6.2-3.2 13.5S16 29.5 16 29.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M16 2.5c0 0 3.2 6.2 3.2 13.5S16 29.5 16 29.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M3.2 16h25.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M6.2 8.2c5 3.2 14.6 3.2 19.6 0"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6.2 23.8c5-3.2 14.6-3.2 19.6 0"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
