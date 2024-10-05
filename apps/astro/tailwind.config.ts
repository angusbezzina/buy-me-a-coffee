import sharedConfig from "@repo/styles/tailwind.config.ts";
import type { Config } from "tailwindcss";

// NOTE: We need to include the UI package's content to make sure that Tailwind can properly extend the existing styles.
const config: Pick<Config, "content"> = {
  ...sharedConfig,
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
};

export default config;
