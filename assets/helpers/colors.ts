const BASE: number = 100;
const VARIANT: number = 100;

export function generateColors(count: number): Array<string> {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(BASE + Math.random() * VARIANT);
    const g = Math.floor(BASE + Math.random() * VARIANT);
    const b = Math.floor(BASE + Math.random() * VARIANT);
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }
  return colors;
}

export const ChartColors: Array<string> = [
  '#CDF1AE',
  '#90DACC',
  '#F7E9D1',
  '#F4D2B5',
  '#EAB7B7',
  '#B89ACF',
  '#EE7899',
  '#EE9CB8',
  '#EBE8BE',
  '#6B95DB',
  '#6844AD',
  '#9CC95C',
  '#F5D9BF',
  '#FCF6D5',
  '#6CBB7A',
  '#3284C2',
  '#6CCCC9',
];

export const DistinctColors: Array<string> = [
  '#32CD32',
  '#FFD700',
  '#00FFFF',
  '#1E90FF',
  '#DC143C',
  '#BDB76B',
  '#006400',
  '#FF6347',
  '#000080',
  '#F0E68C',
  '#FF1493',
  '#7FFF00',
  '#EE82EE',
];