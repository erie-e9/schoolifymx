interface FormatNumberOptions {
  separator?: ',' | '.';
  decimals?: number;
}

export const formatNumbers = (
  value: number,
  options: FormatNumberOptions = { separator: ',', decimals: 0 },
): string => {
  const { separator, decimals } = options;
  const parts = value.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
};
