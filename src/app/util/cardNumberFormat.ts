export const formatAndHideCardNumber = (cardNumber: string | undefined) => {
  if (cardNumber == null || cardNumber.length == 0)
    return;
  // Ensure the card number is valid and has the correct length
  if (cardNumber.length < 12) {
    return;
  }

  // Mask the middle part of the card number, keeping the first 4 and last 4 digits visible
  const firstPart = cardNumber.slice(0, 4);
  const lastPart = cardNumber.slice(-4);
  const maskedPart = '*'.repeat(cardNumber.length - 8);

  // Combine the parts
  const formattedCardNumber = `${firstPart}${maskedPart}${lastPart}`;

  // Add spaces every 4 characters for better readability
  return formattedCardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber;
}
