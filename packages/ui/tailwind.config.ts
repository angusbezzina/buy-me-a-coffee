import sharedConfig from "@repo/styles/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "content"> = {
  ...sharedConfig,
  content: ["./src/**/*.{ts,tsx}"],
};

export default config;
