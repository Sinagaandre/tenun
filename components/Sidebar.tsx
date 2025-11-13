
import React from 'react';
import type { ViewType } from '../App';
import { DashboardIcon, ProductIcon, OrderIcon, UserIcon } from './icons/Icons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'products', label: 'Produk', icon: ProductIcon },
    { id: 'orders', label: 'Pesanan', icon: OrderIcon },
    { id: 'users', label: 'Pelanggan', icon: UserIcon },
  ];

  const NavLink: React.FC<{
    id: ViewType;
    label: string;
    icon: React.ElementType;
  }> = ({ id, label, icon: Icon }) => {
    const isActive = activeView === id;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveView(id);
        }}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-red-800 text-white'
            : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        <span className="truncate">{label}</span>
      </a>
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-slate-800 text-white flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-slate-700">
        <h1 className="text-lg font-bold text-center leading-tight">
          Tenun
          <span className="block text-sm font-normal text-slate-300">Tapanuli Utara</span>
        </h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink key={item.id} id={item.id as ViewType} label={item.label} icon={item.icon} />
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400 text-center">© 2024 Dinas Perindustrian & Perdagangan</p>
      </div>
    </aside>
  );
};

export default Sidebar;
