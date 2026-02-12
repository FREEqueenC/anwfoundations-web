import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Droplets, Zap, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  color: string;
}

function MetricCard({ icon, label, value, change, color }: MetricCardProps) {
  return (
    <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-mono text-[#6B7280] uppercase">{label}</p>
        <p className="text-xl font-bold text-[#0B0C10]">{value}</p>
        <p className="text-xs text-[#22C55E]">{change}</p>
      </div>
    </div>
  );
}

function AnimatedLineChart({ color, delay = 0 }: { color: string; delay?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    if (pathRef.current) {
      observer.observe(pathRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Generate random smooth path
  const points = [50, 45, 55, 40, 60, 55, 50, 45, 55, 40, 60, 55, 50];
  const pathD = points.reduce((acc, y, i) => {
    const x = (i / (points.length - 1)) * 300;
    return acc + (i === 0 ? `M ${x} ${100 - y}` : ` L ${x} ${100 - y}`);
  }, '');

  return (
    <svg viewBox="0 0 300 100" className="w-full h-24">
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="500"
        strokeDashoffset={isVisible ? 0 : 500}
        style={{ transition: 'stroke-dashoffset 2s ease-out' }}
      />
      {/* Area fill */}
      <path
        d={`${pathD} L 300 100 L 0 100 Z`}
        fill={`${color}20`}
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-out 0.5s' }}
      />
    </svg>
  );
}

export default function SustainabilitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl
        .fromTo(
          topRowRef.current?.children || [],
          { y: '-40vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.03 },
          0
        )
        .fromTo(
          bottomLeftRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bottomRightRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          topRowRef.current?.children || [],
          { y: 0, opacity: 1 },
          { y: '-25vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(
          bottomLeftRef.current,
          { y: 0, opacity: 1 },
          { y: '30vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bottomRightRef.current,
          { x: 0, opacity: 1 },
          { x: '40vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      className="section-pinned bg-[#F6F7FA] z-[60]"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw] py-8 lg:py-0">
        {/* Top row */}
        <div
          ref={topRowRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[3vw] mb-4 lg:mb-[3vh]"
        >
          {/* Top left - headline card */}
          <div className="glass-card rounded-[18px] p-4 lg:p-6 card-shadow h-[160px] lg:h-[26vh] flex flex-col justify-between">
            <div>
              <span className="micro-label mb-2 block">Reporting</span>
              <h2 className="text-xl lg:text-2xl font-semibold text-[#0B0C10] leading-tight">
                Sustainability,<br />measured.
              </h2>
            </div>
            <a
              href="#report"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#7B3FF2] hover:underline"
            >
              Download sample report
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Top center - tower */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow h-[160px] lg:h-[26vh]">
            <img
              src="/tower_closeup.jpg"
              alt="Vertical tower"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Top right - produce */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow h-[160px] lg:h-[26vh]">
            <img
              src="/produce_basket.jpg"
              alt="Fresh produce"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw]">
          {/* Bottom left - greenhouse */}
          <div
            ref={bottomLeftRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[50vh]"
          >
            <img
              src="/greenhouse_interior.jpg"
              alt="Greenhouse interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/50 to-transparent" />
            
            {/* Metric cards overlay */}
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MetricCard
                icon={<Droplets className="w-6 h-6 text-[#3B82F6]" />}
                label="Water Saved"
                value="12.5k L"
                change="+23% vs last month"
                color="#3B82F6"
              />
              <MetricCard
                icon={<Zap className="w-6 h-6 text-[#7B3FF2]" />}
                label="Energy Used"
                value="845 kWh"
                change="-8% vs last month"
                color="#7B3FF2"
              />
              <MetricCard
                icon={<TrendingUp className="w-6 h-6 text-[#22C55E]" />}
                label="Yield"
                value="2.4×"
                change="+15% vs traditional"
                color="#22C55E"
              />
            </div>
          </div>

          {/* Bottom right - charts card */}
          <div
            ref={bottomRightRef}
            className="glass-card rounded-[28px] p-6 lg:p-8 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[50vh]"
          >
            <div>
              <h3 className="text-lg font-semibold text-[#0B0C10] mb-6">
                Resource Efficiency Trends
              </h3>
              
              {/* Charts */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#6B7280]">Water Usage</span>
                    <span className="text-xs font-mono text-[#3B82F6]">-95%</span>
                  </div>
                  <AnimatedLineChart color="#3B82F6" delay={0} />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#6B7280]">Energy Consumption</span>
                    <span className="text-xs font-mono text-[#7B3FF2]">-40%</span>
                  </div>
                  <AnimatedLineChart color="#7B3FF2" delay={200} />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#6B7280]">Harvest Yield</span>
                    <span className="text-xs font-mono text-[#22C55E]">+240%</span>
                  </div>
                  <AnimatedLineChart color="#22C55E" delay={400} />
                </div>
              </div>
            </div>
            
            <p className="text-sm text-[#6B7280] mt-4">
              Track resource use, carbon offset, and circularity goals with 
              built-in reporting—ready for certifications and stakeholder updates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
