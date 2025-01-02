export type GainSharingData = {
  base_data: {
    tahun: number,
    nilai_tambah: number,
    rasio_nilai_tambah?: number|undefined,
    upah_dibayarkan: number,
    reserve_ratio?: number|undefined,
    koefisien_kontribusi?: number|undefined,
    gain_sharing?: number|undefined,
  },
  division_percentages: Array<{
    division_id: string,
    division_name: string,
    value: number,
  }>,
  employee_values: Array<{
    employee_id: string,
    division_id: string,
    employee_name: string,
    value: number,
  }>,
}