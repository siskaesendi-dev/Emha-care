import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, AlertTriangle, MessageSquare, PhoneCall, MessageCircle, UserCheck, FileText, Send, Printer, Download, FileDown, User, Save, Calendar, CheckSquare, Square, Shield, Trash2, Check } from 'lucide-react';
import { Counselor, Report, ReportStatus } from '../../types';
import { printCaseDocument, downloadCaseDocument } from '../../utils/printUtils';

interface ReportDetailModalProps {
  report: Report;
  counselor: Counselor;
  counselorsList: Counselor[];
  onClose: () => void;
  onUpdateReport: (updatedReport: Report) => void;
  onDeleteReport?: (reportId: string) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  counselor,
  counselorsList,
  onClose,
  onUpdateReport,
  onDeleteReport,
}) => {
  const [currentReport, setCurrentReport] = useState<Report>(report);
  const [status, setStatus] = useState<ReportStatus>(report.status);
  const [internalNotes, setInternalNotes] = useState(report.internalNotes || '');
  const [assignedCounselorId, setAssignedCounselorId] = useState(report.assignedCounselorId || counselor.id);
  const [checklist, setChecklist] = useState(report.checklist);
  
  const [counselorReplyText, setCounselorReplyText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleChecklist = async (stepId: string) => {
    const updatedChecklist = checklist.map(item =>
      item.id === stepId
        ? {
            ...item,
            completed: !item.completed,
            completedAt: !item.completed ? new Date().toISOString() : undefined,
            completedBy: !item.completed ? counselor.name : undefined
          }
        : item
    );
    setChecklist(updatedChecklist);
    await saveChanges(status, internalNotes, assignedCounselorId, updatedChecklist);
  };

  const saveChanges = async (
    newStatus: ReportStatus,
    newNotes: string,
    newCounselorId: string,
    newChecklist = checklist
  ) => {
    setIsSaving(true);
    setSaveSuccessMsg('');
    const assignedCounselorObj = counselorsList.find(c => c.id === newCounselorId);

    try {
      const response = await fetch(`/api/reports/${currentReport.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          checklist: newChecklist,
          internalNotes: newNotes,
          assignedCounselorId: newCounselorId,
          assignedCounselorName: assignedCounselorObj?.name || counselor.name,
          actorName: counselor.name
        })
      });
      const data = await response.json();
      if (data.success && data.report) {
        setCurrentReport(data.report);
        onUpdateReport(data.report);
        setSaveSuccessMsg('Catatan dan status penanganan berhasil disimpan.');
        setTimeout(() => setSaveSuccessMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update report:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Apakah Anda yakin ingin menghapus data kasus ${currentReport.reportCode}?\n\nTindakan ini permanen dan akan menghapus laporan dari daftar.`
    );
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      if (onDeleteReport) {
        await onDeleteReport(currentReport.id);
      } else {
        await fetch(`/api/reports/${currentReport.id}`, { method: 'DELETE' });
      }
      onClose();
    } catch (err) {
      console.error('Failed to delete report:', err);
      setIsDeleting(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!counselorReplyText.trim()) return;

    try {
      const response = await fetch(`/api/reports/${currentReport.reportCode}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: counselorReplyText.trim(),
          sender: 'GURU_BK'
        })
      });
      const data = await response.json();
      if (data.success && data.message) {
        const updatedMessages = [...currentReport.messages, data.message];
        const updated = { ...currentReport, messages: updatedMessages };
        setCurrentReport(updated);
        onUpdateReport(updated);
        setCounselorReplyText('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const [isPrinting, setIsPrinting] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const printReport = () => {
    setIsPrinting(true);
    printCaseDocument(currentReport, counselor.name);
    setTimeout(() => setIsPrinting(false), 1500);
  };

  const handleDownload = (format: 'html' | 'doc') => {
    downloadCaseDocument(currentReport, counselor.name, format);
    setShowDownloadMenu(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B4332]/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#FDFBF7] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E9E4D9] max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E9E4D9] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center font-bold font-serif shadow-xs">
              <FileText className="w-5 h-5 text-[#D4A373]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-extrabold text-[#1B4332] font-mono">{currentReport.reportCode}</h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E7F3EF] text-[#2D6A4F] border border-[#2D6A4F]/20">
                  {currentReport.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5F2ED] text-[#1B4332]">
                  {currentReport.indicatorAnalysis.priority === 'MERAH' ? '🔴 Prioritas Merah' : currentReport.indicatorAnalysis.priority === 'KUNING' ? '🟡 Prioritas Kuning' : '🟢 Prioritas Hijau'}
                </span>
              </div>
              <p className="text-[11px] text-[#5C6B5E]">
                Diterima: {new Date(currentReport.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="px-3 py-1.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E9E4D9] text-[#1B4332] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-[#E9E4D9] shadow-2xs"
                title="Unduh Berkas Kasus untuk Disimpan di Perangkat (HP / Laptop)"
              >
                <Download className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span className="hidden sm:inline">Unduh Berkas</span>
              </button>

              {showDownloadMenu && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-[#E9E4D9] p-2 z-20 space-y-1">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8C8475]">
                    Simpan ke Perangkat:
                  </div>
                  <button
                    onClick={() => handleDownload('html')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#1B4332] hover:bg-[#E7F3EF] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-[#2D6A4F]" />
                    <div>
                      <div className="font-bold">Unduh Dokumen Offline (.HTML)</div>
                      <div className="text-[10px] text-[#5C6B5E]">Bisa dibuka offline di HP/PC</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDownload('doc')}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-[#1B4332] hover:bg-[#E7F3EF] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#D4A373]" />
                    <div>
                      <div className="font-bold">Unduh Format Word (.DOC)</div>
                      <div className="text-[10px] text-[#5C6B5E]">Bisa diedit di Word / Docs</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Print / PDF Button */}
            <button
              onClick={printReport}
              disabled={isPrinting}
              className="px-3 py-1.5 rounded-xl bg-[#E7F3EF] hover:bg-[#2D6A4F] text-[#2D6A4F] hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-[#2D6A4F]/30 shadow-2xs"
              title="Cetak Berkas Kasus ke Printer / Simpan PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isPrinting ? 'Mempersiapkan...' : 'Cetak / PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#8C8475] hover:text-[#1B4332] hover:bg-[#F5F2ED] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-[#5C6B5E]">
          
          {saveSuccessMsg && (
            <div className="p-3 bg-[#E7F3EF] border border-[#2D6A4F]/30 rounded-2xl text-[#2D6A4F] text-xs font-semibold flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white rounded-2xl border border-[#E9E4D9] shadow-xs">
              <span className="text-[10px] text-[#8C8475] block font-bold uppercase">Kategori</span>
              <span className="font-bold text-[#1B4332]">{currentReport.category}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-[#E9E4D9] shadow-xs">
              <span className="text-[10px] text-[#8C8475] block font-bold uppercase">Lokasi Kejadian</span>
              <span className="font-bold text-[#1B4332]">{currentReport.location}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-[#E9E4D9] shadow-xs">
              <span className="text-[10px] text-[#8C8475] block font-bold uppercase">Frekuensi</span>
              <span className="font-bold text-[#1B4332]">{currentReport.frequency}</span>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-[#E9E4D9] shadow-xs">
              <span className="text-[10px] text-[#8C8475] block font-bold uppercase">Status Rasa Aman</span>
              <span className={`font-bold ${currentReport.isSafe ? 'text-[#2D6A4F]' : 'text-rose-700'}`}>
                {currentReport.isSafe ? 'Cukup Aman' : '⚠️ Merasa Terancam'}
              </span>
            </div>
          </div>

          {/* Reporter Identification & Fast Contact Box */}
          <div className="p-4.5 bg-white rounded-3xl border border-[#E9E4D9] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C8475] block">Identitas Pelapor</span>
              <div className="font-bold text-sm text-[#1B4332] flex items-center gap-2">
                {currentReport.contactPreference === 'FULL_ANONYMOUS' && (
                  <span className="text-[#5C6B5E]">🛡️ Anonim Penuh (Nama & Kontak Dirahasiakan)</span>
                )}
                {currentReport.contactPreference === 'ANONYMOUS_WITH_PHONE' && (
                  <span className="text-[#1B4332]">🛡️ Anonim (Kontak Tersedia: {currentReport.reporterPhone})</span>
                )}
                {currentReport.contactPreference === 'INCLUDE_NAME_AND_PHONE' && (
                  <span className="text-[#1B4332]">👤 {currentReport.reporterName} ({currentReport.reporterPhone})</span>
                )}
              </div>
            </div>

            {currentReport.reporterPhone && (
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${currentReport.reporterPhone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Hubungi via WA</span>
                </a>
                <a
                  href={`tel:${currentReport.reporterPhone}`}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E7F3EF] text-[#1B4332] font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#E9E4D9]"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Telepon</span>
                </a>
              </div>
            )}
          </div>

          {/* Full Incident Story & Chronology Description */}
          <div className="p-6 bg-white rounded-3xl border border-[#E9E4D9] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2D6A4F]" />
                <span>Kronologi & Cerita / Curhatan yang Disampaikan Pelapor</span>
              </h3>
              {currentReport.incidentTime && (
                <span className="text-[11px] text-[#5C6B5E] bg-[#F5F2ED] px-2.5 py-0.5 rounded-full border border-[#E9E4D9]">
                  Waktu: {currentReport.incidentTime}
                </span>
              )}
            </div>
            <div className="bg-[#FDFBF7] p-4.5 rounded-2xl border border-[#E9E4D9] text-xs sm:text-sm text-[#1B4332] leading-relaxed whitespace-pre-wrap font-sans">
              {currentReport.description}
            </div>
          </div>

          {/* Interactive SOP Case Handling Checklist */}
          <div className="p-6 bg-white rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E4D9] pb-3">
              <div>
                <h3 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Menu Checklist Penanganan Kasus (SOP BK)</span>
                </h3>
                <p className="text-[11px] text-[#5C6B5E] mt-0.5">
                  Centang tahapan yang sudah terlaksana. Tahapan ini langsung terhubung ke status di akun pelapor.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3 py-1 rounded-full border border-[#2D6A4F]/20 shrink-0">
                {checklist.filter(c => c.completed).length} / {checklist.length} Langkah Selesai
              </span>
            </div>

            <div className="space-y-2.5">
              {checklist.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    item.completed
                      ? 'bg-[#E7F3EF] border-[#2D6A4F] text-[#1B4332]'
                      : 'bg-[#FDFBF7] border-[#E9E4D9] hover:bg-[#F5F2ED] text-[#5C6B5E]'
                  }`}
                >
                  <div className="mt-0.5 text-[#2D6A4F] shrink-0">
                    {item.completed ? <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" /> : <Square className="w-4 h-4 text-[#8C8475]" />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className={`text-xs font-bold ${item.completed ? 'line-through text-[#8C8475]' : 'text-[#1B4332]'}`}>
                      {item.stepNumber || idx + 1}. {item.title}
                    </div>
                    <p className="text-[11px] text-[#5C6B5E] leading-snug">{item.description}</p>
                    {item.completed && item.completedAt && (
                      <div className="text-[10px] text-[#2D6A4F] font-medium">
                        ✓ Diselesaikan oleh {item.completedBy || counselor.name} pada {new Date(item.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WIB
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Counselor Assignment Controls + Internal Notes */}
          <div className="p-6 bg-white rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
            <h3 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Status Penanganan & Catatan Guru BK</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Ubah Status Kasus (Terhubung ke Pelapor) *
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    const newSt = e.target.value as ReportStatus;
                    setStatus(newSt);
                    saveChanges(newSt, internalNotes, assignedCounselorId);
                  }}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                >
                  <option value="TERKIRIM">TERKIRIM — Laporan Masuk Baru</option>
                  <option value="DIVERIFIKASI">DIVERIFIKASI — Laporan Sedang Ditelaah</option>
                  <option value="SEDANG_DITANGANI">SEDANG DITANGANI — Proses Bimbingan / Koordinasi</option>
                  <option value="TINDAK_LANJUT">TINDAK LANJUT — Tahap Lanjutan & Pendampingan</option>
                  <option value="SELESAI">SELESAI — Kasus Ditangani Tuntas & Aman</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Guru BK Penanggung Jawab
                </label>
                <select
                  value={assignedCounselorId}
                  onChange={(e) => {
                    setAssignedCounselorId(e.target.value);
                    saveChanges(status, internalNotes, e.target.value);
                  }}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs font-medium outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                >
                  {counselorsList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.assignedGrade})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internal Counselor Notes Field */}
            <div className="space-y-2 pt-2 border-t border-[#E9E4D9]">
              <label className="block text-xs font-bold text-[#1B4332]">
                Catatan Bimbingan Konseling (Diisi oleh Guru BK)
              </label>
              <p className="text-[11px] text-[#5C6B5E]">
                Tuliskan catatan hasil tabayyun, hasil observasi, atau langkah koordinasi dengan wali kelas/orang tua. Catatan ini tersimpan rapi di sistem.
              </p>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Contoh: Telah dilakukan pemanggilan dan bimbingan bersama siswa. Wali kelas telah diinformasikan untuk memantau situasi di kelas..."
                className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3.5 text-xs leading-relaxed outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#8C8475]">
                  Data tersimpan secara otomatis saat disimpan dan tidak akan hilang.
                </span>
                <button
                  type="button"
                  onClick={() => saveChanges(status, internalNotes, assignedCounselorId)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Menyimpan...' : 'Simpan Catatan & Status'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Two-Way Messaging with Student */}
          <div className="p-6 bg-white rounded-3xl border border-[#E9E4D9] shadow-xs space-y-3">
            <h3 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
              <span>Kirim Pesan / Respon ke Siswa (Muncul di Menu "Lacak Laporan")</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto p-3.5 bg-[#FDFBF7] rounded-2xl border border-[#E9E4D9]">
              {currentReport.messages.length === 0 ? (
                <p className="text-center text-[11px] text-[#8C8475] py-2">
                  Belum ada riwayat pesan percakapan khusus untuk laporan ini.
                </p>
              ) : (
                currentReport.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-2xl text-xs max-w-[85%] space-y-0.5 ${
                      m.sender === 'GURU_BK'
                        ? 'bg-[#2D6A4F] text-white ml-auto shadow-xs'
                        : 'bg-white text-[#1B4332] border border-[#E9E4D9] mr-auto shadow-xs'
                    }`}
                  >
                    <div className="text-[9px] font-bold opacity-75 flex justify-between gap-2">
                      <span>{m.sender === 'GURU_BK' ? 'Pesan dari Guru BK' : 'Pesan dari Siswa'}</span>
                      <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WIB</span>
                    </div>
                    <p>{m.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={counselorReplyText}
                onChange={(e) => setCounselorReplyText(e.target.value)}
                placeholder="Tulis pesan penguatan atau respon aman untuk siswa..."
                className="flex-1 bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
              />
              <button
                type="submit"
                disabled={!counselorReplyText.trim()}
                className="px-4 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-2xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </form>
          </div>

          {/* Audit Logs */}
          <div className="p-4.5 bg-white rounded-3xl border border-[#E9E4D9] space-y-2">
            <h4 className="text-[11px] font-bold text-[#5C6B5E] uppercase tracking-wider">
              Catatan Audit & Riwayat Aktivitas Sistem
            </h4>
            <div className="space-y-1.5 text-[10px] text-[#8C8475] max-h-28 overflow-y-auto">
              {currentReport.auditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 border-b border-[#E9E4D9] pb-1">
                  <span className="font-mono text-[#8C8475]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span><strong className="text-[#1B4332]">{log.actor}</strong>: {log.action} — {log.details}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E9E4D9] bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isDeleting ? 'Menghapus...' : 'Hapus Kasus Ini'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={printReport}
              disabled={isPrinting}
              className="px-3.5 py-2 rounded-xl bg-[#E7F3EF] hover:bg-[#2D6A4F] text-[#2D6A4F] hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-[#2D6A4F]/30"
              title="Cetak Berkas Kasus ke Printer Perangkat atau Simpan PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPrinting ? 'Mempersiapkan...' : 'Cetak Berkas (PDF / Printer)'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Selesai / Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
