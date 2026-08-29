import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Clock, Search, Filter, LogOut, BarChart3, Cpu, UserCheck, Eye, RefreshCw, Plus, PhoneCall, MessageCircle, FileText, ChevronRight, Users } from 'lucide-react';
import { Counselor, PriorityLevel, Report, ReportStatus } from '../../types';
import { ReportDetailModal } from './ReportDetailModal';
import { IndicatorAnalysisView } from './IndicatorAnalysisView';
import { AnalyticsView } from './AnalyticsView';
import { CounselorManagementView } from './CounselorManagementView';

interface CounselorDashboardProps {
  counselor: Counselor;
  onLogout: () => void;
}

export const CounselorDashboard: React.FC<CounselorDashboardProps> = ({ counselor, onLogout }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [counselorsList, setCounselorsList] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Active Sub-view
  const [activeSubView, setActiveSubView] = useState<'CASES' | 'INDICATOR_LOGIC' | 'ANALYTICS' | 'MANAGE_COUNSELORS'>('CASES');
  
  // Selected Report for Detailed Modal
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | PriorityLevel>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | ReportStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [reportsRes, counselorsRes] = await Promise.all([
        fetch('/api/reports'),
        fetch('/api/counselors')
      ]);
      const reportsData = await reportsRes.json();
      const counselorsData = await counselorsRes.json();

      if (reportsData.reports) setReports(reportsData.reports);
      if (counselorsData.counselors) setCounselorsList(counselorsData.counselors);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateReport = (updated: Report) => {
    setReports(prev => prev.map(r => r.id === updated.id ? updated : r));
    setSelectedReport(updated);
  };

  const handleDeleteReport = async (reportId: string) => {
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: 'DELETE',
      });
      setReports(prev => prev.filter(r => r.id !== reportId));
      if (selectedReport?.id === reportId) {
        setSelectedReport(null);
      }
    } catch (err) {
      console.error('Failed to delete report:', err);
    }
  };

  // Filtered reports
  const filteredReports = reports.filter(r => {
    if (priorityFilter !== 'ALL' && r.indicatorAnalysis.priority !== priorityFilter) return false;
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCode = r.reportCode.toLowerCase().includes(q);
      const matchCategory = r.category.toLowerCase().includes(q);
      const matchDesc = r.description.toLowerCase().includes(q);
      const matchLoc = r.location.toLowerCase().includes(q);
      if (!matchCode && !matchCategory && !matchDesc && !matchLoc) return false;
    }
    return true;
  });

  // Urgent RED priority uncompleted reports
  const urgentRedReports = reports.filter(
    r => r.indicatorAnalysis.priority === 'MERAH' && r.status !== 'SELESAI'
  );

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'MERAH':
        return (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-rose-100 border border-rose-200 text-xs shadow-2xs transition-transform hover:scale-110"
            title="Prioritas Merah (Atensi Segera)"
          >
            🔴
          </span>
        );
      case 'KUNING':
        return (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-50 border border-amber-200 text-xs shadow-2xs transition-transform hover:scale-110"
            title="Prioritas Kuning (Perlu Tabayyun & Klarifikasi)"
          >
            🟡
          </span>
        );
      case 'HIJAU':
      default:
        return (
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 text-xs shadow-2xs transition-transform hover:scale-110"
            title="Prioritas Hijau (Pemantauan Rutin)"
          >
            🟢
          </span>
        );
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'TERKIRIM':
        return <span className="px-2 py-0.5 bg-[#F5F2ED] text-[#5C6B5E] rounded-md font-semibold text-[10px] border border-[#E9E4D9]">Terkirim</span>;
      case 'DIVERIFIKASI':
        return <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded-md font-semibold text-[10px] border border-blue-200">Diverifikasi</span>;
      case 'SEDANG_DITANGANI':
        return <span className="px-2 py-0.5 bg-[#FDFBF7] text-[#9A6B3D] rounded-md font-semibold text-[10px] border border-[#D4A373]/40">Sedang Ditangani</span>;
      case 'TINDAK_LANJUT':
        return <span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded-md font-semibold text-[10px] border border-purple-200">Tindak Lanjut</span>;
      case 'SELESAI':
        return <span className="px-2 py-0.5 bg-[#E7F3EF] text-[#2D6A4F] rounded-md font-semibold text-[10px] border border-[#2D6A4F]/30">Selesai</span>;
    }
  };

  if (activeSubView === 'INDICATOR_LOGIC') {
    return <IndicatorAnalysisView onBack={() => setActiveSubView('CASES')} />;
  }

  if (activeSubView === 'ANALYTICS') {
    return <AnalyticsView reports={reports} onBack={() => setActiveSubView('CASES')} />;
  }

  if (activeSubView === 'MANAGE_COUNSELORS') {
    return (
      <CounselorManagementView
        counselors={counselorsList}
        onBack={() => setActiveSubView('CASES')}
        onUpdateCounselors={(updated) => setCounselorsList(updated)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Counselor Header */}
      <div className="bg-white p-5 rounded-3xl border border-[#E9E4D9] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-[#FDFBF7] flex items-center justify-center font-bold text-lg shadow-sm font-serif">
            {counselor.name.split(' ')[0][0]}{counselor.name.split(' ')[1] ? counselor.name.split(' ')[1][0] : ''}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg text-[#1B4332] font-serif">{counselor.name}</h1>
              <span className="text-[10px] font-bold bg-[#E7F3EF] text-[#2D6A4F] px-2.5 py-0.5 rounded-full border border-[#E9E4D9]">
                {counselor.assignedGrade}
              </span>
            </div>
            <p className="text-xs text-[#5C6B5E]">{counselor.role} • Jam Tugas: {counselor.dutyHours}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubView('MANAGE_COUNSELORS')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E7F3EF] hover:bg-[#d5ebe3] text-[#2D6A4F] text-xs font-bold transition-colors border border-[#2D6A4F]/20 cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Kelola Tim Guru BK</span>
          </button>

          <button
            onClick={() => setActiveSubView('INDICATOR_LOGIC')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#1B4332] text-xs font-semibold transition-colors border border-[#E9E4D9] cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Transparansi Rule-Based</span>
          </button>

          <button
            onClick={() => setActiveSubView('ANALYTICS')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#1B4332] text-xs font-semibold transition-colors border border-[#E9E4D9] cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#2D6A4F]" />
            <span>Statistik Kasus</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold transition-colors border border-rose-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {/* Urgent Alert Banner (If Any Red Reports Exist) */}
      {urgentRedReports.length > 0 && (
        <div className="p-5 rounded-3xl bg-rose-500/10 border-2 border-rose-500/30 text-rose-950 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-extrabold text-sm text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 animate-bounce" />
              <span>PERHATIAN: Terdapat {urgentRedReports.length} Kasus Prioritas Merah Membutuhkan Penanganan Segera</span>
            </div>
            <span className="text-[10px] font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full">
              SOP &lt; 2 Jam
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {urgentRedReports.map(rep => (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className="bg-white p-3.5 rounded-2xl border border-rose-200 shadow-xs hover:border-rose-400 cursor-pointer flex items-center justify-between transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-rose-900">{rep.reportCode}</span>
                    <span className="text-[10px] text-[#5C6B5E]">• {rep.location}</span>
                  </div>
                  <p className="text-xs text-[#1B4332] font-medium line-clamp-1">{rep.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div 
          onClick={() => { setPriorityFilter('ALL'); setStatusFilter('ALL'); }}
          className="bg-white p-4.5 rounded-3xl border border-[#E9E4D9] shadow-xs cursor-pointer hover:border-[#2D6A4F] transition-all"
        >
          <span className="text-[10px] font-bold text-[#8C8475] uppercase">Semua Laporan</span>
          <div className="text-2xl font-bold font-serif text-[#1B4332]">{reports.length}</div>
          <span className="text-[10px] text-[#5C6B5E]">Total data tercatat</span>
        </div>

        <div 
          onClick={() => setPriorityFilter('MERAH')}
          className={`bg-white p-4.5 rounded-3xl border shadow-xs cursor-pointer transition-all ${
            priorityFilter === 'MERAH' ? 'border-rose-500 ring-2 ring-rose-500/20' : 'border-rose-200 hover:border-rose-400'
          }`}
        >
          <span className="text-[10px] font-bold text-rose-600 uppercase">Prioritas Merah</span>
          <div className="text-2xl font-bold font-serif text-rose-700">
            {reports.filter(r => r.indicatorAnalysis.priority === 'MERAH').length}
          </div>
          <span className="text-[10px] text-rose-600">Perlu atensi segera</span>
        </div>

        <div 
          onClick={() => setPriorityFilter('KUNING')}
          className={`bg-white p-4.5 rounded-3xl border shadow-xs cursor-pointer transition-all ${
            priorityFilter === 'KUNING' ? 'border-[#D4A373] ring-2 ring-[#D4A373]/20' : 'border-[#E9E4D9] hover:border-[#D4A373]'
          }`}
        >
          <span className="text-[10px] font-bold text-[#9A6B3D] uppercase">Prioritas Kuning</span>
          <div className="text-2xl font-bold font-serif text-[#9A6B3D]">
            {reports.filter(r => r.indicatorAnalysis.priority === 'KUNING').length}
          </div>
          <span className="text-[10px] text-[#9A6B3D]">Klarifikasi & tabayyun</span>
        </div>

        <div 
          onClick={() => setStatusFilter('SELESAI')}
          className={`bg-white p-4.5 rounded-3xl border shadow-xs cursor-pointer transition-all ${
            statusFilter === 'SELESAI' ? 'border-[#2D6A4F] ring-2 ring-[#2D6A4F]/20' : 'border-[#E9E4D9] hover:border-[#2D6A4F]'
          }`}
        >
          <span className="text-[10px] font-bold text-[#2D6A4F] uppercase">Kasus Selesai</span>
          <div className="text-2xl font-bold font-serif text-[#2D6A4F]">
            {reports.filter(r => r.status === 'SELESAI').length}
          </div>
          <span className="text-[10px] text-[#2D6A4F]">Tuntas & evaluasi</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E9E4D9] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode, kategori, lokasi..."
            className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl pl-9 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
          />
          <Search className="w-4 h-4 text-[#8C8475] absolute left-3 top-3" />
        </div>

        {/* Priority Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#8C8475]" />
            <span className="text-[11px] font-bold text-[#5C6B5E]">Prioritas:</span>
          </div>
          {(['ALL', 'MERAH', 'KUNING', 'HIJAU'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                priorityFilter === p
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'bg-[#F5F2ED] hover:bg-[#E7F3EF] text-[#5C6B5E]'
              }`}
            >
              {p === 'ALL' ? 'Semua' : p}
            </button>
          ))}

          {/* Status filter dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#F5F2ED] border border-[#E9E4D9] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#1B4332] outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="TERKIRIM">Terkirim</option>
            <option value="DIVERIFIKASI">Diverifikasi</option>
            <option value="SEDANG_DITANGANI">Sedang Ditangani</option>
            <option value="TINDAK_LANJUT">Tindak Lanjut</option>
            <option value="SELESAI">Selesai</option>
          </select>

          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-xl text-[#5C6B5E] hover:text-[#1B4332] hover:bg-[#F5F2ED] transition-colors"
            title="Muat Ulang Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-3xl border border-[#E9E4D9] shadow-xs overflow-hidden">
        <div className="p-4.5 border-b border-[#E9E4D9] flex items-center justify-between">
          <h2 className="font-bold text-xs text-[#1B4332] uppercase tracking-wider">
            Daftar Kasus Masuk ({filteredReports.length} Laporan)
          </h2>
          <span className="text-[11px] text-[#8C8475]">Klik baris untuk membuka inspektur kasus</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-[#5C6B5E]">Memuat data laporan...</div>
        ) : filteredReports.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#5C6B5E]">
            Tidak ada laporan yang sesuai dengan kriteria filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FDFBF7] text-[#5C6B5E] font-bold uppercase text-[10px] border-b border-[#E9E4D9]">
                <tr>
                  <th className="p-3.5">Prioritas</th>
                  <th className="p-3.5">Kode Laporan</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Lokasi</th>
                  <th className="p-3.5">Identitas</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Konselor Bertugas</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E4D9]">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="hover:bg-[#E7F3EF]/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5">
                      {getPriorityBadge(report.indicatorAnalysis.priority)}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#1B4332]">
                      {report.reportCode}
                    </td>
                    <td className="p-3.5 font-medium text-[#1B4332]">
                      {report.category}
                    </td>
                    <td className="p-3.5 text-[#5C6B5E]">
                      {report.location}
                    </td>
                    <td className="p-3.5 text-[#5C6B5E]">
                      {report.contactPreference === 'FULL_ANONYMOUS' ? (
                        <span className="text-[#8C8475] font-medium">Anonim</span>
                      ) : (
                        <span className="text-[#2D6A4F] font-bold">
                          {report.reporterName || report.reporterPhone || 'Tersedia Kontak'}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="p-3.5 text-[#5C6B5E]">
                      {report.assignedCounselorName || 'Belum ditugaskan'}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReport(report);
                        }}
                        className="px-3 py-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl font-bold text-[11px] transition-colors"
                      >
                        Buka Kasus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Selected Report Inspection Modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          counselor={counselor}
          counselorsList={counselorsList}
          onClose={() => setSelectedReport(null)}
          onUpdateReport={handleUpdateReport}
          onDeleteReport={handleDeleteReport}
        />
      )}
    </div>
  );
};
