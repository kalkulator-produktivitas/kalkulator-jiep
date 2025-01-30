import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import { currency, formatNumber } from "../helpers/number";
import { mockLaporanAnalisis } from "../mock/laporan";
import { mockGainSharing, mockKpiKaryawan, mockRasioKPIDivisi } from "../mock/gain-sharing";
import { mockIndicators, mockKpiPerusahaan } from "../mock/kpi";
import { formatKpi } from "../helpers/strings";

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
          ['data.ptk_perusahaan']: p.data.ptk_perusahaan ? currency(p.data.ptk_perusahaan) : '-',
          ['data.ptk_divisi']: p.data.ptk_divisi ? currency(p.data.ptk_divisi) : '-',
          ['data.ptk_growth']: p.data.ptk_growth ? `${formatNumber(p.data.ptk_growth, 2)}%` : '-',
          ['data.kpi']: p.data.kpi ? formatNumber(p.data.kpi, 2) : '-',
          ['data.gain_sharing']: p.data.gain_sharing ? currency(p.data.gain_sharing) : '-'
        }
      },
    ],
    `Laporan Individu - ${p.karyawan.nama} - ${p.tahun}`,
  )
}

export async function downloadPdfLaporanPerusahaan(tahun: number): Promise<void> {
  const l = mockLaporanAnalisis.analisis.find(v => v.tahun === tahun);
  if (!l) {
    console.error(`analisis tahun ${tahun} tidak ditemukan`);
    return;
  }
  const prev = mockLaporanAnalisis.analisis.find(v => v.tahun === tahun - 1);
  
  let _sumKpi = 0;
  let _countKpiKaryawan = 0;
  for (let k of mockKpiKaryawan) {
    const _kpi = k.kpi.find(v => v.tahun === tahun);
    if (!_kpi) {
      continue;
    }
    _sumKpi += _kpi.value;
    _countKpiKaryawan += 1;
  }
  let _avgKpi: number|null = null;
  if (_countKpiKaryawan > 0) {
    _avgKpi = _sumKpi / _countKpiKaryawan
  }

  const produktivitasDivisiObj = mockRasioKPIDivisi.find(v => v.tahun === tahun)?.data ?? {};
  const produktivitasDivisi = Object.entries(produktivitasDivisiObj)
    .map(([divisi, persentase]) => ({
      divisi,
      persentase,
      nilai: l.produktivitas_tenaga_kerja_1 * persentase,
    }))
    .toSorted((a, b) => b.persentase - a.persentase);

  let tableProduktivitasDivisi = `
    <table style="border-radius: 0.5rem; border: solid black 0.5px; padding: 4rem">
      <thead>
        <tr>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">Divisi</th>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">Nilai Produktivitas</th>
        <tr>
      <thead>
      <tbody style="padding: 2rem">
  `
  for (let d of produktivitasDivisi) {
    tableProduktivitasDivisi += `<tr><td style="padding: 0.25rem">${d.divisi}${(d.divisi.startsWith('Kepala') || d.divisi.startsWith('Direktur')) ? '&#42;' : ''}</td>`
    tableProduktivitasDivisi += `<td style="padding: 0.25rem">${currency(d.nilai)}</td>`
    tableProduktivitasDivisi += `</tr>`
  }
  tableProduktivitasDivisi += `<tr><td colspan="2" style="padding: 0.25rem"></td><tr>`
  tableProduktivitasDivisi += `</tbody></table>`

  const indicators = mockIndicators.find(v => v.tahun === tahun)?.indicators ?? [];
  const kpiPerusahaan = mockKpiPerusahaan.find(v => v.tahun === tahun)?.kpi ?? [];

  let tableKeterkaitanRasioKPI = `
    <table style="border-radius: 0.5rem; border: solid black 0.5px; padding: 4rem">
      <thead>
        <tr>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">#</th>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">Indikator Produktivitas</th>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">KPI Perusahaan Terkait</th>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">Capaian KPI</th>
          <th style="border-bottom: solid black 1px; padding: 0.5rem">Target KPI</th>
        </tr>
      </thead>
      <tbody style="font-size: 0.7rem">
  `
  for (let i = 0; i < indicators.length; i++) {
    const kpiTerkait = kpiPerusahaan.filter(v => v.related_indicator_ids.includes(indicators[i].id));
    if (kpiTerkait.length === 0) {
      tableKeterkaitanRasioKPI += `
        <tr>
          <td style="padding: 0.25rem">${i+1}</td>
          <td style="padding: 0.25rem">${indicators[i].name}</td>
          <td style="padding: 0.25rem">-</td>
          <td style="padding: 0.25rem">-</td>
        <tr>
      `;
      continue;
    }
    for (let j = 0; j < kpiTerkait.length; j++ ) {
      tableKeterkaitanRasioKPI += `<tr>`;
      if (j === 0) {
        tableKeterkaitanRasioKPI += `
          <td ${j === 0 ? `rowspan=${kpiTerkait.length}` : ''} style="padding: 0.25rem; vertical-align: top; border-bottom: solid 0.25px black; padding-bottom: 1rem">${i+1}</td>
          <td ${j === 0 ? `rowspan=${kpiTerkait.length}` : ''} style="padding: 0.25rem; vertical-align: top; border-bottom: solid 0.25px black; padding-bottom: 1rem">${indicators[i].name}</td>
        `
      }
      tableKeterkaitanRasioKPI += `
          <td style="padding: 0.25rem; vertical-align: top; ${j === kpiTerkait.length-1 ? 'border-bottom: solid 0.25px black; padding-bottom: 1rem' : ''}">${kpiTerkait[j].name}</td>
          <td style="padding: 0.25rem; vertical-align: top; ${j === kpiTerkait.length-1 ? 'border-bottom: solid 0.25px black; padding-bottom: 1rem' : ''}">${formatKpi(kpiTerkait[j].value, kpiTerkait[j].kind)}</td>
          <td style="padding: 0.25rem; vertical-align: top; ${j === kpiTerkait.length-1 ? 'border-bottom: solid 0.25px black; padding-bottom: 1rem' : ''}">${formatKpi(kpiTerkait[j].target, kpiTerkait[j].kind)}</td>
      `
    }
    tableKeterkaitanRasioKPI += `</tr>`
  }
  tableProduktivitasDivisi += `<tr><td colspan="2" style="padding: 0.25rem"></td><tr>`
  tableKeterkaitanRasioKPI += `</tbody></table>`

  await downloadPdfFromTemplate(
    [
      {
        templatePath: '/templates/laporan-perusahaan-1.html',
        params: {
          ['tahun']: `${tahun}`,
          ['tanggal']: moment().format('DD MMMM YYYY'),
          ['perusahaan.nama']: 'PT JIEP',
          ['perusahaan.nib']: '9120001380361',
          ['data.keuangan.pendapatan']: currency(l.pendapatan),
          ['data.keuangan.modal']: currency(l.modal),
          ['data.keuangan.biaya_tenaga_kerja']: currency(l.total_biaya_tenaga_kerja),
          ['data.keuangan.beban_operasional']: currency(l.beban_operasional),
          ['data.keuangan.beban_non_operasional']: currency(l.beban_non_operasional),
          ['data.keuangan.penyusutan']: currency(l.total_penyusutan),
          ['data.keuangan.bunga']: currency(l.total_bunga_pinjaman),
          ['data.keuangan.pajak']: currency(l.total_pajak),
          ['data.keuangan.laba']: currency(l.total_laba),
          ['data.jumlah_tenaga_kerja']: formatNumber(l.jumlah_tenaga_kerja),
          ['data.jumlah_jam_kerja']: formatNumber(l.jumlah_jam_kerja),
          ['data.jumlah_jam_lembur']: formatNumber(l.jumlah_jam_lembur),
          ['data.reserve_ratio']:  mockGainSharing.find(v => v.tahun === tahun) ? formatNumber(mockGainSharing.find(v => v.tahun === tahun)?.reserve_ratio ?? 0) : '-',
          ['data.nilai_tambah']: currency(l.nilai_tambah),
          ['data.ptk']: currency(l.produktivitas_tenaga_kerja_1),
          ['data.ptk_growth']: prev 
            ? formatNumber((l.produktivitas_tenaga_kerja_1 - prev.produktivitas_tenaga_kerja_1) / prev.produktivitas_tenaga_kerja_1 * 100, 2)
            : '-',
          ['data.pjk']: formatNumber(l.produktivitas_tenaga_kerja_3),
          ['data.pu']: formatNumber(l.produktivitas_tenaga_kerja_4),
          ['data.growth.ptk_1']: prev
            ? formatNumber((l.produktivitas_tenaga_kerja_1 - prev.produktivitas_tenaga_kerja_1) / prev.produktivitas_tenaga_kerja_1 * 100, 2) 
            : '-'
          ,
          ['data.growth.ptk_2']: prev
            ? formatNumber((l.produktivitas_tenaga_kerja_2 - prev.produktivitas_tenaga_kerja_2) / prev.produktivitas_tenaga_kerja_2 * 100, 2)
            : '-'
          ,
          ['data.growth.ptk_3']: prev
            ? formatNumber((l.produktivitas_tenaga_kerja_3 - prev.produktivitas_tenaga_kerja_3) / prev.produktivitas_tenaga_kerja_3 * 100, 2) 
            : '-'
          ,
          ['data.growth.ptk_4']: prev
            ? formatNumber((l.produktivitas_tenaga_kerja_4 - prev.produktivitas_tenaga_kerja_4) / prev.produktivitas_tenaga_kerja_4 * 100, 2)
            : '-'
          ,
          ['data.growth.pm_1']: prev
            ? formatNumber((l.produktivitas_modal_1 - prev.produktivitas_modal_1) / prev.produktivitas_modal_1 * 100, 2) 
            : '-'
          ,
          ['data.growth.pm_2']: prev
            ? formatNumber((l.produktivitas_modal_2 - prev.produktivitas_modal_2) / prev.produktivitas_modal_2 * 100, 2) 
            : '-'
          ,
          ['data.growth.pm_3']: prev
            ? formatNumber((l.produktivitas_modal_3 - prev.produktivitas_modal_3) / prev.produktivitas_modal_3 * 100, 2) 
            : '-'
          ,
          ['data.growth.pr_1']: prev
            ? formatNumber((l.profitabilitas_1 - prev.profitabilitas_1) / prev.profitabilitas_1 * 100, 2) 
            : '-'
          ,
          ['data.growth.pr_2']: prev
            ? formatNumber((l.profitabilitas_2 - prev.profitabilitas_2) / prev.profitabilitas_2 * 100, 2) 
            : '-'
          ,
          ['data.growth.pr_3']: prev
            ? formatNumber((l.profitabilitas_3 - prev.profitabilitas_3) / prev.profitabilitas_3 * 100, 2) 
            : '-'
          ,
        }
      },
      {
        templatePath: '/templates/laporan-perusahaan-2.html',
        params: {
          ['data.growth.rp_1']: prev
            ? formatNumber((l.rasio_pendukung_1 - prev.rasio_pendukung_1) / prev.rasio_pendukung_1 * 100, 2) 
            : '-'
          ,
          ['data.growth.rp_2']: prev
            ? formatNumber((l.rasio_pendukung_2 - prev.rasio_pendukung_2) / prev.rasio_pendukung_2 * 100, 2) 
            : '-'
          ,
          ['data.growth.rp_3']: prev
            ? formatNumber((l.rasio_pendukung_3 - prev.rasio_pendukung_3) / prev.rasio_pendukung_3 * 100, 2) 
            : '-'
          ,
          ['data.avg_kpi']: _avgKpi ? formatNumber(_avgKpi, 2) : '-',
          ['data.growth_nt']: prev ? formatNumber((l.nilai_tambah - prev.nilai_tambah) / prev.nilai_tambah * 100, 2) + '%' : '-',
          ['table.pr_divisi']: tableProduktivitasDivisi,
        }
      },
      {
        templatePath: '/templates/laporan-perusahaan-3.html',
        params: {
          ['table.rasio_kpi']: tableKeterkaitanRasioKPI,
        }
      }
    ],
    `Laporan Perusahaan - ${tahun}.pdf`
  )
}