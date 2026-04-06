import { Building2, Instagram, Linkedin, Youtube } from 'lucide-react';

const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Impact', href: '#impact' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
];

interface FooterProps {
  onShowPrivacy: () => void;
  onShowTerms: () => void;
  onShowShipping: () => void;
}

export default function Footer({ onShowPrivacy, onShowTerms, onShowShipping }: FooterProps) {
  return (
    <footer className="relative bg-[#0B0C10] z-[90] py-12 lg:py-16">
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Logo and tagline */}
          <div>
            <a
              href="https://anwfoundations.com"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7B3FF2] flex items-center justify-center group-hover:glow-purple transition-all duration-300">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-semibold text-xl tracking-tight text-white block">
                  ANW Foundations
                </span>
                <span className="text-white/40 text-sm">Umbrella Company</span>
              </div>
            </a>
            <p className="text-white/60 text-sm max-w-xs mb-4">
              Building ventures that shape the future.
            </p>
            <a href="mailto:ashleighwalker@anwfoundations.com" className="text-sm text-[#7B3FF2] hover:text-[#9D6EFC] transition-colors">
              ashleighwalker@anwfoundations.com
            </a>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#7B3FF2] hover:text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} ANW Foundations LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={onShowPrivacy}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onShowTerms}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={onShowShipping}
              className="text-sm text-white/40 hover:text-white/60 transition-colors"
            >
              Shipping & Returns
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
