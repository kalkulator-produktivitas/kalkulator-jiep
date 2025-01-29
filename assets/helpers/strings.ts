import type { KPIPerusahaan } from "../types/kpi"
import { currency } from "./number"

export function formatKpi(value: number, kind: KPIPerusahaan['kind']): string {
  switch (kind) {
    case 'percentage':
      return `${value}%`
    case 'currency':
      return currency(value)
    case 'day':
      return `${value} hari`
    default:
      return `${value}`
  }
}