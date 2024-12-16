import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: any, decimals: any): string {
  if (typeof amount !== "string") amount = amount.toString();

  // If amount contains a decimal
  if (amount.includes(".")) {
    const parts = amount.split(".");
    const fractionalPart = parts[1].replace(/^0+/, ""); // Remove leading zeros from fractional part
    const result = parts[0] + fractionalPart; // Append a zero at the end
    return result.replace(/^0+/, ""); // Remove leading zeros from the entire result
  } else {
    // If amount is an integer, append zeros
    return amount + "0".repeat(decimals);
  }
}
