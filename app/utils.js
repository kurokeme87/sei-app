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
