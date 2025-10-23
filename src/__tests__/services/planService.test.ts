import { getPlanData } from '../../services/plan.service';

describe('plan.service', () => {
  describe('getPlanData', () => {
    it('should fetch plan data successfully', async () => {
      const data = await getPlanData();

      // Verifica se os dados principais estão presentes
      expect(data).toHaveProperty('includedBenefits');
      expect(data).toHaveProperty('plansIndicators');
    });

    it('should return includedBenefits as an array', async () => {
      const data = await getPlanData();

      expect(Array.isArray(data.includedBenefits)).toBe(true);
      expect(data.includedBenefits.length).toBeGreaterThan(0);
    });

    it('should return plansIndicators as an array', async () => {
      const data = await getPlanData();

      expect(Array.isArray(data.plansIndicators)).toBe(true);
      expect(data.plansIndicators.length).toBeGreaterThan(0);
    });

    it('should have correct structure for includedBenefits', async () => {
      const data = await getPlanData();

      // Verifica se todos os benefícios são strings
      data.includedBenefits.forEach(benefit => {
        expect(typeof benefit).toBe('string');
      });
    });

    it('should have correct structure for plansIndicators', async () => {
      const data = await getPlanData();

      // Verifica se cada plano tem a estrutura correta
      data.plansIndicators.forEach(plan => {
        expect(plan).toHaveProperty('name');
        expect(plan).toHaveProperty('conversion');
        expect(plan).toHaveProperty('roi');
        expect(plan).toHaveProperty('value');

        expect(typeof plan.name).toBe('string');
        expect(typeof plan.conversion).toBe('number');
        expect(typeof plan.roi).toBe('number');
        expect(typeof plan.value).toBe('number');
      });
    });

    it('should have at least 3 plans (Básico, Intermediário, Premium)', async () => {
      const data = await getPlanData();

      expect(data.plansIndicators.length).toBeGreaterThanOrEqual(3);

      const planNames = data.plansIndicators.map(plan => plan.name);
      expect(planNames).toContain('Básico');
      expect(planNames).toContain('Intermediário');
      expect(planNames).toContain('Premium');
    });

    it('should have valid numeric values for plan indicators', async () => {
      const data = await getPlanData();

      data.plansIndicators.forEach(plan => {
        // Conversão deve ser uma porcentagem entre 0 e 100
        expect(plan.conversion).toBeGreaterThanOrEqual(0);
        expect(plan.conversion).toBeLessThanOrEqual(100);

        // ROI deve ser um número positivo
        expect(plan.roi).toBeGreaterThan(0);

        // Valor deve ser um número positivo
        expect(plan.value).toBeGreaterThan(0);
      });
    });

    it('should have expected included benefits', async () => {
      const data = await getPlanData();

      // Verifica se contém benefícios esperados
      expect(data.includedBenefits).toContain('Tudo do básico');
      expect(data.includedBenefits).toContain('Carro reserva');
      expect(data.includedBenefits).toContain('Vidros');
    });

    it('should have correct plan values', async () => {
      const data = await getPlanData();

      const basicPlan = data.plansIndicators.find(plan => plan.name === 'Básico');
      const intermediatePlan = data.plansIndicators.find(plan => plan.name === 'Intermediário');
      const premiumPlan = data.plansIndicators.find(plan => plan.name === 'Premium');

      expect(basicPlan).toBeDefined();
      expect(intermediatePlan).toBeDefined();
      expect(premiumPlan).toBeDefined();

      // Verifica valores esperados
      if (basicPlan) {
        expect(basicPlan.value).toBe(89.9);
        expect(basicPlan.conversion).toBe(75);
        expect(basicPlan.roi).toBe(80);
      }

      if (intermediatePlan) {
        expect(intermediatePlan.value).toBe(145.9);
        expect(intermediatePlan.conversion).toBe(48);
        expect(intermediatePlan.roi).toBe(114);
      }

      if (premiumPlan) {
        expect(premiumPlan.value).toBe(225.9);
        expect(premiumPlan.conversion).toBe(25);
        expect(premiumPlan.roi).toBe(176);
      }
    });
  });
});
