import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, Clock, MapPin, ShieldCheck, ArrowLeft, HeartHandshake, AlertTriangle, UserCheck, Star } from 'lucide-react';
import { Counselor } from '../../types';
import { INITIAL_COUNSELORS } from '../../data/initialData';

interface CounselorContactProps {
  counselors?: Counselor[];
  onBack: () => void;
}

export const CounselorContact: React.FC<CounselorContactProps> = ({ counselors: counselorsProp, onBack }) => {
  const [counselors, setCounselors] = useState<Counselor[]>(
    counselorsProp && counselorsProp.length > 0 ? counselorsProp : INITIAL_COUNSELORS
  );

  useEffect(() => {
    if (counselorsProp && counselorsProp.length > 0) {
      setCounselors(counselorsProp);
    } else {
      fetch('/api/counselors')
        .then(res => res.json())
        .then(data => {
          if (data.counselors && Array.isArray(data.counselors) && data.counselors.length > 0) {
            setCounselors(data.counselors);
          }
        })
        .catch(() => {
          // Fallback to initial counselors
        });
    }
  }, [counselorsProp]);

  // Primary emergency counselor for safety box
  const primaryCounselor = 
    counselors.find(c => c.isEmergencyContact) || 
    counselors.find(c => (c.role || '').toLowerCase().includes('koordinator')) || 
    counselors[0];

  const primaryCleanPhone = (primaryCounselor?.whatsapp || primaryCounselor?.phone || '0895362132613').replace(/[^0-9]/g, '');
  const primaryWaUrl = primaryCleanPhone.startsWith('0')
    ? `https://wa.me/62${primaryCleanPhone.slice(1)}`
    : `https://wa.me/${primaryCleanPhone}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3.5 py-1 rounded-full border border-[#2D6A4F]/20">
          Layanan Bimbingan Konseling Madrasah
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E4D9] shadow-xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3EF] text-[#2D6A4F] text-xs font-bold font-serif">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Konselor & Guru BK Resmi ({counselors.length} Guru BK)</span>
        </div>
        <h1 className="text-2xl font-bold font-serif text-[#1B4332]">
          Kontak Langsung Guru BK Madrasah
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6B5E] leading-relaxed">
          Guru BK kami siap mendengarkan, mendampingi, dan mencarikan solusi terbaik dengan mengutamakan kenyamanan serta kerahasiaan siswa. Kamu boleh datang langsung ke Ruang BK atau menghubungi kontak di bawah.
        </p>
      </div>

      {/* Counselor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {counselors.map((counselor, idx) => {
          const isMain = counselor.isEmergencyContact || (counselor.role || '').toLowerCase().includes('koordinator') || idx === 0;
          const cleanPhone = (counselor.whatsapp || counselor.phone || '').replace(/[^0-9]/g, '');
          const waUrl = cleanPhone.startsWith('0') 
            ? `https://wa.me/62${cleanPhone.slice(1)}` 
            : `https://wa.me/${cleanPhone}`;

          const initials = counselor.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map(n => n[0])
            .join('')
            .toUpperCase() || 'BK';

          return (
            <div
              key={counselor.id}
              className={`bg-white p-6 rounded-3xl border ${
                isMain ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/10' : 'border-[#E9E4D9]'
              } shadow-xs transition-all flex flex-col justify-between space-y-4`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                    {initials}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-bold text-sm sm:text-base text-[#1B4332] leading-snug">{counselor.name}</h3>
                      {isMain && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#E7F3EF] text-[#2D6A4F] px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          {counselor.isEmergencyContact ? 'Kontak Utama' : 'Koordinator BK'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#2D6A4F] font-semibold">{counselor.role || 'Guru Bimbingan Konseling'}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold bg-[#F5F2ED] text-[#5C6B5E] px-2 py-0.5 rounded-md">
                      {counselor.assignedGrade || 'Semua Jenjang'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#5C6B5E] border-t border-[#E9E4D9] pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#8C8475] shrink-0" />
                    <span><strong>Jam Pelayanan:</strong> {counselor.dutyHours || 'Senin - Jumat (07.30 - 15.30 WIB)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#8C8475] shrink-0" />
                    <span><strong>Lokasi:</strong> Ruang BK Madrasah</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#8C8475] shrink-0" />
                    <span><strong>No. WhatsApp:</strong> <span className="font-mono font-bold text-[#1B4332]">{counselor.whatsapp || counselor.phone}</span></span>
                  </div>
                </div>
              </div>

              {/* Contact Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E9E4D9]">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#23533e] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp</span>
                </a>

                <a
                  href={`tel:${counselor.phone || counselor.whatsapp}`}
                  className="py-2.5 px-3 rounded-2xl bg-[#F5F2ED] hover:bg-[#ebe6de] text-[#1B4332] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#E9E4D9]"
                >
                  <PhoneCall className="w-4 h-4 text-[#5C6B5E]" />
                  <span>Telepon</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Helpline Box */}
      <div className="p-5 rounded-3xl bg-[#F5F2ED] border border-[#E9E4D9] text-xs text-[#5C6B5E] space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#1B4332]">
          <AlertTriangle className="w-4 h-4 text-[#D4A373]" />
          <span>Layanan Darurat & Keselamatan Siswa</span>
        </div>
        <p className="leading-relaxed text-xs">
          Jika kamu atau temanmu dalam bahaya fisik mendesak di madrasah, segera temui guru piket terdekat atau hubungi Guru BK <strong>{primaryCounselor?.name || 'Siska Noviana Dewi, S.Si., M.Sc.'}</strong> di nomor WhatsApp{' '}
          <a 
            href={primaryWaUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-bold text-[#2D6A4F] underline hover:text-[#1B4332]"
          >
            {primaryCounselor?.whatsapp || primaryCounselor?.phone || '082329180233'}
          </a>.
        </p>
      </div>
    </div>
  );
};
