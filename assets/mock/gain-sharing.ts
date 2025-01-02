import type { GainSharingData } from "../types/gain-sharing";
import { MockDivisionList, MockEmployeeList } from "./company";

export const mockKpiKaryawan = [
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "57.71",
  "No": "1",
  "Karyawan": "Karyawan 1",
  "Jabatan": "Business Development Officer",
  "Departemen": "Business Development",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "53.00",
  "No": "2",
  "Karyawan": "Karyawan 2",
  "Jabatan": "Business Development Officer",
  "Departemen": "Business Development",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "100.00",
  "2022": "95.22",
  "2023": "53.36",
  "No": "3",
  "Karyawan": "Karyawan 3",
  "Jabatan": "AVP Business Development",
  "Departemen": "Business Development",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "89.5",
  "2022": "33.57",
  "2023": "110.00",
  "No": "4",
  "Karyawan": "Karyawan 4",
  "Jabatan": "VP Business Development & Planning",
  "Departemen": "Business Development & Planning",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "89.5",
  "2022": "69.17",
  "2023": "99.00",
  "No": "5",
  "Karyawan": "Karyawan 5",
  "Jabatan": "Project Planning Officer",
  "Departemen": "Project Planning",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "89.5",
  "2022": "60.09",
  "2023": "89.00",
  "No": "6",
  "Karyawan": "Karyawan 6",
  "Jabatan": "Project Planning Officer",
  "Departemen": "Project Planning",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "89.5",
  "2022": "33.57",
  "2023": "88.00",
  "No": "7",
  "Karyawan": "Karyawan 7",
  "Jabatan": "Project Planning Officer",
  "Departemen": "Project Planning",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "75.00",
  "2022": "67.09",
  "2023": "110.00",
  "No": "8",
  "Karyawan": "Karyawan 8",
  "Jabatan": "AVP Project Planning",
  "Departemen": "Project Planning",
  "Divisi": "Business Development & Planning"
},
{
  "2021": "99.00",
  "2022": "95.02",
  "2023": "95.62",
  "No": "9",
  "Karyawan": "Karyawan 9",
  "Jabatan": "AVP Corp. Health, Safety & Environment",
  "Departemen": "Corporate Health, Safety & Environment",
  "Divisi": "Corporate Health, Safety & Environment"
},
{
  "2021": "89.5",
  "2022": "100.82",
  "2023": "95.67",
  "No": "10",
  "Karyawan": "Karyawan 10",
  "Jabatan": "Environment Officer",
  "Departemen": "Corporate Health, Safety & Environment",
  "Divisi": "Corporate Health, Safety & Environment"
},
{
  "2021": "89.5",
  "2022": "96.12",
  "2023": "97.00",
  "No": "11",
  "Karyawan": "Karyawan 11",
  "Jabatan": "Environment Officer",
  "Departemen": "Corporate Health, Safety & Environment",
  "Divisi": "Corporate Health, Safety & Environment"
},
{
  "2021": "89.5",
  "2022": "95.88",
  "2023": "96.00",
  "No": "12",
  "Karyawan": "Karyawan 12",
  "Jabatan": "Health & Safety Officer",
  "Departemen": "Corporate Health, Safety & Environment",
  "Divisi": "Corporate Health, Safety & Environment"
},
{
  "2021": "100.00",
  "2022": "96.51",
  "2023": "95.44",
  "No": "13",
  "Karyawan": "Karyawan 13",
  "Jabatan": "Health & Safety Officer",
  "Departemen": "Corporate Health, Safety & Environment",
  "Divisi": "Corporate Health, Safety & Environment"
},
{
  "2021": "98.00",
  "2022": "61.84",
  "2023": "98.00",
  "No": "14",
  "Karyawan": "Karyawan 14",
  "Jabatan": "AVP Litigation & Non Litigation",
  "Departemen": "Litigation & Non-Litigation",
  "Divisi": "Corporate Legal"
},
{
  "2021": "98.00",
  "2022": "67.67",
  "2023": "94.00",
  "No": "15",
  "Karyawan": "Karyawan 15",
  "Jabatan": "Corporate Legal Officer (Litigation)",
  "Departemen": "Litigation & Non-Litigation",
  "Divisi": "Corporate Legal"
},
{
  "2021": "98.00",
  "2022": "67.82",
  "2023": "95.00",
  "No": "16",
  "Karyawan": "Karyawan 16",
  "Jabatan": "Corporate Legal Officer (Litigation)",
  "Departemen": "Litigation & Non-Litigation",
  "Divisi": "Corporate Legal"
},
{
  "2021": "89.5",
  "2022": "67.04",
  "2023": "90.00",
  "No": "17",
  "Karyawan": "Karyawan 17",
  "Jabatan": "Corporate Legal Officer (Litigation)",
  "Departemen": "Litigation & Non-Litigation",
  "Divisi": "Corporate Legal"
},
{
  "2021": "100.00",
  "2022": "68.30",
  "2023": "93.00",
  "No": "18",
  "Karyawan": "Karyawan 18",
  "Jabatan": "Corporate Regulation Officer (Non Litigation)",
  "Departemen": "Litigation & Non-Litigation",
  "Divisi": "Corporate Legal"
},
{
  "2021": "94.00",
  "2022": "64.24",
  "2023": "86.00",
  "No": "19",
  "Karyawan": "Karyawan 19",
  "Jabatan": "Ketua Tim Sertifikasi Pertanahan",
  "Departemen": "Tim Sertifikasi Pertanahan",
  "Divisi": "Corporate Legal"
},
{
  "2021": "99.00",
  "2022": "55.20",
  "2023": "86.00",
  "No": "20",
  "Karyawan": "Karyawan 20",
  "Jabatan": "Tim Sertifikasi Pertanahan",
  "Departemen": "Tim Sertifikasi Pertanahan",
  "Divisi": "Corporate Legal"
},
{
  "2021": "95.00",
  "2022": "66.30",
  "2023": "97.00",
  "No": "21",
  "Karyawan": "Karyawan 21",
  "Jabatan": "VP Corporate Legal",
  "Departemen": "Corporate Legal",
  "Divisi": "Corporate Legal"
},
{
  "2021": "100.00",
  "2022": "68.09",
  "2023": "110.00",
  "No": "22",
  "Karyawan": "Karyawan 22",
  "Jabatan": "AVP Corporate Communication & TJSL",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "78.86",
  "2023": "110.00",
  "No": "23",
  "Karyawan": "Karyawan 23",
  "Jabatan": "AVP Corporate Communication & TJSL",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "110.00",
  "No": "24",
  "Karyawan": "Karyawan 24",
  "Jabatan": "Corporate Communication Officer",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "72.86",
  "2023": "110.00",
  "No": "25",
  "Karyawan": "Karyawan 25",
  "Jabatan": "Corporate Communication Officer",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "94.00",
  "2022": "64.78",
  "2023": "110.00",
  "No": "26",
  "Karyawan": "Karyawan 26",
  "Jabatan": "TJSL Officer",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "94.00",
  "2022": "66.79",
  "2023": "110.00",
  "No": "27",
  "Karyawan": "Karyawan 27",
  "Jabatan": "TJSL Officer",
  "Departemen": "Corporate Communication & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "62.00",
  "2022": "51.97",
  "2023": "94.00",
  "No": "28",
  "Karyawan": "Karyawan 28",
  "Jabatan": "VP Corporate Secretary & TJSL",
  "Departemen": "Corporate Secretary & TJSL",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "79.62",
  "2023": "100.00",
  "No": "29",
  "Karyawan": "Karyawan 29",
  "Jabatan": "Administration Management Officer",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "89.5",
  "2022": "61.43",
  "2023": "100.00",
  "No": "30",
  "Karyawan": "Karyawan 30",
  "Jabatan": "Administration Management Officer",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "65.57",
  "2023": "100.00",
  "No": "31",
  "Karyawan": "Karyawan 31",
  "Jabatan": "Administration Management Officer",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "98.00",
  "2022": "98.57",
  "2023": "60.00",
  "No": "32",
  "Karyawan": "Karyawan 32",
  "Jabatan": "AVP Secretarial & Administration",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "71.62",
  "2023": "100.00",
  "No": "33",
  "Karyawan": "Karyawan 33",
  "Jabatan": "Secretarial",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "88.37",
  "2023": "100.00",
  "No": "34",
  "Karyawan": "Karyawan 34",
  "Jabatan": "Secretarial",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "78.00",
  "2022": "95.88",
  "2023": "100.00",
  "No": "35",
  "Karyawan": "Karyawan 35",
  "Jabatan": "Secretarial",
  "Departemen": "Secretarial & Administration",
  "Divisi": "Corporate Secretary & TJSL"
},
{
  "2021": "100.00",
  "2022": "62.82",
  "2023": "60.00",
  "No": "36",
  "Karyawan": "Karyawan 36",
  "Jabatan": "Security & Traffic Management Officer",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "100.00",
  "2022": "48.12",
  "2023": "98.00",
  "No": "37",
  "Karyawan": "Karyawan 37",
  "Jabatan": "Security & Traffic Management Officer",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "89.5",
  "2022": "67.53",
  "2023": "94.00",
  "No": "38",
  "Karyawan": "Karyawan 38",
  "Jabatan": "Security & Traffic Management Officer",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "51.00",
  "2022": "35.57",
  "2023": "110.00",
  "No": "39",
  "Karyawan": "Karyawan 39",
  "Jabatan": "Security & Traffic Management Officer",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "85.00",
  "2022": "91.37",
  "2023": "86.00",
  "No": "40",
  "Karyawan": "Karyawan 40",
  "Jabatan": "AVP Corp. Security & Traffic Management",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "53.00",
  "No": "41",
  "Karyawan": "Karyawan 41",
  "Jabatan": "Security & Traffic Management Officer",
  "Departemen": "Corporate Security & Traffic Management",
  "Divisi": "Corporate Security & Traffic Management"
},
{
  "2021": "100.00",
  "2022": "92.86",
  "2023": "96.29",
  "No": "42",
  "Karyawan": "Karyawan 42",
  "Jabatan": "AVP Corporate Performance Monitoring Specialist",
  "Departemen": "Corporate Performance Monitoring Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "100.00",
  "2022": "69.57",
  "2023": "98.77",
  "No": "43",
  "Karyawan": "Karyawan 43",
  "Jabatan": "Corporate Performance Monitoring Junior",
  "Departemen": "Corporate Performance Monitoring Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "89.5",
  "2022": "83.30",
  "2023": "95.00",
  "No": "44",
  "Karyawan": "Karyawan 44",
  "Jabatan": "Corporate Performance Monitoring Junior",
  "Departemen": "Corporate Performance Monitoring Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "100.00",
  "2022": "90.57",
  "2023": "98.77",
  "No": "45",
  "Karyawan": "Karyawan 45",
  "Jabatan": "Corporate Planning Specialist",
  "Departemen": "Corporate Planning Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "100.00",
  "2022": "65.52",
  "2023": "110.00",
  "No": "46",
  "Karyawan": "Karyawan 46",
  "Jabatan": "Corporate Planning Specialist",
  "Departemen": "Corporate Planning Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "100.00",
  "2022": "66.60",
  "2023": "97.03",
  "No": "47",
  "Karyawan": "Karyawan 47",
  "Jabatan": "Corporate Planning Specialist Junior",
  "Departemen": "Corporate Planning Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "89.5",
  "2022": "62.82",
  "2023": "93.90",
  "No": "48",
  "Karyawan": "Karyawan 48",
  "Jabatan": "Corporate Planning Specialist Junior",
  "Departemen": "Corporate Planning Specialist",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "84.00",
  "2022": "65.59",
  "2023": "97.00",
  "No": "49",
  "Karyawan": "Karyawan 49",
  "Jabatan": "Corporate Performance Monitoring Specialist",
  "Departemen": "Corporate Strategy & Planning",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "99.00",
  "2022": "97.73",
  "2023": "105.00",
  "No": "50",
  "Karyawan": "Karyawan 50",
  "Jabatan": "VP Corporate Strategy & Planning",
  "Departemen": "Corporate Strategy & Planning",
  "Divisi": "Corporate Strategy & Planning"
},
{
  "2021": "89.5",
  "2022": "53.57",
  "2023": "110.00",
  "No": "51",
  "Karyawan": "Karyawan 51",
  "Jabatan": "Accounting & Financial Analyst Officer",
  "Departemen": "Accounting & Tax",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "53.57",
  "2023": "110.00",
  "No": "52",
  "Karyawan": "Karyawan 52",
  "Jabatan": "Accounting & Financial Analyst Officer",
  "Departemen": "Accounting & Tax",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "71.57",
  "2023": "110.00",
  "No": "53",
  "Karyawan": "Karyawan 53",
  "Jabatan": "AVP Accounting & Tax",
  "Departemen": "Accounting & Tax",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "89.5",
  "2022": "53.57",
  "2023": "110.00",
  "No": "54",
  "Karyawan": "Karyawan 54",
  "Jabatan": "Tax Officer",
  "Departemen": "Accounting & Tax",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "89.5",
  "2022": "53.57",
  "2023": "110.00",
  "No": "55",
  "Karyawan": "Karyawan 55",
  "Jabatan": "Tax Officer",
  "Departemen": "Accounting & Tax",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "53.57",
  "2023": "110.00",
  "No": "56",
  "Karyawan": "Karyawan 56",
  "Jabatan": "VP Finance & Accounting",
  "Departemen": "Finance & Accounting",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "54.30",
  "2023": "110.00",
  "No": "57",
  "Karyawan": "Karyawan 57",
  "Jabatan": "AVP Finance & Treasury",
  "Departemen": "Finance & Treasury",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "61.32",
  "2023": "91.00",
  "No": "58",
  "Karyawan": "Karyawan 58",
  "Jabatan": "Investment & Financial Risk Officer",
  "Departemen": "Finance & Treasury",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "89.5",
  "2022": "54.30",
  "2023": "110.00",
  "No": "59",
  "Karyawan": "Karyawan 59",
  "Jabatan": "Payment & Verification Officer",
  "Departemen": "Finance & Treasury",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "54.30",
  "2023": "110.00",
  "No": "60",
  "Karyawan": "Karyawan 60",
  "Jabatan": "Payment & Verification Officer",
  "Departemen": "Finance & Treasury",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "54.30",
  "2023": "110.00",
  "No": "61",
  "Karyawan": "Karyawan 61",
  "Jabatan": "Payment & Verification Officer",
  "Departemen": "Finance & Treasury",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "100.00",
  "2022": "66.03",
  "2023": "110.00",
  "No": "62",
  "Karyawan": "Karyawan 62",
  "Jabatan": "Ketua Tim Pengelolaan Aset & Piutang Macet",
  "Departemen": "Tim Pengelolaan Aset & Piutang Macet",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "73.00",
  "2022": "62.47",
  "2023": "97.00",
  "No": "63",
  "Karyawan": "Karyawan 63",
  "Jabatan": "Tim Pengelolaan Aset & Piutang Macet",
  "Departemen": "Tim Pengelolaan Aset & Piutang Macet",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "92.00",
  "2022": "61.65",
  "2023": "100.00",
  "No": "64",
  "Karyawan": "Karyawan 64",
  "Jabatan": "Tim Pengelolaan Aset & Piutang Macet",
  "Departemen": "Tim Pengelolaan Aset & Piutang Macet",
  "Divisi": "Finance & Accounting"
},
{
  "2021": "96.00",
  "2022": "104.18",
  "2023": "95.45",
  "No": "65",
  "Karyawan": "Karyawan 65",
  "Jabatan": "AVP Human Capital Development",
  "Departemen": "Human Capital Development",
  "Divisi": "Human Capital Management"
},
{
  "2021": "100.00",
  "2022": "54.30",
  "2023": "110.00",
  "No": "66",
  "Karyawan": "Karyawan 66",
  "Jabatan": "AVP Human Capital Development",
  "Departemen": "Human Capital Development",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "94.55",
  "No": "67",
  "Karyawan": "Karyawan 67",
  "Jabatan": "HC Utilization Officer",
  "Departemen": "Human Capital Development",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89.5",
  "2022": "60.00",
  "2023": "96.05",
  "No": "68",
  "Karyawan": "Karyawan 68",
  "Jabatan": "Human Capital Development Officer",
  "Departemen": "Human Capital Development",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "110.00",
  "No": "69",
  "Karyawan": "Karyawan 69",
  "Jabatan": "VP Human Capital Management",
  "Departemen": "Human Capital Management",
  "Divisi": "Human Capital Management"
},
{
  "2021": "83.00",
  "2022": "85.60",
  "2023": "100.00",
  "No": "70",
  "Karyawan": "Karyawan 70",
  "Jabatan": "AVP Organization & Human Capital Services",
  "Departemen": "Organization & HC Services",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89.5",
  "2022": "82.40",
  "2023": "102.00",
  "No": "71",
  "Karyawan": "Karyawan 71",
  "Jabatan": "HC Services Officer",
  "Departemen": "Organization & HC Services",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89.5",
  "2022": "60.00",
  "2023": "86.00",
  "No": "72",
  "Karyawan": "Karyawan 72",
  "Jabatan": "Organization & Culture Officer",
  "Departemen": "Organization & HC Services",
  "Divisi": "Human Capital Management"
},
{
  "2021": "89",
  "2022": "96.66",
  "2023": "97.2",
  "No": "73",
  "Karyawan": "Karyawan 73",
  "Jabatan": "Transformasi Organisasi Specialist",
  "Departemen": "Transformasi Organisasi Specialist",
  "Divisi": "Human Capital Management"
},
{
  "2021": "100.00",
  "2022": "69.77",
  "2023": "95.00",
  "No": "74",
  "Karyawan": "Karyawan 74",
  "Jabatan": "AVP General Affairs",
  "Departemen": "General Affairs",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "86.00",
  "2022": "69.17",
  "2023": "98.00",
  "No": "75",
  "Karyawan": "Karyawan 75",
  "Jabatan": "General Affairs Officer",
  "Departemen": "General Affairs",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "89.5",
  "2022": "69.17",
  "2023": "97.00",
  "No": "76",
  "Karyawan": "Karyawan 76",
  "Jabatan": "Logistic & Asset Management Officer",
  "Departemen": "General Affairs",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "96.00",
  "2022": "98.57",
  "2023": "110.00",
  "No": "77",
  "Karyawan": "Karyawan 77",
  "Jabatan": "Logistic & Asset Management Officer",
  "Departemen": "General Affairs",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "81.00",
  "2022": "53.28",
  "2023": "91.00",
  "No": "78",
  "Karyawan": "Karyawan 78",
  "Jabatan": "AVP Information Technology",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "89.5",
  "2022": "52.90",
  "2023": "100.00",
  "No": "79",
  "Karyawan": "Karyawan 79",
  "Jabatan": "Information Technology Application & System Officer",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "86.00",
  "2022": "53.34",
  "2023": "94.00",
  "No": "80",
  "Karyawan": "Karyawan 80",
  "Jabatan": "Information Technology Application & System Officer",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "100.00",
  "2022": "53.57",
  "2023": "100.00",
  "No": "81",
  "Karyawan": "Karyawan 81",
  "Jabatan": "Information Technology Application & System Officer",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "100.00",
  "No": "82",
  "Karyawan": "Karyawan 82",
  "Jabatan": "IT Infrastructure & Data Officer",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "100.00",
  "No": "83",
  "Karyawan": "Karyawan 83",
  "Jabatan": "IT Infrastructure & Data Officer",
  "Departemen": "Information Technology",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "100.00",
  "2022": "78.65",
  "2023": "101.26",
  "No": "84",
  "Karyawan": "Karyawan 84",
  "Jabatan": "VP Information Technology & General Affairs",
  "Departemen": "Information Technology & General Affairs",
  "Divisi": "Information Technology & General Affairs"
},
{
  "2021": "94.00",
  "2022": "64.24",
  "2023": "86.00",
  "No": "85",
  "Karyawan": "Karyawan 85",
  "Jabatan": "AVP Industrial Estate",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "60.00",
  "2023": "96.00",
  "No": "86",
  "Karyawan": "Karyawan 86",
  "Jabatan": "Estate Officer",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "98.00",
  "2022": "61.38",
  "2023": "97.00",
  "No": "87",
  "Karyawan": "Karyawan 87",
  "Jabatan": "Estate Officer",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "97.00",
  "2022": "66.12",
  "2023": "88.00",
  "No": "88",
  "Karyawan": "Karyawan 88",
  "Jabatan": "Industrial Estate Monitoring Evaluation Officer",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "82.00",
  "2022": "67.22",
  "2023": "104.00",
  "No": "89",
  "Karyawan": "Karyawan 89",
  "Jabatan": "Industrial Estate Monitoring Evaluation Officer",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "33.57",
  "2023": "96.00",
  "No": "90",
  "Karyawan": "Karyawan 90",
  "Jabatan": "Industrial Estate Monitoring Evaluation Officer",
  "Departemen": "Industrial Estate",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "85.32",
  "2023": "87.17",
  "No": "91",
  "Karyawan": "Karyawan 91",
  "Jabatan": "VP Integrated Estate Management",
  "Departemen": "Integrated Estate Management",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "97.00",
  "2022": "63.71",
  "2023": "85.00",
  "No": "92",
  "Karyawan": "Karyawan 92",
  "Jabatan": "AVP Property Retail",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "58.96",
  "No": "93",
  "Karyawan": "Karyawan 93",
  "Jabatan": "Property Monitoring Evaluation Officer",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "88.00",
  "2022": "66.19",
  "2023": "110.00",
  "No": "94",
  "Karyawan": "Karyawan 94",
  "Jabatan": "Property Monitoring Evaluation Officer",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "65.89",
  "2023": "83.00",
  "No": "95",
  "Karyawan": "Karyawan 95",
  "Jabatan": "Property Officer",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "97.00",
  "2022": "65.16",
  "2023": "87.00",
  "No": "96",
  "Karyawan": "Karyawan 96",
  "Jabatan": "Property Officer",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "61.69",
  "2023": "110.00",
  "No": "97",
  "Karyawan": "Karyawan 97",
  "Jabatan": "Property Officer",
  "Departemen": "Property & Retail",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "63.23",
  "2023": "86.00",
  "No": "98",
  "Karyawan": "Karyawan 98",
  "Jabatan": "Retail Business Officer",
  "Departemen": "Retail Business",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "88.00",
  "2022": "66.19",
  "2023": "110.00",
  "No": "99",
  "Karyawan": "Karyawan 99",
  "Jabatan": "Retail Business Officer",
  "Departemen": "Retail Business",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "110.00",
  "No": "100",
  "Karyawan": "Karyawan 100",
  "Jabatan": "AVP Utility & Infrastructure",
  "Departemen": "Utility & Infrastructure",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "50.01",
  "2023": "93.00",
  "No": "101",
  "Karyawan": "Karyawan 101",
  "Jabatan": "Utility & Infrastructure Monitoring Evaluation Officer",
  "Departemen": "Utility & Infrastructure",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "100.00",
  "2022": "50.10",
  "2023": "93.00",
  "No": "102",
  "Karyawan": "Karyawan 102",
  "Jabatan": "Utility & Infrastructure Monitoring Evaluation Officer",
  "Departemen": "Utility & Infrastructure",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "64.44",
  "2023": "100.00",
  "No": "103",
  "Karyawan": "Karyawan 103",
  "Jabatan": "Utility & Infrastructure Officer",
  "Departemen": "Utility & Infrastructure",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "66.75",
  "2023": "94.00",
  "No": "104",
  "Karyawan": "Karyawan 104",
  "Jabatan": "Utility & Infrastructure Officer",
  "Departemen": "Utility & Infrastructure",
  "Divisi": "Integrated Estate Management"
},
{
  "2021": "89.5",
  "2022": "95.87",
  "2023": "103.00",
  "No": "105",
  "Karyawan": "Karyawan 105",
  "Jabatan": "VP Internal Audit",
  "Departemen": "Internal Audit",
  "Divisi": "Internal Audit"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "97.00",
  "No": "106",
  "Karyawan": "Karyawan 106",
  "Jabatan": "Auditor",
  "Departemen": "Internal Audit",
  "Divisi": "Internal Audit"
},
{
  "2021": "67.00",
  "2022": "96.67",
  "2023": "97.00",
  "No": "107",
  "Karyawan": "Karyawan 107",
  "Jabatan": "Auditor",
  "Departemen": "Internal Audit",
  "Divisi": "Internal Audit"
},
{
  "2021": "75.00",
  "2022": "97.47",
  "2023": "97.00",
  "No": "108",
  "Karyawan": "Karyawan 108",
  "Jabatan": "Auditor",
  "Departemen": "Internal Audit",
  "Divisi": "Internal Audit"
},
{
  "2021": "72.00",
  "2022": "97.47",
  "2023": "100.00",
  "No": "109",
  "Karyawan": "Karyawan 109",
  "Jabatan": "Auditor",
  "Departemen": "Internal Audit",
  "Divisi": "Internal Audit"
},
{
  "2021": "51.00",
  "2022": "68.32",
  "2023": "102.00",
  "No": "110",
  "Karyawan": "Karyawan 110",
  "Jabatan": "VP IT, Facility & Maintenance",
  "Departemen": "IT, Facility & Maintenance",
  "Divisi": "IT, Facility & Maintenance"
},
{
  "2021": "100.00",
  "2022": "64.17",
  "2023": "97.14",
  "No": "111",
  "Karyawan": "Karyawan 111",
  "Jabatan": "AVP Management System & Compliance",
  "Departemen": "Management System & Compliance",
  "Divisi": "Management System & Compliance"
},
{
  "2021": "97.00",
  "2022": "46.74",
  "2023": "84.00",
  "No": "112",
  "Karyawan": "Karyawan 112",
  "Jabatan": "Management System & Compliance Officer",
  "Departemen": "Management System & Compliance",
  "Divisi": "Management System & Compliance"
},
{
  "2021": "88.00",
  "2022": "63.97",
  "2023": "97.14",
  "No": "113",
  "Karyawan": "Karyawan 113",
  "Jabatan": "Management System & Compliance Officer",
  "Departemen": "Management System & Compliance",
  "Divisi": "Management System & Compliance"
},
{
  "2021": "100.00",
  "2022": "67.75",
  "2023": "96.00",
  "No": "114",
  "Karyawan": "Karyawan 114",
  "Jabatan": "AVP Estate Sales",
  "Departemen": "Estate Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "68.57",
  "2023": "110.00",
  "No": "115",
  "Karyawan": "Karyawan 115",
  "Jabatan": "Estate Sales Executive",
  "Departemen": "Estate Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "68.57",
  "2023": "110.00",
  "No": "116",
  "Karyawan": "Karyawan 116",
  "Jabatan": "Estate Sales Executive",
  "Departemen": "Estate Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "70.17",
  "2023": "110.00",
  "No": "117",
  "Karyawan": "Karyawan 117",
  "Jabatan": "Estate Sales Executive",
  "Departemen": "Estate Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "68.97",
  "2023": "110.00",
  "No": "118",
  "Karyawan": "Karyawan 118",
  "Jabatan": "Estate Sales Executive",
  "Departemen": "Estate Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "98.57",
  "2023": "110.00",
  "No": "119",
  "Karyawan": "Karyawan 119",
  "Jabatan": "AVP Marketing & Customer Relation Management",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "65.39",
  "2023": "73.00",
  "No": "120",
  "Karyawan": "Karyawan 120",
  "Jabatan": "Client Relation Officer",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "66.19",
  "2023": "98.30",
  "No": "121",
  "Karyawan": "Karyawan 121",
  "Jabatan": "General CS Officer",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "60.00",
  "2022": "60.00",
  "2023": "99.70",
  "No": "122",
  "Karyawan": "Karyawan 122",
  "Jabatan": "General CS Officer",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "97.97",
  "2023": "108.00",
  "No": "123",
  "Karyawan": "Karyawan 123",
  "Jabatan": "Product & Marketing Officer",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "96.00",
  "2022": "98.57",
  "2023": "105.00",
  "No": "124",
  "Karyawan": "Karyawan 124",
  "Jabatan": "Product & Marketing Officer",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "54.12",
  "2023": "110.00",
  "No": "125",
  "Karyawan": "Karyawan 125",
  "Jabatan": "VP Marketing & Sales",
  "Departemen": "Marketing & CRM",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "69.12",
  "2023": "96.00",
  "No": "126",
  "Karyawan": "Karyawan 126",
  "Jabatan": "AVP Property Sales",
  "Departemen": "Property Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "89.5",
  "2023": "73.00",
  "No": "127",
  "Karyawan": "Karyawan 127",
  "Jabatan": "Property Sales Executive",
  "Departemen": "Property Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "67.45",
  "2023": "87.00",
  "No": "128",
  "Karyawan": "Karyawan 128",
  "Jabatan": "Property Sales Executive",
  "Departemen": "Property Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "69.67",
  "2023": "100.00",
  "No": "129",
  "Karyawan": "Karyawan 129",
  "Jabatan": "Property Sales Executive",
  "Departemen": "Property Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "89.5",
  "2022": "69.67",
  "2023": "98.00",
  "No": "130",
  "Karyawan": "Karyawan 130",
  "Jabatan": "Property Sales Executive",
  "Departemen": "Property Sales",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "98.00",
  "2022": "69.92",
  "2023": "110.00",
  "No": "131",
  "Karyawan": "Karyawan 131",
  "Jabatan": "AVP Retail Business",
  "Departemen": "Retail Business",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "64.68",
  "2023": "100.00",
  "No": "132",
  "Karyawan": "Karyawan 132",
  "Jabatan": "Retail Business Officer",
  "Departemen": "Retail Business",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "33.57",
  "2023": "100.00",
  "No": "133",
  "Karyawan": "Karyawan 133",
  "Jabatan": "Retail Business Officer",
  "Departemen": "Retail Business",
  "Divisi": "Marketing & Sales"
},
{
  "2021": "100.00",
  "2022": "68.77",
  "2023": "99.00",
  "No": "134",
  "Karyawan": "Karyawan 134",
  "Jabatan": "Procurement Officer",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "89.5",
  "2022": "61.69",
  "2023": "110.00",
  "No": "135",
  "Karyawan": "Karyawan 135",
  "Jabatan": "Procurement Monitoring Evaluation Officer",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "100.00",
  "2022": "61.69",
  "2023": "110.00",
  "No": "136",
  "Karyawan": "Karyawan 136",
  "Jabatan": "Procurement Officer",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "100.00",
  "2022": "61.69",
  "2023": "110.00",
  "No": "137",
  "Karyawan": "Karyawan 137",
  "Jabatan": "Procurement Officer",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "100.00",
  "2022": "79.35",
  "2023": "110.00",
  "No": "138",
  "Karyawan": "Karyawan 138",
  "Jabatan": "AVP Procurement",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "100.00",
  "2022": "61.69",
  "2023": "110.00",
  "No": "139",
  "Karyawan": "Karyawan 139",
  "Jabatan": "Procurement Officer",
  "Departemen": "Procurement",
  "Divisi": "Procurement"
},
{
  "2021": "82.00",
  "2022": "66.36",
  "2023": "110.00",
  "No": "140",
  "Karyawan": "Karyawan 140",
  "Jabatan": "AVP Quality Assurance",
  "Departemen": "Quality Assurance",
  "Divisi": "Quality Assurance"
},
{
  "2021": "100.00",
  "2022": "66.68",
  "2023": "86.00",
  "No": "141",
  "Karyawan": "Karyawan 141",
  "Jabatan": "Quality Assurance Operation Officer",
  "Departemen": "Quality Assurance",
  "Divisi": "Quality Assurance"
},
{
  "2021": "100.00",
  "2022": "66.50",
  "2023": "86.00",
  "No": "142",
  "Karyawan": "Karyawan 142",
  "Jabatan": "Quality Assurance Operation Officer",
  "Departemen": "Quality Assurance",
  "Divisi": "Quality Assurance"
},
{
  "2021": "100.00",
  "2022": "66.87",
  "2023": "86.00",
  "No": "143",
  "Karyawan": "Karyawan 143",
  "Jabatan": "Quality Assurance Operation Officer",
  "Departemen": "Quality Assurance",
  "Divisi": "Quality Assurance"
},
{
  "2021": "100.00",
  "2022": "93.77",
  "2023": "53.00",
  "No": "144",
  "Karyawan": "Karyawan 144",
  "Jabatan": "Quality Assurance Operation Officer",
  "Departemen": "Quality Assurance",
  "Divisi": "Quality Assurance"
},
{
  "2021": "75.00",
  "2022": "96.47",
  "2023": "103.00",
  "No": "145",
  "Karyawan": "Karyawan 145",
  "Jabatan": "AVP Risk Management",
  "Departemen": "Risk Management",
  "Divisi": "Risk Management"
},
{
  "2021": "89.5",
  "2022": "93.25",
  "2023": "103.00",
  "No": "146",
  "Karyawan": "Karyawan 146",
  "Jabatan": "Risk Management Officer",
  "Departemen": "Risk Management",
  "Divisi": "Risk Management"
},
{
  "2021": "100.00",
  "2022": "69.67",
  "2023": "110.00",
  "No": "147",
  "Karyawan": "Karyawan 147",
  "Jabatan": "Risk Management Officer",
  "Departemen": "Risk Management",
  "Divisi": "Risk Management"
}
]