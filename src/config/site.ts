import type { BrandIconName } from "@/components/BrandIcon";

export type SiteLink = {
  label: string;
  sublabel: string;
  href: string;
  /** Color de marca (hex) usado para el tinte de la tarjeta. */
  brand: string;
  icon: BrandIconName;
  tag?: string;
};

export const site = {
  name: "models name",
  handle: "@modelname",
  /** Sustituye este archivo en /public por tu propia foto (p. ej. /avatar.jpg). */
  avatar: "/avatar.svg",
  avatarAlt: "Nattasha",
  title: "Nattasha — Official Links",
  description:
    "All official Nattasha links in one place: OnlyFans, Twitch, Spotify, X and Instagram.",
  disclaimer: "If a link isn't on this page, it isn't mine.",
  footerNote: "external platforms",
};

export const links: SiteLink[] = [
  {
    label: "Instagram",
    sublabel: "Photos, stories, behind the scenes",
    href: "https://www.instagram.com/nattashaxoxo",
    brand: "#FF0069",
    icon: "instagram",
  },
  {
    label: "X / Twitter",
    sublabel: "Daily thoughts and chaos",
    href: "https://x.com/nattashaxo",
    brand: "#E7E9EA",
    icon: "x",
  },
  {
    label: "Throne",
    sublabel: "My wishlist · spoil me",
    href: "https://throne.com/nattashaxo",
    brand: "#8A6BF2",
    icon: "throne",
    tag: "Gifts",
  },
  {
    label: "Spotify",
    sublabel: "My profile & playlist",
    href: "https://open.spotify.com/intl-es/artist/3x0Ca07RuqA3CX4MDEfd6E",
    brand: "#1ED760",
    icon: "spotify",
    tag: "Music",
  },
];
