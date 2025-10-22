'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/slices/authSlice';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/constants';

/**
 * @description Layout do Dashboard
 * Template base com sidebar e header fixos
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verifica autenticação e carrega dados do usuário
    if (!authService.isAuthenticated()) {
      router.push(ROUTES.LOGIN);
      return;
    }

    const user = authService.getUser();
    if (user) {
      dispatch(setUser(user));
    }
  }, [router, dispatch]);

  return (
    <div className="min-h-screen bg-[#0f1629]">
      <Sidebar />
      <Header />
      <main className="lg:ml-64 pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
