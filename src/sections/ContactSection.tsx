import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail, Palette, Wrench, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomCardsRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
          scrimRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          leftCardRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          rightCardRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
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
        )
        .fromTo(
          scrimRef.current,
          { opacity: 1 },
          { opacity: 0.85, ease: 'none' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your interest! We will contact you soon.');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pinned z-[80]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/greenhouse_interior.jpg"
          alt="Greenhouse interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark scrim overlay */}
      <div
        ref={scrimRef}
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(180deg, rgba(11,12,16,0.55), rgba(11,12,16,0.75))',
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw]">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw] mt-16 lg:mt-0">
          {/* Left form card */}
          <div
            ref={leftCardRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[52vh]"
          >
            <div>
              <span className="micro-label mb-4 block">Contact</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4">
                Let's build<br />your farm.
              </h2>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-4">
                Tell us about your space, goals, and timeline. We'll design a 
                system that fits—and keep it growing.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#0B0C10]/10 bg-white/50 focus:bg-white focus:border-[#7B3FF2] focus:outline-none transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#0B0C10]/10 bg-white/50 focus:bg-white focus:border-[#7B3FF2] focus:outline-none transition-all duration-300"
                  required
                />
              </div>
              <textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-[#0B0C10]/10 bg-white/50 focus:bg-white focus:border-[#7B3FF2] focus:outline-none transition-all duration-300 resize-none"
                required
              />
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B3FF2] text-white font-medium rounded-full hover:bg-[#6B2EE0] transition-all duration-300 led-pulse"
                >
                  Start a project
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="mailto:hello@skyharvest.io"
                  className="text-[#6B7280] hover:text-[#7B3FF2] transition-colors duration-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Or email hello@skyharvest.io
                </a>
              </div>
            </form>
          </div>

          {/* Right image card */}
          <div
            ref={rightCardRef}
            className="relative rounded-[28px] overflow-hidden card-shadow min-h-[280px] lg:min-h-[52vh]"
          >
            <img
              src="/tower_closeup.jpg"
              alt="Vertical farming tower"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/50 to-transparent" />
            
            {/* Floating stats */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              <div className="glass-card rounded-2xl px-4 py-3">
                <p className="text-xs font-mono text-[#6B7280]">INSTALLATIONS</p>
                <p className="text-2xl font-bold text-[#0B0C10]">90+</p>
              </div>
              <div className="glass-card rounded-2xl px-4 py-3">
                <p className="text-xs font-mono text-[#6B7280]">CITIES</p>
                <p className="text-2xl font-bold text-[#0B0C10]">12</p>
              </div>
            </div>
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

          {/* Bottom center - services card */}
          <div 
            className="rounded-[18px] p-4 lg:p-6 card-shadow-sm flex items-center justify-center h-[140px] lg:h-[18vh]"
            style={{ 
              background: '#0B0C10',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <Palette className="w-6 h-6 text-[#7B3FF2]" />
                <span className="text-xs font-mono text-white/60">Design</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <Wrench className="w-6 h-6 text-[#22C55E]" />
                <span className="text-xs font-mono text-white/60">Install</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col items-center gap-1">
                <Headphones className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs font-mono text-white/60">Support</span>
              </div>
            </div>
          </div>

          {/* Bottom right - produce */}
          <div className="relative rounded-[18px] overflow-hidden card-shadow-sm h-[140px] lg:h-[18vh]">
            <img
              src="/produce_basket.jpg"
              alt="Fresh produce"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
