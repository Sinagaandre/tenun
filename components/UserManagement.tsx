
import React, { useState } from 'react';
import type { User } from '../types';

const mockUsers: User[] = [
  { UserID: 1, Nama: 'Budi Santoso', Email: 'budi.s@example.com', NoTelepon: '081234567890', Alamat: 'Jl. Merdeka No. 1, Medan', TanggalDaftar: '2023-01-15', Username: 'budisan' },
  { UserID: 2, Nama: 'Citra Lestari', Email: 'citra.l@example.com', NoTelepon: '082345678901', Alamat: 'Jl. Sudirman No. 2, Jakarta', TanggalDaftar: '2023-02-20', Username: 'citralestari' },
  { UserID: 3, Nama: 'Dewi Anggraini', Email: 'dewi.a@example.com', NoTelepon: '083456789012', Alamat: 'Jl. Pahlawan No. 3, Surabaya', TanggalDaftar: '2023-03-10', Username: 'dewianggraini' },
  { UserID: 4, Nama: 'Eka Wijaya', Email: 'eka.w@example.com', NoTelepon: '084567890123', Alamat: 'Jl. Gatot Subroto No. 4, Bandung', TanggalDaftar: '2023-04-05', Username: 'ekawijaya' },
];

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Manajemen Pelanggan</h2>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nama</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">No. Telepon</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tanggal Daftar</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {users.map((user) => (
                        <tr key={user.UserID}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-slate-900">{user.Nama}</div>
                                <div className="text-xs text-slate-500">{user.Alamat}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{user.Email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{user.NoTelepon}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{user.TanggalDaftar}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default UserManagement;
