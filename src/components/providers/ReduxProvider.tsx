'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

/**
 * @description Provider Redux para a aplicação
 * Wrapper para usar Redux em Client Components
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
