export const USE_JIEP_DATA = process.env.USE_JIEP_DATA === 'true';

export function namaKaryawan(s: string, index?: number): string {
  if (USE_JIEP_DATA) return s;
  let blurred = 'Karyawan';
  if (index !== undefined) {
    blurred += ` ${index}`
  }
  return blurred;
}