export const SAHABAT_SYSTEM_INSTRUCTION = `
Kamu adalah "Buddy", seorang teman dekat yang hangat, berempati tinggi, santai, dan pengertian saat mengobrol dengan siswa di MTs Matholi'ul Huda Troso melalui aplikasi EMHA CARE.
Tugas utamamu adalah menjadi teman curhat yang asyik, aman, dan menenangkan tanpa pernah menghakimi.

=== ATURAN PENTING GAYA KOMUNIKASI (NATURAL SEPERTI TEMAN) ===
1. JANGAN MENGULANG ATAU MENGUTIP PERTANYAAN/KALIMAT SISWA:
   - DILARANG menggunakan gaya: "Kamu bertanya tentang...", "Mengenai ceritamu tadi tentang...", atau mengutip ulang kalimat siswa dalam tanda petik.
   - LANGSUNG tanggapi isi, perasaan, dan situasi ceritanya secara to-the-point dan luwes sebagaimana layaknya sahabat karib yang sedang duduk mengobrol berdua.
2. GAYA BAHASA & TONE:
   - Gunakan bahasa Indonesia sehari-hari yang akrab, santai, penuh perhatian, dan tulus (gunakan kata "Aku" dan "Kamu").
   - HINDARI bahasa kaku, birokratis, formalitas kaku, atau gaya Customer Service / robot.
   - DILARANG mengulang-ulang kalimat template yang sama.
3. ALUR PERCAKAPAN:
   - Saat masih mengobrol santai: Berikan respon pendek-menengah yang hangat (1-3 kalimat) yang langsung merespon intinya, lalu lanjutkan obrolan secara alami.
   - Jika siswa bertanya saran atau bertanya pendapat: Langsung berikan pandangan, tips praktis, atau penguat hati seperti saran teman baik.

=== PENANGANAN KONDISI KHUSUS ===

1. JIKA SISWA TIDAK MAU / BELUM MAU BERCERITA (misal: "aku belum mau cerita", "gamau cerita dulu", "takut cerita", "malu"):
   - Respon dengan sangat santai dan pengertian: tidak apa-apa, jangan dipaksakan. Yakinkan bahwa Buddy selalu siap kapan pun dia butuh teman bicara.
   - Contoh: "Gak apa-apa banget, santai aja! Jangan dipaksakan ya. Kalau nanti kamu udah ngerasa lebih nyaman dan pengen cerita, aku selalu siap dengerin kapan aja. Semangat ya!"

2. JIKA SISWA SELESAI BERCERITA PANJANG / MERASA SELESAI / MEMINTA ANALISIS:
   - Berikan ANALISIS MENDALAM yang rapi dan terstruktur:
     a. **1. Yang Kamu Alami**: Intisari kejadian atau perlakuan di madrasah secara objektif dan penuh empati (tanpa mengutip pertanyaan siswa).
     b. **2. Yang Kamu Rasakan**: Validasi perasaan emosional (sedih, cemas, tertekan) dan penguat batin/refleksi islami MTs Matholi'ul Huda Troso (seperti doa saat Sholat Dhuha, membaca Sholawat Nariyah, istighosah, atau Asmaul Husna).
     c. **3. Rekomendasi Konsultasi ke Guru BK**: Rekomendasi ramah untuk berkonsultasi langsung ke Guru BK madrasah agar mendapatkan perlindungan dan bantuan nyata.
   - Sertakan apresiasi: "Terima kasih banyak ya sudah berani dan mau cerita ke Buddy."

3. JIKA SISWA BERPAMITAN / MENYATAKAN SELESAI / MENGUCAPKAN TERIMA KASIH:
   - Ucapkan terima kasih dan apresiasi yang hangat atas keberaniannya.
   - Contoh: "Sama-sama! Makasih banyak ya udah mau terbuka dan berbagi cerita bareng Buddy hari ini. Kamu hebat dan gak sendirian. Jaga diri baik-baik ya, Buddy selalu ada buat kamu!"

=== REFLEKSI KEAGAMAAN MTs MATHOLI'UL HUDA TROSO ===
- Sentuh sisi spiritual secara menyejukkan tanpa menggurui: Sholat Dhuha, mengaji Surat Ar-Rahman/Al-Mulk, Sholawat Nariyah, istighosah, dan Asmaul Husna.
- Jangan gunakan dalih agama untuk menyalahkan siswa, melainkan sebagai pelukan penenang jiwa.

=== PROTOKOL KEAMANAN KRITIS ===
Jika siswa menunjukkan indikasi ingin melukai diri sendiri atau membahayakan nyawa:
Segera respon penuh kasih sayang dan arahkan secara tegas namun lembut untuk segera berbicara langsung dengan Guru BK atau guru madrasah sekarang juga.
`;

/**
 * Extract contextual topics from user story to personalize the dynamic response
 */
function extractStoryDetails(text: string) {
  const lower = text.toLowerCase();
  
  const subjects = [];
  if (lower.includes('pukul') || lower.includes('tendang') || lower.includes('dorong') || lower.includes('lempar') || lower.includes('jegal') || lower.includes('tampar')) {
    subjects.push('perlakuan fisik yang kasar');
  }
  if (lower.includes('palak') || (lower.includes('uang') && (lower.includes('paksa') || lower.includes('minta')))) {
    subjects.push('pemaksaan uang saku');
  }
  if (lower.includes('ejek') || lower.includes('hina') || lower.includes('nama orang tua') || lower.includes('dikatain') || lower.includes('jelek') || lower.includes('gendut') || lower.includes('kurus')) {
    subjects.push('ejekan dan kata-kata menyakitkan');
  }
  if (lower.includes('kucil') || lower.includes('jauhi') || lower.includes('sendirian') || lower.includes('ga ada teman') || lower.includes('gak ada teman') || lower.includes('musuh')) {
    subjects.push('pengucilan dan dijauhi teman');
  }
  if (lower.includes('foto') || lower.includes('wa') || lower.includes('whatsapp') || lower.includes('grup') || lower.includes('medsos') || lower.includes('tiktok')) {
    subjects.push('masalah foto atau chat di grup');
  }
  if (lower.includes('tugas') || lower.includes('pr') || lower.includes('ulangan') || lower.includes('nilai') || lower.includes('ujian')) {
    subjects.push('beban tugas atau pelajaran');
  }

  const emotions = [];
  if (lower.includes('takut') || lower.includes('cemas') || lower.includes('ngeri') || lower.includes('was-was') || lower.includes('gelisah')) {
    emotions.push('rasa takut dan cemas');
  }
  if (lower.includes('sedih') || lower.includes('nangis') || lower.includes('kecewa') || lower.includes('hancur') || lower.includes('nyesek')) {
    emotions.push('rasa sedih yang mendalam');
  }
  if (lower.includes('marah') || lower.includes('kesal') || lower.includes('jengkel') || lower.includes('emosi')) {
    emotions.push('rasa kesal dan marah');
  }
  if (lower.includes('malu') || lower.includes('minder')) {
    emotions.push('rasa malu');
  }

  return { subjects, emotions };
}

/**
 * Helper to build deep analysis fallback when a student finishes sharing
 */
function buildDeepAnalysisFallback(userStory: string, userMessages: string[]): string {
  const { subjects, emotions } = extractStoryDetails(userStory);
  
  // 1. Identifikasi apa yang dialami secara adaptif tanpa mengutip kata-kata/pertanyaan
  let experiencedDesc = '';
  if (subjects.length > 0) {
    experiencedDesc = `Kamu sedang menghadapi situasi yang tidak menyenangkan terkait ${subjects.join(' serta ')} di lingkungan madrasah. Hal ini membuat hari-harimu di sekolah terasa berat dan tertekan.`;
  } else {
    experiencedDesc = 'Kamu sedang menghadapi persoalan yang cukup berat dan memendam beban tersebut seorang diri di madrasah.';
  }

  // 2. Identifikasi apa yang dirasakan & Refleksi Batin
  let feelingsDesc = '';
  if (emotions.length > 0) {
    feelingsDesc = `Situasi tersebut memicu ${emotions.join(' dan ')} yang menguras energi batinmu. Perasaanmu ini sangat valid dan wajar. Ingat ya, kamu sama sekali tidak bersalah atas perlakuan tersebut. Kamu sangat berharga. Luapkan ketenangan lewat doa saat Sholat Dhuha dan lantunan Sholawat Nariyah di madrasah agar hatimu lebih adem.`;
  } else {
    feelingsDesc = 'Perasaan sedih, lelah, dan tertekan yang kamu rasakan adalah hal yang wajar. Kamu tidak bersalah dan kamu sangat berharga. Percayalah bahwa setiap kesulitan selalu ada jalan keluar terbaik.';
  }

  return `Terima kasih banyak sudah berani dan mau bercerita bersama Buddy. Berikut analisis mendalam dari apa yang kamu ceritakan:

🔍 **1. Yang Kamu Alami:**
${experiencedDesc}

💛 **2. Yang Kamu Rasakan:**
${feelingsDesc}

🤝 **3. Rekomendasi Konsultasi ke Guru BK:**
Agar masalah ini tidak berulang dan kamu mendapatkan rasa aman serta perlindungan penuh di MTs Matholi'ul Huda Troso, Buddy sangat menyarankan kamu untuk berkonsultasi langsung ke **Guru BK**. Guru BK siap mendengarkan, merahasiakan ceritamu, dan membantu menyelesaikan masalah ini secara bijaksana. Kamu juga bisa langsung meneruskan ringkasan cerita ini menjadi laporan resmi melalui tombol di bawah.

Semoga hatimu terasa lebih lega ya! Buddy selalu ada untukmu.`;
}

/**
 * Intelligent contextual fallback response generator for "Buddy" adhering to MTs Matholi'ul Huda Troso culture
 */
export function generateNaturalSahabatResponse(messages: { role: string; text: string }[]): string {
  if (!messages || messages.length === 0) {
    return 'Hai! Aku Buddy, teman dekatmu di EMHA CARE. Di sini ruang aman dan rahasia buat kamu curhat apa saja. Gimana harimu di madrasah hari ini? Ada kejadian seru atau unek-unek yang mau kamu bagi?';
  }

  const userMessages = messages.filter(m => m.role === 'user').map(m => m.text);
  const latestMessage = userMessages[userMessages.length - 1] || '';
  const cleanText = latestMessage.trim();
  const lower = cleanText.toLowerCase();
  const turnCount = userMessages.length;
  const fullStory = userMessages.join(' ');
  const { subjects } = extractStoryDetails(cleanText);

  // 1. ATURAN KEAMANAN KRITIS
  if (
    lower.includes('bunuh diri') ||
    lower.includes('akhiri hidup') ||
    lower.includes('mau mati') ||
    lower.includes('ingin mati') ||
    lower.includes('sayat tangan') ||
    lower.includes('lukai diri') ||
    lower.includes('melukai diri') ||
    lower.includes('gak mau hidup') ||
    lower.includes('ga mau hidup')
  ) {
    return 'Aku sangat peduli sama kamu, dan kamu itu berharga banget. Tolong, ini penting ya: bicaralah langsung ke Guru BK atau guru di madrasah sekarang juga. Kamu tidak sendirian dan kami di sini siap menjagamu.';
  }

  // 2. SISWA TIDAK MAU / BELUM MAU BERCERITA
  if (
    lower.includes('gamau cerita') ||
    lower.includes('ga mau cerita') ||
    lower.includes('gak mau cerita') ||
    lower.includes('tidak mau cerita') ||
    lower.includes('belum mau cerita') ||
    lower.includes('takut cerita') ||
    lower.includes('malu cerita') ||
    lower.includes('ga jadi cerita') ||
    lower.includes('gak jadi cerita') ||
    lower.includes('males cerita') ||
    lower.includes('malas cerita') ||
    lower.includes('rahasia') ||
    lower.includes('nanti aja') ||
    lower === 'gamau' ||
    lower === 'ga mau' ||
    lower === 'gak mau' ||
    lower === 'belum mau' ||
    lower === 'takut' ||
    lower === 'malu'
  ) {
    return 'Gak apa-apa banget kok kalau kamu belum ingin cerita sekarang. Jangan merasa terbebani ya. Buddy akan selalu siap mendengarkan kapan pun kamu butuh teman ngobrol. Semangat ya!';
  }

  // 3. SISWA MENYATAKAN BENAR-BENAR SELESAI / PAMIT / TERIMA KASIH SELESAI
  if (
    (lower.includes('terima kasih') || lower.includes('makasih')) &&
    (lower.includes('selesai') || lower.includes('cukup') || lower.includes('bantuannya') || lower.includes('buddy') || lower.includes('udahan') || turnCount >= 3)
  ) {
    return 'Sama-sama! Terima kasih banyak sudah berani dan mau bercerita bersama Buddy hari ini. Keberanianmu untuk terbuka adalah langkah yang sangat hebat. Ingat, kamu tidak pernah sendirian. Jaga diri baik-baik ya, Buddy selalu ada di sini kalau kamu butuh!';
  }

  if (
    lower === 'sudah selesai' ||
    lower === 'udah selesai' ||
    lower === 'cukup sekian' ||
    lower === 'cukup itu aja' ||
    lower === 'cuma itu aja' ||
    lower === 'itu aja ceritaku' ||
    lower === 'gitu aja' ||
    lower === 'dah selesai' ||
    lower === 'selesai'
  ) {
    if (turnCount >= 2 || fullStory.length > 30) {
      return buildDeepAnalysisFallback(fullStory, userMessages);
    }
    return 'Terima kasih banyak ya sudah berani dan mau bercerita bersama Buddy. Senang bisa mendengarkanmu hari ini. Kalau nanti ada hal lain yang ingin kamu bagi, Buddy selalu siap menyambutmu kapan saja!';
  }

  // 4. SISWA MEMINTA ANALISIS / SELESAI CERITA PANJANG / MINTA SARAN
  const isRequestingAnalysis =
    lower.includes('minta analisis') ||
    lower.includes('analisis ceritaku') ||
    lower.includes('analisis') ||
    lower.includes('harus gimana') ||
    lower.includes('harus bagaimana') ||
    lower.includes('gimana menurutmu') ||
    lower.includes('menurut kamu gimana') ||
    lower.includes('minta saran') ||
    lower.includes('kasih saran') ||
    lower.includes('solusi') ||
    lower.includes('gitu ceritanya') ||
    (turnCount >= 2 && cleanText.length > 80);

  if (isRequestingAnalysis && (fullStory.length > 30 || turnCount >= 2)) {
    return buildDeepAnalysisFallback(fullStory, userMessages);
  }

  // 5. PERTANYAAN KHUSUS (LANGSUNG DIJAWAB SEPERTI TEMAN TANPA MENGULANG PERTANYAAN)
  if (lower.includes('kenapa ya') || lower.includes('kenapa mereka') || lower.includes('salahku apa') || lower.includes('salah aku apa') || lower.includes('apa aku salah')) {
    return 'Kamu sama sekali gak salah. Sering kali orang yang mengejek atau berbuat kasar itu sedang punya masalah dengan dirinya sendiri dan melampiaskannya ke orang lain. Jangan biarkan perlakuan mereka membuatmu meragukan dirimu sendiri ya.';
  }

  if (lower.includes('cara ngadepin') || lower.includes('cara menghadapi') || lower.includes('gimana caranya') || lower.includes('tips')) {
    return 'Langkah terbaik adalah jangan tunjukkan kalau kamu terpancing emosi di depan mereka, cari teman yang bisa saling mendukung, dan yang paling penting: ceritakan langsung ke Guru BK agar madrasah bisa menindak tegas.';
  }

  // 6. SAPAAN & BASA-BASI HANGAT
  if (
    lower === 'halo' ||
    lower === 'hai' ||
    lower === 'haii' ||
    lower === 'hei' ||
    lower === 'halo buddy' ||
    lower === 'halo sahabat' ||
    lower === 'p' ||
    lower === 'tes' ||
    lower === 'pagi' ||
    lower === 'siang' ||
    lower === 'sore' ||
    lower === 'malam'
  ) {
    return 'Halo! Senang banget kamu mampir ke sini. Gimana suasana harimu di madrasah hari ini? Ada kejadian menarik atau unek-unek yang mau kamu bagi?';
  }

  if (lower.includes('assalam')) {
    return "Wa'alaikumsalam warahmatullah! Senang bisa menyapamu hari ini. Gimana kabarmu dan harimu di MTs Matholi'ul Huda Troso? Ada yang ingin kamu ceritakan?";
  }

  // 7. KABAR BAIK / POSITIF
  if (
    lower === 'kabar baik' ||
    lower === 'baik' ||
    lower === 'alhamdulillah baik' ||
    lower.includes('senang') ||
    lower.includes('seru banget') ||
    lower.includes('bahagia') ||
    lower.includes('menang') ||
    lower.includes('nilainya bagus')
  ) {
    if (lower.includes('seru') || lower.includes('menang') || lower.includes('nilainya bagus')) {
      return 'Wah, keren banget! Alhamdulillah, ikut senang dan bangga dengernya! Ceritain dong momen apa yang paling bikin kamu bersemangat hari ini!';
    }
    return 'Alhamdulillah kalau kabarmu baik! Di kelas atau pas jam istirahat tadi ada cerita seru apa nih?';
  }

  // 8. TOPIK KESEHARIAN / KANTIN / EKSKUL / PELAJARAN
  if (lower.includes('makan') || lower.includes('kantin') || (lower.includes('jajan') && !lower.includes('palak') && !lower.includes('paksa'))) {
    return 'Asyik ya kalau pas jam istirahat bisa jajan santai di kantin madrasah. Tadi jajan apa aja dan bareng siapa di sana?';
  }

  if (lower.includes('pr') || lower.includes('tugas') || lower.includes('ulangan') || lower.includes('ujian')) {
    return 'Lagi masa-masa padat materi ya di madrasah. Pelajaran apa yang lagi bikin kamu harus fokus ekstra hari ini? Semangat ya, kamu pasti bisa!';
  }

  // 9. RESPON SINGKAT DARI SISWA
  if (
    cleanText.length <= 12 &&
    (lower === 'ya' || lower === 'iya' || lower === 'enggak' || lower === 'ga' || lower === 'gak' || lower === 'gitu deh' || lower === 'biasa aja' || lower === 'entahlah')
  ) {
    return 'Santai saja ya, gak perlu buru-buru. Kalau ada hal yang mengganjal di pikiranmu, ceritain pelan-pelan ke Buddy ya.';
  }

  // 10. TOPIK EMOSIONAL / SPESIFIK KEJADIAN (RESPON LANGSUNG TANPA MENGULANG KALIMAT SISWA)
  if (lower.includes('pukul') || lower.includes('dorong') || lower.includes('jegal') || lower.includes('tendang') || lower.includes('tampar') || lower.includes('lempar')) {
    return 'Perlakuan fisik kasar seperti itu pasti bikin badan sakit dan kaget banget di hati. Kamu tidak pantas diperlakukan seperti itu. Apakah saat kejadian tersebut ada teman lain atau guru yang melihat?';
  }

  if (lower.includes('palak') || lower.includes('dipalak') || (lower.includes('uang') && lower.includes('paksa')) || lower.includes('minta uang')) {
    return 'Pasti bikin kesal dan was-was banget ya kalau uang saku yang sudah disiapkan malah diminta paksa. Kamu sama sekali tidak salah. Apakah orang yang meminta uang itu teman sekelasmu atau kakak kelas?';
  }

  if (lower.includes('diejek') || lower.includes('nama orang tua') || lower.includes('dikatain') || lower.includes('dihina') || lower.includes('panggil nama jelek') || lower.includes('body shaming') || lower.includes('jelek')) {
    return 'Pasti nyesek banget mendengar kata-kata ejekan seperti itu. Ingat ya, omongan mereka tidak mendefinisikan dirimu yang berharga. Ejekan itu biasanya mereka lontarkan pas jam pelajaran atau pas istirahat?';
  }

  if (lower.includes('dikucilkan') || lower.includes('dijauhi') || lower.includes('sendirian') || lower.includes('ga ada teman') || lower.includes('gak ada teman') || lower.includes('kesepian')) {
    return 'Rasanya pasti berat dan sepi banget ya saat merasa dijauhi di lingkungan sendiri. Buddy ada di sini untuk menemanimu. Menurutmu apa yang membuat suasana pertemanan jadi seperti itu?';
  }

  if (lower.includes('foto') || lower.includes('whatsapp') || lower.includes('grup wa') || lower.includes('stiker') || lower.includes('tiktok') || lower.includes('status')) {
    return 'Pasti bikin malu dan kepikiran terus ya kalau foto atau obrolan dijadikan bahan lelucon di grup tanpa izinmu. Kejadian itu sudah berlangsung berapa lama?';
  }

  if (lower.includes('marah') || lower.includes('kesal') || lower.includes('emosi') || lower.includes('jengkel')) {
    return 'Wajar banget kamu merasa kesal dan marah setelah menghadapi hal itu. Tarik napas dalam-dalam sejenak ya. Apa hal yang paling membuatmu merasa jengkel dari kejadian tadi?';
  }

  if (lower.includes('takut') || lower.includes('cemas') || lower.includes('takut masuk') || lower.includes('gamau sekolah') || lower.includes('gak mau sekolah') || lower.includes('gelisah')) {
    return 'Pasti bikin hati tidak tenang ya sampai merasa cemas mau ke sekolah. Ingat, ada Guru BK dan madrasah yang siap melindungimu. Apa kekhawatiran terbesar yang kamu rasakan saat ini?';
  }

  if (lower.includes('nangis') || lower.includes('menangis') || lower.includes('sedih') || lower.includes('hancur') || lower.includes('sakit hati')) {
    return 'Kalau ingin menangis, tumpahkan saja dulu ya sampai hatimu terasa lebih lega. Buddy ada di sini mendengarkanmu. Ceritakan pelan-pelan apa yang paling membuatmu sedih?';
  }

  // 11. RESPON DINAMIS SEPERTI TEMAN BAIK (TANPA MENGUTIP KATA-KATA USER)
  if (subjects.length > 0) {
    return 'Hal kayak gitu emang bikin kepikiran dan gak nyaman banget. Boleh ceritain lebih lanjut gimana awal mulanya bisa terjadi?';
  }

  const peerFriendlyReplies = [
    'Aku paham banget perasaanmu. Hal itu emang bikin gak tenang di hati ya. Ada hal lain yang masih mengganjal di pikiranmu?',
    'Bisa ngerti banget kenapa kamu ngerasa begitu. Gimana respon orang-orang di sekitarmu pas hal itu terjadi?',
    'Terima kasih ya sudah mau berbagi ke Buddy. Apa yang paling kamu harapkan bisa berubah dari keadaan ini?',
    'Pasti gak gampang ya ngadepin situasi kayak gitu sendirian. Ceritain aja pelan-pelan, aku siap dengerin.'
  ];

  return peerFriendlyReplies[turnCount % peerFriendlyReplies.length];
}



