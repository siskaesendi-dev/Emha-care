/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/Student/LandingHero';
import { StudentHome } from './components/Student/StudentHome';
import { SahabatChat } from './components/Student/SahabatChat';
import { ReportForm } from './components/Student/ReportForm';
import { ReportConfirmation } from './components/Student/ReportConfirmation';
import { TrackReport } from './components/Student/TrackReport';
import { EducationSection } from './components/Student/EducationSection';
import { CounselorContact } from './components/Student/CounselorContact';
import { CounselorLogin } from './components/Counselor/CounselorLogin';
import { CounselorDashboard } from './components/Counselor/CounselorDashboard';
import { Counselor } from './types';
import { EmhaCareLogo } from './components/EmhaCareLogo';

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<'landing' | 'siswa' | 'counselor'>('landing');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [loggedCounselor, setLoggedCounselor] = useState<Counselor | null>(null);
  
  // Cross-view state transfer
  const [prefillDescription, setPrefillDescription] = useState<string>('');
  const [submittedReportCode, setSubmittedReportCode] = useState<string>('');
  const [trackTargetCode, setTrackTargetCode] = useState<string>('');

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSwitchPortal = (portal: 'landing' | 'siswa' | 'counselor') => {
    setCurrentPortal(portal);
    if (portal === 'landing') {
      setActiveTab('landing');
    } else if (portal === 'siswa') {
      setActiveTab('siswa-home');
    } else {
      setActiveTab(loggedCounselor ? 'counselor-dashboard' : 'counselor-login');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartChatToReport = (description: string) => {
    setPrefillDescription(description);
    setActiveTab('lapor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReportSubmitted = (code: string) => {
    setSubmittedReportCode(code);
    setActiveTab('lapor-konfirmasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackCode = (code: string) => {
    setTrackTargetCode(code);
    setActiveTab('lacak');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCounselorLoginSuccess = (counselor: Counselor) => {
    setLoggedCounselor(counselor);
    setCurrentPortal('counselor');
    setActiveTab('counselor-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCounselorLogout = () => {
    setLoggedCounselor(null);
    setCurrentPortal('landing');
    setActiveTab('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B4332] flex flex-col font-sans selection:bg-[#E7F3EF] selection:text-[#1B4332]">
      {/* Main Top Navigation */}
      <Navbar
        currentPortal={currentPortal}
        onSwitchPortal={handleSwitchPortal}
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        loggedCounselor={loggedCounselor}
        onCounselorLogout={handleCounselorLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* ===================== LANDING PORTAL (CLEAN VIEW) ===================== */}
        {currentPortal === 'landing' && (
          <LandingHero 
            onEnterStudentPortal={() => handleSwitchPortal('siswa')} 
            onOpenCounselorPortal={() => handleSwitchPortal('counselor')}
          />
        )}

        {/* ===================== SISWA PORTAL VIEWS ===================== */}
        {currentPortal === 'siswa' && (
          <>
            {activeTab === 'siswa-home' && (
              <StudentHome
                onNavigate={handleNavigate}
                onBackToLanding={() => handleSwitchPortal('landing')}
              />
            )}

            {activeTab === 'chat' && (
              <SahabatChat
                onBack={() => handleNavigate('siswa-home')}
                onProceedToReport={handleStartChatToReport}
              />
            )}

            {activeTab === 'lapor' && (
              <ReportForm
                initialDescription={prefillDescription}
                onBack={() => handleNavigate('siswa-home')}
                onSubmitSuccess={handleReportSubmitted}
              />
            )}

            {activeTab === 'lapor-konfirmasi' && (
              <ReportConfirmation
                reportCode={submittedReportCode || 'EMHA-7824'}
                onTrackNow={handleTrackCode}
                onGoHome={() => handleNavigate('siswa-home')}
              />
            )}

            {activeTab === 'lacak' && (
              <TrackReport
                initialCode={trackTargetCode}
                onBack={() => handleNavigate('siswa-home')}
              />
            )}

            {activeTab === 'edukasi' && (
              <EducationSection
                onBack={() => handleNavigate('siswa-home')}
                onGoToChat={() => handleNavigate('chat')}
                onGoToReport={() => handleNavigate('lapor')}
              />
            )}

            {activeTab === 'kontak-bk' && (
              <CounselorContact
                onBack={() => handleNavigate('siswa-home')}
              />
            )}
          </>
        )}

        {/* ===================== GURU BK PORTAL VIEWS ===================== */}
        {currentPortal === 'counselor' && (
          <>
            {!loggedCounselor || activeTab === 'counselor-login' ? (
              <CounselorLogin
                onBack={() => handleSwitchPortal('landing')}
                onLoginSuccess={handleCounselorLoginSuccess}
              />
            ) : (
              <CounselorDashboard
                counselor={loggedCounselor}
                onLogout={handleCounselorLogout}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#F5F2ED] text-[#5C6B5E] border-t border-[#E9E4D9] text-xs mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              onClick={() => handleSwitchPortal('landing')} 
              className="cursor-pointer"
            >
              <EmhaCareLogo size="sm" variant="horizontal" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-[#5C6B5E]">
              <button onClick={() => handleSwitchPortal('landing')} className="hover:text-[#2D6A4F] transition-colors">Halaman Depan</button>
              <button onClick={() => { handleSwitchPortal('siswa'); handleNavigate('siswa-home'); }} className="hover:text-[#2D6A4F] transition-colors">Menu Siswa</button>
              <button onClick={() => { handleSwitchPortal('siswa'); handleNavigate('chat'); }} className="hover:text-[#2D6A4F] transition-colors">Curhat Sahabat</button>
              <button onClick={() => { handleSwitchPortal('siswa'); handleNavigate('lapor'); }} className="hover:text-[#2D6A4F] transition-colors">Buat Laporan</button>
              <button onClick={() => { handleSwitchPortal('siswa'); handleNavigate('lacak'); }} className="hover:text-[#2D6A4F] transition-colors">Lacak Laporan</button>
              <button onClick={() => { handleSwitchPortal('siswa'); handleNavigate('kontak-bk'); }} className="hover:text-[#2D6A4F] transition-colors">Kontak Guru BK</button>
              <button onClick={() => handleSwitchPortal('counselor')} className="text-[#1B4332] font-bold hover:text-[#2D6A4F] transition-colors">Portal Guru BK</button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E9E4D9] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#8C8475]">
            <p>© {new Date().getFullYear()} EMHA CARE — MTs Matholi'ul Huda Troso. <em className="font-serif text-[#7A6A53]">"Berani Bercerita, Aman Terlindungi."</em></p>
            <p>Layanan Bimbingan Konseling MTs Matholi'ul Huda Troso</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
