import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Droplets, Zap, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);
  const parentBadgeRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set(parentBadgeRef.current, { y: -20, opacity: 0 });
      gsap.set(leftCardRef.current, { x: '-60vw', opacity: 0 });
      gsap.set(rightCardRef.current, { x: '60vw', opacity: 0 });
      gsap.set(headlineRef.current?.querySelectorAll('.word') || [], { y: 24, opacity: 0 });
      gsap.set(bodyRef.current, { y: 20, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      gsap.set(bottomCardsRef.current?.children || [], { y: '40vh', opacity: 0 });

      // Entrance sequence
      tl.to(parentBadgeRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0)
        .to(leftCardRef.current, { x: 0, opacity: 1, duration: 1 }, 0.1)
        .to(rightCardRef.current, { x: 0, opacity: 1, duration: 1 }, 0.1)
        .to(headlineRef.current?.querySelectorAll('.word') || [], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.03,
        }, 0.4)
        .to(bodyRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.6)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.7)
        .to(bottomCardsRef.current?.children || [], {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
        }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.to(leftCardRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(rightCardRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(bottomCardsRef.current?.children || [], { y: 0, opacity: 1, duration: 0.3 });
          },
        },
      });

      // EXIT phase (70% - 100%)
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

  const headlineWords = 'The city is hungry. We\'re growing the answer.'.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#F6F7FA] z-10"
    >
      {/* Background scrim */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(246,247,250,0.72), rgba(246,247,250,0.92))'
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Parent Company Badge */}
        <div
          ref={parentBadgeRef}
          className="absolute top-24 left-6 lg:left-[6vw] z-20"
        >
          <a 
            href="#" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B0C10] text-white rounded-full text-sm hover:bg-[#7B3FF2] transition-colors duration-300"
          >
            <Building2 className="w-4 h-4" />
            <span className="font-medium">ANW Foundations LLC</span>
            <span className="text-white/60">|</span>
            <span className="text-white/60">Umbrella Company</span>
          </a>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw] mt-24 lg:mt-0">
          {/* Left headline card */}
          <div
            ref={leftCardRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[52vh]"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="micro-label">Urban Agriculture</span>
                <span className="text-xs text-[#6B7280]">•</span>
                <span className="text-xs font-mono text-[#7B3FF2]">A SKYHARVEST BRAND</span>
              </div>
              <h1
                ref={headlineRef}
                className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4"
              >
                {headlineWords.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.3em]">
                    {word}
                  </span>
                ))}
              </h1>
            </div>
            
            <div>
              <p
                ref={bodyRef}
                className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-6"
              >
                SkyHarvest, a venture of ANW Foundations LLC, builds vertical farms 
                that fit where traditional agriculture can't—rooftops, parking structures, 
                and city centers—so fresh produce travels minutes, not miles.
              </p>
              
              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#systems"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B3FF2] text-white font-medium rounded-full hover:bg-[#6B2EE0] transition-all duration-300 led-pulse"
                >
                  Explore systems
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#store"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B0C10] font-medium rounded-full border border-[#0B0C10]/10 hover:border-[#7B3FF2] hover:text-[#7B3FF2] transition-all duration-300"
                >
                  Shop products
                </a>
              </div>
            </div>
          </div>

          {/* Right image card */}
          <div
            ref={rightCardRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[52vh]"
          >
            <img
              src="/hero_city_aerial.jpg"
              alt="Aerial view of modern city"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/30 to-transparent" />
          </div>
        </div>

        {/* Bottom cards */}
        <div
          ref={bottomCardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-[3vw] mt-4 lg:mt-[3vh]"
        >
          {/* Bottom left - leaf detail */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow-sm h-[140px] lg:h-[18vh]">
            <img
              src="/leaf_macro.jpg"
              alt="Leaf macro detail"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Bottom center - stat card */}
          <div className="glass-card rounded-[18px] p-4 lg:p-6 card-shadow-sm flex items-center justify-center h-[140px] lg:h-[18vh]">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-[#7B3FF2]/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#7B3FF2]" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#22C55E]" />
                </div>
              </div>
              <div>
                <p className="text-sm lg:text-base font-semibold text-[#0B0C10]">
                  95% less water
                </p>
                <p className="text-sm lg:text-base font-semibold text-[#0B0C10]">
                  3× faster growth
                </p>
              </div>
            </div>
          </div>

          {/* Bottom right - greenhouse */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow-sm h-[140px] lg:h-[18vh]">
            <img
              src="/greenhouse_interior.jpg"
              alt="Greenhouse interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
