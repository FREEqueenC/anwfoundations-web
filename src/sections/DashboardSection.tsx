import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, Bell, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const svgLinesRef = useRef<SVGSVGElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);

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
          leftCardRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          rightCardRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          svgLinesRef.current?.querySelectorAll('.chart-path') || [],
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, ease: 'none', stagger: 0.02 },
          0.1
        )
        .fromTo(
          bottomCardsRef.current?.children || [],
          { y: '50vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
          0.15
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          leftCardRef.current,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          rightCardRef.current,
          { x: 0, opacity: 1 },
          { x: '40vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bottomCardsRef.current?.children || [],
          { y: 0, opacity: 1 },
          { y: '30vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="section-pinned bg-[#F6F7FA] z-50"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw] mt-16 lg:mt-0">
          {/* Left text card */}
          <div
            ref={leftCardRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[52vh]"
          >
            <div>
              <span className="micro-label mb-4 block">Software</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4">
                Monitor everything.<br />
                Automate the rest.
              </h2>
            </div>
            
            <div>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-6">
                A live dashboard for climate, irrigation, and harvest schedules. 
                Get alerts before issues become losses—and optimize yields with 
                historical analytics.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#explore"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B3FF2] text-white font-medium rounded-full hover:bg-[#6B2EE0] transition-all duration-300 led-pulse"
                >
                  Explore the dashboard
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right dashboard card */}
          <div
            ref={rightCardRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[52vh] bg-white"
          >
            <img
              src="/dashboard_ui.jpg"
              alt="Analytics dashboard"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Animated SVG overlay */}
            <svg
              ref={svgLinesRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              {/* Chart line 1 - Yield */}
              <path
                className="chart-path"
                d="M 20 200 Q 80 180, 140 160 T 260 120 T 380 80"
                fill="none"
                stroke="#7B3FF2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              {/* Chart line 2 - Water */}
              <path
                className="chart-path"
                d="M 20 220 Q 100 200, 180 210 T 300 180 T 380 160"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
              {/* Chart line 3 - Energy */}
              <path
                className="chart-path"
                d="M 20 240 Q 60 230, 120 235 T 240 220 T 380 200"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
            
            {/* Live indicator */}
            <div className="absolute top-6 right-6 glass-card rounded-full px-3 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-xs font-mono text-[#0B0C10]">LIVE</span>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div
          ref={bottomCardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[3vw] mt-4 lg:mt-[3vh]"
        >
          {/* Bottom left - greenhouse */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow-sm h-[140px] lg:h-[18vh]">
            <img
              src="/greenhouse_interior.jpg"
              alt="Greenhouse interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Bottom center - stat card */}
          <div className="glass-card rounded-[18px] p-4 lg:p-6 card-shadow-sm flex items-center justify-center h-[140px] lg:h-[18vh]">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <Activity className="w-6 h-6 text-[#7B3FF2]" />
                <span className="text-xs font-mono text-[#6B7280]">Real-time</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <Bell className="w-6 h-6 text-[#22C55E]" />
                <span className="text-xs font-mono text-[#6B7280]">Alerts</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs font-mono text-[#6B7280]">Analytics</span>
              </div>
            </div>
          </div>

          {/* Bottom right - leaf detail */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow-sm h-[140px] lg:h-[18vh]">
            <img
              src="/leaf_macro.jpg"
              alt="Leaf macro detail"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
