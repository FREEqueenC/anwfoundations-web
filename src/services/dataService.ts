/**
 * ANW Foundations - Real Data Service
 * 
 * This service handles fetching real-time data for the Eco-Dashboard
 * and other dynamic content. Currently uses mock data with realistic
 * variations, but can be easily connected to real APIs.
 */

export interface EcoMetrics {
  waterSaved: {
    value: number;
    unit: string;
    change: number; // percentage change
    history: number[]; // last 24 hours
  };
  carbonOffset: {
    value: number;
    unit: string;
    change: number;
    history: number[];
  };
  dailyHarvest: {
    value: number;
    unit: string;
    change: number;
    history: number[];
  };
  growthRate: {
    value: number;
    unit: string;
    change: number;
    history: number[];
  };
  lastUpdated: string;
}

export interface SalesData {
  dailyRevenue: number;
  dailyOrders: number;
  conversionRate: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
  }[];
}

// Simulated real-time data with realistic variations
class DataService {
  private baseMetrics: EcoMetrics = {
    waterSaved: {
      value: 12500,
      unit: 'L',
      change: 23,
      history: this.generateHistory(50, 100),
    },
    carbonOffset: {
      value: 2840,
      unit: 'kg',
      change: 15,
      history: this.generateHistory(40, 80),
    },
    dailyHarvest: {
      value: 847,
      unit: 'kg',
      change: 8,
      history: this.generateHistory(60, 120),
    },
    growthRate: {
      value: 3.2,
      unit: '×',
      change: 12,
      history: this.generateHistory(2.5, 4),
    },
    lastUpdated: new Date().toISOString(),
  };

  private generateHistory(min: number, max: number): number[] {
    return Array.from({ length: 24 }, () => 
      Math.round((min + Math.random() * (max - min)) * 10) / 10
    );
  }

  // Simulate real-time metric updates
  async getEcoMetrics(): Promise<EcoMetrics> {
    // Add small random variations to simulate real-time data
    const variation = () => (Math.random() - 0.5) * 0.1; // ±5% variation
    
    return {
      waterSaved: {
        ...this.baseMetrics.waterSaved,
        value: Math.round(this.baseMetrics.waterSaved.value * (1 + variation())),
        change: Math.round(this.baseMetrics.waterSaved.change * (1 + variation())),
      },
      carbonOffset: {
        ...this.baseMetrics.carbonOffset,
        value: Math.round(this.baseMetrics.carbonOffset.value * (1 + variation())),
        change: Math.round(this.baseMetrics.carbonOffset.change * (1 + variation())),
      },
      dailyHarvest: {
        ...this.baseMetrics.dailyHarvest,
        value: Math.round(this.baseMetrics.dailyHarvest.value * (1 + variation())),
        change: Math.round(this.baseMetrics.dailyHarvest.change * (1 + variation())),
      },
      growthRate: {
        ...this.baseMetrics.growthRate,
        value: Math.round(this.baseMetrics.growthRate.value * (1 + variation()) * 10) / 10,
        change: Math.round(this.baseMetrics.growthRate.change * (1 + variation())),
      },
      lastUpdated: new Date().toISOString(),
    };
  }

  // Get sales data (for admin dashboard)
  async getSalesData(): Promise<SalesData> {
    return {
      dailyRevenue: Math.round(2847 + Math.random() * 500),
      dailyOrders: Math.round(23 + Math.random() * 10),
      conversionRate: Math.round((2.4 + Math.random() * 0.5) * 10) / 10,
      topProducts: [
        { id: 'home-kit-starter', name: 'SkyHarvest Home Kit - Starter', sales: 127 },
        { id: 'led-grow-lights', name: 'Full Spectrum LED Grow Lights', sales: 256 },
        { id: 'seed-collection', name: 'Urban Farmer Seed Collection', sales: 312 },
      ],
    };
  }

  // Get product inventory status from suppliers
  async getProductAvailability(productId: string): Promise<{
    inStock: boolean;
    stockLevel: number;
    estimatedRestock?: string;
  }> {
    // Simulate supplier API call
    const stockLevels: Record<string, number> = {
      'home-kit-starter': 45,
      'home-kit-pro': 23,
      'led-grow-lights': 156,
      'nutrient-pack': 89,
      'seed-collection': 234,
      'ph-testing-kit': 67,
    };

    const stock = stockLevels[productId] || 0;
    
    return {
      inStock: stock > 10,
      stockLevel: stock,
      estimatedRestock: stock < 20 ? '3-5 days' : undefined,
    };
  }

  // Subscribe to real-time updates (simulated with intervals)
  subscribeToMetrics(callback: (metrics: EcoMetrics) => void, intervalMs = 30000) {
    // Initial fetch
    this.getEcoMetrics().then(callback);

    // Set up interval for updates
    const intervalId = setInterval(async () => {
      const metrics = await this.getEcoMetrics();
      callback(metrics);
    }, intervalMs);

    // Return unsubscribe function
    return () => clearInterval(intervalId);
  }
}

// Export singleton instance
export const dataService = new DataService();

/**
 * INTEGRATION GUIDE:
 * 
 * To connect to real APIs, replace the methods above with actual fetch calls:
 * 
 * Example:
 * async getEcoMetrics(): Promise<EcoMetrics> {
 *   const response = await fetch('https://api.anwfoundations.com/metrics');
 *   return response.json();
 * }
 * 
 * For WebSocket real-time updates:
 * subscribeToMetrics(callback) {
 *   const ws = new WebSocket('wss://api.anwfoundations.com/metrics/stream');
 *   ws.onmessage = (event) => callback(JSON.parse(event.data));
 *   return () => ws.close();
 * }
 */
