import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={counterRef} className="counter-roll">
      {count}{suffix}
    </span>
  );
}

export default function HarvestNumbersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const bigNumberRef = useRef<HTMLDivElement>(null);

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
          { y: '-60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.03 },
          0
        )
        .fromTo(
          bottomLeftRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bottomRightRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bigNumberRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.6)' },
          0.1
        );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl
        .fromTo(
          topRowRef.current?.children || [],
          { y: 0, opacity: 1 },
          { y: '-30vh', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.7
        )
        .fromTo(
          bottomLeftRef.current,
          { x: 0, opacity: 1 },
          { x: '-40vw', opacity: 0, ease: 'power2.in' },
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
      id="impact"
      className="section-pinned bg-[#F6F7FA] z-30"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw] py-8 lg:py-0">
        {/* Top row */}
        <div
          ref={topRowRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[3vw] mb-4 lg:mb-[3vh]"
        >
          {/* Top left - greenhouse */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow h-[160px] lg:h-[26vh]">
            <img
              src="/greenhouse_interior.jpg"
              alt="Greenhouse interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Top center - stat card */}
          <div className="glass-card rounded-[18px] p-4 lg:p-6 card-shadow flex flex-col items-center justify-center h-[160px] lg:h-[26vh]">
            <div ref={bigNumberRef} className="text-center">
              <span className="text-5xl lg:text-7xl font-bold text-[#7B3FF2]">2.4×</span>
              <p className="text-xs font-mono text-[#6B7280] mt-2 uppercase tracking-wider">
                Yield per sqm
              </p>
            </div>
          </div>

          {/* Top right - tower */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow h-[160px] lg:h-[26vh]">
            <img
              src="/tower_closeup.jpg"
              alt="Vertical tower"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw]">
          {/* Bottom left - headline card */}
          <div
            ref={bottomLeftRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[50vh]"
          >
            <div>
              <span className="micro-label mb-4 block">Impact</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4">
                2.4× more harvest.<br />
                95% less water.
              </h2>
            </div>
            
            <div>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-6">
                Closed-loop hydroponics recycles every drop. Precision nutrients 
                and LED spectra tuned for each crop mean faster turns and less waste.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#report"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0C10] text-white font-medium rounded-full hover:bg-[#7B3FF2] transition-all duration-300"
                >
                  Read the impact report
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom right - produce image */}
          <div
            ref={bottomRightRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[50vh]"
          >
            <img
              src="/produce_basket.jpg"
              alt="Fresh produce basket"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/40 to-transparent" />
            
            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-[#22C55E]" />
                  <span className="text-xs font-mono text-[#6B7280]">DAILY HARVEST</span>
                </div>
                <p className="text-2xl font-bold text-[#0B0C10]">
                  <AnimatedCounter end={847} suffix=" kg" />
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#6B7280]">WATER SAVED</span>
                </div>
                <p className="text-2xl font-bold text-[#0B0C10]">
                  <AnimatedCounter end={12500} suffix=" L" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
