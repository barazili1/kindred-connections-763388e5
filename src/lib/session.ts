export type PlatformId = "megapari";
export type GameId = "crash" | "apple" | "mines" | "wildwest" | "thimbles";

const KEY_PLATFORM = "dragonvip:platform";
const KEY_ID = "dragonvip:userid";
const KEY_GAME = "dragonvip:game";

export const PLATFORMS: Record<
  PlatformId,
  { name: string; tagline: string; accent: string; short: string; promo: string; link: string }
> = {
  megapari: {
    name: "MegaPari",
    tagline: "المنصة الرسمية المعتمدة",
    accent: "oklch(0.6 0.22 27)",
    short: "MP",
    promo: "Gooo33",
    link: "https://refpazitag.top/L?tag=d_2926243m_54987c_&site=2926243&ad=54987",
  },
};

export function savePlatform(id: PlatformId) {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY_PLATFORM, id);
}

export function getPlatform(): PlatformId {
  return "megapari";
}

export function saveUserId(id: string) {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY_ID, id);
}

export function getUserId(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(KEY_ID) ?? "";
}

export const GAME_ROUTES: Record<GameId, "/crash" | "/apple" | "/mines" | "/wildwest" | "/thimbles"> = {
  crash: "/crash",
  apple: "/apple",
  mines: "/mines",
  wildwest: "/wildwest",
  thimbles: "/thimbles",
};

export function saveGame(id: GameId) {
  if (typeof window !== "undefined") sessionStorage.setItem(KEY_GAME, id);
}

export function getGame(): GameId {
  if (typeof window === "undefined") return "crash";
  const v = sessionStorage.getItem(KEY_GAME);
  return v === "apple" || v === "mines" || v === "wildwest" || v === "thimbles" ? v : "crash";
}
