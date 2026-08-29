import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, BookOpen, Layers, Cpu, ArrowLeft } from 'lucide-react';
import { RED_PRIORITY_KEYWORDS, YELLOW_PRIORITY_KEYWORDS } from '../../utils/ruleClassifier';

interface IndicatorAnalysisViewProps {
  onBack: () => void;
}

export const IndicatorAnalysisView: React.FC<IndicatorAnalysisViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#5C6B5E] hover:text-[#1B4332] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard BK</span>
        </button>

        <div className="text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3.5 py-1.5 rounded-full border border-[#2D6A4F]/30 font-serif">
          Transparansi & Metodologi Sistem
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#1B4332] text-white p-6 sm:p-8 rounded-3xl shadow-sm border border-[#2D6A4F]/40 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F] text-[#FDFBF7] text-xs font-semibold">
          <Cpu className="w-3.5 h-3.5 text-[#D4A373]" />
          <span>Rule-Based Triase Engine</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight font-serif text-[#FDFBF7]">
          Transparansi Logika Analisis Indikator
        </h1>
        <p className="text-xs sm:text-sm text-[#E7F3EF] leading-relaxed max-w-2xl">
          EMHA CARE menerapkan arsitektur <strong>Rule-Based yang Deterministik dan Terpisah dari Gemini AI</strong> untuk klasifikasi prioritas laporan. Hal ini menjamin objektivitas, kepatuhan SOP madrasah, dan ketiadaan halusinasi atau bias algoritma.
        </p>
      </div>

      {/* 3 Priority Tiers Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* RED */}
        <div className="bg-white p-5 rounded-3xl border border-rose-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping"></span>
            <h2 className="font-bold text-sm text-rose-900 font-serif">PRIORITAS MERAH</h2>
          </div>
          <p className="text-xs text-[#5C6B5E] leading-relaxed">
            Kasus dengan indikasi bahaya fisik mendesak, pemalakan berat, ancaman keselamatan, atau siswa menyatakan diri tidak aman.
          </p>
          <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100 text-[11px] text-rose-950 font-medium">
            ⏱️ <strong>SOP Waktu:</strong> Respons & telaah dalam &lt; 2 Jam.
          </div>
        </div>

        {/* YELLOW */}
        <div className="bg-white p-5 rounded-3xl border border-[#D4A373]/40 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D4A373]"></span>
            <h2 className="font-bold text-sm text-[#9A6B3D] font-serif">PRIORITAS KUNING</h2>
          </div>
          <p className="text-xs text-[#5C6B5E] leading-relaxed">
            Perundungan verbal berulang, pengucilan sosial dari grup kelas, atau cyberbullying yang mengganggu psikis siswa.
          </p>
          <div className="p-3.5 bg-[#F5F2ED] rounded-2xl border border-[#E9E4D9] text-[11px] text-[#9A6B3D] font-medium">
            ⏱️ <strong>SOP Waktu:</strong> Klarifikasi dalam &lt; 24 Jam.
          </div>
        </div>

        {/* GREEN */}
        <div className="bg-white p-5 rounded-3xl border border-[#2D6A4F]/30 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2D6A4F]"></span>
            <h2 className="font-bold text-sm text-[#2D6A4F] font-serif">PRIORITAS HIJAU</h2>
          </div>
          <p className="text-xs text-[#5C6B5E] leading-relaxed">
            Kejadian insidental atau gesekan antarsiswa frekuensi rendah yang membutuhkan pemantauan rutin dan penguatan akhlak.
          </p>
          <div className="p-3.5 bg-[#E7F3EF] rounded-2xl border border-[#2D6A4F]/20 text-[11px] text-[#2D6A4F] font-medium">
            ⏱️ <strong>SOP Waktu:</strong> Observasi berkala & bimbingan kelas.
          </div>
        </div>
      </div>

      {/* Keywords Directory & Weighting Rules */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-5">
        <h2 className="font-bold text-sm text-[#1B4332] font-serif border-b border-[#E9E4D9] pb-3">
          Kamus Kata Kunci Pemicu (Keywords Dictionary)
        </h2>

        {/* Red Keywords */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            Kata Kunci Prioritas Merah (+50 Poin)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {RED_PRIORITY_KEYWORDS.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 rounded-xl text-xs font-mono">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Yellow Keywords */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-[#9A6B3D] flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#D4A373]" />
            Kata Kunci Prioritas Kuning (+25 Poin)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {YELLOW_PRIORITY_KEYWORDS.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 bg-[#F5F2ED] text-[#9A6B3D] border border-[#D4A373]/40 rounded-xl text-xs font-mono">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Modifiers & Multipliers */}
        <div className="pt-4 border-t border-[#E9E4D9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C6B5E]">
          <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E9E4D9]">
            <span className="font-bold text-[#1B4332] block mb-1 font-serif">Bobot Frekuensi Kejadian:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[#5C6B5E] text-[11px]">
              <li><strong>Sering:</strong> +35 Poin (Multiplier risiko tinggi)</li>
              <li><strong>Beberapa Kali:</strong> +20 Poin</li>
              <li><strong>Sekali:</strong> +5 Poin</li>
            </ul>
          </div>

          <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E9E4D9]">
            <span className="font-bold text-[#1B4332] block mb-1 font-serif">Status Keamanan Siswa:</span>
            <ul className="list-disc pl-4 space-y-0.5 text-[#5C6B5E] text-[11px]">
              <li><strong>Merasa Terancam (isSafe = False):</strong> +45 Poin & otomatis eskalasi ke tinjauan mendesak</li>
              <li><strong>Merasa Cukup Aman (isSafe = True):</strong> 0 Poin penalti tambahan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
