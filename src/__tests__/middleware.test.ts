import { NextRequest } from 'next/server';
import { middleware } from '../middleware';

describe('middleware', () => {
  it('should redirect to login when no auth cookie', () => {
    const req = new NextRequest('http://localhost/dashboard');
    const res = middleware(req);
    expect(res).toBeDefined();
    expect(res.status).toBe(307);
    expect(res.headers.get('location')).toContain('/login?redirect=%2Fdashboard');
  });
});
