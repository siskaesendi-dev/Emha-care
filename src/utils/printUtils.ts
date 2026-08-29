import { Report } from '../types';

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

  const html = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <title>Berkas Kasus ${report.reportCode} - EMHA CARE</title>
        <style>
          @page {
            size: A4;
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
            padding: 10px;
            background: #fff;
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
            }
          }
        </style>
      </head>
      <body>
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
      </body>
    </html>
  `;

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

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const totalReports = reports.length;
  const redCount = reports.filter(r => r.indicatorAnalysis.priority === 'MERAH').length;
  const yellowCount = reports.filter(r => r.indicatorAnalysis.priority === 'KUNING').length;
  const resolvedReports = reports.filter(r => r.status === 'SELESAI');

  const resolvedRows = resolvedReports.map((r, i) => `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 6px; text-align: center;">${i + 1}</td>
      <td style="padding: 6px; font-weight: bold; font-family: monospace;">${r.reportCode}</td>
      <td style="padding: 6px;">${r.category}</td>
      <td style="padding: 6px;">${r.location}</td>
      <td style="padding: 6px;">${r.assignedCounselorName || 'Siska Noviana Dewi, M.Sc.'}</td>
      <td style="padding: 6px;">${new Date(r.updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
      <td style="padding: 6px; font-size: 9.5pt;">${r.internalNotes || 'Selesai ditangani'}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="utf-8" />
        <title>Rekapitulasi Statistik & Riwayat Kasus - EMHA CARE</title>
        <style>
          @page { size: A4 portrait; margin: 12mm 15mm 15mm 15mm; }
          body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.35; color: #111; margin: 0; padding: 10px; }
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
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
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
      </body>
    </html>
  `;

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
