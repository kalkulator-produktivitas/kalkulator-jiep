const currencyFormat = new Intl.NumberFormat(
  'id-ID', 
  {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
);
const defaultNumberFormat = new Intl.NumberFormat(
  'id-ID',
)

export function currency(n: number): string {
  return currencyFormat.format(n);
}

export function formatNumber(n: number): string {
  return defaultNumberFormat.format(n);
}