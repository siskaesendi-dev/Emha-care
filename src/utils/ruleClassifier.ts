import { IncidentCategory, IncidentFrequency, IndicatorAnalysis, MatchedIndicator, PriorityLevel } from '../types';

interface RuleDictionary {
  red: { word: string; category: string; weight: number }[];
  yellow: { word: string; category: string; weight: number }[];
}

export const RED_PRIORITY_KEYWORDS: string[] = [
  'pukul', 'memukul', 'dipukul', 'tendang', 'ditendang', 'tampar', 'hajar', 'keroyok', 'dikeroyok',
  'cekik', 'dicekik', 'berdarah', 'luka', 'memar', 'silet', 'pisau', 'senjata',
  'akhiri hidup', 'ingin mati', 'mau mati', 'bunuh diri', 'sayat', 'tidak mau hidup',
  'ancam bunuh', 'habisi', 'awas kalau lapor', 'diancam', 'peras uang', 'minta paksa',
  'leceh', 'dilecehkan', 'buka baju', 'raba', 'foto telanjang'
];

export const YELLOW_PRIORITY_KEYWORDS: string[] = [
  'ejek', 'diejek', 'hina', 'dihina', 'olok', 'bodoh', 'miskin', 'jelek', 'cacian',
  'orang tua', 'nama bapak', 'dikucilkan', 'kucilkan', 'dijauhi', 'tidak diajak', 'sendirian', 'diboikot',
  'sosmed', 'grup wa', 'whatsapp', 'sebar foto', 'fitnah', 'tiktok', 'instagram', 'sindiran',
  'tatap sinis', 'dipelototi', 'takut', 'menangis', 'nangis', 'malu'
];

const DICTIONARY: RuleDictionary = {
  red: [
    // Kekerasan Fisik Berat
    { word: 'pukul', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'memukul', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'dipukul', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'tendang', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'ditendang', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'tampar', category: 'Kekerasan Fisik', weight: 3.5 },
    { word: 'hajar', category: 'Kekerasan Fisik', weight: 4.0 },
    { word: 'keroyok', category: 'Kekerasan Fisik', weight: 4.5 },
    { word: 'dikeroyok', category: 'Kekerasan Fisik', weight: 4.5 },
    { word: 'cekik', category: 'Kekerasan Fisik', weight: 4.5 },
    { word: 'dicekik', category: 'Kekerasan Fisik', weight: 4.5 },
    { word: 'berdarah', category: 'Kekerasan Fisik', weight: 4.0 },
    { word: 'luka', category: 'Kekerasan Fisik', weight: 3.0 },
    { word: 'memar', category: 'Kekerasan Fisik', weight: 3.0 },
    { word: 'silet', category: 'Bahaya Senjata / Benda Tajam', weight: 5.0 },
    { word: 'pisau', category: 'Bahaya Senjata / Benda Tajam', weight: 5.0 },
    { word: 'senjata', category: 'Bahaya Senjata / Benda Tajam', weight: 5.0 },

    // Bahaya Diri & Keputusasaan
    { word: 'akhiri hidup', category: 'Indikasi Bahaya Diri', weight: 6.0 },
    { word: 'ingin mati', category: 'Indikasi Bahaya Diri', weight: 6.0 },
    { word: 'mau mati', category: 'Indikasi Bahaya Diri', weight: 6.0 },
    { word: 'bunuh diri', category: 'Indikasi Bahaya Diri', weight: 6.0 },
    { word: 'sayat', category: 'Indikasi Bahaya Diri', weight: 5.0 },
    { word: 'tidak mau hidup', category: 'Indikasi Bahaya Diri', weight: 6.0 },
    { word: 'menyerah', category: 'Indikasi Keputusasaan Berat', weight: 3.5 },

    // Ancaman Berat & Pemerasan
    { word: 'ancam bunuh', category: 'Ancaman Fatal', weight: 5.5 },
    { word: 'habisi', category: 'Ancaman Fatal', weight: 4.5 },
    { word: 'awas kalau lapor', category: 'Intimidasi / Pembungkaman', weight: 4.0 },
    { word: 'diancam', category: 'Ancaman', weight: 3.0 },
    { word: 'peras uang', category: 'Pemerasan', weight: 3.5 },
    { word: 'minta paksa', category: 'Pemerasan', weight: 3.0 },

    // Pelecehan
    { word: 'leceh', category: 'Pelecehan', weight: 4.5 },
    { word: 'dilecehkan', category: 'Pelecehan', weight: 4.5 },
    { word: 'buka baju', category: 'Pelecehan', weight: 5.0 },
    { word: 'raba', category: 'Pelecehan', weight: 5.0 },
    { word: 'foto telanjang', category: 'Pelecehan Siber', weight: 5.5 },
  ],
  yellow: [
    // Kekerasan Verbal & Hinaan
    { word: 'ejek', category: 'Verbal', weight: 1.5 },
    { word: 'diejek', category: 'Verbal', weight: 1.5 },
    { word: 'hina', category: 'Verbal', weight: 1.5 },
    { word: 'dihina', category: 'Verbal', weight: 1.5 },
    { word: 'olok', category: 'Verbal', weight: 1.2 },
    { word: 'bodoh', category: 'Verbal', weight: 1.2 },
    { word: 'miskin', category: 'Verbal', weight: 1.2 },
    { word: 'jelek', category: 'Verbal', weight: 1.0 },
    { word: 'cacian', category: 'Verbal', weight: 1.5 },
    { word: 'orang tua', category: 'Verbal (Menghina Orang Tua)', weight: 1.5 },
    { word: 'nama bapak', category: 'Verbal (Menghina Orang Tua)', weight: 1.5 },

    // Pengucilan & Sosial
    { word: 'dikucilkan', category: 'Sosial / Pengucilan', weight: 2.0 },
    { word: 'kucilkan', category: 'Sosial / Pengucilan', weight: 2.0 },
    { word: 'dijauhi', category: 'Sosial / Pengucilan', weight: 2.0 },
    { word: 'tidak diajak', category: 'Sosial / Pengucilan', weight: 1.5 },
    { word: 'sendirian', category: 'Sosial / Pengucilan', weight: 1.0 },
    { word: 'diboikot', category: 'Sosial / Pengucilan', weight: 2.5 },

    // Kekerasan Daring (Cyber)
    { word: 'sosmed', category: 'Kekerasan Daring', weight: 1.5 },
    { word: 'grup wa', category: 'Kekerasan Daring', weight: 1.8 },
    { word: 'whatsapp', category: 'Kekerasan Daring', weight: 1.2 },
    { word: 'sebar foto', category: 'Kekerasan Daring', weight: 2.5 },
    { word: 'fitnah', category: 'Kekerasan Daring / Verbal', weight: 2.0 },
    { word: 'tiktok', category: 'Kekerasan Daring', weight: 1.2 },
    { word: 'instagram', category: 'Kekerasan Daring', weight: 1.2 },
    { word: 'sindiran', category: 'Kekerasan Daring / Verbal', weight: 1.2 },

    // Intimidasi Ringan
    { word: 'tatap sinis', category: 'Intimidasi', weight: 1.0 },
    { word: 'dipelototi', category: 'Intimidasi', weight: 1.0 },
    { word: 'takut', category: 'Dampak Emosional', weight: 1.5 },
    { word: 'menangis', category: 'Dampak Emosional', weight: 1.5 },
    { word: 'nangis', category: 'Dampak Emosional', weight: 1.5 },
    { word: 'malu', category: 'Dampak Emosional', weight: 1.0 },
  ]
};

export function classifyReportRuleBased(
  description: string,
  category: IncidentCategory,
  frequency: IncidentFrequency,
  isSafe: boolean
): IndicatorAnalysis {
  const normalizedText = (description || '').toLowerCase();
  const matchedKeywords: MatchedIndicator[] = [];
  const riskFactors: string[] = [];
  const recommendations: string[] = [];
  
  let score = 0;
  let hasCriticalKeywords = false;

  // 1. Scan Red Dictionary
  for (const item of DICTIONARY.red) {
    if (normalizedText.includes(item.word)) {
      matchedKeywords.push({
        keyword: item.word,
        category: item.category,
        weight: item.weight,
      });
      score += item.weight;
      hasCriticalKeywords = true;
      if (!riskFactors.includes(`Terdeteksi indikasi: ${item.category}`)) {
        riskFactors.push(`Terdeteksi indikasi: ${item.category}`);
      }
    }
  }

  // 2. Scan Yellow Dictionary
  for (const item of DICTIONARY.yellow) {
    if (normalizedText.includes(item.word)) {
      matchedKeywords.push({
        keyword: item.word,
        category: item.category,
        weight: item.weight,
      });
      score += item.weight;
      if (!riskFactors.includes(`Indikasi situasi: ${item.category}`)) {
        riskFactors.push(`Indikasi situasi: ${item.category}`);
      }
    }
  }

  // 3. Form Attributes Impact
  if (!isSafe) {
    score += 5.5;
    riskFactors.push('Siswa secara eksplisit menyatakan TIDAK MERASA AMAN saat ini');
  }

  if (frequency === 'Sering') {
    score += 2.5;
    riskFactors.push('Kejadian berulang dengan frekuensi SERING');
  } else if (frequency === 'Beberapa Kali') {
    score += 1.2;
    riskFactors.push('Kejadian telah terjadi beberapa kali');
  }

  if (category === 'Kekerasan Fisik' || category === 'Pelecehan' || category === 'Ancaman / Intimidasi') {
    score += 2.0;
  }

  // 4. Determine Priority Level
  let priority: PriorityLevel = 'HIJAU';
  if (!isSafe || hasCriticalKeywords || score >= 5.0) {
    priority = 'MERAH';
  } else if (score >= 2.5) {
    priority = 'KUNING';
  } else {
    priority = 'HIJAU';
  }

  // 5. Generate System Recommendations based on rules
  if (priority === 'MERAH') {
    recommendations.push('Segera lakukan koordinasi dan temui siswa di ruang BK yang kondusif hari ini.');
    if (!isSafe) {
      recommendations.push('Pastikan perlindungan dan rasa aman siswa selama berada di lingkungan madrasah.');
    }
    if (hasCriticalKeywords) {
      recommendations.push('Periksa kondisi fisik dan emosional siswa; libatkan tim kesiswaan jika diperlukan.');
    }
    recommendations.push('Bila kontak nomor tersedia, hubungi pelapor secara bijak dan penuh kerahasiaan.');
  } else if (priority === 'KUNING') {
    recommendations.push('Jadwalkan sesi klarifikasi awal dan konseling dengan pelapor dalam 1-2 hari kerja.');
    recommendations.push('Lakukan pemantauan tersamar di lokasi kejadian (misal kelas/kantin) bersama wali kelas.');
    if (category === 'Kekerasan Daring (Cyber)') {
      recommendations.push('Dokumentasikan bukti tangkapan layar jika ada dan edukasi etika bermedia sosial.');
    }
  } else {
    recommendations.push('Catat sebagai laporan informasi dan integrasikan ke materi bimbingan klasikal/ukhuwah.');
    recommendations.push('Pantau perkembangan interaksi siswa secara berkala.');
  }

  // 6. Calculate Confidence
  // Confidence is an indicator of how clearly the text matched pattern rules (60% - 95%)
  let baseConfidence = 65;
  if (matchedKeywords.length > 0) {
    baseConfidence += Math.min(matchedKeywords.length * 6, 25);
  }
  if (!isSafe) baseConfidence += 5;
  const confidence = Math.min(baseConfidence, 96);

  return {
    priority,
    score: Number(score.toFixed(1)),
    confidence,
    matchedKeywords,
    riskFactors: riskFactors.length > 0 ? riskFactors : ['Laporan deskriptif awal tanpa kata kunci berisiko tinggi'],
    recommendations,
    humanReviewRequired: true,
  };
}
