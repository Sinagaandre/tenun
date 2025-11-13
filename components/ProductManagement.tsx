
import React, { useState, useCallback } from 'react';
import type { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import Modal from './common/Modal';
import Button from './common/Button';
import { EditIcon, DeleteIcon, SparkleIcon } from './icons/Icons';

const mockProducts: Product[] = [
  { ProdukID: 1, NamaProduk: 'Ulos Ragi Hotang', Deskripsi: 'Tenun khas Batak dengan motif rotan.', Harga: 750000, KategoriID: 1, SupplierID: 1, Stok: 50, GambarProduk: 'https://picsum.photos/seed/ulos1/200' },
  { ProdukID: 2, NamaProduk: 'Ulos Sadum Angkola', Deskripsi: 'Memiliki warna cerah dan motif meriah.', Harga: 950000, KategoriID: 2, SupplierID: 2, Stok: 35, GambarProduk: 'https://picsum.photos/seed/ulos2/200' },
  { ProdukID: 3, NamaProduk: 'Ulos Bolean', Deskripsi: 'Diberikan sebagai hadiah kepada pasangan pengantin.', Harga: 1200000, KategoriID: 1, SupplierID: 1, Stok: 20, GambarProduk: 'https://picsum.photos/seed/ulos3/200' },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.ProdukID === product.ProdukID ? product : p));
    } else {
      setProducts([...products, { ...product, ProdukID: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (productId: number) => {
    if(window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        setProducts(products.filter(p => p.ProdukID !== productId));
    }
  };

  const ProductForm: React.FC<{ product: Product | null; onSave: (product: Product) => void; onClose: () => void; }> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState<Omit<Product, 'ProdukID'>>({
      NamaProduk: product?.NamaProduk || '',
      Deskripsi: product?.Deskripsi || '',
      Harga: product?.Harga || 0,
      KategoriID: product?.KategoriID || 1,
      SupplierID: product?.SupplierID || 1,
      Stok: product?.Stok || 0,
      GambarProduk: product?.GambarProduk || 'https://picsum.photos/seed/new/200',
    });

    const handleGenerateDescription = useCallback(async () => {
        if (!formData.NamaProduk) {
            alert('Silakan masukkan Nama Produk terlebih dahulu.');
            return;
        }
        setIsLoadingDescription(true);
        try {
            const description = await generateProductDescription(formData.NamaProduk);
            setFormData(prev => ({ ...prev, Deskripsi: description }));
        } catch (error) {
            console.error("Failed to generate description:", error);
            alert('Gagal membuat deskripsi. Silakan coba lagi.');
        } finally {
            setIsLoadingDescription(false);
        }
    }, [formData.NamaProduk]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...formData, ProdukID: product?.ProdukID || 0 });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="NamaProduk" className="block text-sm font-medium text-slate-700">Nama Produk</label>
          <input type="text" name="NamaProduk" value={formData.NamaProduk} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
        </div>
        <div>
          <label htmlFor="Deskripsi" className="block text-sm font-medium text-slate-700">Deskripsi</label>
           <div className="relative">
            <textarea name="Deskripsi" value={formData.Deskripsi} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
            <Button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isLoadingDescription}
                className="absolute bottom-2 right-2 !p-2 text-xs"
                variant="secondary"
            >
                <SparkleIcon className="w-4 h-4 mr-1"/>
                {isLoadingDescription ? 'Membuat...' : 'Buat dengan AI'}
            </Button>
           </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="Harga" className="block text-sm font-medium text-slate-700">Harga (Rp)</label>
              <input type="number" name="Harga" value={formData.Harga} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="Stok" className="block text-sm font-medium text-slate-700">Stok</label>
              <input type="number" name="Stok" value={formData.Stok} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" required />
            </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
          <Button type="submit" variant="primary">Simpan</Button>
        </div>
      </form>
    );
  };


  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Manajemen Produk</h2>
            <Button onClick={() => openModal()} variant="primary">Tambah Produk Baru</Button>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Gambar</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama Produk</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Harga</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stok</th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {products.map((product) => (
                        <tr key={product.ProdukID}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={product.GambarProduk} alt={product.NamaProduk} className="w-12 h-12 rounded-md object-cover"/>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{product.NamaProduk}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-slate-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.Harga)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-slate-700">{product.Stok}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button onClick={() => openModal(product)} className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"><EditIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDelete(product.ProdukID)} className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"><DeleteIcon className="w-5 h-5"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isModalOpen && (
            <Modal title={editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'} onClose={closeModal}>
                <ProductForm product={editingProduct} onSave={handleSave} onClose={closeModal} />
            </Modal>
        )}
    </div>
  );
};

export default ProductManagement;
