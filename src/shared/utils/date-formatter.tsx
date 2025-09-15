/**
 * Format ISO timestamp menjadi hari, tanggal bulan tahun
 * @param isoString contoh: "2025-09-15T06:07:47.631"
 * @returns string contoh: "Senin, 15 September 2025"
 */
function dateFormatter(isoString: string): string {
  const date = new Date(isoString);

  // Nama hari dan bulan dalam bahasa Indonesia
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const namaHari = hari[date.getDay()];
  const tanggal = date.getDate();
  const namaBulan = bulan[date.getMonth()];
  const tahun = date.getFullYear();

  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
}

export default dateFormatter;
