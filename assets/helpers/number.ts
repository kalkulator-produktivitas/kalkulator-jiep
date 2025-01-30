const currencyFormat = new Intl.NumberFormat(
  'id-ID', 
  {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
);
const defaultNumberFormat = new Intl.NumberFormat(
  'id-ID',
)

export function currency(n: number): string {
  return currencyFormat.format(Math.round(n));
}

export function formatNumber(n: number, digits?: number): string {
  const f = new Intl.NumberFormat(
    'id-ID',
    {
      maximumFractionDigits: digits,
    },
  )
  return f.format(n);
}