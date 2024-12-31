export function timeStringToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(":");
  const totalSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);

  return totalSeconds;
}

export function shortenAddressSmall(address, startLength = 4, endLength = 4) {
  if (!address) return "";

  // Ensure the address is long enough
  if (address.length <= startLength + endLength) {
    return address; // Return the original address if it's too short
  }

  const start = address.slice(0, startLength); // Take the first `startLength` characters
  const end = address.slice(-endLength); // Take the last `endLength` characters

  return `${start}....${end}`; // Join with dots in between
}

export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount == null) {
    amount = 0;
  }

  const roundedAmount = Math.ceil(amount * 100) / 100;
  return roundedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
};

export const formatCurrency2 = (amount) => {
  if (isNaN(amount) || amount == null) {
    amount = 0;
  }

  const roundedAmount = Math.ceil(amount * 100) / 100;

  return roundedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 0, // Avoids showing unnecessary trailing zeros
    maximumFractionDigits: 3, // Keeps up to 3 decimal places if present
  });
};

export const formattedDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
