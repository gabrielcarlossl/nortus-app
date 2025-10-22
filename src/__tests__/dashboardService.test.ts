import { getDashboardData } from '../services/dashboard.service';

describe('dashboard.service', () => {
  it('should fetch dashboard data', async () => {
    const data = await getDashboardData();
    expect(data).toHaveProperty('kpisResume');
    expect(data).toHaveProperty('kpisTrend');
    expect(data).toHaveProperty('segments');
    expect(data).toHaveProperty('activeClients');
    expect(typeof data.kpisResume).toBe('object');
    expect(typeof data.kpisTrend).toBe('object');
    expect(Array.isArray(data.segments)).toBe(true);
    expect(typeof data.activeClients).toBe('object');
    expect(Array.isArray(data.activeClients.data)).toBe(true);
  });
});
