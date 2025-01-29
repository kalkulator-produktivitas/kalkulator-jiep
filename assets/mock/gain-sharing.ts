import { GAIN_SHARING_KARYAWAN_MULTIPLIER, namaKaryawan } from "../helpers/const";
import { mockLaporanAnalisis } from "./laporan";

const RAW_MOCK_KPI_KARYAWAN = [
  {
    "nama": "Abdul Malik Hidayatullah",
    "index": 1,
    "divisi": "Marketing & Sales",
    "departemen": "Property Sales",
    "jabatan": "Property Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 73,
        "target": 100
      }
    ]
  },
  {
    "nama": "Abdulrachman Putra Pamungkas",
    "index": 2,
    "divisi": "Marketing & Sales",
    "departemen": "Estate Sales",
    "jabatan": "AVP Estate Sales",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Achmad Alphadi",
    "index": 3,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "Property Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 58.96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ade Nila Candra",
    "index": 4,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Accounting",
    "jabatan": "VP Finance & Accounting",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Adi Hadiriyadi",
    "index": 5,
    "divisi": "Quality Assurance",
    "departemen": "Quality Assurance",
    "jabatan": "AVP Quality Assurance",
    "kpi": [
      {
        "tahun": 2021,
        "value": 82,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103.98,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Aditya Rachman",
    "index": 6,
    "divisi": "Internal Audit",
    "departemen": "Internal Audit",
    "jabatan": "VP Internal Audit",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 94,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 103,
        "target": 100
      }
    ]
  },
  {
    "nama": "Adriwan",
    "index": 7,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "Property Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 88,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Adwin Widriansyah",
    "index": 8,
    "divisi": "Marketing & Sales",
    "departemen": "Estate Sales",
    "jabatan": "Estate Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Afifah Alimah",
    "index": 9,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "Corporate Communication Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Agus Budiyanto, IR, MT",
    "index": 10,
    "divisi": "Integrated Estate Management",
    "departemen": "Integrated Estate Management",
    "jabatan": "VP Integrated Estate Management",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 87.17,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ahlanda Putra",
    "index": 11,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "IT Infrastructure & Data Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ajeng Dwi Lestari",
    "index": 12,
    "divisi": "Corporate Health, Safety & Environment",
    "departemen": "Corporate Health, Safety & Environment",
    "jabatan": "Environment Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95.67,
        "target": 100
      }
    ]
  },
  {
    "nama": "Aji Joko Laksono",
    "index": 13,
    "divisi": "Integrated Estate Management",
    "departemen": "Utility & Infrastructure",
    "jabatan": "Utility & Infrastructure Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 86.25,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ali Fahmi",
    "index": 14,
    "divisi": "Integrated Estate Management",
    "departemen": "Retail Business",
    "jabatan": "Retail Business Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 73.31,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ali Sulaeman",
    "index": 15,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "Property Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 95.5,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 83,
        "target": 100
      }
    ]
  },
  {
    "nama": "Amelia Noviani Prabowo",
    "index": 16,
    "divisi": "Marketing & Sales",
    "departemen": "Property Sales",
    "jabatan": "Property Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 94.44,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 87,
        "target": 100
      }
    ]
  },
  {
    "nama": "Anggian Gita Pertiwi",
    "index": 17,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "AVP Secretarial & Administration",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 60,
        "target": 100
      }
    ]
  },
  {
    "nama": "Anisa Apriliana",
    "index": 18,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Treasury",
    "jabatan": "Payment & Verification Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Anisa Firlyati",
    "index": 19,
    "divisi": "Human Capital Management",
    "departemen": "Organization & HC Services",
    "jabatan": "Organization & Culture Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Anisyah",
    "index": 20,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "Corporate Communication Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Anne Diana Yusrianti",
    "index": 21,
    "divisi": "Risk Management",
    "departemen": "Risk Management",
    "jabatan": "AVP Risk Management",
    "kpi": [
      {
        "tahun": 2021,
        "value": 75,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 103,
        "target": 100
      }
    ]
  },
  {
    "nama": "Annisa Aprianti",
    "index": 22,
    "divisi": "Corporate Legal",
    "departemen": "Litigation & Non-Litigation",
    "jabatan": "Corporate Legal Officer (Litigation)",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94,
        "target": 100
      }
    ]
  },
  {
    "nama": "Annisa Mutmainna Widiasari",
    "index": 23,
    "divisi": "Marketing & Sales",
    "departemen": "Estate Sales",
    "jabatan": "Estate Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ardin Syarif Telaumbanua",
    "index": 24,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Secretarial",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Argie Destri Rahmani",
    "index": 25,
    "divisi": "Finance & Accounting",
    "departemen": "Accounting & Tax",
    "jabatan": "Accounting & Financial Analyst Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Auria Oktaviani",
    "index": 26,
    "divisi": "Kepala Divisi Jiep Daya Sarana",
    "departemen": "Kepala Divisi Jiep Daya Sarana",
    "jabatan": "Kepala Divisi Jiep Daya Sarana",
    "kpi": [
      {
        "tahun": 2021,
        "value": 89,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 92.26,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97.2,
        "target": 100
      }
    ]
  },
  {
    "nama": "Basofi Masngud",
    "index": 27,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "Procurement Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 99,
        "target": 100
      }
    ]
  },
  {
    "nama": "Budi Lestari",
    "index": 28,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Secretarial",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Cholilawati",
    "index": 29,
    "divisi": "Marketing & Sales",
    "departemen": "Property Sales",
    "jabatan": "Property Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 105.53,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Christiono",
    "index": 30,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology & General Affairs",
    "jabatan": "VP Information Technology & General Affairs",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 101.26,
        "target": 100
      }
    ]
  },
  {
    "nama": "Dana Kristina",
    "index": 31,
    "divisi": "Marketing & Sales",
    "departemen": "Estate Sales",
    "jabatan": "Estate Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 108,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Defi Eka Nugraha",
    "index": 32,
    "divisi": "Quality Assurance",
    "departemen": "Quality Assurance",
    "jabatan": "Quality Assurance Operation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Della Rosa Handini",
    "index": 33,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Secretarial",
    "kpi": [
      {
        "tahun": 2021,
        "value": 78,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Dennis Andika Putra",
    "index": 34,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "IT Infrastructure & Data Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Deta Syafira Nikaputri",
    "index": 35,
    "divisi": "Corporate Health, Safety & Environment",
    "departemen": "Corporate Health, Safety & Environment",
    "jabatan": "Health & Safety Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Devi Ludfiani",
    "index": 36,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Administration Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Dian Rahmawati",
    "index": 37,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "General CS Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98.3,
        "target": 100
      }
    ]
  },
  {
    "nama": "Djudju Djubaedah",
    "index": 38,
    "divisi": "Integrated Estate Management",
    "departemen": "Retail Business",
    "jabatan": "Retail Business Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Dwi Nurseptyanto",
    "index": 39,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "Procurement Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Dwi Waluyo",
    "index": 40,
    "divisi": "Human Capital Management",
    "departemen": "Organization & HC Services",
    "jabatan": "AVP Organization & Human Capital Services",
    "kpi": [
      {
        "tahun": 2021,
        "value": 83,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 101,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Eka Riyana",
    "index": 41,
    "divisi": "Corporate Legal",
    "departemen": "Tim Sertifikasi Pertanahan",
    "jabatan": "Ketua Tim Sertifikasi Pertanahan",
    "kpi": [
      {
        "tahun": 2021,
        "value": 94,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 83.33,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ellief Shafira Harfiani",
    "index": 42,
    "divisi": "Human Capital Management",
    "departemen": "Human Capital Development",
    "jabatan": "HC Utilization Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94.55,
        "target": 100
      }
    ]
  },
  {
    "nama": "Emran Arsyan Prakoso",
    "index": 43,
    "divisi": "Management System & Compliance",
    "departemen": "Management System & Compliance",
    "jabatan": "Management System & Compliance Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 84,
        "target": 100
      }
    ]
  },
  {
    "nama": "Erlianti Indah Budiati",
    "index": 44,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "Product & Marketing Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 108,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ervida Prianti",
    "index": 45,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Strategy & Planning",
    "jabatan": "VP Corporate Strategy & Planning",
    "kpi": [
      {
        "tahun": 2021,
        "value": 99,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 107.81,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 105,
        "target": 100
      }
    ]
  },
  {
    "nama": "Eryza Ayu Erkhananda",
    "index": 46,
    "divisi": "Risk Management",
    "departemen": "Risk Management",
    "jabatan": "Risk Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 103,
        "target": 100
      }
    ]
  },
  {
    "nama": "Fadhilah Hanaisma",
    "index": 47,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Strategy & Planning",
    "jabatan": "Corporate Performance Monitoring Specialist",
    "kpi": [
      {
        "tahun": 2021,
        "value": 84,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Fairuz Tsany Aryanissa",
    "index": 48,
    "divisi": "Business Development & Planning",
    "departemen": "Project Planning",
    "jabatan": "Project Planning Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 99,
        "target": 100
      }
    ]
  },
  {
    "nama": "Fajar Winda Nastiti",
    "index": 49,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Planning Specialist",
    "jabatan": "Corporate Planning Specialist",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98.77,
        "target": 100
      }
    ]
  },
  {
    "nama": "Fandy Anugrah",
    "index": 50,
    "divisi": "Finance & Accounting",
    "departemen": "Accounting & Tax",
    "jabatan": "Tax Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Fathia Handayani Kamal",
    "index": 51,
    "divisi": "Integrated Estate Management",
    "departemen": "Utility & Infrastructure",
    "jabatan": "Utility & Infrastructure Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 97.08,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94,
        "target": 100
      }
    ]
  },
  {
    "nama": "Filyan Fery Anggriawan",
    "index": 52,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "AVP Property Retail",
    "kpi": [
      {
        "tahun": 2021,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 90.49,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 85,
        "target": 100
      }
    ]
  },
  {
    "nama": "Findita Ratna Kusumaningrum",
    "index": 53,
    "divisi": "Human Capital Management",
    "departemen": "Human Capital Management",
    "jabatan": "VP Human Capital Management",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Firda Fadhila",
    "index": 54,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Planning Specialist",
    "jabatan": "Corporate Planning Specialist Junior",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97.03,
        "target": 100
      }
    ]
  },
  {
    "nama": "Firman Wardiansyah",
    "index": 55,
    "divisi": "Corporate Legal",
    "departemen": "Litigation & Non-Litigation",
    "jabatan": "AVP Litigation & Non Litigation",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 71.77,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98,
        "target": 100
      }
    ]
  },
  {
    "nama": "Firmansyah",
    "index": 56,
    "divisi": "Finance & Accounting",
    "departemen": "Tim Pengelolaan Aset & Piutang Macet",
    "jabatan": "Ketua Tim Pengelolaan Aset & Piutang Macet",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 96.75,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Freshie Zahra",
    "index": 57,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Treasury",
    "jabatan": "Investment & Financial Risk Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 63.76,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 91,
        "target": 100
      }
    ]
  },
  {
    "nama": "Galih Geraldi Primayana",
    "index": 58,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "AVP Corporate Communication & TJSL",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Hafidz Ramadhan",
    "index": 59,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "AVP Corporate Communication & TJSL",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Hanny Aulia Triasita",
    "index": 60,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "Product & Marketing Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 96,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 105,
        "target": 100
      }
    ]
  },
  {
    "nama": "Hendra Oktavian Nugroho",
    "index": 61,
    "divisi": "Finance & Accounting",
    "departemen": "Accounting & Tax",
    "jabatan": "Accounting & Financial Analyst Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Henry Berhauser Sianturi",
    "index": 62,
    "divisi": "Finance & Accounting",
    "departemen": "Tim Pengelolaan Aset & Piutang Macet",
    "jabatan": "Tim Pengelolaan Aset & Piutang Macet",
    "kpi": [
      {
        "tahun": 2021,
        "value": 73,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 74,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Huda Ikhwan Mutaqin",
    "index": 63,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "Information Technology Application & System Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 96.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ida Gustri Astuti",
    "index": 64,
    "divisi": "Integrated Estate Management",
    "departemen": "Retail Business",
    "jabatan": "Retail Business Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 88,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Imam Nugroho",
    "index": 65,
    "divisi": "Internal Audit",
    "departemen": "Internal Audit",
    "jabatan": "Auditor",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Indra Bharata",
    "index": 66,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "Procurement Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Indriyani Kusuma Ratna B",
    "index": 67,
    "divisi": "Integrated Estate Management",
    "departemen": "Retail Business",
    "jabatan": "Retail Business Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Irnawati",
    "index": 68,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Planning Specialist",
    "jabatan": "Corporate Planning Specialist Junior",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 93.9,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ivan Sulivan",
    "index": 69,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "Security & Traffic Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 96,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 60,
        "target": 100
      }
    ]
  },
  {
    "nama": "Izhar Rahman Dwiputra",
    "index": 70,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Performance Monitoring Specialist",
    "jabatan": "AVP Corporate Performance Monitoring Specialist",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96.29,
        "target": 100
      }
    ]
  },
  {
    "nama": "Jihan Fadilah",
    "index": 71,
    "divisi": "Finance & Accounting",
    "departemen": "Accounting & Tax",
    "jabatan": "Tax Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Katerina",
    "index": 72,
    "divisi": "Business Development & Planning",
    "departemen": "Business Development",
    "jabatan": "Business Development Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 57.71,
        "target": 100
      }
    ]
  },
  {
    "nama": "Kevin Chrisvalliando",
    "index": 73,
    "divisi": "Business Development & Planning",
    "departemen": "Project Planning",
    "jabatan": "Project Planning Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 76.5,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 89,
        "target": 100
      }
    ]
  },
  {
    "nama": "Kodir",
    "index": 74,
    "divisi": "Integrated Estate Management",
    "departemen": "Utility & Infrastructure",
    "jabatan": "Utility & Infrastructure Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 23.71,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 93,
        "target": 100
      }
    ]
  },
  {
    "nama": "Kurnia Fajar Fatih",
    "index": 75,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "Information Technology Application & System Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 86,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 98.85,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94,
        "target": 100
      }
    ]
  },
  {
    "nama": "Lifian Ayu Eka Putri",
    "index": 76,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "General CS Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 99.7,
        "target": 100
      }
    ]
  },
  {
    "nama": "Lola Cahyana",
    "index": 77,
    "divisi": "Kepala Perencanaan JIEP Daya Sarana",
    "departemen": "Kepala Perencanaan JIEP Daya Sarana",
    "jabatan": "Kepala Perencanaan JIEP Daya Sarana",
    "kpi": [
      {
        "tahun": 2021,
        "value": 96,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95.45,
        "target": 100
      }
    ]
  },
  {
    "nama": "Luthfi Jovan Wandy Akmando",
    "index": 78,
    "divisi": "Management System & Compliance",
    "departemen": "Management System & Compliance",
    "jabatan": "AVP Management System & Compliance",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 73.25,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97.14,
        "target": 100
      }
    ]
  },
  {
    "nama": "M Ridwan Fauzi",
    "index": 79,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "Procurement Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Maradona Tarigan",
    "index": 80,
    "divisi": "Corporate Legal",
    "departemen": "Tim Sertifikasi Pertanahan",
    "jabatan": "Tim Sertifikasi Pertanahan",
    "kpi": [
      {
        "tahun": 2021,
        "value": 99,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 49.23,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Marthin Parlindungan Hutahaean",
    "index": 81,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Performance Monitoring Specialist",
    "jabatan": "Corporate Performance Monitoring Junior",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98.77,
        "target": 100
      }
    ]
  },
  {
    "nama": "Maryanto",
    "index": 82,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "Security & Traffic Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 72.75,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98,
        "target": 100
      }
    ]
  },
  {
    "nama": "Medik Endra Wahyudi",
    "index": 83,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Secretary & TJSL",
    "jabatan": "VP Corporate Secretary & TJSL",
    "kpi": [
      {
        "tahun": 2021,
        "value": 62,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 92,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94,
        "target": 100
      }
    ]
  },
  {
    "nama": "Mega Rachmani",
    "index": 84,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "AVP Procurement",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 88.31,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Moh Aryo Faqih Zamani",
    "index": 85,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "Information Technology Application & System Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Mohamad Hadi Saptono",
    "index": 86,
    "divisi": "Internal Audit",
    "departemen": "Internal Audit",
    "jabatan": "Auditor",
    "kpi": [
      {
        "tahun": 2021,
        "value": 67,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Monalisa",
    "index": 87,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "Estate Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Muhamad Muhtamil",
    "index": 88,
    "divisi": "Internal Audit",
    "departemen": "Internal Audit",
    "jabatan": "Auditor",
    "kpi": [
      {
        "tahun": 2021,
        "value": 75,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 102,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Muhammad Nur Hikmatullah",
    "index": 89,
    "divisi": "Integrated Estate Management",
    "departemen": "Utility & Infrastructure",
    "jabatan": "Utility & Infrastructure Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 23.71,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 93,
        "target": 100
      }
    ]
  },
  {
    "nama": "Muhammad Parma Lovan Tora",
    "index": 90,
    "divisi": "Quality Assurance",
    "departemen": "Quality Assurance",
    "jabatan": "Quality Assurance Operation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 95.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Muhammad Ridho Antalo",
    "index": 91,
    "divisi": "Marketing & Sales",
    "departemen": "Estate Sales",
    "jabatan": "Estate Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 102,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Mujahidin Prasetyo Utomo",
    "index": 92,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "Security & Traffic Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 99.31,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 94,
        "target": 100
      }
    ]
  },
  {
    "nama": "Mukthi Ashimuddin",
    "index": 93,
    "divisi": "Integrated Estate Management",
    "departemen": "Utility & Infrastructure",
    "jabatan": "AVP Utility & Infrastructure",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Mutiahani",
    "index": 94,
    "divisi": "Corporate Health, Safety & Environment",
    "departemen": "Corporate Health, Safety & Environment",
    "jabatan": "Health & Safety Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95.44,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nadevan Istighfariansyah",
    "index": 95,
    "divisi": "Corporate Health, Safety & Environment",
    "departemen": "Corporate Health, Safety & Environment",
    "jabatan": "Environment Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nahrowi",
    "index": 96,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "Estate Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 79.07,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nanang Suryana",
    "index": 97,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "TJSL Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 94,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 89,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Naufal Alwan",
    "index": 98,
    "divisi": "Human Capital Management",
    "departemen": "Organization & HC Services",
    "jabatan": "HC Services Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 85,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 102,
        "target": 100
      }
    ]
  },
  {
    "nama": "Naufal Fadhlurrahman",
    "index": 99,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Administration Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Niko Rokhman Syahputra",
    "index": 100,
    "divisi": "Business Development & Planning",
    "departemen": "Business Development",
    "jabatan": "Business Development Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 53,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nirmala Pratiwi",
    "index": 101,
    "divisi": "Information Technology & General Affairs",
    "departemen": "General Affairs",
    "jabatan": "AVP General Affairs",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 105.66,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nofriyadi",
    "index": 102,
    "divisi": "Information Technology & General Affairs",
    "departemen": "General Affairs",
    "jabatan": "Logistic & Asset Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Noor Romadhon",
    "index": 103,
    "divisi": "Information Technology & General Affairs",
    "departemen": "General Affairs",
    "jabatan": "General Affairs Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 86,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98,
        "target": 100
      }
    ]
  },
  {
    "nama": "Novalin Permata",
    "index": 104,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Performance Monitoring Specialist",
    "jabatan": "Corporate Performance Monitoring Junior",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95,
        "target": 100
      }
    ]
  },
  {
    "nama": "Novianti Puspasari",
    "index": 105,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "Security & Traffic Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 51,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nugraha Dwi Saputra",
    "index": 106,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Secretarial & Administration",
    "jabatan": "Administration Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Nur Chalim",
    "index": 107,
    "divisi": "Direktur Jiep Daya Sarana",
    "departemen": "Direktur Jiep Daya Sarana",
    "jabatan": "Direktur Jiep Daya Sarana",
    "kpi": [
      {
        "tahun": 2021,
        "value": 51,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 104,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 102,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ona Rowanda",
    "index": 108,
    "divisi": "Business Development & Planning",
    "departemen": "Project Planning",
    "jabatan": "Project Planning Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 88,
        "target": 100
      }
    ]
  },
  {
    "nama": "Paramitha Kusumaningtyas",
    "index": 109,
    "divisi": "Corporate Legal",
    "departemen": "Litigation & Non-Litigation",
    "jabatan": "Corporate Legal Officer (Litigation)",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95,
        "target": 100
      }
    ]
  },
  {
    "nama": "Peralta Christ Perdamaian Zega",
    "index": 110,
    "divisi": "Information Technology & General Affairs",
    "departemen": "Information Technology",
    "jabatan": "AVP Information Technology",
    "kpi": [
      {
        "tahun": 2021,
        "value": 81,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 98.58,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 91,
        "target": 100
      }
    ]
  },
  {
    "nama": "Pradhianka Prawidar",
    "index": 111,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "AVP Marketing & Customer Relation Management",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Purwadi",
    "index": 112,
    "divisi": "Quality Assurance",
    "departemen": "Quality Assurance",
    "jabatan": "Quality Assurance Operation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 97.44,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rahmat Solihin",
    "index": 113,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "Industrial Estate Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 96.89,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 88,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rahmat Subada",
    "index": 114,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "AVP Industrial Estate",
    "kpi": [
      {
        "tahun": 2021,
        "value": 94,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 83.33,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Ratna Wulandari",
    "index": 115,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Treasury",
    "jabatan": "Payment & Verification Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Refsi Putera Adinugraha",
    "index": 116,
    "divisi": "Human Capital Management",
    "departemen": "Human Capital Development",
    "jabatan": "AVP Human Capital Development",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Reno Maulana Yusuf",
    "index": 117,
    "divisi": "Business Development & Planning",
    "departemen": "Project Planning",
    "jabatan": "AVP Project Planning",
    "kpi": [
      {
        "tahun": 2021,
        "value": 75,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 95.11,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Retnawati Setianingsih",
    "index": 118,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Treasury",
    "jabatan": "Payment & Verification Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Reynna Renanda",
    "index": 119,
    "divisi": "Corporate Legal",
    "departemen": "Corporate Legal",
    "jabatan": "VP Corporate Legal",
    "kpi": [
      {
        "tahun": 2021,
        "value": 95,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 90,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rika Ramadiyansari",
    "index": 120,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "VP Marketing & Sales",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 102.75,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rinanda Fitri Rayanti",
    "index": 121,
    "divisi": "Finance & Accounting",
    "departemen": "Tim Pengelolaan Aset & Piutang Macet",
    "jabatan": "Tim Pengelolaan Aset & Piutang Macet",
    "kpi": [
      {
        "tahun": 2021,
        "value": 92,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 81,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rizqiana Sari",
    "index": 122,
    "divisi": "Corporate Legal",
    "departemen": "Litigation & Non-Litigation",
    "jabatan": "Corporate Regulation Officer (Non Litigation)",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 93,
        "target": 100
      }
    ]
  },
  {
    "nama": "Rizqin Mobarak",
    "index": 123,
    "divisi": "Finance & Accounting",
    "departemen": "Finance & Treasury",
    "jabatan": "AVP Finance & Treasury",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 103.67,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Roby Purwanto",
    "index": 124,
    "divisi": "Internal Audit",
    "departemen": "Internal Audit",
    "jabatan": "Auditor",
    "kpi": [
      {
        "tahun": 2021,
        "value": 72,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 102,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 100,
        "target": 100
      }
    ]
  },
  {
    "nama": "Salman Alfarisy",
    "index": 125,
    "divisi": "Corporate Legal",
    "departemen": "Litigation & Non-Litigation",
    "jabatan": "Corporate Legal Officer (Litigation)",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 90,
        "target": 100
      }
    ]
  },
  {
    "nama": "Sandi Yulianti",
    "index": 126,
    "divisi": "Risk Management",
    "departemen": "Risk Management",
    "jabatan": "Risk Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 105.53,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Santika Lestari",
    "index": 127,
    "divisi": "Management System & Compliance",
    "departemen": "Management System & Compliance",
    "jabatan": "Management System & Compliance Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 88,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 86,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 97.14,
        "target": 100
      }
    ]
  },
  {
    "nama": "Sari Dewi Ayuningrum",
    "index": 128,
    "divisi": "Marketing & Sales",
    "departemen": "Marketing & CRM",
    "jabatan": "Client Relation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 88,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 73,
        "target": 100
      }
    ]
  },
  {
    "nama": "Servi Cahyarani",
    "index": 129,
    "divisi": "Information Technology & General Affairs",
    "departemen": "General Affairs",
    "jabatan": "Logistic & Asset Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 96,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Shinta Praditiasari H",
    "index": 130,
    "divisi": "Corporate Secretary & TJSL",
    "departemen": "Corporate Communication & TJSL",
    "jabatan": "TJSL Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 94,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Sri Pelitami",
    "index": 131,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "Industrial Estate Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 82,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 104,
        "target": 100
      }
    ]
  },
  {
    "nama": "Sufyan",
    "index": 132,
    "divisi": "Integrated Estate Management",
    "departemen": "Industrial Estate",
    "jabatan": "Industrial Estate Monitoring Evaluation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Suhendi",
    "index": 133,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "AVP Corp. Security & Traffic Management",
    "kpi": [
      {
        "tahun": 2021,
        "value": 85,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 76,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 86,
        "target": 100
      }
    ]
  },
  {
    "nama": "Suladria Purwata",
    "index": 134,
    "divisi": "Corporate Security & Traffic Management",
    "departemen": "Corporate Security & Traffic Management",
    "jabatan": "Security & Traffic Management Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 53,
        "target": 100
      }
    ]
  },
  {
    "nama": "Suprihatin",
    "index": 135,
    "divisi": "Quality Assurance",
    "departemen": "Quality Assurance",
    "jabatan": "Quality Assurance Operation Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 53,
        "target": 100
      }
    ]
  },
  {
    "nama": "Sutarko",
    "index": 136,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "Property Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 97,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 92.59,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 87,
        "target": 100
      }
    ]
  },
  {
    "nama": "Syifa Callista Elvaretta",
    "index": 137,
    "divisi": "Human Capital Management",
    "departemen": "Human Capital Development",
    "jabatan": "Human Capital Development Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96.05,
        "target": 100
      }
    ]
  },
  {
    "nama": "Trihadi Nurahmansyah",
    "index": 138,
    "divisi": "Corporate Health, Safety & Environment",
    "departemen": "Corporate Health, Safety & Environment",
    "jabatan": "AVP Corp. Health, Safety & Environment",
    "kpi": [
      {
        "tahun": 2021,
        "value": 99,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 93.5,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 95.62,
        "target": 100
      }
    ]
  },
  {
    "nama": "Tsana Khairunnisa",
    "index": 139,
    "divisi": "Marketing & Sales",
    "departemen": "Property Sales",
    "jabatan": "Property Sales Executive",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 105.53,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 98,
        "target": 100
      }
    ]
  },
  {
    "nama": "Vannia Pallas Nainggolan",
    "index": 140,
    "divisi": "Marketing & Sales",
    "departemen": "Retail Business",
    "jabatan": "AVP Retail Business",
    "kpi": [
      {
        "tahun": 2021,
        "value": 98,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Vera Sandriana",
    "index": 141,
    "divisi": "Finance & Accounting",
    "departemen": "Accounting & Tax",
    "jabatan": "AVP Accounting & Tax",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 110,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Virgo Nila Krisna",
    "index": 142,
    "divisi": "Procurement",
    "departemen": "Procurement",
    "jabatan": "Procurement Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Widya Hartanto",
    "index": 143,
    "divisi": "Corporate Strategy & Planning",
    "departemen": "Corporate Planning Specialist",
    "jabatan": "Corporate Planning Specialist",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 84.79,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Yoga Setiawan Ady Nugroho",
    "index": 144,
    "divisi": "Integrated Estate Management",
    "departemen": "Property & Retail",
    "jabatan": "Property Officer",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  },
  {
    "nama": "Yuliana Endah Retno Asih",
    "index": 145,
    "divisi": "Business Development & Planning",
    "departemen": "Business Development",
    "jabatan": "AVP Business Development",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 107.25,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 53.36,
        "target": 100
      }
    ]
  },
  {
    "nama": "Zaki Muafa Rijae",
    "index": 146,
    "divisi": "Marketing & Sales",
    "departemen": "Property Sales",
    "jabatan": "AVP Property Sales",
    "kpi": [
      {
        "tahun": 2021,
        "value": 100,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 102.79,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 96,
        "target": 100
      }
    ]
  },
  {
    "nama": "Zulkifli",
    "index": 147,
    "divisi": "Business Development & Planning",
    "departemen": "Business Development & Planning",
    "jabatan": "VP Business Development & Planning",
    "kpi": [
      {
        "tahun": 2021,
        "value": 60,
        "target": 100
      },
      {
        "tahun": 2022,
        "value": 47.95,
        "target": 100
      },
      {
        "tahun": 2023,
        "value": 110,
        "target": 100
      }
    ]
  }
];

export const mockKpiKaryawan = 
  RAW_MOCK_KPI_KARYAWAN
    .map((v, i) => ({ ...v, nama: namaKaryawan(v.nama, i) }));

export const mockDivisi = mockKpiKaryawan
  .reduce(
    (prev, curr) => prev.includes(curr.divisi) ? prev : [ ...prev, curr.divisi ],
    [] as string[],
  )
  .toSorted((a, b) => a.localeCompare(b))

export function calculateDivisionKPI(
  data: typeof mockKpiKaryawan, 
  tahun: number,
): { [key: string]: number } {
  let total: number = 0;
  const totalDivisi: { [key: string]: number } = {};

  for (let v of data) {
    const d = v.kpi.find(w => w.tahun === tahun);
    if (!d) {
      continue
    }
    if (!totalDivisi[v.divisi]) {
      totalDivisi[v.divisi] = 0;
    };
    totalDivisi[v.divisi] += d.value;
    total += d.value;
  }

  const r: { [key: string]: number } = {};
  for (let k in totalDivisi) {
    r[k] = totalDivisi[k] / total;
  }

  return r;
}

export const mockRasioKPIDivisi: { 
  tahun: number,  
  data: { [key: string]: number }
}[] 
  = mockKpiKaryawan[0] 
  ? mockKpiKaryawan[0].kpi
      .map(v => v.tahun)
      .map(t => ({
        tahun: t,
        data: calculateDivisionKPI(mockKpiKaryawan, t)
      }))
  : [];

export const mockGainSharing = mockRasioKPIDivisi
  .map(v => {
    const analisis = mockLaporanAnalisis.analisis.find(w => w.tahun == v.tahun);
    const nilai_tambah = analisis?.nilai_tambah ?? 0;
    const total_biaya_tenaga_kerja = analisis?.total_biaya_tenaga_kerja ?? 0;
    const rasio_nilai_tambah = v.tahun === 2021 ? 1.98 : v.tahun === 2022 ? 2.01 : 2.04;
    const reserve_ratio = v.tahun === 2021 ? 26 : v.tahun === 2022 ? 24.5 : 25;
    const gain_sharing_perusahaan = ((analisis?.nilai_tambah ?? 0) / rasio_nilai_tambah - (analisis?.total_biaya_tenaga_kerja ?? 0)) * (1 - (reserve_ratio / 100))
    const divisi = Object.entries(v.data)
      .map(([namaDivisi, rasioDivisi]) => {
        const gain_sharing_divisi = rasioDivisi * gain_sharing_perusahaan;
        let total_kpi_divisi = 0;
        const karyawanDivisi = mockKpiKaryawan
          .filter(w => w.divisi === namaDivisi)
          .map(w => {
            const kpi_tahun = w.kpi.find(x => x.tahun === v.tahun)?.value ?? 0;
            total_kpi_divisi += kpi_tahun;
            return { ...w, kpi_tahun }
          })
        const kpiKaryawanDivisi = karyawanDivisi
          .map(w => ({ 
            nama: w.nama, 
            kpi: w.kpi_tahun, 
            gain_sharing: w.kpi_tahun / total_kpi_divisi * gain_sharing_divisi * GAIN_SHARING_KARYAWAN_MULTIPLIER,
          }));
        return {
          nama: namaDivisi,
          rasio: rasioDivisi,
          nilai: gain_sharing_divisi,
          karyawan: kpiKaryawanDivisi,
        }
      })
    return {
      tahun: v.tahun,
      nilai_tambah,
      total_biaya_tenaga_kerja,
      rasio_nilai_tambah,
      reserve_ratio,
      gain_sharing_perusahaan,
      divisi,
    }
  });

export const mockGainSharingKaryawan = mockGainSharing
  .map(v => {
    const karyawan: { nama: string, kpi: number, gain_sharing: number }[] = [];
    v.divisi.forEach(w => w.karyawan.forEach(x => karyawan.push({ nama: x.nama, kpi: x.kpi, gain_sharing: x.gain_sharing })));
    return {
      tahun: v.tahun,
      karyawan,
    }
  })
  