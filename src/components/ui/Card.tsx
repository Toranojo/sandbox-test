import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-hairline bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${className}`}
      {...props}
    />
  );
}
