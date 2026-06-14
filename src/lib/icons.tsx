import {
  ShieldCheck,
  Clock,
  ThumbsUp,
  CalendarCheck,
  Wallet,
  Calendar,
  Heart,
  Eye,
  Home,
  Sparkles,
  Shirt,
  LayoutGrid,
  Truck,
  ClipboardList,
  CalendarDays,
  PartyPopper,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Clock,
  ThumbsUp,
  CalendarCheck,
  Wallet,
  Calendar,
  Heart,
  Eye,
  Home,
  Sparkles,
  Shirt,
  LayoutGrid,
  Truck,
  ClipboardList,
  CalendarDays,
  PartyPopper,
  GraduationCap,
  TrendingUp,
};

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69A4.83 4.83 0 0 1 15.82 2.44V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.9 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.27 0 .54.04.79.1v-3.5a6.41 6.41 0 0 0-.79-.05A6.34 6.34 0 0 0 2.76 16.6a6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.19 8.19 0 0 0 4.16 1.24V6.69Z" />
    </svg>
  );
}
