export type KPIPerusahaan = {
  id: string,
  name: string,
  value: number,
  target: number,
  kind: 'number'|'percentage'|'currency'|'day',
  lower_is_better?: boolean|null|undefined,
  related_indicator_ids: Array<string>,
  desc: string,
}

export type IndikatorProduktivitas = {
  id: string,
  name: string,
  value: number,
}