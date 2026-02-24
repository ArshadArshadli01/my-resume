import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || "https://arshadli.me";

const routes: RoutesConfig = {
  "/": true,
};

const display: DisplayConfig = {
  location: false,
  time: false,
  themeSwitcher: true,
};

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style: StyleConfig = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate | mint | rose | dusk | custom
  brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "red", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative | sharp
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    opacity: 100,
    x: 50,
    y: 60,
    width: 100,
    height: 50,
    tilt: 0,
    colorStart: "accent-background-strong",
    colorEnd: "page-background",
  },
  dots: {
    display: true,
    opacity: 40,
    size: "2",
    color: "brand-background-strong",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-medium",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

// default schema data
const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name:
    process.env.NEXT_PUBLIC_FIRST_NAME && process.env.NEXT_PUBLIC_LAST_NAME
      ? `${process.env.NEXT_PUBLIC_FIRST_NAME} ${process.env.NEXT_PUBLIC_LAST_NAME}`
      : "Arshad Arshadli",
  description: home.description,
  email: process.env.NEXT_PUBLIC_EMAIL || "arshad.arshadli02@gmail.com",
};

// social links
const sameAs: SameAsConfig = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "https://www.linkedin.com/in/arshadarshadli",
  github: process.env.NEXT_PUBLIC_GITHUB || "https://github.com/ArshadArshadli01",
};

export { display, routes, baseURL, fonts, style, schema, sameAs, effects, dataStyle };
