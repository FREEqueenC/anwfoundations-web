import { describe, it, expect, vi } from 'vitest';
import { dataService } from './dataService';

describe('DataService', () => {
  describe('getEcoMetrics', () => {
    it('should return metrics with correct structure', async () => {
      const metrics = await dataService.getEcoMetrics();

      expect(metrics).toHaveProperty('waterSaved');
      expect(metrics).toHaveProperty('carbonOffset');
      expect(metrics).toHaveProperty('dailyHarvest');
      expect(metrics).toHaveProperty('growthRate');
      expect(metrics).toHaveProperty('lastUpdated');

      const expectedProps = ['value', 'unit', 'change', 'history'];
      expectedProps.forEach(prop => {
        expect(metrics.waterSaved).toHaveProperty(prop);
        expect(metrics.carbonOffset).toHaveProperty(prop);
        expect(metrics.dailyHarvest).toHaveProperty(prop);
        expect(metrics.growthRate).toHaveProperty(prop);
      });
    });

    it('should have values within ±5% of base metrics', async () => {
      // Mock Math.random to return 0.5 (no variation)
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

      const metrics = await dataService.getEcoMetrics();

      // With Math.random() = 0.5, variation = (0.5 - 0.5) * 0.1 = 0
      // So values should match base metrics exactly
      expect(metrics.waterSaved.value).toBe(12500);
      expect(metrics.carbonOffset.value).toBe(2840);
      expect(metrics.dailyHarvest.value).toBe(847);
      expect(metrics.growthRate.value).toBe(3.2);

      randomSpy.mockRestore();
    });

    it('should reflect variations correctly', async () => {
      // Mock Math.random to return 1.0 (max variation +5%)
      // variation = (1.0 - 0.5) * 0.1 = +0.05
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(1.0);

      const metrics = await dataService.getEcoMetrics();

      expect(metrics.waterSaved.value).toBe(Math.round(12500 * 1.05));
      expect(metrics.carbonOffset.value).toBe(Math.round(2840 * 1.05));

      randomSpy.mockRestore();
    });

    it('should reflect negative variations correctly', async () => {
      // Mock Math.random to return 0.0 (min variation -5%)
      // variation = (0.0 - 0.5) * 0.1 = -0.05
      const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.0);

      const metrics = await dataService.getEcoMetrics();

      expect(metrics.waterSaved.value).toBe(Math.round(12500 * 0.95));
      expect(metrics.carbonOffset.value).toBe(Math.round(2840 * 0.95));

      randomSpy.mockRestore();
    });
  });

  describe('getProductAvailability', () => {
    it('should return correct status for an existing product with high stock', async () => {
      const result = await dataService.getProductAvailability('home-kit-starter');

      expect(result).toEqual({
        inStock: true,
        stockLevel: 45,
        estimatedRestock: undefined,
      });
    });

    it('should return correct status for a non-existent product', async () => {
      const result = await dataService.getProductAvailability('non-existent-id');

      expect(result).toEqual({
        inStock: false,
        stockLevel: 0,
        estimatedRestock: '3-5 days',
      });
    });

    it('should return inStock: true for products with stock > 10', async () => {
      // home-kit-pro has stock 23
      const result = await dataService.getProductAvailability('home-kit-pro');
      expect(result.inStock).toBe(true);
    });
  });
});
