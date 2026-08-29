export const SAHABAT_SYSTEM_INSTRUCTION = `
Kamu adalah "Buddy", seorang teman dekat yang hangat, sangat empati, pendengar yang baik, dan adaptif saat berbincang dengan siswa di sekolah (MTs Matholi'ul Huda Troso). Tugas utamamu adalah menjadi tempat curhat dan ruang aman bagi siswa.

ATURAN UTAMA BERPERILAKU:

1. GAYA BAHASA & TONE:
   - Gunakan bahasa Indonesia yang santai, ramah, dan alami seperti teman seumuran yang peduli (selalu gunakan kata "Aku" dan "Kamu").
   - Hindari gaya bahasa yang kaku, terlalu formal, klise, atau seperti robot/Customer Service.
   - JANGAN langsung memberikan penilaian, analisis perundungan/bullying, atau solusi di awal sebelum diminta. Jangan sok tahu atau menginterogasi siswa.

2. ADAPTASI EMOSI (EMPATHY MATCHING):
   - SEDIH / TRAUMA / CEMAS (misal: diejek, dipukul, dipalak, dikucilkan, takut masuk sekolah):
     Berikan empati mendalam, validasi perasaannya terlebih dahulu, dan tunjukkan bahwa kamu ada di sisinya (contoh: "Aku paham banget perasaanmu...", "Pasti berat banget ya berada di posisi itu... Kamu hebat sudah kuat sampai sekarang").
   - POSITIF / SEHAT / GEMBIRA (misal: dapat nilai bagus, menang lomba, hari menyenangkan, dapat teman baru):
     Tunjukkan rasa senang yang tulus dan ikut bersemangat bersama mereka (contoh: "Wah, keren banget! Ikut senang dengarnya! Gimana ceritanya tuh?").
   - MENYAPA / KABAR SANTAI (misal: "Halo", "Hai", "Apa kabar", "Lagi ngapain"):
     Jawab sapaan dengan hangat, ramah, dan tanyakan kabarnya atau apa yang ingin dia bagikan hari ini.

3. ALUR PERCAKAPAN (NARRATIVE FLOW):
   - Jangan pernah mengetik ulang atau mengutip kata demi kata kalimat siswa secara kaku.
   - Alih-alih langsung menganalisis, ajukan pertanyaan reflektif yang lembut satu per satu untuk mendengarkan cerita lengkapnya secara mengalir.
   - Berikan ruang seluas-luasnya agar siswa meluapkan perasaannya terlebih dahulu sampai dia merasa lega.
   - Buat jawaban ringkas, hangat, dan alami (2-3 kalimat per pesan) agar terasa seperti chat nyata antar-sahabat.

4. BATASAN & PENUTUP CERITA:
   - Jika siswa sudah selesai bercerita, merasa lebih lega, atau meminta saran/analisis/bantuan:
     Berikan tanggapan yang menenangkan dan menguatkan hati, lalu tanyakan dengan lembut apakah dia ingin cerita ini diteruskan ke Guru BK (Bu Siska) agar mendapat perlindungan dan bantuan nyata di sekolah.

5. KEAMANAN KRITIS:
   - Jika siswa menunjukkan tanda ingin menyakiti diri sendiri, keputusasaan ekstrem, atau bahaya fisik darurat, tanggapi dengan kasih sayang mendalam dan dorong dengan lembut untuk segera berbicara langsung kepada Guru BK atau orang dewasa terpercaya saat ini juga.
`;

/**
 * Intelligent contextual response generator adhering to Buddy's 4 core rules
 * for offline, error fallback, or immediate natural response.
 */
export function generateNaturalSahabatResponse(messages: { role: string; text: string }[]): string {
  if (!messages || messages.length === 0) {
    return 'Hai! Aku Buddy, teman dekatmu di sini. Ruang ini aman dan rahasia buat kamu bercerita apa pun. Ada hal yang ingin kamu bagi atau ceritakan hari ini?';
  }

  const latestMessage = messages[messages.length - 1]?.text || '';
  const cleanText = latestMessage.trim();
  const lower = cleanText.toLowerCase();

  // Count user turns to gauge narrative flow
  const userTurnCount = messages.filter(m => m.role === 'user').length;

  // 1. SAFETY CRITICAL TRIGGERS
  if (
    lower.includes('bunuh diri') ||
    lower.includes('akhiri hidup') ||
    lower.includes('mau mati') ||
    lower.includes('ingin mati') ||
    lower.includes('sayat tangan') ||
    lower.includes('lukai diri')
  ) {
    return 'Aku sangat peduli sama kamu dan kamu itu berharga banget. Tolong, ini penting sekali: bicaralah ke Guru BK (Bu Siska) atau orang dewasa terpercaya sekarang juga ya. Kamu tidak sendirian, dan ada banyak orang yang sayang dan siap membantumu.';
  }

  // 2. CLOSURE / ASKING FOR ADVICE / RESOLUTION
  // Rule 4: Jika siswa sudah selesai bercerita atau meminta saran/bantuan
  if (
    lower.includes('harus gimana') ||
    lower.includes('harus bagaimana') ||
    lower.includes('minta saran') ||
    lower.includes('kasih saran') ||
    lower.includes('solusi') ||
    lower.includes('tolong aku') ||
    lower.includes('bisa bantu') ||
    lower.includes('udah selesai cerita') ||
    lower.includes('sudah lega') ||
    lower.includes('makasih ya') ||
    lower.includes('terima kasih ya')
  ) {
    if (lower.includes('makasih') || lower.includes('terima kasih') || lower.includes('sudah lega')) {
      return 'Sama-sama! Aku senang banget kalau kamu merasa sedikit lebih lega setelah cerita. Kalau nanti kamu butuh teman ngobrol lagi, aku selalu ada di sini. Mau ceritamu ini dibantu teruskan ke Guru BK supaya ada pendampingan langsung di sekolah?';
    }
    return 'Kamu sudah hebat banget mau bertahan dan berani cerita ini ke aku. Untuk langkah terbaiknya, mau nggak kalau ceritamu ini kita teruskan ke Guru BK (Bu Siska) secara aman, supaya kamu dapat bantuan dan perlindungan nyata di sekolah?';
  }

  // 3. POSITIVE / HEALTHY EMOTIONS (Rule 2)
  if (
    lower.includes('senang') ||
    lower.includes('bahagia') ||
    lower.includes('kabar baik') ||
    lower.includes('alhamdulillah') ||
    lower.includes('menang') ||
    lower.includes('juara') ||
    lower.includes('dapat nilai') ||
    lower.includes('seru banget') ||
    lower.includes('asyik') ||
    lower.includes('happy') ||
    lower.includes('dapet temen') ||
    lower.includes('punya teman baru')
  ) {
    return 'Wah, keren banget! Aku ikut senang dan bersemangat dengarnya! Ceritain dong, hal apa yang paling bikin harimu jadi seseru itu?';
  }

  // 4. GREETINGS & INTRODUCTIONS (Rule 2 & 1)
  if (
    lower === 'halo' ||
    lower === 'hai' ||
    lower === 'haii' ||
    lower === 'hei' ||
    lower === 'halo buddy' ||
    lower === 'hai buddy' ||
    lower === 'assalamualaikum' ||
    lower === 'assalamu\'alaikum' ||
    lower === 'p' ||
    lower === 'tes' ||
    lower === 'pagi' ||
    lower === 'siang' ||
    lower === 'sore' ||
    lower === 'malam' ||
    lower === 'kabar baik' ||
    lower === 'baik'
  ) {
    if (lower.includes('assalam')) {
      return 'Waalaikumsalam! Senang banget kamu mampir ke sini. Gimana harimu di madrasah hari ini? Ada yang ingin kamu bagi atau ceritakan ke aku?';
    }
    if (lower === 'kabar baik' || lower === 'baik') {
      return 'Syukurlah kalau kabarmu baik! Aku senang mendengarnya. Ada cerita seru atau hal menarik apa yang lagi kamu alami hari ini?';
    }
    return 'Hai juga! Aku Buddy, senang bisa ngobrol sama kamu. Gimana kabarmu hari ini? Ada yang lagi kamu rasakan atau mau diceritakan santai ke aku?';
  }

  // 5. SADNESS / TRAUMA / ANXIETY / BULLYING THEMES (Rule 2 - Empathy Matching)
  // 5a. Hunger / Skipped Meals / Food taken
  if (
    lower.includes('belum makan') ||
    lower.includes('tidak makan') ||
    lower.includes('gak makan') ||
    lower.includes('ga makan') ||
    lower.includes('lapar') ||
    lower.includes('makanan diambil') ||
    lower.includes('bekal diambil')
  ) {
    if (lower.includes('diambil') || lower.includes('dibuang')) {
      return 'Pasti sedih dan kesal banget ya kalau makananmu diperlakukan seperti itu... Kamu sekarang masih lapar nggak? Mau cerita kejadiannya tadi seperti apa?';
    }
    return 'Kenapa kamu belum makan? Apakah ada hal yang mengganggumu di sekolah, uang jajanmu habis/diambil, atau kamu lagi nggak nafsu makan? Cerita ke aku ya, aku ada di sini.';
  }

  // 5b. Extortion / Malak / Money issues
  if (
    lower.includes('uang') ||
    lower.includes('palak') ||
    lower.includes('dipalak') ||
    lower.includes('minta paksa') ||
    lower.includes('duit') ||
    lower.includes('jajan')
  ) {
    return 'Pasti kaget, takut, dan bingung banget ya saat uangmu diminta paksa... Aku paham perasaanmu. Boleh ceritakan pelan-pelan di mana kejadian itu biasanya terjadi?';
  }

  // 5c. Verbal bullying / Ejekan / Body shaming / Panggilan jelek
  if (
    lower.includes('diejek') ||
    lower.includes('dipanggil') ||
    lower.includes('nama jelek') ||
    lower.includes('dikatain') ||
    lower.includes('dihina') ||
    lower.includes('diejek-ejek') ||
    lower.includes('nama orang tua') ||
    lower.includes('body shaming') ||
    lower.includes('gemuk') ||
    lower.includes('item') ||
    lower.includes('kurus') ||
    lower.includes('jelek')
  ) {
    return 'Pasti sakit dan risih banget rasanya ya kalau diejek seperti itu... Perasaanmu itu wajar banget. Apakah hal itu sering terjadi di kelas saat jam pelajaran atau pas istirahat?';
  }

  // 5d. Cyberbullying / WhatsApp / Foto disebar
  if (
    lower.includes('foto') ||
    lower.includes('whatsapp') ||
    lower.includes('grup wa') ||
    lower.includes('wa') ||
    lower.includes('status') ||
    lower.includes('tiktok') ||
    lower.includes('instagram') ||
    lower.includes('ig') ||
    lower.includes('stiker') ||
    lower.includes('diedit')
  ) {
    return 'Duh, pasti bikin malu dan nggak nyaman banget ya... Tindakan menyebarkan hal seperti itu tanpa izin memang sama sekali nggak bener. Kejadiannya baru saja atau sudah dari beberapa hari lalu?';
  }

  // 5e. Physical violence / Hitting / Pushing / Tripping
  if (
    lower.includes('pukul') ||
    lower.includes('dipukul') ||
    lower.includes('dorong') ||
    lower.includes('didorong') ||
    lower.includes('jegal') ||
    lower.includes('dijegal') ||
    lower.includes('lempar') ||
    lower.includes('tendang') ||
    lower.includes('sakit') ||
    lower.includes('luka')
  ) {
    return 'Astaga, kamu nggak apa-apa kan? Pasti takut dan kaget banget rasanya... Ada bagian tubuhmu yang sakit atau luka nggak sekarang? Kamu merasa aman di posisimu saat ini?';
  }

  // 5f. Social exclusion / Loneliness / Dikucilkan
  if (
    lower.includes('dikucilkan') ||
    lower.includes('dijauhi') ||
    lower.includes('sendirian') ||
    lower.includes('tidak ada teman') ||
    lower.includes('gak ada teman') ||
    lower.includes('ditinggal') ||
    lower.includes('dihindari')
  ) {
    return 'Aku paham banget perasaanmu... Rasanya pasti sepi dan berat banget saat merasa dijauhi teman-teman. Tapi ingat ya, kamu berharga dan tidak sendiri. Menurutmu, ada hal apa yang bikin suasananya jadi seperti itu?';
  }

  // 5g. Fear / Dread / Skipping school / Cemas
  if (
    lower.includes('takut') ||
    lower.includes('takut masuk') ||
    lower.includes('gamau sekolah') ||
    lower.includes('enggan sekolah') ||
    lower.includes('gemetar') ||
    lower.includes('cemas') ||
    lower.includes('was-was')
  ) {
    return 'Pasti berat banget ya berada di posisi itu, sampai-sampai rasanya takut buat berangkat ke sekolah... Wajar kalau kamu merasa cemas. Apa hal yang paling bikin kamu khawatir saat mau masuk ke madrasah?';
  }

  // 5h. Sadness / Crying / Emotional distress
  if (
    lower.includes('sedih') ||
    lower.includes('nangis') ||
    lower.includes('menangis') ||
    lower.includes('hancur') ||
    lower.includes('kecewa') ||
    lower.includes('capek') ||
    lower.includes('lelah')
  ) {
    return 'Kalau kamu lagi sedih atau mau menangis, tumpahkan saja ya... Nggak perlu ditahan sendiri. Aku di sini buat mendengarkanmu. Ada hal apa yang bikin hatimu seberat ini hari ini?';
  }

  // 6. SHORT AFFIRMATIONS / HESITATION
  if (cleanText.length <= 15) {
    if (lower.includes('iya') || lower.includes('ya') || lower.includes('bener') || lower.includes('betul')) {
      return 'Aku mengerti... Pasti rasanya campur aduk banget ya. Boleh kamu ceritakan pelan-pelan apa yang paling bikin kamu kepikiran saat ini?';
    }
    if (lower.includes('tidak') || lower.includes('gak') || lower.includes('enggak') || lower.includes('belum')) {
      return 'Nggak apa-apa kalau kamu belum siap cerita semuanya sekarang. Santai saja ya, aku tetap di sini menemani kamu. Apa yang lagi kamu rasakan sekarang?';
    }
  }

  // 7. MULTI-TURN REFLECTIVE PROGRESSION (Rule 3)
  if (userTurnCount >= 3) {
    return 'Aku paham banget perasaanmu dan terima kasih sudah mau berbagi cerita ini ke aku. Kamu hebat sudah kuat sampai sekarang. Masih ada hal lain yang mengganjal di hatimu yang ingin kamu luapkan?';
  }

  // 8. GENERAL EMPATHETIC LISTENER RESPONSE
  return 'Aku mendengarkanmu dengan baik. Pasti perasaan itu cukup membebani pikiranmu ya... Boleh ceritakan sedikit lagi apa yang membuatmu merasakan hal itu?';
}
