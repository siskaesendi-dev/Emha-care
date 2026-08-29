import { Counselor, Report } from '../types';
import { classifyReportRuleBased } from '../utils/ruleClassifier';

export const INITIAL_COUNSELORS: Counselor[] = [
  {
    id: 'c-1',
    name: 'Siska Noviana Dewi, M.Sc.',
    title: 'Guru Bimbingan Konseling (Guru BK)',
    role: 'Koordinator Bimbingan Konseling',
    gradeAssignment: 'Koordinator BK & Semua Jenjang',
    assignedGrade: 'Koordinator BK & Semua Jenjang',
    phone: '082329180233',
    whatsapp: '082329180233',
    schedule: 'Senin - Jumat (07.30 - 15.30 WIB)',
    dutyHours: 'Senin - Jumat (07.30 - 15.30 WIB)',
    email: 'siska.noviana@madrasah.sch.id',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    isEmergencyContact: true,
  },
  {
    id: 'c-2',
    name: 'Ahmad Rosyadi, S.Pd.',
    title: 'Guru Bimbingan Konseling (Guru BK)',
    role: 'Guru Bimbingan Konseling',
    gradeAssignment: 'Guru BK & Pendamping Siswa',
    assignedGrade: 'Guru BK & Pendamping Siswa',
    phone: '085226123456',
    whatsapp: '085226123456',
    schedule: 'Senin - Jumat (07.30 - 15.30 WIB)',
    dutyHours: 'Senin - Jumat (07.30 - 15.30 WIB)',
    email: 'ahmad.rosyadi@madrasah.sch.id',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isEmergencyContact: false,
  }
];

export const INITIAL_CHECKLIST_TEMPLATE = [
  { id: 'step-1', title: 'Verifikasi laporan & telaah deskripsi kejadian', completed: false },
  { id: 'step-2', title: 'Hubungi/panggil pelapor secara bijak & tertutup (bila nomor tersedia)', completed: false },
  { id: 'step-3', title: 'Klarifikasi ke pihak-pihak terkait sesuai SOP madrasah', completed: false },
  { id: 'step-4', title: 'Koordinasi dengan wali kelas dan pembina asrama/kesiswaan', completed: false },
  { id: 'step-5', title: 'Pelaksanaan sesi konseling empatik dan penguatan mental', completed: false },
  { id: 'step-6', title: 'Komunikasi dengan orang tua / wali (jika diperlukan sesuai SOP)', completed: false },
  { id: 'step-7', title: 'Tindak lanjut pembinaan edukatif akhlak tanpa kekerasan', completed: false },
  { id: 'step-8', title: 'Pemantauan berkala (follow-up 1-2 minggu pasca penanganan)', completed: false },
  { id: 'step-9', title: 'Penutupan kasus & evaluasi efektivitas bimbingan', completed: false },
];

export function createInitialReports(): Report[] {
  const desc1 = 'Setiap jam istirahat kedua di lorong dekat tangga musholla, ada beberapa kakak kelas yang menghadang dan meminta paksa uang jajan. Kalau tidak dikasih, bahu saya didorong dan diancam mau dipukul sepulang sekolah. Saya takut sekali ke madrasah.';
  const analysis1 = classifyReportRuleBased(desc1, 'Ancaman / Intimidasi', 'Sering', false);

  const desc2 = 'Foto editan wajah saya disebarkan di grup WhatsApp kelas dengan tulisan bernada hinaan dan olok-olokan. Beberapa teman sekelas jadi ikut-ikutan menjauhi dan tidak mau satu kelompok belajar dengan saya.';
  const analysis2 = classifyReportRuleBased(desc2, 'Kekerasan Daring (Cyber)', 'Beberapa Kali', true);

  const desc3 = 'Di kelas saat guru tidak ada, ada teman yang sering memanggil nama bapak saya sambil mengejek dan menertawakan seragam saya yang sudah agak kusam.';
  const analysis3 = classifyReportRuleBased(desc3, 'Ejekan / Hinaan (Verbal)', 'Beberapa Kali', true);

  const desc4 = 'Saya melihat teman sebangku saya sering ditarik bajunya dan dipukul kepalanya saat di kantin oleh anak-anak kelas lain. Teman saya tidak berani melawan dan menangis di pojokan.';
  const analysis4 = classifyReportRuleBased(desc4, 'Kekerasan Fisik', 'Beberapa Kali', true);

  const desc5 = 'Ada teman yang membuat cerita bohong di media sosial tentang teman kami yang lain sehingga anak tersebut sering murung dan menyendiri.';
  const analysis5 = classifyReportRuleBased(desc5, 'Kekerasan Daring (Cyber)', 'Sekali', true);

  return [
    {
      id: 'rep-001',
      reportCode: 'EMHA-7824',
      createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
      category: 'Ancaman / Intimidasi',
      location: 'Lorong / Tangga',
      incidentTime: 'Jam istirahat kedua (sekitar pukul 12.15 WIB)',
      frequency: 'Sering',
      isSafe: false,
      description: desc1,
      contactPreference: 'ANONYMOUS_WITH_PHONE',
      reporterPhone: '081299887766',
      indicatorAnalysis: analysis1,
      status: 'SEDANG_DITANGANI',
      checklist: [
        { id: 'step-1', title: 'Verifikasi laporan & telaah deskripsi kejadian', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), completedBy: 'Ustadzah Nurul' },
        { id: 'step-2', title: 'Hubungi/panggil pelapor secara bijak & tertutup (bila nomor tersedia)', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), completedBy: 'Ustadzah Nurul' },
        { id: 'step-3', title: 'Klarifikasi ke pihak-pihak terkait sesuai SOP madrasah', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 1).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-4', title: 'Koordinasi dengan wali kelas dan pembina asrama/kesiswaan', completed: false },
        { id: 'step-5', title: 'Pelaksanaan sesi konseling empatik dan penguatan mental', completed: false },
        { id: 'step-6', title: 'Komunikasi dengan orang tua / wali (jika diperlukan sesuai SOP)', completed: false },
        { id: 'step-7', title: 'Tindak lanjut pembinaan edukatif akhlak tanpa kekerasan', completed: false },
        { id: 'step-8', title: 'Pemantauan berkala (follow-up 1-2 minggu pasca penanganan)', completed: false },
        { id: 'step-9', title: 'Penutupan kasus & evaluasi efektivitas bimbingan', completed: false },
      ],
      internalNotes: 'Pelapor sudah dihubungi via WA secara privat. Dijadwalkan bertemu di ruang BK jam 10 pagi besok. Koordinasi dengan guru piket lorong tangga.',
      assignedCounselorId: 'c-1',
      assignedCounselorName: 'Siska Noviana Dewi, M.Sc.',
      auditLogs: [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString(), actor: 'Sistem', action: 'Laporan Diterima', details: 'ID EMHA-7824 dibuat oleh siswa' },
        { id: 'log-2', timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(), actor: 'Siska Noviana Dewi, M.Sc.', action: 'Status Diperbarui', details: 'Diverifikasi & ditugaskan' },
      ],
      messages: [
        { id: 'm-1', sender: 'GURU_BK', text: 'Assalamualaikum. Laporanmu sudah kami terima dengan baik. Guru BK siap membantu dan melindungimu. Kamu sangat berani sudah bercerita.', timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString() },
        { id: 'm-2', sender: 'SISWA', text: 'Terima kasih banyak ustadzah, tolong jangan sebut nama saya ya ustadzah.', timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString() }
      ]
    },
    {
      id: 'rep-002',
      reportCode: 'EMHA-3190',
      createdAt: new Date(Date.now() - 3600 * 1000 * 26).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 18).toISOString(),
      category: 'Kekerasan Daring (Cyber)',
      location: 'Media Sosial / Grup WhatsApp',
      incidentTime: 'Kemarin malam pukul 20.00 WIB',
      frequency: 'Beberapa Kali',
      isSafe: true,
      description: desc2,
      contactPreference: 'FULL_ANONYMOUS',
      indicatorAnalysis: analysis2,
      status: 'DIVERIFIKASI',
      checklist: [
        { id: 'step-1', title: 'Verifikasi laporan & telaah deskripsi kejadian', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString(), completedBy: 'Ustadz Ahmad Fauzi' },
        { id: 'step-2', title: 'Hubungi/panggil pelapor secara bijak & tertutup (bila nomor tersedia)', completed: false },
        { id: 'step-3', title: 'Klarifikasi ke pihak-pihak terkait sesuai SOP madrasah', completed: false },
        { id: 'step-4', title: 'Koordinasi dengan wali kelas dan pembina asrama/kesiswaan', completed: false },
        { id: 'step-5', title: 'Pelaksanaan sesi konseling empatik dan penguatan mental', completed: false },
        { id: 'step-6', title: 'Komunikasi dengan orang tua / wali (jika diperlukan sesuai SOP)', completed: false },
        { id: 'step-7', title: 'Tindak lanjut pembinaan edukatif akhlak tanpa kekerasan', completed: false },
        { id: 'step-8', title: 'Pemantauan berkala (follow-up 1-2 minggu pasca penanganan)', completed: false },
        { id: 'step-9', title: 'Penutupan kasus & evaluasi efektivitas bimbingan', completed: false },
      ],
      internalNotes: 'Laporan anonim mengenai grup WhatsApp kelas 8B. Perlu koordinasi dengan wali kelas 8B untuk pembinaan literasi digital dan adab ukhuwah.',
      assignedCounselorId: 'c-1',
      assignedCounselorName: 'Siska Noviana Dewi, M.Sc.',
      auditLogs: [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600 * 1000 * 26).toISOString(), actor: 'Sistem', action: 'Laporan Diterima', details: 'ID EMHA-3190 dibuat' },
        { id: 'log-2', timestamp: new Date(Date.now() - 3600 * 1000 * 20).toISOString(), actor: 'Siska Noviana Dewi, M.Sc.', action: 'Verifikasi Laporan', details: 'Status diubah ke Diverifikasi' },
      ],
      messages: [
        { id: 'm-1', sender: 'GURU_BK', text: 'Terima kasih atas laporannya. Kasus ini sedang kami diskusikan dengan wali kelas untuk bimbingan kelas bersama tanpa membeberkan identitas siapa pun.', timestamp: new Date(Date.now() - 3600 * 1000 * 20).toISOString() }
      ]
    },
    {
      id: 'rep-003',
      reportCode: 'EMHA-5521',
      createdAt: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 10).toISOString(),
      category: 'Ejekan / Hinaan (Verbal)',
      location: 'Ruang Kelas',
      incidentTime: 'Waktu pergantian jam pelajaran ke-4',
      frequency: 'Beberapa Kali',
      isSafe: true,
      description: desc3,
      contactPreference: 'INCLUDE_NAME_AND_PHONE',
      reporterName: 'Fathan (Siswa Kelas 7A)',
      reporterPhone: '085712349988',
      indicatorAnalysis: analysis3,
      status: 'TINDAK_LANJUT',
      checklist: [
        { id: 'step-1', title: 'Verifikasi laporan & telaah deskripsi kejadian', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 44).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-2', title: 'Hubungi/panggil pelapor secara bijak & tertutup (bila nomor tersedia)', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 40).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-3', title: 'Klarifikasi ke pihak-pihak terkait sesuai SOP madrasah', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 30).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-4', title: 'Koordinasi dengan wali kelas dan pembina asrama/kesiswaan', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-5', title: 'Pelaksanaan sesi konseling empatik dan penguatan mental', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-6', title: 'Komunikasi dengan orang tua / wali (jika diperlukan sesuai SOP)', completed: false },
        { id: 'step-7', title: 'Tindak lanjut pembinaan edukatif akhlak tanpa kekerasan', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 10).toISOString(), completedBy: 'Siska Noviana Dewi, M.Sc.' },
        { id: 'step-8', title: 'Pemantauan berkala (follow-up 1-2 minggu pasca penanganan)', completed: false },
        { id: 'step-9', title: 'Penutupan kasus & evaluasi efektivitas bimbingan', completed: false },
      ],
      internalNotes: 'Sesi mediasi dan konseling bimbingan sebaya telah dilakukan. Siswa yang bersangkutan telah saling memaafkan dan berjanji menjaga lisan sesuai QS Al-Hujurat 11.',
      assignedCounselorId: 'c-1',
      assignedCounselorName: 'Siska Noviana Dewi, M.Sc.',
      auditLogs: [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600 * 1000 * 48).toISOString(), actor: 'Sistem', action: 'Laporan Masuk', details: 'Dibuat dengan nama' },
        { id: 'log-2', timestamp: new Date(Date.now() - 3600 * 1000 * 10).toISOString(), actor: 'Siska Noviana Dewi, M.Sc.', action: 'Tindak Lanjut Dilakukan', details: 'Sesi pembinaan selesai' },
      ],
      messages: []
    },
    {
      id: 'rep-004',
      reportCode: 'EMHA-9042',
      createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      category: 'Kekerasan Fisik',
      location: 'Kantin Madrasah',
      incidentTime: 'Istirahat pertama',
      frequency: 'Beberapa Kali',
      isSafe: true,
      description: desc4,
      contactPreference: 'FULL_ANONYMOUS',
      indicatorAnalysis: analysis4,
      status: 'SELESAI',
      checklist: [
        { id: 'step-1', title: 'Verifikasi laporan & telaah deskripsi kejadian', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 70).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-2', title: 'Hubungi/panggil pelapor secara bijak & tertutup (bila nomor tersedia)', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 65).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-3', title: 'Klarifikasi ke pihak-pihak terkait sesuai SOP madrasah', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 50).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-4', title: 'Koordinasi dengan wali kelas dan pembina asrama/kesiswaan', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 45).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-5', title: 'Pelaksanaan sesi konseling empatik dan penguatan mental', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 35).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-6', title: 'Komunikasi dengan orang tua / wali (jika diperlukan sesuai SOP)', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 30).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-7', title: 'Tindak lanjut pembinaan edukatif akhlak tanpa kekerasan', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 28).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-8', title: 'Pemantauan berkala (follow-up 1-2 minggu pasca penanganan)', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 25).toISOString(), completedBy: 'Ustadz Fauzi' },
        { id: 'step-9', title: 'Penutupan kasus & evaluasi efektivitas bimbingan', completed: true, completedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), completedBy: 'Ustadz Fauzi' },
      ],
      internalNotes: 'Penanganan komprehensif selesai. Korban dan saksi telah didampingi, pihak terkait telah diberi pembinaan disiplin positif madrasah dan pemantauan kantin diperketat.',
      assignedCounselorId: 'c-1',
      assignedCounselorName: 'Siska Noviana Dewi, M.Sc.',
      auditLogs: [
        { id: 'log-1', timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(), actor: 'Sistem', action: 'Laporan Diterima', details: 'ID EMHA-9042 dibuat' },
        { id: 'log-2', timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(), actor: 'Siska Noviana Dewi, M.Sc.', action: 'Kasus Ditutup', details: 'Selesai & aman' },
      ],
      messages: [],
      feedback: {
        rating: 5,
        studentComment: 'Alhamdulillah sekarang di kantin sudah aman dan ada guru yang berjaga. Terima kasih Guru BK.',
        isSituationBetter: true,
        submittedAt: new Date(Date.now() - 3600 * 1000 * 20).toISOString()
      }
    }
  ];
}
