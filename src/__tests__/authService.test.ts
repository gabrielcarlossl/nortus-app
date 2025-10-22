import { authService } from '../services/auth.service';

describe('auth.service', () => {
  it('should login and return user', async () => {
    const user = await authService.login({ email: 'admin@email.com', password: 'admin' });
    expect(user.data).toHaveProperty('accessToken');
    expect(user.data).toHaveProperty('username');
  });

  it('should logout without error', () => {
    expect(() => authService.logout()).not.toThrow();
  });
});
