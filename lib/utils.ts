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

export const truncateText = (name: string, length: number): string => {
  if (name.length > length) {
    return name.slice(0, length) + "...";
  } else {
    return name;
  }
};

export function shortenAddress(address, startLength = 6, endLength = 10) {
  if (!address) return "";

  // Ensure the address is long enough
  if (address.length <= startLength + endLength) {
    return address; // Return the original address if it's too short
  }

  const start = address.slice(0, startLength); // Take the first `startLength` characters
  const end = address.slice(-endLength); // Take the last `endLength` characters

  return `${start}....${end}`; // Join with dots in between
}
