import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Building2, GraduationCap, ShoppingBag } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The cleanest lettuce we've ever sourced—year-round, local, consistent.",
    author: 'Chef M. Reyes',
    role: 'Urban Plate',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: '#7B3FF2',
  },
  {
    quote: "Our students run the farm as a living lab. The data makes it measurable.",
    author: 'Dr. A. Lin',
    role: 'CityTech Campus',
    icon: <GraduationCap className="w-5 h-5" />,
    color: '#22C55E',
  },
  {
    quote: "We hit our sustainability targets without sacrificing margins.",
    author: 'Operations Lead',
    role: 'FreshGrid Retail',
    icon: <Building2 className="w-5 h-5" />,
    color: '#3B82F6',
  },
];

const useCases = [
  { label: 'Rooftop Farms', count: '24' },
  { label: 'University Campuses', count: '12' },
  { label: 'Grocery Partners', count: '18' },
  { label: 'Restaurants', count: '36' },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative bg-[#F6F7FA] z-[70] py-20 lg:py-32"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="micro-label mb-4 block">Community</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B0C10] leading-tight">
            Join the movement
          </h2>
          <p className="text-[#6B7280] text-lg mt-4">
            From rooftop farms to grocery partners, SkyHarvest helps cities grow 
            fresher, cleaner, and closer to home.
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card rounded-[28px] p-6 lg:p-8 card-shadow hover-lift relative"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${testimonial.color}15` }}
              >
                <span style={{ color: testimonial.color }}>{testimonial.icon}</span>
              </div>
              
              <Quote 
                className="w-8 h-8 mb-4" 
                style={{ color: `${testimonial.color}40` }}
              />
              
              <p className="text-[#0B0C10] text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ background: testimonial.color }}
                >
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#0B0C10]">{testimonial.author}</p>
                  <p className="text-sm text-[#6B7280]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use case stats */}
        <div
          ref={statsRef}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-16"
        >
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl px-6 py-4 flex items-center gap-3"
            >
              <span className="text-2xl font-bold text-[#7B3FF2]">{useCase.count}</span>
              <span className="text-sm text-[#6B7280]">{useCase.label}</span>
            </div>
          ))}
        </div>

        {/* Trust badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-[#6B7280]">
            Trusted by growers and partners in <span className="font-semibold text-[#0B0C10]">12 cities</span>
          </p>
        </div>
      </div>
    </section>
  );
}
