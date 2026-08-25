import { createFileRoute } from "@tanstack/react-router";
import { GemBoard } from "@/components/vip/GemBoard";

export const Route = createFileRoute("/mines")({
  head: () => ({
    meta: [
      { title: "كاشف Gems Mines — MEGA VIP" },
      { name: "description", content: "اكشف أماكن الألماس الآمنة في لعبة Gems Mines على MegaPari." },
      { property: "og:title", content: "كاشف Gems Mines — MEGA VIP" },
      { property: "og:description", content: "شبكة 5×5 لكشف الألماس الآمن." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <GemBoard gameName="GEMS MINES" topTitle="كاشف Gems Mines" />,
});
