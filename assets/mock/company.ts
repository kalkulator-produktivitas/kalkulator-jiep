export type Division = {
  id: string,
  name: string,
}

export type Employee = {
  id: string,
  name: string,
  division_id: string,
}

export const MockDivisionList: Array<Division> = [
  { id: 'bizdev', name: 'Business Development & Planning' },
  { id: 'hse', name: 'Corporate Health, Safety & Environment' },
  { id: 'legal', name: 'Corporate Legal' },
  { id: 'secretary', name: 'Corporate Secretary & TJSL' },
  { id: 'security', name: 'Corporate Security & Traffic Management' },
  { id: 'strategy', name: 'Corporate Strategy & Planning' },
  { id: 'finacc', name: 'Finance & Accounting' },
  { id: 'hc', name: 'Human Capital Management' },
  { id: 'itga', name: 'Information Technology & General Affairs' },
  { id: 'estate', name: 'Integrated Estate Management' },
  { id: 'audit', name: 'Internal Audit' },
  { id: 'itfm', name: 'IT, Facility & Maintenance' },
  { id: 'system', name: 'Management System & Compliance' },
  { id: 'marketing', name: 'Marketing & Sales' },
  { id: 'procurement', name: 'Procurement' },
  { id: 'qa', name: 'Quality Assurance' },
  { id: 'risk', name: 'Risk Management' },
]

export const MockEmployeeList: Array<Employee> = [
  { id: '1', name: 'Karyawan 1', division_id: 'bizdev' },
  { id: '2', name: 'Karyawan 2', division_id: 'bizdev' },
  { id: '3', name: 'Karyawan 3', division_id: 'bizdev' },
  { id: '4', name: 'Karyawan 4', division_id: 'hse' },
  { id: '5', name: 'Karyawan 5', division_id: 'hse' },
]