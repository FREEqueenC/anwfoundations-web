import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sprout, Shield, Leaf } from 'lucide-react';

interface CropData {
  id: string;
  name: string;
  image: string;
  nutrition: {
    vitamins: string[];
    protein: string;
    calories: string;
  };
  growthCycle: {
    days: number;
    stages: string[];
  };
}

const crops: CropData[] = [
  {
    id: 'basil',
    name: 'Genovese Basil',
    image: '/crop_basil.jpg',
    nutrition: {
      vitamins: ['K', 'A', 'C'],
      protein: '3.2g/100g',
      calories: '23 kcal',
    },
    growthCycle: {
      days: 28,
      stages: ['Seed', 'Sprout', 'Vegetative', 'Harvest'],
    },
  },
  {
    id: 'lettuce',
    name: 'Butter Lettuce',
    image: '/crop_lettuce.jpg',
    nutrition: {
      vitamins: ['A', 'K', 'Folate'],
      protein: '1.4g/100g',
      calories: '15 kcal',
    },
    growthCycle: {
      days: 35,
      stages: ['Seed', 'Cotyledon', 'Rosette', 'Harvest'],
    },
  },
  {
    id: 'spinach',
    name: 'Baby Spinach',
    image: '/crop_spinach.jpg',
    nutrition: {
      vitamins: ['K', 'A', 'C', 'Iron'],
      protein: '2.9g/100g',
      calories: '23 kcal',
    },
    growthCycle: {
      days: 42,
      stages: ['Seed', 'Seedling', 'True Leaves', 'Harvest'],
    },
  },
  {
    id: 'kale',
    name: 'Curly Kale',
    image: '/crop_kale.jpg',
    nutrition: {
      vitamins: ['K', 'A', 'C', 'B6'],
      protein: '4.3g/100g',
      calories: '49 kcal',
    },
    growthCycle: {
      days: 56,
      stages: ['Seed', 'Sprout', 'Juvenile', 'Mature'],
    },
  },
];

function CropCard({ crop }: { crop: CropData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="crop-card relative aspect-square cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={crop.image}
        alt={crop.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
      />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0B0C10]/80 via-[#0B0C10]/20 to-transparent transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.6 }}
      />
      
      {/* Title - always visible */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-semibold text-lg">{crop.name}</h3>
      </div>
      
      {/* Holographic popover */}
      <div 
        className="crop-hologram holographic-popover rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="space-y-3">
          <div>
            <p className="text-xs font-mono text-[#7B3FF2] mb-1">NUTRITION</p>
            <div className="flex flex-wrap gap-1">
              {crop.nutrition.vitamins.map((v) => (
                <span key={v} className="px-2 py-0.5 bg-[#7B3FF2]/20 rounded text-xs text-white">
                  Vit {v}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-2 text-xs text-white/80">
              <span>{crop.nutrition.protein}</span>
              <span>{crop.nutrition.calories}</span>
            </div>
          </div>
          
          <div>
            <p className="text-xs font-mono text-[#22C55E] mb-1">GROWTH CYCLE</p>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{crop.growthCycle.days} days</span>
              <div className="flex gap-1">
                {crop.growthCycle.stages.map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: i < 3 ? '#22C55E' : 'rgba(34, 197, 94, 0.3)' 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QualitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const cropsGridRef = useRef<HTMLDivElement>(null);
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
          cropsGridRef.current?.children || [],
          { y: '30vh', opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, ease: 'none', stagger: 0.02 },
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
          cropsGridRef.current?.children || [],
          { y: 0, opacity: 1 },
          { y: '20vh', opacity: 0, ease: 'power2.in', stagger: 0.01 },
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
      id="quality"
      className="section-pinned bg-[#F6F7FA] z-40"
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-6 lg:px-[6vw] py-8 lg:py-0">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[3vw] mt-16 lg:mt-0">
          {/* Left - crops grid */}
          <div
            ref={leftCardRef}
            className="grid grid-cols-2 gap-3 lg:gap-4 min-h-[280px] lg:min-h-[52vh] order-2 lg:order-1"
          >
            {crops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>

          {/* Right text card */}
          <div
            ref={rightCardRef}
            className="glass-card rounded-[28px] p-6 lg:p-10 card-shadow flex flex-col justify-between min-h-[280px] lg:min-h-[52vh] order-1 lg:order-2"
          >
            <div>
              <span className="micro-label mb-4 block">Quality</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,56px)] font-semibold text-[#0B0C10] leading-[1.05] mt-4">
                Grown for flavor.<br />
                Harvested at peak.
              </h2>
            </div>
            
            <div>
              <p className="text-[#6B7280] text-base lg:text-lg leading-relaxed max-w-lg mt-6">
                Greens, herbs, and microgreens picked within hours of delivery—clean, 
                consistent, and bred for taste, not shelf life.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#crops"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0C10] text-white font-medium rounded-full hover:bg-[#7B3FF2] transition-all duration-300"
                >
                  View the crop list
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
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-6 h-6 text-[#7B3FF2]" />
                <span className="text-xs font-mono text-[#6B7280]">Pesticide-free</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <Sprout className="w-6 h-6 text-[#22C55E]" />
                <span className="text-xs font-mono text-[#6B7280]">Non-GMO</span>
              </div>
              <div className="w-px h-8 bg-[#0B0C10]/10" />
              <div className="flex flex-col items-center gap-1">
                <Leaf className="w-6 h-6 text-[#3B82F6]" />
                <span className="text-xs font-mono text-[#6B7280]">Organic</span>
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
