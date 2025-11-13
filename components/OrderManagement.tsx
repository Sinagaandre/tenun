
import React, { useState } from 'react';
import type { Order } from '../types';

const mockOrders: Order[] = [
  { OrderID: 101, UserID: 1, NamaPelanggan: 'Budi Santoso', TanggalOrder: '2024-07-20', StatusOrder: 'Shipped', TotalHarga: 1500000 },
  { OrderID: 102, UserID: 2, NamaPelanggan: 'Citra Lestari', TanggalOrder: '2024-07-19', StatusOrder: 'Processing', TotalHarga: 950000 },
  { OrderID: 103, UserID: 3, NamaPelanggan: 'Dewi Anggraini', TanggalOrder: '2024-07-19', StatusOrder: 'Delivered', TotalHarga: 2150000 },
  { OrderID: 104, UserID: 1, NamaPelanggan: 'Budi Santoso', TanggalOrder: '2024-07-18', StatusOrder: 'Cancelled', TotalHarga: 750000 },
  { OrderID: 105, UserID: 4, NamaPelanggan: 'Eka Wijaya', TanggalOrder: '2024-07-21', StatusOrder: 'Pending', TotalHarga: 1200000 },
];

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    const getStatusBadge = (status: Order['StatusOrder']) => {
        const baseClasses = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
        switch (status) {
            case 'Delivered':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'Shipped':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            case 'Processing':
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
            case 'Pending':
                return `${baseClasses} bg-orange-100 text-orange-800`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800`;
            default:
                return `${baseClasses} bg-slate-100 text-slate-800`;
        }
    };
    
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Manajemen Pesanan</h2>
      </div>
       <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pelanggan</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tanggal</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                    {orders.map((order) => (
                        <tr key={order.OrderID}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{order.OrderID}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{order.NamaPelanggan}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{order.TanggalOrder}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.TotalHarga)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={getStatusBadge(order.StatusOrder)}>
                                    {order.StatusOrder}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default OrderManagement;
