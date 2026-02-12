import { useState, useEffect } from 'react';
import { Menu, X, Building2, ChevronDown } from 'lucide-react';

interface SubBrand {
  id: string;
  name: string;
  tagline: string;
  href: string;
  color: string;
}

const subBrands: SubBrand[] = [
  {
    id: 'skyharvest',
    name: 'SkyHarvest',
    tagline: 'Vertical Farming',
    href: '#skyharvest',
    color: '#7B3FF2',
  },
  {
    id: 'coming-soon-1',
    name: 'Coming Soon',
    tagline: 'New Venture',
    href: '#',
    color: '#22C55E',
  },
  {
    id: 'coming-soon-2',
    name: 'Coming Soon',
    tagline: 'New Venture',
    href: '#',
    color: '#3B82F6',
  },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Systems', href: '#systems' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Impact', href: '#impact' },
    { label: 'Community', href: '#community' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Parent Company Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="bg-[#0B0C10] text-white py-2">
          <div className="px-6 lg:px-12 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 text-sm">
              <Building2 className="w-4 h-4 text-[#7B3FF2]" />
              <span className="font-medium">ANW Foundations LLC</span>
            </a>
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span>Umbrella Company</span>
              <span className="w-px h-3 bg-white/20" />
              <span>3 Ventures</span>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-10 bg-white/90 backdrop-blur-xl border-b border-[#0B0C10]/8'
            : 'top-0 bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with Brand Selector */}
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-[#7B3FF2] flex items-center justify-center group-hover:glow-purple transition-all duration-300">
                  <span className="text-white font-bold text-sm">ANW</span>
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-lg tracking-tight text-[#0B0C10]">
                    SkyHarvest
                  </span>
                  <span className="text-xs text-[#6B7280] block -mt-1">by ANW Foundations</span>
                </div>
              </a>

              {/* Brand Selector Dropdown */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B0C10]/5 hover:bg-[#0B0C10]/10 transition-colors text-sm"
                >
                  <span className="text-[#6B7280]">Our Brands</span>
                  <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform ${isBrandsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isBrandsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsBrandsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl card-shadow z-50 overflow-hidden">
                      <div className="p-2">
                        <p className="text-xs font-mono text-[#6B7280] uppercase px-3 py-2">
                          ANW Foundations Ventures
                        </p>
                        {subBrands.map((brand) => (
                          <a
                            key={brand.id}
                            href={brand.href}
                            onClick={() => setIsBrandsOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#F6F7FA] transition-colors"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: `${brand.color}15` }}
                            >
                              <span 
                                className="font-bold text-sm"
                                style={{ color: brand.color }}
                              >
                                {brand.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-[#0B0C10]">{brand.name}</p>
                              <p className="text-xs text-[#6B7280]">{brand.tagline}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                      <div className="border-t border-[#0B0C10]/8 p-3">
                        <a 
                          href="#contact" 
                          className="text-sm text-[#7B3FF2] hover:underline"
                          onClick={() => setIsBrandsOpen(false)}
                        >
                          Propose a new venture →
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[#6B7280] hover:text-[#0B0C10] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B3FF2] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#store"
                className="px-4 py-2 text-sm font-medium text-[#0B0C10] hover:text-[#7B3FF2] transition-colors"
              >
                Shop
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B0C10] text-white text-sm font-medium rounded-full hover:bg-[#7B3FF2] transition-all duration-300 hover:glow-purple"
              >
                Start a project
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm border border-[#0B0C10]/8"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#0B0C10]" />
              ) : (
                <Menu className="w-5 h-5 text-[#0B0C10]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#0B0C10]/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-6">
            {/* Parent company badge */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#0B0C10]/8">
              <Building2 className="w-4 h-4 text-[#7B3FF2]" />
              <span className="text-sm font-medium text-[#0B0C10]">ANW Foundations LLC</span>
            </div>

            {/* Sub-brands */}
            <p className="text-xs font-mono text-[#6B7280] uppercase mb-3">Our Brands</p>
            <div className="flex flex-col gap-2 mb-6">
              {subBrands.map((brand) => (
                <a
                  key={brand.id}
                  href={brand.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F7FA]"
                >
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${brand.color}15` }}
                  >
                    <span style={{ color: brand.color }} className="font-bold text-xs">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[#0B0C10]">{brand.name}</p>
                    <p className="text-xs text-[#6B7280]">{brand.tagline}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Navigation */}
            <p className="text-xs font-mono text-[#6B7280] uppercase mb-3">SkyHarvest</p>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#0B0C10] hover:text-[#7B3FF2] transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 inline-flex items-center justify-center w-full gap-2 px-5 py-3 bg-[#7B3FF2] text-white font-medium rounded-full"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
