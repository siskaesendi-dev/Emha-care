import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Search, Home, ShieldCheck, Heart, AlertCircle, Download, FileText } from 'lucide-react';
import { downloadStudentReportSlip } from '../../utils/printUtils';

interface ReportConfirmationProps {
  reportCode: string;
  onTrackNow: (code: string) => void;
  onGoHome: () => void;
}

export const ReportConfirmation: React.FC<ReportConfirmationProps> = ({
  reportCode,
  onTrackNow,
  onGoHome
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSlip = () => {
    downloadStudentReportSlip({
      reportCode,
      category: 'Laporan Siswa',
      createdAt: new Date().toISOString(),
      status: 'TERKIRIM'
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 py-6 pb-16">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#E7F3EF] text-[#2D6A4F] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-serif text-[#1B4332]">Laporan Berhasil Diterima</h1>
        <p className="text-xs text-[#5C6B5E] max-w-md mx-auto leading-relaxed">
          Terima kasih telah berani bercerita. Keberanianmu adalah langkah pertama untuk menciptakan madrasah yang aman dan saling menghargai.
        </p>
      </div>

      {/* Unique Tracking Code Card */}
      <div className="bg-[#1B4332] text-white p-7 rounded-3xl shadow-xl shadow-[#1b43321a] border border-[#2D6A4F] text-center space-y-4">
        <div className="text-xs font-semibold text-[#D4A373] uppercase tracking-widest">
          ID Laporan Anonim Kamu
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-wider text-[#FDFBF7] bg-black/25 px-6 py-2.5 rounded-2xl border border-white/10">
            {reportCode}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D6A4F] hover:bg-[#23533e] text-xs font-semibold transition-all border border-white/20 text-white shadow-xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#D4A373]" />
                <span>Kode Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D4A373]" />
                <span>Salin Kode Laporan</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadSlip}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FDFBF7] hover:bg-white text-[#1B4332] text-xs font-bold transition-all shadow-xs cursor-pointer"
            title="Unduh dan simpan bukti kode laporan dalam format PDF di HP/Laptop"
          >
            <Download className="w-4 h-4 text-[#2D6A4F]" />
            <span>Unduh Bukti (PDF)</span>
          </button>
        </div>

        <p className="text-[11px] text-[#E7F3EF]/80 max-w-sm mx-auto">
          ⚠️ <strong>Simpan kode ini baik-baik!</strong> Kode ini adalah satu-satunya cara untuk mengecek perkembangan penanganan tanpa membuka identitasmu.
        </p>
      </div>

      {/* What Happens Next Section */}
      <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4 text-xs text-[#5C6B5E]">
        <h2 className="font-bold text-[#1B4332] text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
          Apa yang Terjadi Selanjutnya?
        </h2>
        <ul className="space-y-2.5 pl-1">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#E7F3EF] text-[#2D6A4F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
            <span><strong className="text-[#1B4332]">Penelaahan Awal:</strong> Guru BK yang bertugas akan membaca dan memverifikasi laporanmu.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#E7F3EF] text-[#2D6A4F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
            <span><strong className="text-[#1B4332]">Tindak Lanjut & Perlindungan:</strong> Guru BK melakukan langkah pembinaan edukatif sesuai SOP madrasah dengan mengutamakan rasa aman siswa.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#E7F3EF] text-[#2D6A4F] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
            <span><strong className="text-[#1B4332]">Pembaruan Status:</strong> Kamu bisa memasukkan kode <strong className="text-[#2D6A4F]">{reportCode}</strong> di menu "Lacak Laporanku" kapan saja untuk melihat progres penanganan.</span>
          </li>
        </ul>

        {/* Realistic Ethical Reassurance */}
        <div className="mt-3 p-3.5 bg-[#F5F2ED] rounded-2xl border border-[#E9E4D9] text-[11px] text-[#7A6A53] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#8C8475] shrink-0 mt-0.5" />
          <div>
            Proses penanganan membutuhkan waktu dan kehati-hatian agar adil bagi semua pihak. Jika kamu merasa tidak aman saat ini juga, jangan ragu untuk langsung menemui guru piket atau wali kelas.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onTrackNow(reportCode)}
          className="flex-1 py-3.5 px-5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#2d6a4f33] flex items-center justify-center gap-2 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Lacak Status Laporan Sekarang</span>
        </button>

        <button
          onClick={onGoHome}
          className="py-3.5 px-5 rounded-2xl bg-white hover:bg-[#FDFBF7] text-[#1B4332] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border-2 border-[#E9E4D9]"
        >
          <Home className="w-4 h-4 text-[#5C6B5E]" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
