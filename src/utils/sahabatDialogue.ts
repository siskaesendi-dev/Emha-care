export const SAHABAT_SYSTEM_INSTRUCTION = `
Kamu adalah "Sahabat", teman digital yang sangat hangat, ramah, peduli, dan sabar untuk siswa MTs (SMP sederajat) di madrasah melalui aplikasi anti-bullying EMHA CARE.

TUGAS UTAMA:
Mendengarkan, menemani, dan merespons setiap cerita, pertanyaan, maupun curhatan siswa secara SANGAT NATURAL seperti sahabat karib di dunia nyata (bukan robot, bukan kuesioner kaku, dan bukan jawaban template).

PANDUAN GAYA BICARA & RESPON:
1. RESPON LANGSUNG KE INTI PERASAAN / TOPIK SISWA:
   - JANGAN PERNAH mengetik ulang atau mengutip kata demi kata kalimat pelapor (seperti "Tentang [jawaban siswa]" atau "Saat kamu bilang [jawaban siswa]").
   - Langsung tanggapi dan respon situasi/pertanyaannya secara alami layaknya teman dekat.
   - Contoh jika siswa bilang "saya belum makan" -> langsung jawab: "Sobat, kenapa belum makan? Apakah ada yang mengganggumu, uang jajanmu habis/diambil, atau kamu sedang tidak nafsu makan? Cerita ke aku ya."
   - Contoh jika siswa cerita uangnya dipalak -> langsung tanggapi rasa cemasnya dan tanyakan di mana kejadiannya.
2. PANGGIL DENGAN AKRAB: Gunakan sapaan akrab "Sobat" atau gaya bicara "aku/kamu" yang santai, hangat, dan menenangkan khas remaja madrasah.
3. EMPATI & VALIDASI: Selalu akui dan validasi perasaan siswa sebelum menanyakan 1 hal lanjutan yang relevan.
4. RINGKAS & NATURAL: Panjang balasan maksimal 2-3 kalimat per giliran agar mengalir santai seperti chatting dengan teman sejati.
5. JANGAN PERNAH memberikan jawaban yang kaku atau mengabaikan topik yang dibawa siswa.

ATURAN KEAMANAN KRITIS:
Jika siswa menyebut tanda ingin menyakiti diri sendiri, keputusasaan ekstrem, atau bahaya fisik langsung, segera tunjukkan kepedulian mendalam dan dorong dengan lembut untuk segera berbicara kepada Guru BK atau orang dewasa terpercaya sekarang juga.
`;

/**
 * Intelligent contextual response generator for natural conversations
 * when offline or when fallback is needed.
 */
export function generateNaturalSahabatResponse(messages: { role: string; text: string }[]): string {
  if (!messages || messages.length === 0) {
    return 'Halo Sobat! Aku Sahabat di EMHA CARE. Ada hal yang sedang kamu rasakan atau alami di madrasah? Ceritakan santai ke aku ya.';
  }

  const latestMessage = messages[messages.length - 1]?.text || '';
  const cleanText = latestMessage.trim();
  const lower = cleanText.toLowerCase();

  // 1. Safety critical triggers
  if (
    lower.includes('bunuh diri') ||
    lower.includes('akhiri hidup') ||
    lower.includes('mau mati') ||
    lower.includes('ingin mati') ||
    lower.includes('sayat tangan') ||
    lower.includes('lukai diri')
  ) {
    return 'Sobat, kakak sangat peduli padamu dan kamu sangat berharga. Tolong, ini penting sekali: bicaralah pada Guru BK (Bu Siska) atau orang dewasa terpercaya SEKARANG JUGA ya. Kamu tidak sendirian dan kami di sini siap membantumu.';
  }

  // 2. Hunger, food, skipped meals (Exact scenario requested: "saya belum makan")
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
      return 'Sobat, bekal atau makananmu diambil orang lain ya? Itu perbuatan yang tidak boleh dibiarkan. Kamu sekarang lapar tidak? Boleh cerita siapa atau di mana kejadiannya?';
    }
    return 'Sobat, kenapa kamu belum makan? Apakah ada yang mengganggumu, uang jajanmu habis/diambil, atau kamu sedang tidak nafsu makan? Ceritakan ke aku ya.';
  }

  // 3. Extortion / Money taken / Malak
  if (
    lower.includes('uang') ||
    lower.includes('palak') ||
    lower.includes('dipalak') ||
    lower.includes('minta paksa') ||
    lower.includes('duit') ||
    lower.includes('jajan')
  ) {
    return 'Sobat, uang jajanmu diminta paksa sama orang lain di madrasah ya? Pasti bikin kaget dan bingung banget... Di bagian mana kejadiannya, apakah dekat lorong atau kantin?';
  }

  // 4. Verbal abuse / Teasing / Mocking / Nicknames
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
    lower.includes('kurus')
  ) {
    return 'Sobat, dipanggil sebutan jelek atau diejek terus-menerus itu pasti bikin sakit hati dan risih. Sudah seringkah mereka mengejekmu seperti itu di kelas?';
  }

  // 5. Cyberbullying / Photos leaked / WhatsApp group / Social media
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
    return 'Sobat, hal seperti menyebarkan foto atau stiker tanpa izin itu keterlaluan dan bikin malu banget. Apakah fotonya masih terus disebarkan di grup sampai sekarang?';
  }

  // 6. Physical bullying / Pushing / Hitting / Tripping
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
    return 'Sobat! Kamu tidak apa-apa kan? Apakah ada bagian tubuhmu yang luka atau sakit? Perlakuan fisik kasar seperti itu sama sekali tidak dibenarkan. Kamu merasa aman sekarang?';
  }

  // 7. Social exclusion / Loneliness / Shunned
  if (
    lower.includes('dikucilkan') ||
    lower.includes('dijauhi') ||
    lower.includes('sendirian') ||
    lower.includes('tidak ada teman') ||
    lower.includes('gak ada teman') ||
    lower.includes('ditinggal') ||
    lower.includes('dihindari')
  ) {
    return 'Sobat, merasa sendirian dan dijauhi satu kelas itu berat banget rasanya di hati. Ingat ya, kamu berharga dan tidak ada yang salah dengan dirimu. Menurutmu, apa yang bikin mereka mulai menjauhimu?';
  }

  // 8. Fear / Skipping school / Dread
  if (
    lower.includes('takut') ||
    lower.includes('takut masuk') ||
    lower.includes('gamau sekolah') ||
    lower.includes('enggan sekolah') ||
    lower.includes('gemetar') ||
    lower.includes('cemas') ||
    lower.includes('was-was')
  ) {
    return 'Sobat, wajar sekali merasa cemas atau takut kalau ada hal yang bikin kamu tidak nyaman di madrasah. Apa yang paling bikin kamu takut saat mau berangkat ke sekolah?';
  }

  // 9. Sadness / Crying / Emotional distress
  if (
    lower.includes('sedih') ||
    lower.includes('nangis') ||
    lower.includes('menangis') ||
    lower.includes('hancur') ||
    lower.includes('kecewa') ||
    lower.includes('capek') ||
    lower.includes('lelah')
  ) {
    return 'Sobat, kalau kamu lagi sedih atau ingin menangis, tumpahkan saja dulu ya... Jangan disimpan sendiri. Ada kejadian apa yang bikin hatimu seberat ini hari ini?';
  }

  // 10. Questions about who Sahabat is or privacy
  if (
    lower.includes('siapa kamu') ||
    lower.includes('kamu siapa') ||
    lower.includes('apakah aman') ||
    lower.includes('rahasia') ||
    lower.includes('bisa apa')
  ) {
    return 'Aku Sahabat, teman digitalmu di EMHA CARE. Di sini ruang aman dan rahasia buatmu bercerita tanpa takut dimarahi atau dihakimi. Ada uneg-uneg yang mau kamu ceritakan ke aku, Sobat?';
  }

  // 11. Greetings & Salutations
  if (
    lower === 'halo' ||
    lower === 'hai' ||
    lower === 'haii' ||
    lower === 'assalamualaikum' ||
    lower === 'assalamu\'alaikum' ||
    lower === 'p' ||
    lower === 'tes' ||
    lower === 'pagi' ||
    lower === 'siang' ||
    lower === 'sore' ||
    lower === 'malam'
  ) {
    if (lower.includes('assalam')) {
      return 'Waalaikumsalam Sobat! Senang kamu menyapa ke sini. Bagaimana harimu di madrasah hari ini? Ada cerita atau uneg-uneg yang ingin kamu bagi ke aku?';
    }
    return 'Halo Sobat! Ada yang sedang mengganjal di pikiran atau perasaanmu hari ini? Ceritakan saja dengan santai, aku siap mendengarkan.';
  }

  // 12. Short answers or hesitant inputs
  if (cleanText.length <= 15) {
    if (lower.includes('iya') || lower.includes('ya') || lower.includes('bener') || lower.includes('betul')) {
      return 'Aku paham, Sobat. Pasti rasanya campur aduk ya... Boleh kamu ceritakan sedikit lagi bagaimana awalnya hal itu bisa terjadi?';
    }
    if (lower.includes('tidak') || lower.includes('gak') || lower.includes('enggak') || lower.includes('belum')) {
      return 'Baiklah Sobat, tidak apa-apa kalau belum siap cerita detail. Aku selalu ada di sini buat nemenin kamu. Apa yang sekarang kamu rasakan?';
    }
    return 'Aku mendengarkanmu dengan baik, Sobat. Boleh ceritakan pelan-pelan apa yang sebenarnya terjadi atau apa yang kamu rasakan?';
  }

  // 13. General / Natural conversational response without echoing text
  return 'Aku paham, Sobat. Hal itu pasti cukup mengganggu pikiran dan perasaanmu ya... Boleh ceritakan lebih lanjut sejak kapan kamu merasakan situasi ini?';
}
