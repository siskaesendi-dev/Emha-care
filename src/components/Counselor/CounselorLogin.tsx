import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Counselor } from '../../types';
import { INITIAL_COUNSELORS } from '../../data/initialData';

interface CounselorLoginProps {
  counselors?: Counselor[];
  onBack: () => void;
  onLoginSuccess: (counselor: Counselor) => void;
}

export const CounselorLogin: React.FC<CounselorLoginProps> = ({ 
  counselors: counselorsProp, 
  onBack, 
  onLoginSuccess 
}) => {
  const [counselors, setCounselors] = useState<Counselor[]>(
    counselorsProp && counselorsProp.length > 0 ? counselorsProp : INITIAL_COUNSELORS
  );
  const [selectedCounselorId, setSelectedCounselorId] = useState(
    counselorsProp && counselorsProp.length > 0 ? counselorsProp[0].id : (INITIAL_COUNSELORS[0]?.id || 'c-1')
  );
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (counselorsProp && counselorsProp.length > 0) {
      setCounselors(counselorsProp);
      // Ensure selected counselor id is valid
      if (!counselorsProp.some(c => c.id === selectedCounselorId)) {
        setSelectedCounselorId(counselorsProp[0].id);
      }
    } else {
      fetch('/api/counselors')
        .then(res => res.json())
        .then(data => {
          if (data.counselors && Array.isArray(data.counselors) && data.counselors.length > 0) {
            setCounselors(data.counselors);
            if (!data.counselors.some((c: Counselor) => c.id === selectedCounselorId)) {
              setSelectedCounselorId(data.counselors[0].id);
            }
          }
        })
        .catch(() => {});
    }
  }, [counselorsProp, selectedCounselorId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Sandi resmi khusus Guru BK
      if (passcode.trim() === '1234emhacare') {
        const counselor = counselors.find(c => c.id === selectedCounselorId) || counselors[0];
        if (counselor) {
          onLoginSuccess(counselor);
        } else {
          setErrorMsg('Profil Guru BK tidak ditemukan.');
        }
      } else {
        setErrorMsg('Kata sandi salah. Portal ini hanya dapat dibuka oleh Guru BK.');
      }
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-8 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#5C6B5E] hover:text-[#1B4332] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Depan</span>
        </button>

        <div className="text-[11px] font-bold text-[#8C8475] uppercase tracking-wider">
          Akses Khusus Guru BK
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E9E4D9] shadow-sm space-y-5">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#FDFBF7] flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-6 h-6 text-[#D4A373]" />
          </div>
          <h1 className="text-xl font-bold text-[#1B4332] font-serif">Portal Guru BK Madrasah</h1>
          <p className="text-xs text-[#5C6B5E]">
            Masuk untuk memverifikasi laporan masuk, pemantauan kasus, dan manajemen tim bimbingan konseling.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5 font-serif">
              Pilih Nama Guru BK
            </label>
            <select
              value={selectedCounselorId}
              onChange={(e) => setSelectedCounselorId(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332] cursor-pointer"
            >
              {counselors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5 font-serif">
              Sandi Keamanan Portal BK
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan sandi keamanan"
                autoFocus
                className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white pr-20 text-[#1B4332]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#8C8475] hover:text-[#1B4332] text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#8C8475] mt-1.5">
              Hanya dapat dibuka oleh Guru BK resmi MTs Matholi'ul Huda Troso.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !passcode.trim()}
            className="w-full py-3.5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? <span>Memverifikasi Sandi...</span> : <span>Masuk ke Dashboard BK</span>}
          </button>
        </form>
      </div>
    </div>
  );
};
