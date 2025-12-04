import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { SelectOptions } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isStringArray(
  options: string[] | SelectOptions[]
): options is string[] {
  return options.length > 0 && typeof options[0] === "string";
}