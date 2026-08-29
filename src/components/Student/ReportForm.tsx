import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, CheckCircle2, Lock, AlertTriangle, Send, HeartHandshake, Info } from 'lucide-react';
import { ContactPreference, IncidentCategory, IncidentFrequency, IncidentLocation } from '../../types';

interface ReportFormProps {
  initialDescription?: string;
  onBack: () => void;
  onSubmitSuccess: (reportCode: string, reportData: any) => void;
}

const CATEGORIES: IncidentCategory[] = [
  'Ejekan / Hinaan (Verbal)',
  'Pengucilan / Sosial',
  'Ancaman / Intimidasi',
  'Kekerasan Fisik',
  'Kekerasan Daring (Cyber)',
  'Pelecehan',
  'Lainnya'
];

const LOCATIONS: IncidentLocation[] = [
  'Ruang Kelas',
  'Kantin Madrasah',
  'Lorong / Tangga',
  'Toilet / Area Wudhu',
  'Lapangan Olahraga',
  'Media Sosial / Grup WhatsApp',
  'Gerbang / Area Luar Madrasah',
  'Tempat Lainnya'
];

const FREQUENCIES: IncidentFrequency[] = [
  'Sekali',
  'Beberapa Kali',
  'Sering',
  'Tidak Yakin'
];

export const ReportForm: React.FC<ReportFormProps> = ({
  initialDescription = '',
  onBack,
  onSubmitSuccess,
}) => {
  const [category, setCategory] = useState<IncidentCategory>('Ejekan / Hinaan (Verbal)');
  const [location, setLocation] = useState<IncidentLocation>('Ruang Kelas');
  const [incidentTime, setIncidentTime] = useState('');
  const [frequency, setFrequency] = useState<IncidentFrequency>('Beberapa Kali');
  const [isSafe, setIsSafe] = useState<boolean>(true);
  const [description, setDescription] = useState(initialDescription);
  
  const [contactPref, setContactPref] = useState<ContactPreference>('FULL_ANONYMOUS');
  const [reporterName, setReporterName] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setErrorMsg('Mohon isi deskripsi atau cerita singkat mengenai kejadian yang dialami.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          location,
          incidentTime: incidentTime.trim(),
          frequency,
          isSafe,
          description: description.trim(),
          contactPreference: contactPref,
          reporterName: contactPref === 'INCLUDE_NAME_AND_PHONE' ? reporterName.trim() : undefined,
          reporterPhone: contactPref !== 'FULL_ANONYMOUS' ? reporterPhone.trim() : undefined,
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim laporan');
      }

      onSubmitSuccess(data.reportCode, data.report);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi gangguan saat mengirim laporan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-16">
      {/* Navigation Top */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3 py-1 rounded-full border border-[#E9E4D9]">
          <Lock className="w-3.5 h-3.5 text-[#2D6A4F]" />
          <span>Form Laporan Terlindungi</span>
        </div>
      </div>

      {/* Form Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-2">
        <h1 className="text-2xl font-bold font-serif text-[#1B4332]">Formulir Pelaporan Kejadian</h1>
        <p className="text-xs text-[#5C6B5E] leading-relaxed">
          Sampaikan apa yang kamu alami atau ketahui. Laporan ini hanya dapat diakses oleh Guru BK yang berwenang untuk ditindaklanjuti secara bijak.
        </p>

        {/* Ethical / Privacy Reminder */}
        <div className="mt-3 p-3.5 bg-[#F3EFED] rounded-2xl border border-[#E9E4D9] text-[11px] text-[#7A6A53] flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#1B4332]">Pengingat Aman:</strong> Gunakan informasi seperlunya. Jangan mencantumkan nama lengkap atau data sensitif siswa lain demi menjaga keadilan dan privasi bersama.
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Category */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-3">
          <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider">
            1. Jenis Kejadian Perundungan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CATEGORIES.map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`p-3.5 rounded-2xl text-left text-xs font-semibold transition-all border ${
                  category === cat
                    ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                    : 'bg-[#FDFBF7] hover:bg-[#F5F2ED] text-[#5C6B5E] border-[#E9E4D9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2. General Location & Time */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5">
              2. Lokasi Umum Kejadian
            </label>
            <p className="text-[11px] text-[#5C6B5E] mb-2.5">
              Pilih area umum (bukan lokasi detail yang membocorkan privasi).
            </p>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as IncidentLocation)}
              className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3.5 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
            >
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5">
              Perkiraan Waktu Kejadian (Opsional)
            </label>
            <input
              type="text"
              value={incidentTime}
              onChange={(e) => setIncidentTime(e.target.value)}
              placeholder="Contoh: Jam istirahat kedua, kemarin siang, atau saat jam kosong"
              className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
            />
          </div>
        </div>

        {/* 3. Frequency & Safety Status */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">
              3. Berapa Kali Kejadian Ini Terjadi?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FREQUENCIES.map(freq => (
                <button
                  type="button"
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`py-2.5 px-3 rounded-2xl text-center text-xs font-semibold transition-all border ${
                    frequency === freq
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                      : 'bg-[#FDFBF7] hover:bg-[#F5F2ED] text-[#5C6B5E] border-[#E9E4D9]'
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>

          {/* Safety Check Question */}
          <div className="pt-3 border-t border-[#E9E4D9]">
            <label className="block text-xs font-bold text-[#1B4332] mb-2">
              Apakah kamu merasa aman di lingkungan madrasah saat ini?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsSafe(true)}
                className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  isSafe
                    ? 'bg-[#E7F3EF] text-[#1B4332] border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20'
                    : 'bg-[#FDFBF7] text-[#5C6B5E] border-[#E9E4D9] hover:bg-[#F5F2ED]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Ya, masih cukup aman</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSafe(false)}
                className={`p-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
                  !isSafe
                    ? 'bg-rose-50 text-rose-900 border-rose-400 ring-2 ring-rose-500/20'
                    : 'bg-[#FDFBF7] text-[#5C6B5E] border-[#E9E4D9] hover:bg-[#F5F2ED]'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Tidak, saya merasa terancam</span>
              </button>
            </div>
            {!isSafe && (
              <p className="mt-2 text-[11px] text-rose-700 font-medium">
                ⚠️ Laporan ini akan diprioritaskan untuk ditinjau segera oleh Guru BK.
              </p>
            )}
          </div>
        </div>

        {/* 4. Incident Description */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider">
              4. Ceritakan Apa yang Terjadi *
            </label>
            {initialDescription && (
              <span className="text-[10px] text-[#2D6A4F] bg-[#E7F3EF] px-2.5 py-0.5 rounded-full font-bold">
                Terisi otomatis dari sesi chat
              </span>
            )}
          </div>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ceritakan dengan kata-katamu sendiri apa yang terjadi, bagaimana perlakuan yang dialami, dan apa yang kamu rasakan..."
            className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3.5 text-xs sm:text-sm focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none leading-relaxed text-[#1B4332]"
          />
        </div>

        {/* 5. Contact & Identity Options (No Coercion) */}
        <div className="bg-white p-6 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
              5. Pilihan Identitas & Kontak
            </label>
            <p className="text-[11px] text-[#5C6B5E] mb-3">
              Semua opsi ini aman. Kamu bebas memilih tanpa paksaan sedikit pun.
            </p>

            <div className="space-y-2.5">
              <label 
                onClick={() => setContactPref('FULL_ANONYMOUS')}
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  contactPref === 'FULL_ANONYMOUS'
                    ? 'bg-[#E7F3EF] border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20'
                    : 'bg-[#FDFBF7] border-[#E9E4D9] hover:bg-[#F5F2ED]'
                }`}
              >
                <input
                  type="radio"
                  name="contactPref"
                  checked={contactPref === 'FULL_ANONYMOUS'}
                  onChange={() => setContactPref('FULL_ANONYMOUS')}
                  className="mt-0.5 text-[#2D6A4F] focus:ring-[#2D6A4F]"
                />
                <div>
                  <div className="font-bold text-xs text-[#1B4332]">Anonim Penuh (Paling Terlindungi)</div>
                  <div className="text-[11px] text-[#5C6B5E]">
                    Tidak mencantumkan nama maupun nomor HP. Kamu hanya memakai <strong>Kode Laporan</strong> untuk memantau status.
                  </div>
                </div>
              </label>

              <label 
                onClick={() => setContactPref('ANONYMOUS_WITH_PHONE')}
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  contactPref === 'ANONYMOUS_WITH_PHONE'
                    ? 'bg-[#E7F3EF] border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20'
                    : 'bg-[#FDFBF7] border-[#E9E4D9] hover:bg-[#F5F2ED]'
                }`}
              >
                <input
                  type="radio"
                  name="contactPref"
                  checked={contactPref === 'ANONYMOUS_WITH_PHONE'}
                  onChange={() => setContactPref('ANONYMOUS_WITH_PHONE')}
                  className="mt-0.5 text-[#2D6A4F] focus:ring-[#2D6A4F]"
                />
                <div>
                  <div className="font-bold text-xs text-[#1B4332]">Anonim, tapi boleh dihubungi nomor ini</div>
                  <div className="text-[11px] text-[#5C6B5E]">
                    Nama tetap dirahasiakan. Guru BK hanya bisa menghubungi nomor WhatsApp ini secara privat untuk pendampingan.
                  </div>
                </div>
              </label>

              <label 
                onClick={() => setContactPref('INCLUDE_NAME_AND_PHONE')}
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  contactPref === 'INCLUDE_NAME_AND_PHONE'
                    ? 'bg-[#E7F3EF] border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20'
                    : 'bg-[#FDFBF7] border-[#E9E4D9] hover:bg-[#F5F2ED]'
                }`}
              >
                <input
                  type="radio"
                  name="contactPref"
                  checked={contactPref === 'INCLUDE_NAME_AND_PHONE'}
                  onChange={() => setContactPref('INCLUDE_NAME_AND_PHONE')}
                  className="mt-0.5 text-[#2D6A4F] focus:ring-[#2D6A4F]"
                />
                <div>
                  <div className="font-bold text-xs text-[#1B4332]">Sertakan Nama & Kontak</div>
                  <div className="text-[11px] text-[#5C6B5E]">
                    Nama dan nomor kontak hanya dapat dilihat oleh Guru BK bertugas (tidak pernah dipublikasikan).
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Conditional inputs */}
          {contactPref === 'INCLUDE_NAME_AND_PHONE' && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#1B4332] mb-1">
                  Nama atau Panggilanmu (Opsional / Terlindungi)
                </label>
                <input
                  type="text"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                  placeholder="Contoh: Rian (Kelas 8B)"
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1B4332] mb-1">
                  Nomor HP / WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  value={reporterPhone}
                  onChange={(e) => setReporterPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
                />
              </div>
            </div>
          )}

          {contactPref === 'ANONYMOUS_WITH_PHONE' && (
            <div className="pt-2">
              <label className="block text-xs font-semibold text-[#1B4332] mb-1">
                Nomor HP / WhatsApp Aktif (Untuk dihubungi Guru BK)
              </label>
              <input
                type="tel"
                value={reporterPhone}
                onChange={(e) => setReporterPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white outline-none text-[#1B4332]"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#2d6a4f33] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Mengirim Laporan...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Kirim Laporan Secara Aman</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-[#8C8475]">
          Dengan mengirim laporan ini, Guru BK akan menerima data dan menelaah langkah pembinaan yang bijak. Tidak ada sanksi otomatis tanpa peninjauan manusia.
        </p>
      </form>
    </div>
  );
};
