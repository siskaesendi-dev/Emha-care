import React from 'react';
import { 
  Lock, 
  Sparkles, 
  ChevronRight, 
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  UserCheck
} from 'lucide-react';
import { EmhaCareLogo } from '../EmhaCareLogo';

interface LandingHeroProps {
  onEnterStudentPortal: () => void;
  onOpenCounselorPortal: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ 
  onEnterStudentPortal,
  onOpenCounselorPortal
}) => {
  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Front Entrance & Brand Display */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#E9E4D9] p-7 sm:p-12 shadow-xl shadow-[#1b43320d]">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Main Logo */}
          <div className="shrink-0 flex flex-col items-center text-center">
            <div className="p-4 sm:p-5 rounded-3xl bg-[#F8FAFC] border border-[#BFDBFE]/60 shadow-sm">
              <EmhaCareLogo size="xl" variant="full" />
            </div>
          </div>

          {/* Welcome Text & Role Selection */}
          <div className="space-y-5 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7F3EF] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Berani Bercerita, Aman Terlindungi</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1B4332] leading-[1.18] tracking-tight">
              Selamat Datang di <br />
              <span className="text-[#173860]">EMHA CARE</span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C6B5E] leading-relaxed">
              Pusat pelaporan dan ruang aman siswa madrasah dari perundungan. Didampingi penuh oleh <strong>Guru BK MTs Matholi'ul Huda Troso</strong> dengan jaminan kerahasiaan dan penanganan sesuai SOP madrasah.
            </p>

            {/* TWO PRIMARY PORTAL ENTRANCES */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Masuk sebagai Siswa */}
              <div
                onClick={onEnterStudentPortal}
                className="group p-5 rounded-2xl bg-[#E7F3EF] hover:bg-[#d9ede6] border-2 border-[#2D6A4F]/40 hover:border-[#2D6A4F] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#2D6A4F] text-white flex items-center justify-center shadow-xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 text-[#2D6A4F] px-2 py-0.5 rounded">
                      Ruang Siswa
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                    Masuk sebagai Siswa
                  </h3>
                  <p className="text-xs text-[#5C6B5E] leading-relaxed">
                    Akses ruang curhat Sahabat AI, buat laporan (bisa anonim), lacak kasus, edukasi ukhuwah, dan kontak Guru BK.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D6A4F]/20 flex items-center justify-between text-xs font-bold text-[#2D6A4F]">
                  <span>Buka Ruang Siswa</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: Masuk sebagai Guru BK */}
              <div
                onClick={onOpenCounselorPortal}
                className="group p-5 rounded-2xl bg-white hover:bg-[#FDFBF7] border-2 border-[#E9E4D9] hover:border-[#1B4332] cursor-pointer transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-xs">
                      <Lock className="w-5 h-5 text-[#D4A373]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F5F2ED] text-[#1B4332] px-2 py-0.5 rounded">
                      Tenaga Pendidik
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#1B4332] font-serif group-hover:text-[#2D6A4F] transition-colors">
                    Masuk sebagai Guru BK
                  </h3>
                  <p className="text-xs text-[#5C6B5E] leading-relaxed">
                    Portal otorisasi khusus Guru BK untuk verifikasi laporan, triase prioritas kasus, dan manajemen tindak lanjut.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E9E4D9] flex items-center justify-between text-xs font-bold text-[#1B4332]">
                  <span>Login Portal BK</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Key Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-[#5C6B5E]">
              <div className="flex items-center gap-1.5 bg-[#F5F2ED] px-3.5 py-1.5 rounded-xl border border-[#E9E4D9]">
                <Lock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>100% Rahasia & Aman</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#F5F2ED] px-3.5 py-1.5 rounded-xl border border-[#E9E4D9]">
                <UserCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Didampingi Guru BK Madrasah</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#F5F2ED] px-3.5 py-1.5 rounded-xl border border-[#E9E4D9]">
                <HeartHandshake className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>Tanpa Penghakiman</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Islamic Wisdom Banner */}
      <section className="p-6 sm:p-7 bg-[#F3EFED] rounded-3xl border border-[#E9E4D9] space-y-2">
        <div className="inline-block bg-[#D4A373] text-white text-[10px] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider">
          Hikmah Ukhuwah Islamiyah
        </div>
        <p className="italic font-serif text-[#7A6A53] text-sm sm:text-base leading-relaxed">
          "...Janganlah suatu kaum mengolok-olok kaum yang lain (karena) boleh jadi mereka (yang diperolok-olokkan) lebih baik dari mereka, dan jangan pula perempuan-perempuan (mengolok-olokkan) perempuan lain (karena) boleh jadi perempuan (yang diperolok-olokkan) lebih baik dari perempuan (yang mengolok-olok)..."
        </p>
        <span className="font-sans not-italic font-bold text-xs text-[#8C8475] block pt-1">
          — QS. Al-Hujurat: 11
        </span>
      </section>
    </div>
  );
};
