import type { CountryOption } from "@/lib/types";

export const CURRENCY_OPTIONS = ["AED", "SAR", "USD", "EUR", "GBP", "CAD", "AUD"] as const;

export const COUNTRY_OPTIONS: CountryOption[] = [
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