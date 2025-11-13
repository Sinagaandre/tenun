
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'Mei', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const categoryData = [
    { name: 'Ulos Ragi Hotang', stock: 120 },
    { name: 'Ulos Sadum', stock: 98 },
    { name: 'Ulos Bolean', stock: 86 },
    { name: 'Ulos Mangiring', stock: 139 },
    { name: 'Ulos Ragi Idup', stock: 148 },
];

const StatCard: React.FC<{ title: string; value: string; subtext: string }> = ({ title, value, subtext }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
);


const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Penjualan" value="Rp 125.6M" subtext="+20.1% dari bulan lalu"/>
        <StatCard title="Total Pesanan" value="3,250" subtext="+15.5% dari bulan lalu"/>
        <StatCard title="Pelanggan Baru" value="1,102" subtext="+5.2% dari bulan lalu"/>
        <StatCard title="Produk Terjual" value="7,890" subtext="Dalam 30 hari terakhir"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Grafik Penjualan (6 Bulan Terakhir)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#be123c" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Stok Produk per Kategori</h3>
             <ResponsiveContainer width="100%" height={300}>
                 <BarChart data={categoryData} layout="vertical">
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis type="number" />
                     <YAxis type="category" dataKey="name" width={110} fontSize={12} />
                     <Tooltip />
                     <Bar dataKey="stock" fill="#9f1239" />
                 </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
