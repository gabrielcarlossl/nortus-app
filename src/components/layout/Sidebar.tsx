'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Ticket,
  Users,
  Calculator,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';

/**
 * @description Item de menu da sidebar
 */
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
}

/**
 * @description Componente Sidebar
 * Menu lateral fixo com navegação
 */
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      href: ROUTES.DASHBOARD,
    },
    {
      icon: <Ticket size={20} />,
      label: 'Tickets',
      href: ROUTES.TICKETS,
    },
    {
      icon: <Users size={20} />,
      label: 'Clientes 360°',
      href: ROUTES.CLIENT_360,
    },
    {
      icon: <Calculator size={20} />,
      label: 'Simulador',
      href: ROUTES.SIMULATOR,
    },
  ];

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    toast.success('Logout realizado com sucesso!');
    router.push(ROUTES.LOGIN);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a2332] rounded-lg text-white"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-[#1a2332] border-r border-gray-800 z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-500" size={32} />
              <h1 className="text-2xl font-bold text-white">Nortus</h1>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:bg-[#0f1629] hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-800 space-y-2">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[#0f1629] hover:text-white transition-all duration-200 w-full">
              <Settings size={20} />
              <span className="font-medium">Configurações</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-200 w-full"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
