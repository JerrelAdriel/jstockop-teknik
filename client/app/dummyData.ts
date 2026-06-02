// Data dummy untuk demo/preview portofolio
// Dipakai sebagai fallback kalau backend API tidak tersedia

const today = new Date();
const day = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d;
};

export const DUMMY_LOANS = [
  {
    id: 1, users: { username: 'budi.santoso' },
    items: { name: 'Bor Listrik Bosch GBM 320', specification: '320W, Chuck 10mm', merk: 'Bosch' },
    amount: 2, amount_recent: 2, unit: 'unit', location: 'Proyek Perbaikan Dermaga A',
    return_amount: 0, status_user: true, loan_time: day(3), return_time: null, created_at: day(3),
  },
  {
    id: 2, users: { username: 'siti.rahma' },
    items: { name: 'Welding Machine Lakoni', specification: 'Inverter 120A, MMA', merk: 'Lakoni' },
    amount: 1, amount_recent: 1, unit: 'unit', location: 'Workshop Belawan',
    return_amount: 0, status_user: false, loan_time: day(5), return_time: null, created_at: day(5),
  },
  {
    id: 3, users: { username: 'dedi.kurniawan' },
    items: { name: 'Tang Kombinasi Tekiro', specification: '8 inch, Forged Steel', merk: 'Tekiro' },
    amount: 5, amount_recent: 5, unit: 'pcs', location: 'Gudang 2',
    return_amount: 5, status_user: true, loan_time: day(7), return_time: day(2), created_at: day(7),
  },
  {
    id: 4, users: { username: 'andi.wijaya' },
    items: { name: 'Kunci Pas Set', specification: '8-22mm, 14 pcs Chrome', merk: 'Stanley' },
    amount: 2, amount_recent: 2, unit: 'set', location: 'Crane Maintenance',
    return_amount: 0, status_user: true, loan_time: day(1), return_time: null, created_at: day(1),
  },
  {
    id: 5, users: { username: 'rina.fitria' },
    items: { name: 'Gerinda Tangan Maktec', specification: '4 inch, 540W', merk: 'Maktec' },
    amount: 3, amount_recent: 3, unit: 'unit', location: 'Workshop Belawan',
    return_amount: 0, status_user: false, loan_time: day(2), return_time: null, created_at: day(2),
  },
  {
    id: 6, users: { username: 'agus.pratama' },
    items: { name: 'Multimeter Sanwa', specification: 'Digital, CD800a', merk: 'Sanwa' },
    amount: 1, amount_recent: 1, unit: 'unit', location: 'Panel Listrik Dermaga B',
    return_amount: 1, status_user: true, loan_time: day(10), return_time: day(4), created_at: day(10),
  },
  {
    id: 7, users: { username: 'maya.lestari' },
    items: { name: 'Helm Safety MSA', specification: 'V-Gard Putih', merk: 'MSA' },
    amount: 8, amount_recent: 8, unit: 'pcs', location: 'Proyek Reklamasi',
    return_amount: 0, status_user: true, loan_time: day(0), return_time: null, created_at: day(0),
  },
  {
    id: 8, users: { username: 'eko.priyanto' },
    items: { name: 'Gergaji Mesin Krisbow', specification: 'Circular Saw 7", 1400W', merk: 'Krisbow' },
    amount: 1, amount_recent: 1, unit: 'unit', location: 'Workshop Kayu',
    return_amount: 0, status_user: true, loan_time: day(4), return_time: null, created_at: day(4),
  },
  {
    id: 9, users: { username: 'farhan.rizki' },
    items: { name: 'Obeng Set Wera', specification: '7 pcs Plus/Minus', merk: 'Wera' },
    amount: 2, amount_recent: 2, unit: 'set', location: 'Maintenance Forklift',
    return_amount: 2, status_user: true, loan_time: day(14), return_time: day(7), created_at: day(14),
  },
  {
    id: 10, users: { username: 'lia.permata' },
    items: { name: 'Compressor Mini Krisbow', specification: '1HP, 24L', merk: 'Krisbow' },
    amount: 1, amount_recent: 1, unit: 'unit', location: 'Bengkel Cat',
    return_amount: 0, status_user: false, loan_time: day(6), return_time: null, created_at: day(6),
  },
  {
    id: 11, users: { username: 'tono.saputra' },
    items: { name: 'Senter LED Energizer', specification: '5W, Anti-Air', merk: 'Energizer' },
    amount: 4, amount_recent: 4, unit: 'pcs', location: 'Patroli Malam',
    return_amount: 0, status_user: true, loan_time: day(2), return_time: null, created_at: day(2),
  },
  {
    id: 12, users: { username: 'desi.anggraini' },
    items: { name: 'Palu Konde 1kg', specification: 'Tangkai Fiberglass', merk: 'Stanley' },
    amount: 3, amount_recent: 3, unit: 'pcs', location: 'Workshop Las',
    return_amount: 0, status_user: true, loan_time: day(1), return_time: null, created_at: day(1),
  },
];

export const DUMMY_TAKEN = [
  {
    id: 1, users: { username: 'budi.santoso' },
    items: { name: 'Sarung Tangan Karet', specification: 'Nitrile Industrial', merk: 'Ansell' },
    amount: 10, amount_recent: 10, unit: 'pasang', location: 'Proyek Perbaikan Dermaga A',
    status_user: true, taken_time: day(1), created_at: day(1),
  },
  {
    id: 2, users: { username: 'siti.rahma' },
    items: { name: 'Kawat Las Esab', specification: 'E6013 2.6mm', merk: 'Esab' },
    amount: 5, amount_recent: 5, unit: 'kg', location: 'Workshop Belawan',
    status_user: false, taken_time: day(3), created_at: day(3),
  },
  {
    id: 3, users: { username: 'dedi.kurniawan' },
    items: { name: 'Cat Anti Karat Aerosol', specification: 'Hitam, 400ml', merk: 'Pylox' },
    amount: 6, amount_recent: 6, unit: 'kaleng', location: 'Bengkel Cat',
    status_user: true, taken_time: day(2), created_at: day(2),
  },
  {
    id: 4, users: { username: 'andi.wijaya' },
    items: { name: 'Mata Bor Set', specification: '1-13mm HSS', merk: 'Krisbow' },
    amount: 2, amount_recent: 2, unit: 'set', location: 'Maintenance Crane',
    status_user: true, taken_time: day(0), created_at: day(0),
  },
  {
    id: 5, users: { username: 'rina.fitria' },
    items: { name: 'Mata Gerinda', specification: '4" Cutting Disc', merk: 'Norton' },
    amount: 12, amount_recent: 12, unit: 'pcs', location: 'Workshop Belawan',
    status_user: true, taken_time: day(4), created_at: day(4),
  },
  {
    id: 6, users: { username: 'agus.pratama' },
    items: { name: 'Kabel NYY 3x2.5mm', specification: 'Tembaga, 100m', merk: 'Supreme' },
    amount: 50, amount_recent: 50, unit: 'meter', location: 'Panel Listrik Dermaga B',
    status_user: false, taken_time: day(5), created_at: day(5),
  },
  {
    id: 7, users: { username: 'maya.lestari' },
    items: { name: 'Masker N95', specification: '3M Particulate', merk: '3M' },
    amount: 20, amount_recent: 20, unit: 'pcs', location: 'Proyek Reklamasi',
    status_user: true, taken_time: day(1), created_at: day(1),
  },
  {
    id: 8, users: { username: 'eko.priyanto' },
    items: { name: 'Mur Baut M10', specification: 'Galvanized, 50mm', merk: 'Lokal' },
    amount: 100, amount_recent: 100, unit: 'pcs', location: 'Workshop Konstruksi',
    status_user: true, taken_time: day(6), created_at: day(6),
  },
  {
    id: 9, users: { username: 'farhan.rizki' },
    items: { name: 'Oli Pelumas Shell', specification: 'Helix HX7 5W-40, 4L', merk: 'Shell' },
    amount: 3, amount_recent: 3, unit: 'kaleng', location: 'Maintenance Forklift',
    status_user: true, taken_time: day(2), created_at: day(2),
  },
  {
    id: 10, users: { username: 'lia.permata' },
    items: { name: 'Lakban Hitam Daimaru', specification: '48mm x 25m', merk: 'Daimaru' },
    amount: 8, amount_recent: 8, unit: 'roll', location: 'Bengkel Cat',
    status_user: false, taken_time: day(3), created_at: day(3),
  },
  {
    id: 11, users: { username: 'tono.saputra' },
    items: { name: 'Lem Korea G', specification: 'Cyanoacrylate 20g', merk: 'G' },
    amount: 5, amount_recent: 5, unit: 'tube', location: 'Maintenance Umum',
    status_user: true, taken_time: day(1), created_at: day(1),
  },
];

export const isDummyToken = (token: string | null) =>
  token === 'dummy-admin-token-preview';
