import type { SelectOptions } from "@/lib/types";
import Github from "@/assets/svg/github";
import Discord from "@/assets/svg/discord";
import Google from "@/assets/svg/google";

export const CURRENCY_OPTIONS: SelectOptions[] = [
  { value: "AED", label: "د.إ AED" },
  { value: "SAR", label: "SAR ﷼" },
  { value: "USD", label: "$ USD" },
  { value: "EUR", label: "€ EUR" },
  { value: "GBP", label: "£ GBP" },
  { value: "CAD", label: "$ CAD" },
  { value: "AUD", label: "$ AUD" },
];

export const COUNTRY_OPTIONS: SelectOptions[] = [
  { value: "ae", label: "United Arab Emirates" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
];

export const OAuthProviders = [
  { provider: "google", Icon: <Google /> },
  { provider: "github", Icon: <Github /> },
  { provider: "discord", Icon: <Discord /> },
] as const;
