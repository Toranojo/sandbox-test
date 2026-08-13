import type { ReactNode } from "react";

type Tone = "gold" | "loss" | "neutral" | "ink";

const TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-gold-light text-gold-dark",
  loss: "bg-loss/10 text-loss",
  neutral: "bg-hairline/60 text-muted",
  ink: "bg-ink text-white",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}
