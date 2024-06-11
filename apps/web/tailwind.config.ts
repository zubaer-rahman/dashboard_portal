import type { Config } from "tailwindcss";
const sharedConfig = require("@repo/tailwind-config");
const config: Config = {
  ...sharedConfig,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
