import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { currency } from "./number";

async function parseTemplate(
  templatePath: string,
  params: { [key: string]: string },
): Promise<string> {
  const resp = await fetch(templatePath);
  let content = await resp.text();

  for (const [key, value] of Object.entries(params)) {
    const reg = new RegExp(`{{ .${key} }}`, 'g');
    content = content.replace(reg, value);
  }

  return content;
}

export async function downloadPdfFromTemplate(
  pages: {
    templatePath: string, 
    params: { [key: string]: string },
  }[],
  filename: string,
): Promise<void> {
  const canvases = await Promise.all(pages.map(async(v) => {
    const content = await parseTemplate(v.templatePath, v.params);
    const container = document.createElement('div');
    container.style.position = "absolute"; // Prevent affecting layout
    container.style.top = "-9999px"; // Move it off-screen
    container.innerHTML = content;
    console.log('container', container);
    document.body.appendChild(container);
    const canv = await html2canvas(container, {
      scale: 1,
    });
    document.body.removeChild(container); // Remove the temporary element
    console.log('canv', canv);
    return canv;
  }));

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < canvases.length; i++) {
    if (i > 0) {
      doc.addPage();
    }
    doc.addImage(canvases[i], 'PNG', 0, 0, 0, 0);
  }

  console.log('pdf doc: ', doc);

  doc.save(filename);
}

export async function downloadPdfLaporanIndividu(p: {
  tahun: number,
  perusahaan: {
    nama: string,
    logo_src: string,
  },
  karyawan: {
    nama: string,
    nip: string,
    divisi: string,
    masa_kerja: number|null,
  },
  data: {
    ptk_perusahaan: number|null,
    ptk_divisi: number|null,
    ptk_growth: number|null,
    kpi: number|null,
    gain_sharing: number|null,
  }
}): Promise<void> {
  await downloadPdfFromTemplate(
    [
      { 
        templatePath: '/templates/laporan-individu.html', 
        params: { 
          ['tanggal']: moment().format('DD MMMM YYYY'),
          ['tahun']: `${p.tahun}`,
          ['perusahaan.nama']: p.perusahaan.nama,
          ['perusahaan.logo']: p.perusahaan.logo_src,
          ['karyawan.nama']: p.karyawan.nama.toUpperCase(),
          ['karyawan.nip']: p.karyawan.nip.toUpperCase(),
          ['karyawan.divisi']: p.karyawan.divisi.toUpperCase(),
          ['karyawan.masa_kerja']: p.karyawan.masa_kerja === null ? '-' : `${p.karyawan.masa_kerja} TAHUN`,
          ['data.ptk_perusahaan']: p.data.ptk_perusahaan ? `${(p.data.ptk_perusahaan/1_000_000).toFixed(2)}` : '-',
          ['data.ptk_divisi']: p.data.ptk_divisi ? `${(p.data.ptk_divisi/1_000_000).toFixed(2)}` : '-',
          ['data.ptk_growth']: p.data.ptk_growth ? `${(p.data.ptk_growth).toFixed(2)}` : '-',
          ['data.kpi']: p.data.kpi ? `${(p.data.kpi).toFixed(2)}` : '-',
          ['data.gain_sharing']: p.data.gain_sharing ? `${currency(p.data.gain_sharing)}` : '-'
        }
      },
    ],
    `Laporan Individu - ${p.karyawan.nama} - ${p.tahun}`,
  )
}

