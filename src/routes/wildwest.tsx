import { createFileRoute } from "@tanstack/react-router";
import { WildWestBoard } from "@/components/vip/WildWestBoard";

export const Route = createFileRoute("/wildwest")({
  head: () => ({
    meta: [
      { title: "كاشف Wild West — MEGA VIP" },
      { name: "description", content: "اكشف صناديق الكنز في لعبة Wild West Gold على MegaPari." },
      { property: "og:title", content: "كاشف Wild West — MEGA VIP" },
      { property: "og:description", content: "اختر X2 أو X3 واكشف صناديق الكنز." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WildWestBoard,
});
