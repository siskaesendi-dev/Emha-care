import React from 'react';
import { 
  MessageCircleHeart, 
  FileText, 
  BookOpen, 
  Search, 
  PhoneCall, 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  AlertTriangle,
  ArrowLeft,
  UserCheck,
  Star,
  Clock,
  MapPin
} from 'lucide-react';
import { EmhaCareLogo } from '../EmhaCareLogo';

interface StudentHomeProps {
  onNavigate: (tab: string) => void;
  onBackToLanding: () => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  onNavigate,
  onBackToLanding,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb / Back Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Depan</span>
        </button>

        <div className="text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3.5 py-1 rounded-full border border-[#2D6A4F]/20">
          Ruang Siswa MTs Matholi'ul Huda Troso
        </div>
      </div>

      {/* Welcome Banner for Siswa */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3EF] text-[#2D6A4F] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ruang Aman & Peduli Siswa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4332]">
              Assalamu'alaikum, Sahabat Madrasah
            </h1>
            <p className="text-xs sm:text-sm text-[#5C6B5E] leading-relaxed max-w-2xl">
              Ini adalah ruang amanmu. Di sini kamu bisa bercerita leluasa, melaporkan perundungan secara rahasia/anonim, memantau tindak lanjut, serta terhubung langsung dengan Guru BK kami.
            </p>
          </div>

          <div className="shrink-0 hidden md:block">
            <EmhaCareLogo size="md" variant="icon" />
          </div>
        </div>

        {/* Guru BK Profile Card inside Student Area */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-[#BFDBFE]/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
              SN
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm sm:text-base text-[#1B4332]">
                  Siska Noviana Dewi, M.Sc.
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E7F3EF] text-[#2D6A4F] px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                  Guru BK MTs Matholi'ul Huda Troso
                </span>
              </div>
              <p className="text-xs text-[#5C6B5E]">
                Koordinator Bimbingan Konseling • Siap mendengarkan & mendampingi dengan amanah
              </p>
              <div className="flex items-center gap-3 text-[11px] text-[#5C6B5E] pt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#8C8475]" /> Senin - Jumat (07.30 - 15.30 WIB)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8C8475]" /> Ruang BK Madrasah
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/6282329180233"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp: 082329180233</span>
            </a>
            <button
              onClick={() => onNavigate('kontak-bk')}
              className="px-3 py-2 rounded-xl bg-white hover:bg-[#F5F2ED] text-[#1B4332] text-xs font-semibold border border-[#E9E4D9] transition-colors"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>

      {/* 4 Main Student Action Modules */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-serif text-[#1B4332]">
          Layanan & Menu Siswa
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1: Curhat ke Sahabat AI */}
          <div
            onClick={() => onNavigate('chat')}
            className="group bg-white hover:bg-[#FDFBF7] p-6 rounded-3xl border border-[#E9E4D9] hover:border-[#2D6A4F] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <MessageCircleHeart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                Curhat Sahabat (Buddy)
              </h3>
              <p className="text-xs text-[#5C6B5E] leading-relaxed">
                Ceritakan unek-unek atau keresahanmu ke <strong>Buddy</strong>, teman dekat yang hangat & empatik sebagai ruang amanmu.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E9E4D9] flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
              <span>Buka Curhat</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Formulir Lapor */}
          <div
            onClick={() => onNavigate('lapor')}
            className="group bg-white hover:bg-[#FDFBF7] p-6 rounded-3xl border border-[#E9E4D9] hover:border-[#2D6A4F] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                Buat Laporan
              </h3>
              <p className="text-xs text-[#5C6B5E] leading-relaxed">
                Kirimkan laporan resmi kejadian perundungan langsung ke Guru BK. Kamu bisa memilih untuk <strong>100% Anonim</strong>.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E9E4D9] flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
              <span>Isi Laporan</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Lacak Status Laporanku */}
          <div
            onClick={() => onNavigate('lacak')}
            className="group bg-white hover:bg-[#FDFBF7] p-6 rounded-3xl border border-[#E9E4D9] hover:border-[#2D6A4F] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                Lacak Laporanku
              </h3>
              <p className="text-xs text-[#5C6B5E] leading-relaxed">
                Pantau progres tindak lanjut laporan yang telah kamu kirimkan dengan memasukkan kode unik (contoh: <code>EMHA-7824</code>).
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E9E4D9] flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
              <span>Cek Status</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Edukasi Bullying */}
          <div
            onClick={() => onNavigate('edukasi')}
            className="group bg-white hover:bg-[#FDFBF7] p-6 rounded-3xl border border-[#E9E4D9] hover:border-[#2D6A4F] shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-[#D4A373] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                Edukasi Bullying
              </h3>
              <p className="text-xs text-[#5C6B5E] leading-relaxed">
                Pahami jenis-jenis bullying (verbal, fisik, siber, sosial), langkah pertolongan, dan nilai ukhuwah islamiyah.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E9E4D9] flex items-center justify-between text-xs font-bold text-[#7A6A53]">
              <span>Baca Panduan</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Box inside Student Hub */}
      <div className="p-5 rounded-3xl bg-[#F5F2ED] border border-[#E9E4D9] text-[#5C6B5E] text-xs flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-[#D4A373] shrink-0 mt-0.5" />
        <div className="space-y-1 flex-1">
          <span className="font-bold text-[#1B4332] block">Memerlukan Pendampingan Segera?</span>
          <p className="leading-relaxed">
            Jika kamu atau temanmu sedang dalam ancaman atau membutuhkan bantuan mendesak, segera temui guru piket di madrasah atau hubungi Guru BK <strong>Siska Noviana Dewi, M.Sc.</strong> via WhatsApp di <a href="https://wa.me/6282329180233" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] underline">082329180233</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
