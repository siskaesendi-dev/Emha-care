import React, { useState } from 'react';
import { BookOpen, ShieldAlert, Heart, Users, MessageSquare, Sparkles, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface EducationSectionProps {
  onBack: () => void;
  onGoToChat: () => void;
  onGoToReport: () => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ onBack, onGoToChat, onGoToReport }) => {
  const [openCard, setOpenCard] = useState<number | null>(0);

  const toggleCard = (index: number) => {
    setOpenCard(prev => prev === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Modul Edukasi & Karakter MTs
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-700/30 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/90 text-emerald-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Pusat Edukasi & Pencegahan Bullying</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Kenali, Pahami, dan Lindungi Sahabat Kita
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
          Madrasah adalah rumah kedua tempat kita menuntut ilmu dan membina akhlak mulia. Mari belajar membedakan candaan biasa dan perundungan, serta bagaimana menjadi teman yang baik.
        </p>
      </div>

      {/* Accordion / Content Cards */}
      <div className="space-y-4">
        {/* Card 1: Apa itu Bullying? */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => toggleCard(0)}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                01
              </span>
              <span>Apa Itu Perundungan (Bullying)?</span>
            </div>
            {openCard === 0 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openCard === 0 && (
            <div className="p-5 pt-0 text-xs text-slate-700 space-y-3 border-t border-slate-100 leading-relaxed">
              <p>
                <strong>Perundungan (Bullying)</strong> adalah perilaku agresif yang dilakukan secara sengaja dan berulang-ulang oleh seseorang atau sekelompok orang kepada pihak yang merasa tidak berdaya untuk melawan.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <div className="font-bold text-emerald-950 mb-1">1. Ada Niat Menyakiti</div>
                  <p className="text-slate-600">Bukan sekadar ketidaksengajaan, melainkan sengaja membuat orang lain sedih atau malu.</p>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <div className="font-bold text-emerald-950 mb-1">2. Terjadi Berulang Kali</div>
                  <p className="text-slate-600">Bukan peristiwa satu kali yang selesai dengan maaf, melainkan pola yang berlanjut.</p>
                </div>
                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <div className="font-bold text-emerald-950 mb-1">3. Ketimpangan Kuasa</div>
                  <p className="text-slate-600">Pelaku merasa lebih senior, lebih banyak teman geng, atau lebih kuat fisik.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 2: 4 Bentuk Bullying */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => toggleCard(1)}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                02
              </span>
              <span>4 Bentuk Perundungan yang Sering Terjadi</span>
            </div>
            {openCard === 1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openCard === 1 && (
            <div className="p-5 pt-0 text-xs text-slate-700 space-y-3 border-t border-slate-100 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">🗣️ 1. Bullying Verbal</span>
                  <p className="text-slate-600">
                    Memanggil teman dengan julukan buruk/nama orang tua, mengejek bentuk fisik, memaki, menghina latar belakang keluarga.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">🤝 2. Bullying Relasional / Sosial</span>
                  <p className="text-slate-600">
                    Mengucilkan teman dari kelompok belajar, melarang teman lain mengajak bicara, menyebarkan rumor bohong atau gosip.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">💥 3. Bullying Fisik</span>
                  <p className="text-slate-600">
                    Mendorong, memukul, menjegal, memalak uang jajan secara paksa, atau merusak/menyembunyikan buku dan sepatu.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">📱 4. Cyberbullying (Siber)</span>
                  <p className="text-slate-600">
                    Mengedit stiker/foto aib teman, menyebarkan screenshot chat pribadi di grup WhatsApp kelas, atau membuat akun palsu untuk mencaci.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 3: Langkah Aman Jika Mengalami */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => toggleCard(2)}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                03
              </span>
              <span>Apa yang Harus Dilakukan Jika Mengalami Bullying?</span>
            </div>
            {openCard === 2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openCard === 2 && (
            <div className="p-5 pt-0 text-xs text-slate-700 space-y-3 border-t border-slate-100 leading-relaxed">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tetap Tenang & Menjauh:</strong> Hindari membalas dengan kekerasan fisik yang justru dapat membahayakan keselamatanmu.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Simpan Bukti (Jika Ada):</strong> Simpan tangkapan layar chat, foto, atau catat waktu dan lokasi kejadian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bercerita ke Sahabat atau Lapor Anonim:</strong> Manfaatkan EMHA CARE untuk curhat ke Sahabat atau kirim laporan anonim langsung ke Guru BK.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Ingat, Ini Bukan Salahmu:</strong> Kamu tidak sendirian dan kamu berhak diperlakukan dengan penuh hormat di madrasah.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Card 4: Menjadi Upstander (Saksi Bijak) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => toggleCard(3)}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs">
                04
              </span>
              <span>Menjadi "Upstander": Jangan Diam Saat Teman Disakiti</span>
            </div>
            {openCard === 3 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openCard === 3 && (
            <div className="p-5 pt-0 text-xs text-slate-700 space-y-3 border-t border-slate-100 leading-relaxed">
              <p>
                Banyak siswa hanya menjadi <em>Bystander</em> (penonton yang diam karena takut atau menganggap lucu). Menjadi <strong>Upstander</strong> berarti kamu berani mengambil langkah aman untuk membela kebenaran:
              </p>
              <div className="space-y-2 pl-2">
                <div className="p-2.5 bg-purple-50/60 rounded-lg border border-purple-100">
                  <strong>1. Jangan Ikut Tertawa:</strong> Ketika pelaku tidak mendapatkan tawa atau sorak penonton, mereka akan kehilangan rasa bangga.
                </div>
                <div className="p-2.5 bg-purple-50/60 rounded-lg border border-purple-100">
                  <strong>2. Dekati dan Dampingi Teman:</strong> Ajak teman yang diejek untuk pergi bersama ke kantin atau perpustakaan.
                </div>
                <div className="p-2.5 bg-purple-50/60 rounded-lg border border-purple-100">
                  <strong>3. Laporkan Lewat EMHA CARE:</strong> Kamu bisa melaporkan kejadian yang kamu saksikan secara 100% anonim tanpa takut diketahui siapa pun.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card 5: Nilai Ukhuwah & Adab Madrasah */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => toggleCard(4)}
            className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
                05
              </span>
              <span>Nilai Ukhuwah & Adab Pergaulan Remaja Muslim</span>
            </div>
            {openCard === 4 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openCard === 4 && (
            <div className="p-5 pt-0 text-xs text-slate-700 space-y-3 border-t border-slate-100 leading-relaxed">
              <p>
                Sebagai siswa madrasah, kita diajarkan bahwa sesama muslim adalah saudara. Nilai ini diwujudkan dalam rutinitas madrasah:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-950 block mb-1">🌿 Menjaga Lisan</span>
                  <p className="text-slate-600">
                    "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam." (HR. Bukhari & Muslim)
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="font-bold text-emerald-950 block mb-1">🤝 Saling Memaafkan & Tabayyun</span>
                  <p className="text-slate-600">
                    Menghindari prasangka buruk, mengklarifikasi gosip secara bijak, dan tidak memelihara dendam.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-emerald-950">Ada yang ingin kamu ceritakan sekarang?</h3>
          <p className="text-xs text-slate-600">Kami siap mendengar dan mendampingimu kapan saja.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onGoToChat}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs"
          >
            Curhat ke Sahabat
          </button>
          <button
            onClick={onGoToReport}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all border border-slate-200"
          >
            Isi Form Lapor
          </button>
        </div>
      </div>
    </div>
  );
};
