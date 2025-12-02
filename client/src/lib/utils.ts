import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ObjectOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isStringArray(
  options: string[] | ObjectOption[]
): options is string[] {
  return typeof options[0] === "string";
}