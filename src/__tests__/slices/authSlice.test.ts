import authReducer, { setUser, logout, setLoading } from '../../store/slices/authSlice';
import type { User } from '@/types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };

  it('should handle setUser', () => {
    const user: User = { username: 'admin', email: 'admin@email.com' };
    const state = authReducer(initialState, setUser(user));
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('should handle logout', () => {
    const prevState = {
      user: { username: 'admin', email: 'admin@email.com' },
      isAuthenticated: true,
      isLoading: false,
    };
    const state = authReducer(prevState, logout());
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('should handle setLoading', () => {
    const state = authReducer(initialState, setLoading(true));
    expect(state.isLoading).toBe(true);
    const state2 = authReducer(state, setLoading(false));
    expect(state2.isLoading).toBe(false);
  });
});
