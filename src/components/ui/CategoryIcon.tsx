import type { AssetCategory } from "@/lib/assetCategories";

const COMMON = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function GoldBarIcon() {
  return (
    <svg {...COMMON}>
      <path d="M4 9h16l-2 8H6l-2-8Z" />
      <path d="M4 9 6 5h12l2 4" />
    </svg>
  );
}

function WatchIcon() {
  return (
    <svg {...COMMON}>
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 9v3l2 1.5" />
      <path d="M9 3h6M9 21h6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg {...COMMON}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function RingIcon() {
  return (
    <svg {...COMMON}>
      <circle cx="12" cy="14" r="6" />
      <path d="M9 8l3-5 3 5" />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg {...COMMON}>
      <path d="M4 9l4-5h8l4 5-10 11L4 9Z" />
      <path d="M4 9h16M9 4l2 5-3 6M15 4l-2 5 3 6" />
    </svg>
  );
}

const ICONS: Record<AssetCategory, () => JSX.Element> = {
  GOLD: GoldBarIcon,
  PLATINUM: GoldBarIcon,
  SILVER: GoldBarIcon,
  WATCH: WatchIcon,
  BAG: BagIcon,
  JEWELRY: RingIcon,
  OTHER: GemIcon,
};

export function CategoryIcon({ category, className = "" }: { category: AssetCategory; className?: string }) {
  const Icon = ICONS[category];
  return (
    <span className={`inline-flex items-center justify-center text-gold-dark ${className}`}>
      <Icon />
    </span>
  );
}
