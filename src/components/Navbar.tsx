import React from 'react';
import { 
  MessageCircleHeart, 
  FileText, 
  Search, 
  BookOpen, 
  PhoneCall, 
  Lock, 
  UserCheck, 
  LogOut, 
  GraduationCap,
  Home,
  LayoutGrid
} from 'lucide-react';
import { EmhaCareLogo } from './EmhaCareLogo';
import { Counselor } from '../types';

interface NavbarProps {
  currentPortal: 'landing' | 'siswa' | 'counselor';
  onSwitchPortal: (portal: 'landing' | 'siswa' | 'counselor') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  loggedCounselor: Counselor | null;
  onCounselorLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPortal,
  onSwitchPortal,
  activeTab,
  setActiveTab,
  loggedCounselor,
  onCounselorLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E9E4D9] shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-[#1B4332] text-[#E7F3EF] px-4 py-1.5 text-xs font-medium">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
            <span className="font-semibold text-[#FDFBF7]">
              {currentPortal === 'counselor' 
                ? 'Portal Khusus Guru Bimbingan Konseling' 
                : 'Ruang Aman Bagi Siswa Madrasah'}
            </span>
          </div>

          {/* Top Actions depending on current view */}
          <div className="flex items-center gap-2">
            {currentPortal === 'siswa' && (
              <button
                onClick={() => onSwitchPortal('landing')}
                className="flex items-center gap-1.5 bg-[#2D6A4F] hover:bg-[#23533e] text-[#FDFBF7] px-3 py-0.5 rounded-full text-xs font-semibold transition-all border border-[#52B788]/30 shadow-xs"
              >
                <Home className="w-3 h-3 text-[#D4A373]" />
                <span>Halaman Depan</span>
              </button>
            )}

            {currentPortal === 'counselor' && (
              <button
                onClick={() => onSwitchPortal('landing')}
                className="flex items-center gap-1.5 bg-[#2D6A4F] hover:bg-[#23533e] text-[#FDFBF7] px-3 py-0.5 rounded-full text-xs font-semibold transition-all border border-[#52B788]/30 shadow-xs"
              >
                <Home className="w-3 h-3 text-[#D4A373]" />
                <span>Halaman Depan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => {
            if (currentPortal === 'landing') {
              setActiveTab('landing');
            } else if (currentPortal === 'siswa') {
              setActiveTab('siswa-home');
            } else {
              setActiveTab(loggedCounselor ? 'counselor-dashboard' : 'counselor-login');
            }
          }}
          className="cursor-pointer group select-none"
        >
          <EmhaCareLogo size="md" variant="horizontal" />
        </div>

        {/* ================= LANDING PORTAL NAVIGATION (SUPER CLEAN) ================= */}
        {currentPortal === 'landing' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSwitchPortal('siswa')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold transition-all shadow-xs"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Masuk Ruang Siswa</span>
            </button>
          </div>
        )}

        {/* ================= SISWA NAVIGATION (ONLY FOR SISWA) ================= */}
        {currentPortal === 'siswa' && (
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F2ED] p-1.5 rounded-2xl border border-[#E9E4D9]">
            <button
              onClick={() => setActiveTab('siswa-home')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'siswa-home'
                  ? 'bg-white text-[#2D6A4F] shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Menu Siswa
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#2D6A4F] text-white shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <MessageCircleHeart className="w-3.5 h-3.5" />
              Curhat Sahabat
            </button>
            <button
              onClick={() => setActiveTab('lapor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'lapor'
                  ? 'bg-white text-[#2D6A4F] shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Buat Laporan
            </button>
            <button
              onClick={() => setActiveTab('lacak')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'lacak'
                  ? 'bg-white text-[#2D6A4F] shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Lacak Laporanku
            </button>
            <button
              onClick={() => setActiveTab('edukasi')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'edukasi'
                  ? 'bg-white text-[#2D6A4F] shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Edukasi Bullying
            </button>
            <button
              onClick={() => setActiveTab('kontak-bk')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'kontak-bk'
                  ? 'bg-white text-[#2D6A4F] shadow-xs font-bold'
                  : 'text-[#5C6B5E] hover:text-[#2D6A4F] hover:bg-white/50'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Kontak Guru BK
            </button>
          </nav>
        )}

        {/* ================= GURU BK NAVIGATION (ONLY FOR GURU BK) ================= */}
        {currentPortal === 'counselor' && (
          <div className="flex items-center gap-3">
            {loggedCounselor ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E7F3EF] border border-[#2D6A4F]/20 text-xs">
                  <UserCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <div className="text-left">
                    <span className="font-bold text-[#1B4332] block leading-tight">{loggedCounselor.name}</span>
                    <span className="text-[10px] text-[#5C6B5E]">{loggedCounselor.role}</span>
                  </div>
                </div>

                <button
                  onClick={onCounselorLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F2ED] hover:bg-rose-50 hover:text-rose-700 text-[#5C6B5E] text-xs font-semibold transition-colors border border-[#E9E4D9]"
                  title="Keluar dari sesi Guru BK"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              </div>
            ) : (
              <div className="text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3.5 py-1.5 rounded-full border border-[#2D6A4F]/20">
                Otoritas Bimbingan Konseling
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Sub Navigation for Siswa */}
      {currentPortal === 'siswa' && (
        <div className="lg:hidden flex items-center justify-around border-t border-[#E9E4D9] bg-white px-2 py-2 text-[11px] font-medium text-[#5C6B5E] overflow-x-auto">
          <button
            onClick={() => setActiveTab('siswa-home')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'siswa-home' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Menu Siswa</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'chat' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Sahabat</span>
          </button>
          <button
            onClick={() => setActiveTab('lapor')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'lapor' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Lapor</span>
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'lacak' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Lacak</span>
          </button>
          <button
            onClick={() => setActiveTab('edukasi')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'edukasi' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Edukasi</span>
          </button>
          <button
            onClick={() => setActiveTab('kontak-bk')}
            className={`flex flex-col items-center py-1 px-2 rounded-xl whitespace-nowrap ${
              activeTab === 'kontak-bk' ? 'text-[#2D6A4F] font-bold bg-[#E7F3EF]' : 'text-[#5C6B5E]'
            }`}
          >
            <span>Guru BK</span>
          </button>
        </div>
      )}
    </header>
  );
};
