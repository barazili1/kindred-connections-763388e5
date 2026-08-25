import { createFileRoute } from "@tanstack/react-router";
import { ThimblesBoard } from "@/components/vip/ThimblesBoard";

export const Route = createFileRoute("/thimbles")({
  head: () => ({
    meta: [
      { title: "كاشف Thimbles — MEGA VIP" },
      { name: "description", content: "اكشف الكوب الصحيح في لعبة Thimbles على MegaPari." },
      { property: "og:title", content: "كاشف Thimbles — MEGA VIP" },
      { property: "og:description", content: "ارفع الكوب واكشف الكرة الرابحة في Thimbles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThimblesBoard,
});
