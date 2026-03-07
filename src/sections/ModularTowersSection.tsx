import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Settings, Cpu } from 'lucide-react';

export default function ModularTowersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
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
          headlineRef.current,
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bodyRef.current,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(
          ctaRef.current,
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.15
        )
        .fromTo(
          bottomCardsRef.current?.children || [],
          { y: '50vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
          0.05
        );

      // SETTLE (30% - 70%) - hold positions

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
      id="systems"
      className="section-pinned bg-[#F6F7FA] z-20"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw] mt-16 lg:mt-0">
          {/* Left image card - tower */}
          <div
            ref={leftCardRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[52vh] order-2 lg:order-1"
          >
            <img
              src="/tower_closeup.jpg"
              alt="Vertical farming tower"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/40 to-transparent" />
            
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-xs font-mono text-[#0B0C10]">LIVE SYSTEM</span>
            </div>
          </div>

          {/* Right text card */}
          <div
            ref={rightCardRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[52vh] order-1 lg:order-2"
          >
            <div>
              <span className="micro-label mb-4 block">The System</span>
              <h2
                ref={headlineRef}
                className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4"
              >
                Modular towers.<br />
                Maximum yield.
              </h2>
            </div>
            
            <div>
              <p
                ref={bodyRef}
                className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-6"
              >
                Plug-and-play columns that stack to fit your space. Automated irrigation, 
                LED scheduling, and climate control—managed from a single dashboard.
              </p>
              
              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#specs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0C10] text-white font-medium rounded-full hover:bg-[#7B3FF2] transition-all duration-300"
                >
                  See the specs
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
                <Layers className="w-6 h-6 text-[#7B3FF2]" />
                <span className="text-xs font-mono text-[#6B7280]">Modular</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <Settings className="w-6 h-6 text-[#22C55E]" />
                <span className="text-xs font-mono text-[#6B7280]">Scalable</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <Cpu className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs font-mono text-[#6B7280]">Automated</span>
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
