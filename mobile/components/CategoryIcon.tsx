import type { ReactElement } from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { colors } from "@/lib/theme";
import type { AssetCategory } from "@/lib/types";

const COMMON = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: colors.goldDark,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function GoldBarIcon() {
  return (
    <Svg {...COMMON}>
      <Path d="M4 9h16l-2 8H6l-2-8Z" />
      <Path d="M4 9 6 5h12l2 4" />
    </Svg>
  );
}

function WatchIcon() {
  return (
    <Svg {...COMMON}>
      <Circle cx={12} cy={12} r={6.5} />
      <Path d="M12 9v3l2 1.5" />
      <Path d="M9 3h6M9 21h6" />
    </Svg>
  );
}

function BagIcon() {
  return (
    <Svg {...COMMON}>
      <Rect x={4} y={8} width={16} height={12} rx={2} />
      <Path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </Svg>
  );
}

function RingIcon() {
  return (
    <Svg {...COMMON}>
      <Circle cx={12} cy={14} r={6} />
      <Path d="M9 8l3-5 3 5" />
    </Svg>
  );
}

function GemIcon() {
  return (
    <Svg {...COMMON}>
      <Path d="M4 9l4-5h8l4 5-10 11L4 9Z" />
      <Path d="M4 9h16M9 4l2 5-3 6M15 4l-2 5 3 6" />
    </Svg>
  );
}

const ICONS: Record<AssetCategory, () => ReactElement> = {
  GOLD: GoldBarIcon,
  PLATINUM: GoldBarIcon,
  SILVER: GoldBarIcon,
  WATCH: WatchIcon,
  BAG: BagIcon,
  JEWELRY: RingIcon,
  OTHER: GemIcon,
};

export function CategoryIcon({ category }: { category: AssetCategory }) {
  const Icon = ICONS[category];
  return <Icon />;
}
