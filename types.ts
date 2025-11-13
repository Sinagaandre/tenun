
export interface Admin {
  AdminID: number;
  Nama: string;
  Email: string;
  NoTelepon: string;
  Alamat: string;
  Username: string;
}

export interface User {
  UserID: number;
  Nama: string;
  Email: string;
  NoTelepon: string;
  Alamat: string;
  TanggalDaftar: string;
  Username: string;
}

export interface Product {
  ProdukID: number;
  NamaProduk: string;
  Deskripsi: string;
  Harga: number;
  KategoriID: number;
  SupplierID: number;
  Stok: number;
  GambarProduk: string;
}

export interface Category {
  KategoriID: number;
  NamaKategori: string;
  DeskripsiKategori: string;
}

export interface Supplier {
  SupplierID: number;
  NamaSupplier: string;
  AlamatSupplier: string;
  NoTeleponSupplier: string;
  EmailSupplier: string;
}

export interface Order {
  OrderID: number;
  UserID: number;
  TanggalOrder: string;
  StatusOrder: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  TotalHarga: number;
  NamaPelanggan?: string;
}

export interface OrderDetail {
  DetailID: number;
  OrderID: number;
  ProdukID: number;
  Jumlah: number;
  HargaSatuan: number;
  Subtotal: number;
}
