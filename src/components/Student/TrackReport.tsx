import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, CheckCircle2, Clock, MessageSquare, Send, ArrowLeft, Star, ThumbsUp, HelpCircle, AlertCircle } from 'lucide-react';
import { ReportStatus } from '../../types';

interface TrackReportProps {
  initialCode?: string;
  onBack: () => void;
}

const STATUS_STEPS: { key: ReportStatus; label: string; desc: string }[] = [
  { key: 'TERKIRIM', label: 'Terkirim', desc: 'Laporan telah masuk ke sistem' },
  { key: 'DIVERIFIKASI', label: 'Diverifikasi Guru BK', desc: 'Guru BK menelaah laporan awal' },
  { key: 'SEDANG_DITANGANI', label: 'Sedang Ditangani', desc: 'Koordinasi & pendampingan berjalan' },
  { key: 'TINDAK_LANJUT', label: 'Tindak Lanjut Dilakukan', desc: 'Sesi konseling/pembinaan terlaksana' },
  { key: 'SELESAI', label: 'Selesai / Dipantau', desc: 'Kasus selesai & dalam pemantauan' },
];

export const TrackReport: React.FC<TrackReportProps> = ({ initialCode = '', onBack }) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [report, setReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [replyText, setReplyText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  
  // Feedback state
  const [rating, setRating] = useState(5);
  const [studentComment, setStudentComment] = useState('');
  const [isSituationBetter, setIsSituationBetter] = useState(true);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const fetchReport = async (codeToFetch: string) => {
    if (!codeToFetch.trim()) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const formatted = codeToFetch.trim().toUpperCase();
      const res = await fetch(`/api/reports/${formatted}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Laporan tidak ditemukan');
      }
      setReport(data.report);
    } catch (err: any) {
      setReport(null);
      setErrorMsg(err.message || 'Gagal memuat status laporan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      fetchReport(initialCode);
    }
  }, [initialCode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !report) return;

    setSendingMsg(true);
    try {
      const res = await fetch(`/api/reports/${report.reportCode}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: replyText.trim(),
          sender: 'SISWA'
        })
      });
      const data = await res.json();
      if (res.ok) {
        setReport((prev: any) => ({
          ...prev,
          messages: [...(prev?.messages || []), data.message]
        }));
        setReplyText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingMsg(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report) return;
    setSubmittingFeedback(true);
    try {
      const res = await fetch(`/api/reports/${report.reportCode}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          studentComment,
          isSituationBetter
        })
      });
      const data = await res.json();
      if (res.ok) {
        setFeedbackSuccess(true);
        setReport((prev: any) => ({
          ...prev,
          feedback: data.feedback
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getCurrentStepIndex = (status: ReportStatus) => {
    switch (status) {
      case 'TERKIRIM': return 0;
      case 'DIVERIFIKASI': return 1;
      case 'SEDANG_DITANGANI': return 2;
      case 'TINDAK_LANJUT': return 3;
      case 'SELESAI': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = report ? getCurrentStepIndex(report.status) : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="text-xs font-bold text-[#7A6A53] bg-[#F5F2ED] px-3 py-1 rounded-full border border-[#E9E4D9]">
          Pelacak Kasus Anonim Siswa
        </div>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-3">
        <h1 className="text-2xl font-bold font-serif text-[#1B4332] flex items-center gap-2">
          <Search className="w-5 h-5 text-[#2D6A4F]" />
          Lacak Status Laporanku
        </h1>
        <p className="text-xs text-[#5C6B5E]">
          Masukkan <strong>Kode Laporan Anonim</strong> yang kamu dapatkan saat mengirim laporan (contoh: <code>EMHA-7824</code>).
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchReport(searchCode);
          }}
          className="flex gap-2 pt-1"
        >
          <input
            type="text"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
            placeholder="Masukkan Kode EMHA-XXXX..."
            className="flex-1 uppercase font-mono tracking-wider bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
          />
          <button
            type="submit"
            disabled={loading || !searchCode.trim()}
            className="px-6 py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs shadow-xs transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            {loading ? <span>Mencari...</span> : <span>Lacak</span>}
          </button>
        </form>

        {/* Demo Quick Codes */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-[#5C6B5E]">
          <span>Contoh kode untuk demo:</span>
          {['EMHA-7824', 'EMHA-3190', 'EMHA-5521', 'EMHA-9042'].map(code => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setSearchCode(code);
                fetchReport(code);
              }}
              className="px-2.5 py-0.5 bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] rounded-lg font-mono text-[10px] font-bold text-[#1B4332] transition-colors border border-[#E9E4D9]"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Report Timeline & Details */}
      {report && (
        <div className="space-y-6">
          {/* Card Overview */}
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9E4D9] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8475]">Kode Laporan</span>
                <div className="font-mono text-xl font-extrabold text-[#1B4332]">{report.reportCode}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8C8475]">Tanggal Pengiriman</span>
                <div className="text-xs font-medium text-[#5C6B5E]">
                  {new Date(report.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E9E4D9]">
                <span className="text-[10px] text-[#8C8475] block">Kategori Kejadian</span>
                <span className="font-bold text-[#1B4332]">{report.category}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E9E4D9]">
                <span className="text-[10px] text-[#8C8475] block">Lokasi Umum</span>
                <span className="font-bold text-[#1B4332]">{report.location}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E9E4D9] col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#8C8475] block">Frekuensi</span>
                <span className="font-bold text-[#1B4332]">{report.frequency}</span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
              Perkembangan Penanganan oleh Guru BK
            </h2>

            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E9E4D9]">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.key} className="relative group">
                    {/* Stepper Dot */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isPassed
                          ? 'bg-[#2D6A4F] text-white ring-4 ring-[#E7F3EF]'
                          : 'bg-[#F5F2ED] text-[#8C8475] border border-[#E9E4D9]'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-[#1B4332]' : isPassed ? 'text-[#2D6A4F]' : 'text-[#8C8475]'}`}>
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 bg-[#E7F3EF] text-[#2D6A4F] rounded-full animate-pulse">
                            Tahap Saat Ini
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5C6B5E]">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {report.checklistSummary && (
              <div className="p-3.5 bg-[#E7F3EF] rounded-2xl border border-[#E9E4D9] text-xs text-[#1B4332] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#2D6A4F]">Langkah Terakhir: </span>
                  <span>{report.checklistSummary.currentStep}</span>
                </div>
                <span className="text-[10px] font-extrabold bg-[#2D6A4F] text-white px-2.5 py-0.5 rounded-full">
                  {report.checklistSummary.completedSteps}/{report.checklistSummary.totalSteps} Selesai
                </span>
              </div>
            )}
          </div>

          {/* Anonymous Two-way Messaging with Guru BK */}
          <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4D9] pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
                Pesan Susulan / Informasi Tambahan (Anonim)
              </h2>
            </div>
            <p className="text-[11px] text-[#5C6B5E]">
              Kamu bisa mengirim pesan atau klarifikasi tambahan ke Guru BK kapan saja lewat kotak ini tanpa membuka identitasmu.
            </p>

            {/* Messages Thread */}
            <div className="space-y-3 max-h-64 overflow-y-auto p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#E9E4D9]">
              {report.messages && report.messages.length > 0 ? (
                report.messages.map((m: any) => {
                  const isBK = m.sender === 'GURU_BK';
                  return (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl text-xs max-w-[85%] space-y-1 ${
                        isBK
                          ? 'bg-white border border-[#E9E4D9] text-[#1B4332] mr-auto shadow-xs'
                          : 'bg-[#2D6A4F] text-white ml-auto shadow-xs'
                      }`}
                    >
                      <div className="font-bold text-[10px] opacity-80 flex items-center justify-between gap-2">
                        <span>{isBK ? 'Guru Bimbingan Konseling' : 'Pesanmu (Siswa)'}</span>
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="leading-relaxed">{m.text}</p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-[#8C8475] text-xs py-4">
                  Belum ada pesan tambahan.
                </div>
              )}
            </div>

            {/* Send Reply Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ketik pesan susulan untuk Guru BK di sini..."
                className="flex-1 bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
              />
              <button
                type="submit"
                disabled={sendingMsg || !replyText.trim()}
                className="px-4 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-2xl text-xs font-bold transition-all disabled:opacity-40 flex items-center gap-1.5"
              >
                {sendingMsg ? <span>Mengirim...</span> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>

          {/* Post-Resolution Feedback Form (When Case is Selesai) */}
          {report.status === 'SELESAI' && (
            <div className="bg-[#F3EFED] p-6 rounded-3xl border border-[#E9E4D9] space-y-4">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-[#2D6A4F]" />
                <h3 className="text-sm font-bold text-[#1B4332]">
                  Umpan Balik Siswa (Evaluasi Program EMHA CARE)
                </h3>
              </div>
              <p className="text-xs text-[#5C6B5E]">
                Kasus ini telah selesai ditangani. Apakah situasimu di madrasah saat ini sudah terasa lebih baik dan aman?
              </p>

              {report.feedback || feedbackSuccess ? (
                <div className="p-4 bg-white rounded-2xl border border-[#E9E4D9] text-xs text-[#1B4332] space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-[#2D6A4F]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                    Terima kasih atas umpan balikmu!
                  </div>
                  <p className="text-[#5C6B5E]">
                    Masukanmu sangat berharga untuk terus menjaga madrasah kita tetap aman dan bersahabat bagi semua.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-3 bg-white p-5 rounded-2xl border border-[#E9E4D9]">
                  <div>
                    <label className="block text-xs font-semibold text-[#1B4332] mb-1.5">
                      Apakah situasinya sekarang sudah membaik?
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setIsSituationBetter(true)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          isSituationBetter
                            ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                            : 'bg-[#FDFBF7] text-[#5C6B5E] border-[#E9E4D9]'
                        }`}
                      >
                        👍 Ya, Sudah Membaik
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSituationBetter(false)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                          !isSituationBetter
                            ? 'bg-[#D4A373] text-white border-[#D4A373]'
                            : 'bg-[#FDFBF7] text-[#5C6B5E] border-[#E9E4D9]'
                        }`}
                      >
                        Masih Perlu Perhatian
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B4332] mb-1">
                      Penilaian Pendampingan Guru BK (1 - 5 Bintang)
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1 text-[#D4A373] hover:scale-110 transition-transform"
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-[#E9E4D9]'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1B4332] mb-1">
                      Catatan atau pesan untuk Guru BK (Opsional)
                    </label>
                    <input
                      type="text"
                      value={studentComment}
                      onChange={(e) => setStudentComment(e.target.value)}
                      placeholder="Contoh: Alhamdulillah sekarang di kelas sudah nyaman..."
                      className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingFeedback}
                    className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50"
                  >
                    {submittingFeedback ? 'Mengirim...' : 'Kirim Umpan Balik'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
