import { Report } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCaseDocumentHtml = (report: Report, counselorName?: string, includeOfflineButtons = false): string => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const createdDate = new Date(report.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const priorityLabel =
    report.indicatorAnalysis.priority === 'MERAH'
      ? 'MERAH (Atensi Segera)'
      : report.indicatorAnalysis.priority === 'KUNING'
      ? 'KUNING (Klarifikasi & Tabayyun)'
      : 'HIJAU (Pemantauan Rutin)';

  const priorityColor =
    report.indicatorAnalysis.priority === 'MERAH'
      ? '#dc2626'
      : report.indicatorAnalysis.priority === 'KUNING'
      ? '#d97706'
      : '#16a34a';

  const checklistHtml = report.checklist
    .map(
      (c, idx) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 6px 8px; width: 28px; text-align: center; font-size: 14px;">${
        c.completed ? '☑' : '☐'
      }</td>
      <td style="padding: 6px 8px; font-weight: 600;">${c.stepNumber || idx + 1}. ${c.title}</td>
      <td style="padding: 6px 8px; font-size: 10.5px; color: #4b5563;">${
        c.completed
          ? `✓ Selesai (${c.completedBy || counselorName || 'Guru BK'})`
          : 'Belum'
      }</td>
    </tr>
  `
    )
    .join('');

  const reporterInfo =
    report.contactPreference === 'FULL_ANONYMOUS'
      ? 'Anonim Penuh (Identitas & Kontak Dirahasiakan)'
      : report.contactPreference === 'ANONYMOUS_WITH_PHONE'
      ? `Anonim (No. WhatsApp / Kontak: ${report.reporterPhone || '-'})`
      : `${report.reporterName || 'Siswa'} (No. Kontak: ${report.reporterPhone || '-'})`;

  return `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Berkas Kasus ${report.reportCode} - EMHA CARE</title>
    <style>
      @page {
        size: A4 portrait;
        margin: 12mm 15mm 15mm 15mm;
      }
      * {
        box-sizing: border-box;
      }
      body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 11pt;
        line-height: 1.35;
        color: #111827;
        margin: 0;
        padding: 16px;
        background: #fdfbf7;
      }
      .page-container {
        max-width: 800px;
        margin: 0 auto;
        background: #ffffff;
        padding: 24px 30px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
      }
      .no-print-bar {
        max-width: 800px;
        margin: 0 auto 16px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 12px 16px;
        background: #1B4332;
        color: #ffffff;
        border-radius: 8px;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .no-print-btn {
        background: #2D6A4F;
        color: white;
        border: 1px solid rgba(255,255,255,0.3);
        padding: 8px 14px;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .header {
        text-align: center;
        border-bottom: 3px double #000;
        padding-bottom: 6px;
        margin-bottom: 12px;
      }
      .header h3 {
        margin: 0;
        font-size: 11pt;
        font-weight: normal;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .header h2 {
        margin: 2px 0;
        font-size: 13.5pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .header p {
        margin: 2px 0;
        font-size: 9pt;
        color: #374151;
      }
      .title {
        text-align: center;
        margin: 12px 0 10px 0;
      }
      .title h1 {
        margin: 0;
        font-size: 12.5pt;
        text-decoration: underline;
        font-weight: bold;
        text-transform: uppercase;
      }
      .title span {
        font-size: 10pt;
        font-weight: bold;
        font-family: 'Courier New', Courier, monospace;
      }
      table.meta {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
        font-size: 10pt;
      }
      table.meta td {
        padding: 3.5px 5px;
        vertical-align: top;
      }
      .section-title {
        font-weight: bold;
        font-size: 10.5pt;
        margin-top: 10px;
        margin-bottom: 4px;
        border-bottom: 1px solid #111;
        padding-bottom: 2px;
        text-transform: uppercase;
      }
      .narrative-box {
        border: 1px solid #d1d5db;
        padding: 8px 10px;
        font-size: 10pt;
        background: #f9fafb;
        border-radius: 4px;
        margin-bottom: 8px;
        white-space: pre-wrap;
        font-family: Arial, sans-serif;
        line-height: 1.45;
      }
      table.checklist {
        width: 100%;
        border-collapse: collapse;
        font-size: 9.5pt;
        font-family: Arial, sans-serif;
        margin-bottom: 8px;
      }
      table.checklist th {
        background: #f3f4f6;
        text-align: left;
        padding: 5px 8px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        font-weight: bold;
      }
      .signature-section {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        page-break-inside: avoid;
      }
      .signature-box {
        width: 44%;
        text-align: center;
        font-size: 10pt;
      }
      .signature-space {
        height: 55px;
      }
      @media print {
        body {
          padding: 0;
          background: #ffffff;
        }
        .page-container {
          box-shadow: none;
          border: none;
          padding: 0;
        }
        .no-print-bar {
          display: none !important;
        }
      }
    </style>
  </head>
  <body>
    ${
      includeOfflineButtons
        ? `<div class="no-print-bar">
            <div>
              <span style="font-weight:bold; font-size:13px;">Dokumen Berkas Kasus EMHA CARE (Offline)</span>
              <div style="font-size:11px; opacity:0.85;">Disimpan pada: ${currentDate} • Kode: ${report.reportCode}</div>
            </div>
            <div>
              <button class="no-print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
            </div>
          </div>`
        : ''
    }

    <div class="page-container">
      <div class="header">
        <h3>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h3>
        <h2>MTS MATHOLI'UL HUDA TROSO PECANGAAN</h2>
        <h3>LAYANAN BIMBINGAN DAN KONSELING SISWA (EMHA CARE)</h3>
        <p>Alamat: Jl. Raya Troso, Kec. Pecangaan, Kab. Jepara, Jawa Tengah • Kode Pos: 59462</p>
      </div>

      <div class="title">
        <h1>LEMBAR REKAPITULASI & PENANGANAN KASUS SISWA</h1>
        <span>NOMOR REGISTER: ${report.reportCode}</span>
      </div>

      <table class="meta">
        <tr>
          <td style="width: 22%; font-weight: bold;">Kategori Kejadian</td>
          <td style="width: 2%;">:</td>
          <td style="width: 26%;">${report.category}</td>
          <td style="width: 22%; font-weight: bold;">Status Penanganan</td>
          <td style="width: 2%;">:</td>
          <td style="width: 26%; font-weight: bold;">${report.status}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Tingkat Prioritas</td>
          <td>:</td>
          <td style="font-weight: bold; color: ${priorityColor};">${priorityLabel}</td>
          <td style="font-weight: bold;">Waktu Pelaporan</td>
          <td>:</td>
          <td>${createdDate} WIB</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Lokasi Kejadian</td>
          <td>:</td>
          <td>${report.location} (${report.frequency})</td>
          <td style="font-weight: bold;">Guru BK Bertugas</td>
          <td>:</td>
          <td>${report.assignedCounselorName || counselorName || 'Siska Noviana Dewi, M.Sc.'}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Identitas Pelapor</td>
          <td>:</td>
          <td colspan="4">${reporterInfo}</td>
        </tr>
      </table>

      <div class="section-title">I. KRONOLOGI & URAIAN KEJADIAN DARI PELAPOR</div>
      <div class="narrative-box">${report.description || 'Tidak ada catatan uraian tambahan.'}</div>

      <div class="section-title">II. CHECKLIST PENANGANAN KASUS & SOP BIMBINGAN KONSELING</div>
      <table class="checklist">
        <thead>
          <tr>
            <th style="width: 28px; text-align: center;">Status</th>
            <th>Tahapan Bimbingan & Tindak Lanjut</th>
            <th style="width: 140px;">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          ${checklistHtml}
        </tbody>
      </table>

      <div class="section-title">III. CATATAN HASIL BIMBINGAN & EVALUASI GURU BK</div>
      <div class="narrative-box">${report.internalNotes || 'Telah dilakukan bimbingan, verifikasi, dan penanganan sesuai SOP Bimbingan Konseling Madrasah.'}</div>

      <div class="signature-section">
        <div class="signature-box">
          <p>Mengetahui,<br>Kepala MTs Matholi'ul Huda Troso</p>
          <div class="signature-space"></div>
          <p style="font-weight: bold; text-decoration: underline;">( .................................................... )</p>
          <p style="font-size: 8.5pt; color: #4b5563;">NIP/NPY. -</p>
        </div>

        <div class="signature-box">
          <p>Jepara, ${currentDate}<br>Guru Bimbingan Konseling,</p>
          <div class="signature-space"></div>
          <p style="font-weight: bold; text-decoration: underline;">${report.assignedCounselorName || counselorName || 'Siska Noviana Dewi, M.Sc.'}</p>
          <p style="font-size: 8.5pt; color: #4b5563;">Koordinator BK EMHA CARE</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

/**
 * Trigger Native Print Dialogue for a single Case Document
 */
export const printCaseDocument = (report: Report, counselorName?: string) => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  const html = generateCaseDocumentHtml(report, counselorName, false);

  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }
  }, 300);
};

/**
 * Download Case Document as file to user's device (.html or .doc)
 */
export const downloadCaseDocument = (
  report: Report,
  counselorName?: string,
  format: 'html' | 'doc' = 'html'
) => {
  const htmlContent = generateCaseDocumentHtml(report, counselorName, true);
  const filename = `Berkas-Kasus-${report.reportCode}.${format}`;

  let mimeType = 'text/html;charset=utf-8';
  let blobContent = htmlContent;

  if (format === 'doc') {
    mimeType = 'application/msword;charset=utf-8';
    blobContent = `\uFEFF${htmlContent}`;
  }

  const blob = new Blob([blobContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateAnalyticsDocumentHtml = (reports: Report[], counselorName?: string, includeOfflineButtons = false): string => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const totalReports = reports.length;
  const redCount = reports.filter(r => r.indicatorAnalysis.priority === 'MERAH').length;
  const yellowCount = reports.filter(r => r.indicatorAnalysis.priority === 'KUNING').length;
  const resolvedReports = reports.filter(r => r.status === 'SELESAI');

  const resolvedRows = resolvedReports
    .map(
      (r, i) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 6px; text-align: center;">${i + 1}</td>
      <td style="padding: 6px; font-weight: bold; font-family: monospace;">${r.reportCode}</td>
      <td style="padding: 6px;">${r.category}</td>
      <td style="padding: 6px;">${r.location}</td>
      <td style="padding: 6px;">${r.assignedCounselorName || 'Siska Noviana Dewi, M.Sc.'}</td>
      <td style="padding: 6px;">${new Date(r.updatedAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}</td>
      <td style="padding: 6px; font-size: 9.5pt;">${r.internalNotes || 'Selesai ditangani'}</td>
    </tr>
  `
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rekapitulasi Statistik & Riwayat Kasus - EMHA CARE</title>
    <style>
      @page { size: A4 portrait; margin: 12mm 15mm 15mm 15mm; }
      body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.35; color: #111; margin: 0; padding: 16px; background: #fdfbf7; }
      .page-container { max-width: 850px; margin: 0 auto; background: #ffffff; padding: 24px 30px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); border-radius: 8px; }
      .no-print-bar { max-width: 850px; margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px; background: #1B4332; color: #ffffff; border-radius: 8px; font-family: system-ui, -apple-system, sans-serif; }
      .no-print-btn { background: #2D6A4F; color: white; border: 1px solid rgba(255,255,255,0.3); padding: 8px 14px; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 12px; display: inline-flex; align-items: center; gap: 6px; }
      .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 6px; margin-bottom: 12px; }
      .header h3 { margin: 0; font-size: 11pt; font-weight: normal; text-transform: uppercase; }
      .header h2 { margin: 2px 0; font-size: 13.5pt; font-weight: bold; text-transform: uppercase; }
      .header p { margin: 2px 0; font-size: 9pt; color: #374151; }
      .title { text-align: center; margin: 12px 0 14px 0; }
      .title h1 { margin: 0; font-size: 12.5pt; text-decoration: underline; font-weight: bold; text-transform: uppercase; }
      .stats-grid { display: flex; justify-content: space-between; margin-bottom: 14px; gap: 8px; }
      .stat-card { flex: 1; border: 1px solid #999; padding: 8px; text-align: center; border-radius: 4px; background: #fafafa; }
      .stat-card .val { font-size: 14pt; font-weight: bold; margin: 2px 0; }
      .stat-card .lbl { font-size: 8.5pt; text-transform: uppercase; color: #4b5563; font-weight: bold; }
      table.data { width: 100%; border-collapse: collapse; font-size: 9.5pt; font-family: Arial, sans-serif; margin-bottom: 14px; }
      table.data th { background: #f3f4f6; text-align: left; padding: 6px; border-top: 1px solid #000; border-bottom: 1px solid #000; font-weight: bold; }
      .signature-section { margin-top: 25px; display: flex; justify-content: space-between; page-break-inside: avoid; }
      .signature-box { width: 44%; text-align: center; font-size: 10pt; }
      .signature-space { height: 55px; }
      @media print { body { padding: 0; background:#ffffff; } .page-container { box-shadow:none; border:none; padding:0; } .no-print-bar { display: none !important; } }
    </style>
  </head>
  <body>
    ${
      includeOfflineButtons
        ? `<div class="no-print-bar">
            <div>
              <span style="font-weight:bold; font-size:13px;">Rekapitulasi Layanan Kasus EMHA CARE (Offline)</span>
              <div style="font-size:11px; opacity:0.85;">Diunduh pada: ${currentDate} • Total Kasus: ${totalReports}</div>
            </div>
            <div>
              <button class="no-print-btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
            </div>
          </div>`
        : ''
    }

    <div class="page-container">
      <div class="header">
        <h3>KEMENTERIAN AGAMA REPUBLIK INDONESIA</h3>
        <h2>MTS MATHOLI'UL HUDA TROSO PECANGAAN</h2>
        <h3>LAYANAN BIMBINGAN DAN KONSELING SISWA (EMHA CARE)</h3>
        <p>Alamat: Jl. Raya Troso, Kec. Pecangaan, Kab. Jepara, Jawa Tengah • Kode Pos: 59462</p>
      </div>

      <div class="title">
        <h1>LAPORAN REKAPITULASI & RIWAYAT PENANGANAN KASUS</h1>
        <span style="font-size: 10pt; font-weight: bold;">Periode Data: Per ${currentDate}</span>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="lbl">Total Laporan Masuk</div>
          <div class="val">${totalReports}</div>
        </div>
        <div class="stat-card">
          <div class="lbl">Prioritas Merah</div>
          <div class="val" style="color: #dc2626;">${redCount}</div>
        </div>
        <div class="stat-card">
          <div class="lbl">Prioritas Kuning</div>
          <div class="val" style="color: #d97706;">${yellowCount}</div>
        </div>
        <div class="stat-card">
          <div class="lbl">Kasus Selesai Tuntas</div>
          <div class="val" style="color: #16a34a;">${resolvedReports.length}</div>
        </div>
      </div>

      <h3 style="font-size: 10.5pt; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin: 12px 0 6px 0;">
        Daftar Arsip Kasus yang Telah Selesai Ditangani (${resolvedReports.length} Kasus)
      </h3>

      <table class="data">
        <thead>
          <tr>
            <th style="width: 25px; text-align: center;">No</th>
            <th style="width: 85px;">Kode Kasus</th>
            <th>Kategori</th>
            <th>Lokasi</th>
            <th>Guru BK</th>
            <th style="width: 80px;">Selesai</th>
            <th>Catatan Penanganan</th>
          </tr>
        </thead>
        <tbody>
          ${resolvedRows || '<tr><td colspan="7" style="padding: 12px; text-align: center;">Belum ada data kasus selesai.</td></tr>'}
        </tbody>
      </table>

      <div class="signature-section">
        <div class="signature-box">
          <p>Mengetahui,<br>Kepala MTs Matholi'ul Huda Troso</p>
          <div class="signature-space"></div>
          <p style="font-weight: bold; text-decoration: underline;">( .................................................... )</p>
          <p style="font-size: 8.5pt; color: #4b5563;">NIP/NPY. -</p>
        </div>

        <div class="signature-box">
          <p>Jepara, ${currentDate}<br>Koordinator Bimbingan Konseling,</p>
          <div class="signature-space"></div>
          <p style="font-weight: bold; text-decoration: underline;">${counselorName || 'Siska Noviana Dewi, M.Sc.'}</p>
          <p style="font-size: 8.5pt; color: #4b5563;">EMHA CARE MTs Matholi'ul Huda</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

/**
 * Trigger Native Print Dialogue for Analytics & Case History
 */
export const printAnalyticsDocument = (reports: Report[], counselorName?: string) => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    window.print();
    return;
  }

  const html = generateAnalyticsDocumentHtml(reports, counselorName, false);

  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch (e) {
      window.print();
    } finally {
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1500);
    }
  }, 300);
};

/**
 * Download Analytics Document as file to user's device (.html or .doc)
 */
export const downloadAnalyticsDocument = (
  reports: Report[],
  counselorName?: string,
  format: 'html' | 'doc' = 'html'
) => {
  const htmlContent = generateAnalyticsDocumentHtml(reports, counselorName, true);
  const currentDate = new Date().toISOString().slice(0, 10);
  const filename = `Rekapitulasi-Kasus-EMHACARE-${currentDate}.${format}`;

  let mimeType = 'text/html;charset=utf-8';
  let blobContent = htmlContent;

  if (format === 'doc') {
    mimeType = 'application/msword;charset=utf-8';
    blobContent = `\uFEFF${htmlContent}`;
  }

  const blob = new Blob([blobContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Download Student Confirmation / Tracking Slip directly as PDF (or fallback)
 */
export const downloadStudentReportSlip = async (
  reportOrCode: string | { reportCode: string; category?: string; createdAt?: string; status?: string; location?: string; frequency?: string },
  categoryParam?: string
) => {
  const code = typeof reportOrCode === 'string' ? reportOrCode : reportOrCode.reportCode;
  const category = typeof reportOrCode === 'string' ? categoryParam : (reportOrCode.category || categoryParam || 'Laporan Siswa');
  const status = typeof reportOrCode === 'object' && reportOrCode.status ? reportOrCode.status : 'TERKIRIM';
  const location = typeof reportOrCode === 'object' && reportOrCode.location ? reportOrCode.location : '-';
  const frequency = typeof reportOrCode === 'object' && reportOrCode.frequency ? reportOrCode.frequency : '-';

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a5',
    });

    // Outer Background / Border
    pdf.setFillColor(253, 251, 247); // #FDFBF7
    pdf.rect(0, 0, 148, 210, 'F');

    // Header Background
    pdf.setFillColor(27, 67, 50); // #1B4332
    pdf.roundedRect(8, 8, 132, 28, 4, 4, 'F');

    // Header Text
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(253, 251, 247);
    pdf.text('EMHA CARE - TANDA TERIMA LAPORAN', 74, 18, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(212, 163, 115); // #D4A373
    pdf.text("MTs Matholi'ul Huda Troso Pecangaan Jepara", 74, 25, { align: 'center' });
    pdf.text('Layanan Pengaduan & Perlindungan Siswa Anonim', 74, 30, { align: 'center' });

    // Tracking Code Box
    pdf.setFillColor(245, 242, 237); // #F5F2ED
    pdf.setDrawColor(233, 228, 217);
    pdf.roundedRect(8, 40, 132, 28, 4, 4, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(92, 107, 94);
    pdf.text('KODE PELACAKAN ANONIM:', 74, 48, { align: 'center' });

    pdf.setFont('courier', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(27, 67, 50);
    pdf.text(code, 74, 60, { align: 'center' });

    // Details Box
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(233, 228, 217);
    pdf.roundedRect(8, 72, 132, 60, 4, 4, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(27, 67, 50);
    pdf.text('DETAIL LAPORAN SISWA', 14, 82);

    pdf.setDrawColor(233, 228, 217);
    pdf.line(14, 85, 134, 85);

    pdf.setFontSize(8.5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(122, 106, 83);
    pdf.text('Waktu Submit:', 14, 93);
    pdf.text('Kategori Kejadian:', 14, 101);
    pdf.text('Lokasi Kejadian:', 14, 109);
    pdf.text('Frekuensi Kejadian:', 14, 117);
    pdf.text('Status Terkini:', 14, 125);

    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(27, 67, 50);
    pdf.text(`${currentDate} WIB`, 52, 93);
    pdf.text(String(category), 52, 101);
    pdf.text(String(location), 52, 109);
    pdf.text(String(frequency), 52, 117);
    
    // Status text in green bold
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(45, 106, 79);
    pdf.text(String(status), 52, 125);

    // Guidance Card
    pdf.setFillColor(231, 243, 239); // #E7F3EF
    pdf.setDrawColor(45, 106, 79);
    pdf.roundedRect(8, 136, 132, 38, 4, 4, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(27, 67, 50);
    pdf.text('PETUNJUK PENGGUNAAN & KEAMANAN:', 14, 145);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(45, 106, 79);
    const splitNote1 = pdf.splitTextToSize(
      '1. Simpan file PDF atau salin kode ini dengan aman. Identitasmu tetap 100% rahasia.',
      120
    );
    pdf.text(splitNote1, 14, 152);

    const splitNote2 = pdf.splitTextToSize(
      '2. Masukkan kode di atas pada menu "Lacak Laporan" di EMHA CARE untuk melihat tindakan Guru BK serta bertukar pesan secara anonim.',
      120
    );
    pdf.text(splitNote2, 14, 160);

    const splitNote3 = pdf.splitTextToSize(
      '3. Jika butuh perlindungan darurat, segera temui Guru BK di Ruang BK MTs Matholi\'ul Huda Troso.',
      120
    );
    pdf.text(splitNote3, 14, 168);

    // Footer
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(7.5);
    pdf.setTextColor(140, 132, 117);
    pdf.text(
      `Dokumen ini dicetak otomatis dari Sistem EMHA CARE MTs Matholi'ul Huda Troso pada ${currentDate}`,
      74,
      198,
      { align: 'center' }
    );

    // Save as PDF file
    pdf.save(`Bukti-Laporan-${code}.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF with jsPDF, triggering html fallback:', error);
    // HTML fallback if PDF generation fails
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8"/>
  <title>Bukti Pelaporan ${code} - EMHA CARE</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #fdfbf7; padding: 20px; color: #1B4332; }
    .card { max-width: 500px; margin: 0 auto; background: white; border: 2px solid #2D6A4F; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center; }
    .title { font-size: 16px; font-weight: bold; margin-bottom: 4px; }
    .sub { font-size: 12px; color: #5C6B5E; margin-bottom: 20px; }
    .code-box { background: #1B4332; color: white; padding: 14px; border-radius: 12px; font-family: monospace; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin-bottom: 16px; }
    .info { font-size: 12px; text-align: left; background: #F5F2ED; padding: 12px; border-radius: 8px; margin-bottom: 16px; line-height: 1.5; }
    .btn { background: #2D6A4F; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 13px; }
    @media print { .btn { display: none; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="title">TANDA TERIMA LAPORAN SISWA (EMHA CARE)</div>
    <div class="sub">MTs Matholi'ul Huda Troso Pecangaan</div>
    <div class="code-box">${code}</div>
    <div class="info">
      <div><strong>Waktu:</strong> ${currentDate} WIB</div>
      ${category ? `<div><strong>Kategori:</strong> ${category}</div>` : ''}
      ${status ? `<div><strong>Status Terakhir:</strong> ${status}</div>` : ''}
      <div style="margin-top: 6px; color: #7A6A53; font-size: 11px;">
        Gunakan kode di atas pada menu <strong>Lacak Laporanku</strong> di aplikasi EMHA CARE untuk melihat respon dan progres penanganan dari Guru BK secara aman & rahasia.
      </div>
    </div>
    <button class="btn" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bukti-Laporan-${code}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

