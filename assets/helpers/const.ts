export const USE_JIEP_DATA = process.env.USE_JIEP_DATA === 'true';
import namaDummy from '../nama_dummy.json';

export function namaKaryawan(s: string, index?: number): string {
  if (USE_JIEP_DATA) return s;
  
  
  // let blurred = 'Karyawan';
  // if (index !== undefined) {
  //   blurred += ` ${index}`
  // }

  let blurred = '';
  if (index !== undefined) {
    blurred += ` ${namaDummy[index]}`;
  }
  
  return blurred;
}