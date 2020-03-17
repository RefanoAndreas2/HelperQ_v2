import { mocks } from "."

const categories = [
  {id: 0, checked: false, kategori:null, title: 'Pilih Kategori Pekerjaan'},
  {id: 1, checked: false, kategori:'kontrak', title: 'Assisten Rumah Tangga'},
  {id: 2, checked: false, kategori:'kontrak', title: 'Pengasuh Balita'},
  {id: 3, checked: false, kategori:'kontrak', title: 'Perawat lansia'},
  {id: 4, checked: false, kategori:'kontrak', title: 'Pengemudi'},
  {id: 5, checked: false, kategori:'kontrak', title: 'Penjaga Keamanan'},
  {id: 6, checked: false, kategori:'kasual', title: 'Assisten Rumah Tangga Harian'},
  {id: 7, checked: false, kategori:'kasual', title: 'Pengasuh Balita Harian'},
  {id: 8, checked: false, kategori:'kasual', title: 'Perawat lansia Harian'},
  {id: 9, checked: false, kategori:'kasual', title: 'Pengemudi Harian'},
  {id: 10, checked: false, kategori:'kasual', title: 'Penjaga Keamanan Harian'},
]

const form_NamaLengkap = {
  gender: [
    {id: '0', title: 'Pilih Gender'},
    {id: '1', title: 'Perempuan'},
    {id: '2', title: 'Laki - Laki'}
  ]
}

const form_KeturunanSuku = {
  keturunanSuku: [
    {id: 0, title: 'Pilih Keturunan Suku'},
    {id: 1, title: 'Jawa'},
    {id: 2, title: 'Madura'},
    {id: 3, title: 'Sunda'},
    {id: 4, title: 'Bali'},
    {id: 5, title: 'Lainnya'},
  ],
  golonganDarah: [
    {id: 0, title: 'Pilih Golongan Darah'},
    {id: 1, title: 'A'},
    {id: 2, title: 'B'},
    {id: 3, title: 'AB'},
    {id: 4, title: 'O'},
  ],
  agama: [
    {id: 0, title:'Pilih Agama'},
    {id: 1, title:'Islam'},
    {id: 2, title:'Kristen'},
    {id: 3, title:'Katolik'},
    {id: 4, title:'Hindu'},
    {id: 5, title:'Buddha'},
    {id: 6, title:'Konghuchu'},
    {id: 7, title:'Penganut Kepercayaan'},
    {id: 8, title:'Lainnya'},
  ],
  pendidikan: [
    {id: 0, title:'Pilih Pendidikan Terakhir'},
    {id: 1, title:'Tidak Bersekolah'},
    {id: 2, title:'SD / MI'},
    {id: 3, title:'SMP / MTs'},
    {id: 4, title:'SMA / SMK / MA'},
    {id: 5, title:'D3'},
    {id: 6, title:'D4 / S1'},
    {id: 7, title:'S2'},
    {id: 8, title:'S3'}
  ],
  statusPerkawinan: [
    {id: 0, title:'Pilih Status Perkawinan'},
    {id: 1, title:'Belum Kawin'},
    {id: 2, title:'Kawin'},
    {id: 3, title:'Cerai Hidup'},
    {id: 4, title:'Cerai Mati'},
  ],
  lokasiTerkini: [
    {id: 0, title:'Pilih Lokasi Terkini'},
    {id: 1, title:'[List Kota]'}
  ],
  jumlahAnak: [
    {id: 0, title:'Pilih Jumlah Anak'},
    {id: 1, title:'Belum Ada'},
    {id: 2, title:'1 Anak'},
    {id: 3, title:'2 Anak'},
    {id: 4, title:'Lebih Dari 2 Anak'},
  ]
}

const form_PengalamanKerja = {
  menginap: [
    {id: 0, title:'Silahkan Pilih'},
    {id: 1, title:'Bersedia Menginap', value: true},
    {id: 2, title:'Tidak Bersedia Menginap', value: false},
  ],
  takutAnjing: [
    {id: 0, title:'Silahkan Pilih'},
    {id: 1, title:'Takut Anjing', value: true},
    {id: 2, title:'Tidak Takut Anjing', value: false},
  ],
  luarNegeri: [
    {id: 0, title:'Silahkan Pilih'},
    {id: 1, title:'Belum Ada Pengalaman', value: false},
    {id: 2, title:'Mempunyai Pengalaman', value: true},
  ],
  bahasaInggris:[
    {id: 0, title:'Silahkan Pilih'},
    {id: 1, title:'Tidak Bisa'},
    {id: 2, title:'Sedikit'},
    {id: 3, title:'Menengah'},
    {id: 4, title:'Mahir'},
  ]
}

const form_Penempatan = {
  kota: [
    {id: 0, checked: false, title: 'Jakarta'},
    {id: 1, checked: false, title: 'Bandung'},
    {id: 2, checked: false, title: 'Semarang'},
    {id: 3, checked: false, title: 'Yogyakarta'},
    {id: 4, checked: false, title: 'Surabaya'},
    {id: 5, checked: false, title: 'Denpasar'},
    {id: 6, checked: false, title: 'Sulawesi'},
    {id: 7, checked: false, title: 'Kalimantan'},
    {id: 8, checked: false, title: 'Sumatra'},
    {id: 9, checked: false, title: 'Lainnya'},
  ]
}

const form_Keterampilan = {
  skill: [
    {id: 0, checked:false, title: 'Memasak'},
    {id: 1, checked:false, title: 'Mencuci'},
    {id: 2, checked:false, title: 'Mengendarai Motor'},
    {id: 3, checked:false, title: 'Mengemudikan Mobil'},
    {id: 4, checked:false, title: 'Membersihkan Rumah'},
    {id: 5, checked:false, title: 'Menjaga Rumah'},
    {id: 6, checked:false, title: 'Berkebun'},
    {id: 7, checked:false, title: 'Keahlian Khusus'},
    {id: 8, checked:false, title: 'Serabutan'},
    {id: 9, checked:false, title: 'Lainnya'},
  ]
}

const form_UploadFotoProfil = {
  helperPlaceholder: [
    {id: 1, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 2, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 3, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 4, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 5, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 1, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 2, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 3, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 4, uri: 'https://source.unsplash.com/featured/?person'},
    {id: 5, uri: 'https://source.unsplash.com/featured/?person'},
  ]
}

const helperList = {
  banner : [
    {id: 0, uri: 'https://source.unsplash.com/NfD89_IK3mY'},
    {id: 1, uri: 'https://source.unsplash.com/random'},
    {id: 2, uri: 'https://source.unsplash.com/random'},
  ],
  list : [
    {
      id: 1, 
      tipe:'list', 
      nama: 'Helper 1', 
      gaji: '1.000.000', 
      pekerjaan: 'pekerjaan1', 
      asal: 'asal1', 
      lokasi: 'lokasi1', 
      pendidikan: 'pendidikan1', 
      status: false, 
      statusKontrak: 'Aktif',
      rating: 1, 
      umur: 21, 
      pengalaman: 1
    },
    {
      id: 2, 
      tipe:'list',
      nama: 'Helper 2',
      gaji: '2.000.000',
      pekerjaan: 'pekerjaan2',
      asal: 'asal2',
      lokasi: 'lokasi2',
      pendidikan: 'pendidikan2',
      status: true,
      statusKontrak: 'NonAktif',
      rating: 2,
      umur: 22,
      pengalaman: 2
    },
    {
      id: 3,
      tipe:'list',
      nama: 'Helper 3',
      gaji: '3.000.000',
      pekerjaan: 'pekerjaan3',
      asal: 'asal3',
      lokasi: 'lokasi3',
      pendidikan: 'pendidikan3',
      status: false,
      statusKontrak: 'Accepted',
      rating: 3,
      umur: 23,
      pengalaman: 3
    },
    {
      id: 4,
      tipe:'ads',
      uri: 'https://source.unsplash.com/NfD89_IK3mY'
    },
    {
      id: 5,
      tipe:'list',
      nama: 'Helper 5',
      gaji: '5.000.000',
      pekerjaan: 'pekerjaan5',
      asal: 'asal5',
      lokasi: 'lokasi5',
      pendidikan: 'pendidikan5',
      status: false,
      statusKontrak: 'Waiting',
      rating: 4,
      umur: 25,
      pengalaman: 5
    },
    {
      id: 6,
      tipe:'list',
      nama: 'Helper 6',
      gaji: '6.000.000',
      pekerjaan: 'pekerjaan6',
      asal: 'asal6',
      lokasi: 'lokasi6',
      pendidikan: 'pendidikan6',
      status: false,
      statusKontrak: 'Rejected',
      rating: 5,
      umur: 26,
      pengalaman: 6
    },
  ]
}

const detailHelperMocks = {
  photo: [
    {id: 0, uri: 'https://source.unsplash.com/random'},
    {id: 1, uri: 'https://source.unsplash.com/random'},
    {id: 2, uri: 'https://source.unsplash.com/random'},
  ],
  kategori: categories[1].title,
  nama: helperList.list[1].nama,
  gaji: helperList.list[1].gaji,
  rating: 4,
  profile: {
    lokasi: helperList.list[1].lokasi,
    umur: helperList.list[1].umur,
    berat: 55,
    tinggi: 165,
    pendidikan: form_KeturunanSuku.pendidikan[4].title,
    statusPerkawinan: form_KeturunanSuku.statusPerkawinan[1].title,
    keturunanSuku: form_KeturunanSuku.keturunanSuku[1].title,
    golonganDarah: form_KeturunanSuku.golonganDarah[2].title,
    agama: form_KeturunanSuku.agama[1].title,
    agama: form_KeturunanSuku.agama[1].title,
    jumlahAnak: form_KeturunanSuku.jumlahAnak[1].title
  },
  detail: {
    pengalaman: helperList.list[1].pengalaman,
    gaji: helperList.list[1].gaji,
    biayaAdmin: '100.000',
    menginap: form_PengalamanKerja.menginap[1].value,
    takutAnjing: form_PengalamanKerja.takutAnjing[1].value,
    luarNegeri: form_PengalamanKerja.luarNegeri[2].value,
    bahasaInggris: form_PengalamanKerja.bahasaInggris[3].title,
    penempatan: [
      {id: 1, title: form_Penempatan.kota[1].title},
      {id: 2, title: form_Penempatan.kota[2].title},
      {id: 3, title: form_Penempatan.kota[3].title},
      {id: 4, title: form_Penempatan.kota[4].title},
    ]
  },
  keterampilan: [
    {id: 1, title: form_Keterampilan.skill[1].title},
    {id: 2, title: form_Keterampilan.skill[2].title},
    {id: 3, title: form_Keterampilan.skill[3].title},
  ],
  riwayatPekerjaan:[
    {id: 1, title: 'Karyawan Pabrik (2010 - 2015)'},
    {id: 2, title: 'TKI - Hong Kong (2015 - 2019)'},
    {id: 3, title: 'Assisten Rumah Tangga (2019)'},
  ],
  review: [
    {
      id: 1,
      majikan: 'Bambang',
      tanggal: new Date().toDateString(),
      rating: 4,
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem earum ducimus eligendi'
    },
    {
      id: 2,
      majikan: 'Bukan Bambang',
      tanggal: new Date().toDateString(),
      rating: 5,
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis magnam quam, maiores rerum'
    }
  ]
}

const notification = [
  {id: 1, navigate: '', uri: 'https://source.unsplash.com/random', date: new Date().toDateString(), desc: 'Notifikasi ini ada gambarnya'},
  {id: 2, navigate: 'Order', uri: '', date: new Date().toDateString(), desc: 'Notif ini bisa menuju ke halaman lain, contohnya Order'},
  {id: 3, navigate: '', uri: '', date: new Date().toDateString(), desc: 'Notif ini cuman notif biasa'},
]

export {
  categories,
  detailHelperMocks,
  form_Keterampilan,
  form_KeturunanSuku,
  form_NamaLengkap,
  form_Penempatan,
  form_PengalamanKerja,
  form_UploadFotoProfil,
  helperList,
  notification,
}