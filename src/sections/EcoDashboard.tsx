import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { gsap } from 'gsap';
import { Droplets, Leaf, Cloud, TrendingUp, X } from 'lucide-react';
import type { EcoMetrics } from '../services/dataService';

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  change: number;
  color: string;
}

function AnimatedNumber({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState('0');
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.floor(progress * numericValue);
            setDisplayValue(current.toLocaleString());
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(numericValue.toLocaleString());
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={numberRef}>{displayValue}</span>;
}

const MetricCard = memo(function MetricCard({ icon, label, value, unit, change, color }: MetricProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-colors duration-300">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-mono text-[#6B7280] uppercase truncate">{label}</p>
        <p className="text-lg font-bold text-[#0B0C10]">
          <AnimatedNumber value={value} /> {unit}
        </p>
        <p className={`text-xs ${isPositive ? 'text-[#22C55E]' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{change}% vs yesterday
        </p>
      </div>
    </div>
  );
});

function MiniChart({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Generate random data points
    const points: number[] = [];
    let value = 50;
    for (let i = 0; i < 20; i++) {
      value += (Math.random() - 0.5) * 20;
      value = Math.max(10, Math.min(90, value));
      points.push(value);
    }

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const stepX = rect.width / (points.length - 1);
    points.forEach((y, i) => {
      const x = i * stepX;
      const normalizedY = rect.height - (y / 100) * rect.height;
      if (i === 0) {
        ctx.moveTo(x, normalizedY);
      } else {
        ctx.lineTo(x, normalizedY);
      }
    });
    ctx.stroke();

    // Draw gradient fill
    ctx.lineTo(rect.width, rect.height);
    ctx.lineTo(0, rect.height);
    ctx.closePath();
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, `${color}40`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-12"
      style={{ width: '100%', height: '48px' }}
    />
  );
}

interface EcoDashboardProps {
  metrics?: EcoMetrics | null;
}

export default function EcoDashboard({ metrics }: EcoDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      // Show dashboard after scrolling past hero
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.to(dashboardRef.current, {
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  // Use real metrics if available, otherwise fallback to defaults
  const displayMetrics = useMemo(() => metrics ? [
    {
      icon: <Droplets className="w-5 h-5" />,
      label: 'Water Saved',
      value: metrics.waterSaved.value.toString(),
      unit: metrics.waterSaved.unit,
      change: metrics.waterSaved.change,
      color: '#3B82F6',
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      label: 'Carbon Offset',
      value: metrics.carbonOffset.value.toString(),
      unit: metrics.carbonOffset.unit,
      change: metrics.carbonOffset.change,
      color: '#7B3FF2',
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      label: 'Daily Harvest',
      value: metrics.dailyHarvest.value.toString(),
      unit: metrics.dailyHarvest.unit,
      change: metrics.dailyHarvest.change,
      color: '#22C55E',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Growth Rate',
      value: metrics.growthRate.value.toString(),
      unit: metrics.growthRate.unit,
      change: metrics.growthRate.change,
      color: '#F59E0B',
    },
  ] : [
    // Fallback default metrics
    {
      icon: <Droplets className="w-5 h-5" />,
      label: 'Water Saved',
      value: '12500',
      unit: 'L',
      change: 23,
      color: '#3B82F6',
    },
    {
      icon: <Cloud className="w-5 h-5" />,
      label: 'Carbon Offset',
      value: '2840',
      unit: 'kg',
      change: 15,
      color: '#7B3FF2',
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      label: 'Daily Harvest',
      value: '847',
      unit: 'kg',
      change: 8,
      color: '#22C55E',
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Growth Rate',
      value: '3.2',
      unit: '×',
      change: 12,
      color: '#F59E0B',
    },
  ], [metrics]);

  const lastUpdated = metrics?.lastUpdated 
    ? new Date(metrics.lastUpdated).toLocaleTimeString() 
    : 'Just now';

  return (
    <div
      ref={dashboardRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0 translate-y-[100px]"
      style={{ maxWidth: 'calc(100vw - 48px)' }}
    >
      <div className="glass-card rounded-3xl card-shadow overflow-hidden">
        {/* Header */}
        <div 
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-sm font-semibold text-[#0B0C10]">Eco-Dashboard</span>
            <span className="text-xs font-mono text-[#6B7280]">LIVE</span>
          </div>
          <button 
            className="w-8 h-8 rounded-lg hover:bg-white/80 flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X className="w-4 h-4 text-[#6B7280]" /> : <TrendingUp className="w-4 h-4 text-[#6B7280]" />}
          </button>
        </div>

        {/* Collapsible content */}
        <div 
          className="overflow-hidden transition-all duration-500 ease-out"
          style={{ 
            maxHeight: isOpen ? '400px' : '0',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div className="px-4 pb-4 space-y-4">
            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2">
              {displayMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Mini charts */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-[#6B7280] uppercase">24h Trends</p>
              <div className="grid grid-cols-2 gap-2">
                <MiniChart color="#3B82F6" />
                <MiniChart color="#22C55E" />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#0B0C10]/8">
              <p className="text-xs text-[#6B7280]">
                Last updated: <span className="font-mono">{lastUpdated}</span>
              </p>
              <a 
                href="#dashboard" 
                className="text-xs font-medium text-[#7B3FF2] hover:underline"
              >
                View full dashboard
              </a>
            </div>
          </div>
        </div>

        {/* Collapsed preview */}
        {!isOpen && (
          <div className="px-4 pb-3 flex items-center gap-4">
            {displayMetrics.slice(0, 3).map((metric, index) => (
              <div key={index} className="flex items-center gap-2">
                <span style={{ color: metric.color }}>{metric.icon}</span>
                <span className="text-sm font-semibold text-[#0B0C10]">
                  <AnimatedNumber value={metric.value} /> {metric.unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
