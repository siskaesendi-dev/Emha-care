export type PriorityLevel = 'HIJAU' | 'KUNING' | 'MERAH';

export type ReportStatus = 
  | 'TERKIRIM' 
  | 'DIVERIFIKASI' 
  | 'SEDANG_DITANGANI' 
  | 'TINDAK_LANJUT' 
  | 'SELESAI';

export type IncidentCategory = 
  | 'Ejekan / Hinaan (Verbal)'
  | 'Pengucilan / Sosial'
  | 'Ancaman / Intimidasi'
  | 'Kekerasan Fisik'
  | 'Kekerasan Daring (Cyber)'
  | 'Pelecehan'
  | 'Lainnya';

export type IncidentLocation = 
  | 'Ruang Kelas'
  | 'Kantin Madrasah'
  | 'Lorong / Tangga'
  | 'Toilet / Area Wudhu'
  | 'Lapangan Olahraga'
  | 'Media Sosial / Grup WhatsApp'
  | 'Gerbang / Area Luar Madrasah'
  | 'Tempat Lainnya';

export type IncidentFrequency = 
  | 'Sekali'
  | 'Beberapa Kali'
  | 'Sering'
  | 'Tidak Yakin';

export type ContactPreference = 
  | 'FULL_ANONYMOUS'
  | 'ANONYMOUS_WITH_PHONE'
  | 'INCLUDE_NAME_AND_PHONE';

export interface ChecklistItem {
  id: string;
  stepNumber?: number;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details?: string;
}

export interface ReportMessage {
  id: string;
  sender: 'SISWA' | 'GURU_BK';
  text: string;
  timestamp: string;
}

export interface MatchedIndicator {
  keyword: string;
  category: string;
  weight: number;
}

export interface IndicatorAnalysis {
  priority: PriorityLevel;
  score: number;
  confidence: number;
  matchedKeywords: MatchedIndicator[];
  riskFactors: string[];
  recommendations: string[];
  humanReviewRequired: boolean;
}

export interface Report {
  id: string;
  reportCode: string;
  createdAt: string;
  updatedAt: string;
  category: IncidentCategory;
  location: IncidentLocation;
  incidentTime?: string;
  frequency: IncidentFrequency;
  isSafe: boolean; // whether student feels safe right now
  description: string;
  
  contactPreference: ContactPreference;
  reporterName?: string;
  reporterPhone?: string;
  
  // Rule-based triase analysis
  indicatorAnalysis: IndicatorAnalysis;
  
  status: ReportStatus;
  checklist: ChecklistItem[];
  internalNotes?: string;
  assignedCounselorId?: string;
  assignedCounselorName?: string;
  auditLogs: AuditLog[];
  messages: ReportMessage[];
  
  // Post-resolution feedback (optional from student)
  feedback?: {
    rating: number; // 1-5
    studentComment?: string;
    isSituationBetter: boolean;
    submittedAt: string;
  };
}

export interface Counselor {
  id: string;
  name: string;
  role?: string;
  title?: string;
  assignedGrade?: string;
  gradeAssignment?: string;
  dutyHours?: string;
  schedule?: string;
  phone: string;
  whatsapp?: string;
  email: string;
  avatarUrl?: string;
  isEmergencyContact?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
