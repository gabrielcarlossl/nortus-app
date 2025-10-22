import { getMapData } from '../services/map.service';

describe('map.service', () => {
  it('should fetch map data', async () => {
    const data = await getMapData();
    expect(data).toHaveProperty('locations');
    expect(Array.isArray(data.locations)).toBe(true);
    expect(data.locations.length).toBeGreaterThan(0);
  });
});
