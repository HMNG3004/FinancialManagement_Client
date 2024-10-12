export const NumberFormat = (value: number | undefined): string | undefined => {
  if (value === undefined) {
    return Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    }).format(0);
  }
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
