import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit3, PhoneCall, Clock, Check, X, UserPlus, UserCheck, ShieldAlert, Star } from 'lucide-react';
import { Counselor } from '../../types';

interface CounselorManagementViewProps {
  counselors: Counselor[];
  onBack: () => void;
  onUpdateCounselors: (updatedList: Counselor[]) => void;
}

export const CounselorManagementView: React.FC<CounselorManagementViewProps> = ({
  counselors,
  onBack,
  onUpdateCounselors,
}) => {
  const [counselorList, setCounselorList] = useState<Counselor[]>(counselors);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [counselorToDelete, setCounselorToDelete] = useState<Counselor | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    assignedGrade: string;
    phone: string;
    whatsapp: string;
    dutyHours: string;
    email: string;
  }>({
    name: '',
    role: 'Guru Bimbingan Konseling',
    assignedGrade: 'Semua Jenjang',
    phone: '',
    whatsapp: '',
    dutyHours: 'Senin - Jumat (07.30 - 15.30 WIB)',
    email: '',
  });

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSaveNew = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      showToast('error', 'Nama Guru BK dan nomor WhatsApp wajib diisi.');
      return;
    }

    const newCounselor: Counselor = {
      id: `c-${Date.now()}`,
      name: formData.name.trim(),
      title: 'Guru Bimbingan Konseling (Guru BK)',
      role: formData.role.trim() || 'Guru Bimbingan Konseling',
      gradeAssignment: formData.assignedGrade.trim() || 'Semua Jenjang',
      assignedGrade: formData.assignedGrade.trim() || 'Semua Jenjang',
      phone: formData.phone.trim() || formData.whatsapp.trim(),
      whatsapp: formData.whatsapp.trim(),
      schedule: formData.dutyHours.trim() || 'Senin - Jumat (07.30 - 15.30 WIB)',
      dutyHours: formData.dutyHours.trim() || 'Senin - Jumat (07.30 - 15.30 WIB)',
      email: formData.email.trim() || 'bk@madrasah.sch.id',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isEmergencyContact: false,
    };

    const updated = [...counselorList, newCounselor];
    setCounselorList(updated);
    setIsAdding(false);
    resetForm();

    try {
      await fetch('/api/counselors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counselors: updated }),
      });
      onUpdateCounselors(updated);
      showToast('success', `Guru BK "${newCounselor.name}" berhasil ditambahkan.`);
    } catch (err) {
      onUpdateCounselors(updated);
      showToast('success', `Guru BK "${newCounselor.name}" berhasil disimpan.`);
    }
  };

  const handleStartEdit = (c: Counselor) => {
    setEditingId(c.id);
    setIsAdding(false);
    setFormData({
      name: c.name,
      role: c.role,
      assignedGrade: c.assignedGrade,
      phone: c.phone,
      whatsapp: c.whatsapp,
      dutyHours: c.dutyHours,
      email: c.email || '',
    });
  };

  const handleSaveEdit = async (id: string) => {
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      showToast('error', 'Nama Guru BK dan nomor WhatsApp wajib diisi.');
      return;
    }

    const updated = counselorList.map(c => {
      if (c.id === id) {
        return {
          ...c,
          name: formData.name.trim(),
          role: formData.role.trim(),
          assignedGrade: formData.assignedGrade.trim(),
          gradeAssignment: formData.assignedGrade.trim(),
          phone: formData.phone.trim() || formData.whatsapp.trim(),
          whatsapp: formData.whatsapp.trim(),
          dutyHours: formData.dutyHours.trim(),
          schedule: formData.dutyHours.trim(),
          email: formData.email.trim(),
        };
      }
      return c;
    });

    setCounselorList(updated);
    setEditingId(null);
    resetForm();

    try {
      await fetch('/api/counselors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counselors: updated }),
      });
      onUpdateCounselors(updated);
      showToast('success', 'Data Guru BK berhasil diperbarui.');
    } catch (err) {
      onUpdateCounselors(updated);
      showToast('success', 'Data Guru BK berhasil disimpan.');
    }
  };

  const executeDeleteCounselor = async (counselor: Counselor) => {
    if (counselorList.length <= 1) {
      showToast('error', 'Minimal harus ada 1 Guru BK aktif di dalam sistem.');
      setCounselorToDelete(null);
      return;
    }

    const updated = counselorList.filter(c => c.id !== counselor.id);
    setCounselorList(updated);
    setCounselorToDelete(null);

    try {
      await fetch('/api/counselors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counselors: updated }),
      });
      onUpdateCounselors(updated);
      showToast('success', `Guru BK "${counselor.name}" berhasil dihapus.`);
    } catch (err) {
      onUpdateCounselors(updated);
      showToast('success', `Guru BK "${counselor.name}" berhasil dihapus.`);
    }
  };

  const handleDelete = (c: Counselor) => {
    if (counselorList.length <= 1) {
      showToast('error', 'Minimal harus ada 1 Guru BK aktif di dalam sistem.');
      return;
    }
    setCounselorToDelete(c);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'Guru Bimbingan Konseling',
      assignedGrade: 'Semua Jenjang',
      phone: '',
      whatsapp: '',
      dutyHours: 'Senin - Jumat (07.30 - 15.30 WIB)',
      email: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5C6B5E] hover:text-[#2D6A4F] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard BK</span>
        </button>

        <div className="text-xs font-bold text-[#2D6A4F] bg-[#E7F3EF] px-3.5 py-1 rounded-full border border-[#2D6A4F]/20">
          Pengaturan Tim Bimbingan Konseling
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-medium flex items-center justify-between shadow-xs ${
            notification.type === 'success'
              ? 'bg-[#E7F3EF] text-[#1B4332] border border-[#2D6A4F]/30'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-current opacity-70 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E9E4D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E7F3EF] text-[#2D6A4F] text-xs font-bold font-serif">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Daftar Resmi Guru BK</span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#1B4332]">
            Tim Bimbingan Konseling Madrasah
          </h1>
          <p className="text-xs text-[#5C6B5E]">
            Data resmi Guru BK MTs Matholi'ul Huda Troso bersifat tetap dan terpadu untuk mendampingi siswa, terintegrasi pada kontak ruang siswa dan sistem penugasan laporan.
          </p>
        </div>
      </div>

      {/* Add New Counselor Form Card */}
      {isAdding && (
        <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[#E9E4D9] pb-3">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#2D6A4F]" />
              <h2 className="text-base font-bold text-[#1B4332] font-serif">Tambah Guru BK Baru</h2>
            </div>
            <button
              onClick={() => setIsAdding(false)}
              className="text-[#8C8475] hover:text-[#1B4332] text-xs font-semibold p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSaveNew} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Siska Noviana Dewi, M.Sc."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Jabatan / Peran
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Guru Bimbingan Konseling"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  No. WhatsApp (Aktif) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 082329180233"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, phone: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Penugasan Jenjang / Kelas
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kelas 7 & 8 atau Semua Jenjang"
                  value={formData.assignedGrade}
                  onChange={(e) => setFormData({ ...formData, assignedGrade: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Jam Tugas / Pelayanan
                </label>
                <input
                  type="text"
                  placeholder="Senin - Jumat (07.30 - 15.30 WIB)"
                  value={formData.dutyHours}
                  onChange={(e) => setFormData({ ...formData, dutyHours: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] mb-1">
                  Email (Opsional)
                </label>
                <input
                  type="email"
                  placeholder="email@madrasah.sch.id"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-3 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:bg-white text-[#1B4332]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9E4D9]">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-[#F5F2ED] text-[#5C6B5E] text-xs font-semibold border border-[#E9E4D9] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Simpan Guru BK
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Counselors List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#1B4332] font-serif">
          Daftar Guru BK Aktif ({counselorList.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {counselorList.map((c) => {
            const isEditingThis = editingId === c.id;

            if (isEditingThis) {
              return (
                <div key={c.id} className="bg-white p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E9E4D9] pb-2">
                    <h3 className="text-sm font-bold text-[#1B4332] font-serif">Edit Profil: {c.name}</h3>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-[#8C8475] hover:text-[#1B4332] text-xs"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#1B4332] mb-1">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#1B4332] mb-1">Jabatan / Peran</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#1B4332] mb-1">No. WhatsApp</label>
                      <input
                        type="text"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value, phone: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#1B4332] mb-1">Penugasan Jenjang</label>
                      <input
                        type="text"
                        value={formData.assignedGrade}
                        onChange={(e) => setFormData({ ...formData, assignedGrade: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#1B4332] mb-1">Jam Pelayanan</label>
                      <input
                        type="text"
                        value={formData.dutyHours}
                        onChange={(e) => setFormData({ ...formData, dutyHours: e.target.value })}
                        className="w-full bg-[#FDFBF7] border border-[#E9E4D9] rounded-2xl p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#2D6A4F] text-[#1B4332]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9E4D9]">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#F5F2ED] text-[#5C6B5E] text-xs font-semibold border border-[#E9E4D9]"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(c.id)}
                      className="px-4 py-1.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={c.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E9E4D9] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                    {c.name.split(' ')[0][0]}{c.name.split(' ')[1] ? c.name.split(' ')[1][0] : ''}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-[#1B4332] leading-snug">{c.name}</h3>
                      <span className="text-[10px] font-bold bg-[#E7F3EF] text-[#2D6A4F] px-2 py-0.5 rounded-full">
                        {c.assignedGrade}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C6B5E] font-medium">{c.role}</p>
                    <div className="flex items-center gap-3 text-xs text-[#5C6B5E] pt-1">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-[#8C8475]" />
                        <strong className="text-[#1B4332] font-mono">{c.whatsapp}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8C8475]" />
                        <span>{c.dutyHours}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleStartEdit(c)}
                    className="p-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E7F3EF] hover:text-[#2D6A4F] text-[#1B4332] text-xs font-semibold transition-colors border border-[#E9E4D9] flex items-center gap-1.5 cursor-pointer"
                    title="Edit Profil"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(c)}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors border border-rose-200 flex items-center gap-1.5 cursor-pointer"
                    title="Hapus Profil Guru BK"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal for Deleting Counselor */}
      {counselorToDelete && (
        <div className="fixed inset-0 z-50 bg-[#1B4332]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-rose-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6 text-rose-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#1B4332] font-serif">Hapus Profil Guru BK?</h3>
                <p className="text-xs text-[#5C6B5E]">
                  Apakah Anda yakin ingin menghapus <strong className="text-rose-700">{counselorToDelete.name}</strong> dari daftar Guru BK aktif?
                </p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl text-[11px] text-rose-900 leading-relaxed font-medium">
              ⚠️ Profil ini tidak akan lagi muncul di kontak siswa atau penugasan kasus baru.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setCounselorToDelete(null)}
                className="px-4 py-2.5 rounded-xl bg-[#F5F2ED] hover:bg-[#E9E4D9] text-[#5C6B5E] text-xs font-bold transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => executeDeleteCounselor(counselorToDelete)}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ya, Hapus Guru BK</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
