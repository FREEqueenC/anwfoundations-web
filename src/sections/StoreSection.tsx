import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingCart, Star, Truck, Shield, ArrowRight, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  supplier: string;
  shippingDays: number;
}

// Dropshipping product catalog -这些产品由供应商直接发货
const products: Product[] = [
  {
    id: 'home-kit-starter',
    name: 'SkyHarvest Home Kit - Starter',
    description: 'Perfect for beginners. 12-plant vertical tower with LED grow lights.',
    price: 299,
    originalPrice: 399,
    image: '/tower_closeup.jpg',
    rating: 4.8,
    reviews: 127,
    badge: 'Best Seller',
    supplier: 'GreenTech Manufacturing',
    shippingDays: 5,
  },
  {
    id: 'home-kit-pro',
    name: 'SkyHarvest Home Kit - Pro',
    description: '24-plant system with smart sensors and app control.',
    price: 599,
    image: '/greenhouse_interior.jpg',
    rating: 4.9,
    reviews: 84,
    badge: 'New',
    supplier: 'VerticalGrow Systems',
    shippingDays: 7,
  },
  {
    id: 'led-grow-lights',
    name: 'Full Spectrum LED Grow Lights',
    description: '45W LED panel with timer and dimmer. Perfect for any setup.',
    price: 89,
    originalPrice: 129,
    image: '/crop_basil.jpg',
    rating: 4.7,
    reviews: 256,
    supplier: 'LightWorks LED',
    shippingDays: 3,
  },
  {
    id: 'nutrient-pack',
    name: 'Hydroponic Nutrient Pack (3-month)',
    description: 'Complete nutrient solution for leafy greens and herbs.',
    price: 49,
    image: '/leaf_macro.jpg',
    rating: 4.6,
    reviews: 189,
    supplier: 'GrowMax Nutrients',
    shippingDays: 3,
  },
  {
    id: 'seed-collection',
    name: 'Urban Farmer Seed Collection',
    description: '12 varieties of non-GMO seeds: lettuce, basil, spinach, kale.',
    price: 34,
    image: '/produce_basket.jpg',
    rating: 4.9,
    reviews: 312,
    badge: 'Popular',
    supplier: 'Heritage Seeds Co.',
    shippingDays: 4,
  },
  {
    id: 'ph-testing-kit',
    name: 'Digital pH & TDS Testing Kit',
    description: 'Professional water quality monitoring for optimal growth.',
    price: 79,
    image: '/crop_lettuce.jpg',
    rating: 4.5,
    reviews: 98,
    supplier: 'AquaTest Instruments',
    shippingDays: 5,
  },
];

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="glass-card rounded-[24px] overflow-hidden card-shadow hover-lift transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#7B3FF2] text-white text-xs font-semibold rounded-full">
            {product.badge}
          </div>
        )}

        {/* Quick add overlay */}
        <div 
          className="absolute inset-0 bg-[#0B0C10]/60 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <button
            onClick={() => onAddToCart(product)}
            className="px-6 py-3 bg-white text-[#0B0C10] font-semibold rounded-full flex items-center gap-2 hover:bg-[#7B3FF2] hover:text-white transition-colors duration-300 transform translate-y-4"
            style={{ transform: isHovered ? 'translateY(0)' : 'translateY(16px)' }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="text-sm font-medium text-[#0B0C10]">{product.rating}</span>
          </div>
          <span className="text-sm text-[#6B7280]">({product.reviews} reviews)</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-[#0B0C10] mb-1 line-clamp-1">{product.name}</h3>
        
        {/* Description */}
        <p className="text-sm text-[#6B7280] mb-3 line-clamp-2">{product.description}</p>

        {/* Supplier info */}
        <div className="flex items-center gap-2 mb-3 text-xs text-[#6B7280]">
          <Truck className="w-3 h-3" />
          <span>Ships in {product.shippingDays} days from {product.supplier}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#0B0C10]">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-[#6B7280] line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StoreSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  
  const [cart, setCart] = useState<Product[]>([]);
  const [showCartNotification, setShowCartNotification] = useState(false);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

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

      // Products animation
      gsap.fromTo(
        productsRef.current?.children || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trust badges animation
      gsap.fromTo(
        trustRef.current?.children || [],
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: trustRef.current,
            start: 'top 85%',
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
      id="store"
      className="relative bg-[#F6F7FA] z-[35] py-20 lg:py-32"
    >
      {/* Cart notification */}
      {showCartNotification && (
        <div className="fixed top-24 right-6 z-50 glass-card rounded-2xl p-4 card-shadow animate-in slide-in-from-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="font-medium text-[#0B0C10]">Added to cart!</p>
              <p className="text-sm text-[#6B7280]">{cart.length} items</p>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 lg:px-[6vw]">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-12">
          <span className="micro-label mb-4 block">Store</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0B0C10] leading-tight">
            Start growing at home
          </h2>
          <p className="text-[#6B7280] text-lg mt-4">
            Everything you need to build your own vertical farm. 
            Ships directly from our trusted suppliers.
          </p>
        </div>

        {/* Trust badges */}
        <div
          ref={trustRef}
          className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-12"
        >
          <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
            <Truck className="w-4 h-4 text-[#7B3FF2]" />
            <span className="text-sm text-[#0B0C10]">Free shipping over $200</span>
          </div>
          <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-[#22C55E]" />
            <span className="text-sm text-[#0B0C10]">2-year warranty</span>
          </div>
          <div className="flex items-center gap-2 glass-card rounded-full px-4 py-2">
            <Star className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm text-[#0B0C10]">30-day returns</span>
          </div>
        </div>

        {/* Products grid */}
        <div
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <a
            href="#all-products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0C10] text-white font-medium rounded-full hover:bg-[#7B3FF2] transition-all duration-300"
          >
            View all products
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Business model note */}
        <div className="mt-16 glass-card rounded-2xl p-6 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7B3FF2]/10 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-6 h-6 text-[#7B3FF2]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0B0C10] mb-2">How Our Store Works</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                ANW Foundations operates on a dropshipping model. When you order, 
                our trusted suppliers ship directly to you. This means lower costs, 
                faster delivery, and no inventory risk for us. We curate the best 
                products and handle customer service—you get quality guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
