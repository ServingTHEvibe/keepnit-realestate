import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Home,
  TrendingUp,
  Shield,
  Users,
  Key,
  Award,
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── DATA ────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Home,
    title: "Exclusive Listings",
    desc: "Access off-market luxury properties before they hit the public, giving you a competitive edge in any market.",
  },
  {
    icon: TrendingUp,
    title: "Market Mastery",
    desc: "Real-time data and 10+ years of local expertise help you buy or sell at exactly the right moment.",
  },
  {
    icon: Shield,
    title: "Negotiation Power",
    desc: "We fight for your best deal — every time. Our track record speaks: 98% of offers accepted within 14 days.",
  },
  {
    icon: Users,
    title: "White-Glove Service",
    desc: "From your first call to closing day, you get dedicated support with zero hand-off to assistants.",
  },
  {
    icon: Key,
    title: "Seamless Closings",
    desc: "Our trusted network of lenders, inspectors, and attorneys keeps your transaction smooth and stress-free.",
  },
  {
    icon: Award,
    title: "Award-Winning Agent",
    desc: "Ranked top 5% in the Des Moines metro — proven results across first-time buyers and luxury estates alike.",
  },
];

const TESTIMONIALS = [
  {
    name: "Marcus & Jada Thompson",
    title: "First-Time Homebuyers",
    quote:
      "We were lost in the process — Keepnit Real Estate turned a scary experience into one of the best decisions we've ever made. Closed in 21 days under asking price. Couldn't believe it.",
    avatar: "https://images.unsplash.com/photo-1560298803-1d998f374cc5?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Diana Reyes",
    title: "Luxury Home Seller — West Des Moines",
    quote:
      "Listed on a Thursday, multiple offers by Sunday, sold for $42K over asking. The marketing strategy was on another level — professional photos, video tour, and social reach that actually worked.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Kevin O'Brien",
    title: "Real Estate Investor",
    quote:
      "I've worked with six agents over 12 years. Keepnit is in a different league. They understand investment property and the Des Moines market at a depth I haven't seen from anyone else.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
];

const STATS = [
  { value: 200, suffix: "+", label: "Homes Sold" },
  { value: 98, suffix: "%", label: "Offer Acceptance Rate" },
  { value: 14, suffix: " Days", label: "Avg. Days to Close" },
  { value: 5, suffix: "★", label: "Average Rating" },
];

const LOGOS = [
  "Zillow Premier Agent",
  "Realtor.com",
  "RE/MAX",
  "Coldwell Banker",
  "Better Homes",
  "HomeAdvisor",
];

const LISTINGS = [
  {
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    price: "$1,250,000",
    address: "4821 Waukee Ridge Dr",
    city: "Waukee, IA",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    tag: "New Listing",
  },
  {
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    price: "$875,000",
    address: "2210 Jordan Creek Pkwy",
    city: "West Des Moines, IA",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    tag: "Featured",
  },
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    price: "$2,100,000",
    address: "9 Bishops Woods Ct",
    city: "Clive, IA",
    beds: 6,
    baths: 5,
    sqft: "6,800",
    tag: "Luxury Estate",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target]);
  return count;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#c9a96e] text-[#c9a96e]" />
      ))}
    </div>
  );
}

function StatCard({
  value,
  suffix,
  label,
  trigger,
}: {
  value: number;
  suffix: string;
  label: string;
  trigger: boolean;
}) {
  const count = useCountUp(value, trigger);
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-white font-display">
        {count}
        <span className="text-[#c9a96e]">{suffix}</span>
      </div>
      <div className="text-slate-300 mt-2 text-sm tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function IndexPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero parallax (scroll moves video up slower than page)
      if (heroVideoRef.current) {
        gsap.to(heroVideoRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ── Hero text fade-up on load
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      // ── Navbar background on scroll
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (navRef.current) {
            navRef.current.classList.toggle("nav-scrolled", self.progress > 0);
          }
        },
      });

      // ── Scroll-triggered fade-up for sections
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Stagger feature cards
      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Stagger listing cards
      gsap.utils.toArray<HTMLElement>(".listing-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // ── Stats visibility trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => setStatsVisible(true),
      });

      // ── Testimonial stagger
      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: { y: `#${id}`, offsetY: 80 }, ease: "power2.inOut" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="font-sans bg-[#f8f5f0] text-[#1a1a2e] overflow-x-hidden">

      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-glass"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a96e] flex items-center justify-center">
              <Home size={18} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none">Keepnit</div>
              <div className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase">Real Estate</div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["about", "listings", "services", "testimonials", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-white/80 hover:text-[#c9a96e] text-sm tracking-wide capitalize transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="tel:+15155550515"
            className="hidden md:flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8924f] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a96e]/30 hover:-translate-y-0.5"
          >
            <Phone size={15} />
            Call Now
          </a>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#1a1a2e]/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4">
            {["about", "listings", "services", "testimonials", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-white/80 hover:text-[#c9a96e] text-left capitalize py-2 border-b border-white/10 text-base"
              >
                {item}
              </button>
            ))}
            <a
              href="tel:+15155550515"
              className="mt-2 flex items-center justify-center gap-2 bg-[#c9a96e] text-white px-6 py-3 rounded-full font-semibold"
            >
              <Phone size={15} />
              Call Now
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        id="about"
        ref={heroRef}
        className="relative w-full h-screen min-h-[700px] flex items-center justify-start overflow-hidden"
      >
        {/* Video background */}
        <video
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover ken-burns"
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
        >
          <source
            src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent" />

        {/* Gold accent line */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#c9a96e] to-transparent opacity-60" />

        {/* Hero content */}
        <div ref={heroTextRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#c9a96e]/20 border border-[#c9a96e]/40 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#c9a96e] rounded-full animate-pulse" />
              <span className="text-[#c9a96e] text-sm font-medium tracking-wide">Des Moines Metro's #1 Agent</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              Find Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c9a96e] to-[#e8c88a]">
                Perfect
              </span>
              <br />
              Home Today
            </h1>

            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Expert guidance, exclusive listings, and relentless negotiation — all in one dedicated agent who knows Iowa real estate inside out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+15155550515"
                className="group inline-flex items-center justify-center gap-3 bg-[#c9a96e] hover:bg-[#b8924f] text-white px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#c9a96e]/40 hover:-translate-y-1"
              >
                <Phone size={18} />
                Call Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => scrollTo("listings")}
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#c9a96e] text-white hover:text-[#c9a96e] px-8 py-4 rounded-full text-base font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Browse Listings
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {TESTIMONIALS.map((t, i) => (
                  <img
                    key={i}
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full border-2 border-[#c9a96e] object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="flex gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <div className="text-white/70 text-sm">200+ happy clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="bg-[#1a1a2e] py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-slate-400 text-sm tracking-widest uppercase whitespace-nowrap font-medium">
              Trusted by
            </div>
            <div className="w-px h-8 bg-slate-600 hidden md:block" />
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-8 md:gap-12">
              {LOGOS.map((logo) => (
                <div
                  key={logo}
                  className="text-slate-400 hover:text-[#c9a96e] font-semibold text-sm tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #c9a96e 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} trigger={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section id="listings" className="py-28 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="fade-up mb-16">
            <div className="text-[#c9a96e] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Featured Properties
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
              Handpicked Homes <br className="hidden md:block" />
              <span className="text-[#c9a96e]">Just For You</span>
            </h2>
            <p className="text-[#6b7280] text-lg max-w-xl">
              Every listing is personally vetted. These aren't just houses — they're the right homes for the right buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LISTINGS.map((listing, i) => (
              <div
                key={i}
                className="listing-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#1a1a2e]/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={listing.img}
                    alt={listing.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#c9a96e] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      {listing.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <div className="font-display text-2xl font-bold text-[#1a1a2e] mb-1">{listing.price}</div>
                  <div className="font-medium text-[#1a1a2e] mb-1">{listing.address}</div>
                  <div className="text-[#6b7280] text-sm mb-4">{listing.city}</div>
                  <div className="flex items-center gap-6 text-sm text-[#6b7280] pt-4 border-t border-[#e5e0d8]">
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#1a1a2e]">{listing.beds}</span> Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#1a1a2e]">{listing.baths}</span> Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#1a1a2e]">{listing.sqft}</span> sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fade-up mt-12 text-center">
            <a
              href="tel:+15155550515"
              className="inline-flex items-center gap-2 border-2 border-[#1a1a2e] hover:bg-[#1a1a2e] text-[#1a1a2e] hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              <Phone size={16} />
              Call to See More Listings
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES / SERVICES ── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <div className="text-[#c9a96e] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Why Keepnit
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
              Everything You Need <br className="hidden md:block" />
              to Win in Real Estate
            </h2>
            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
              Buying or selling, you deserve an agent who brings more to the table than just a lockbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="feature-card group p-8 rounded-3xl border border-[#e5e0d8] hover:border-[#c9a96e]/40 hover:shadow-xl hover:shadow-[#c9a96e]/10 transition-all duration-400 hover:-translate-y-1 bg-white"
                >
                  <div className="w-12 h-12 bg-[#c9a96e]/10 group-hover:bg-[#c9a96e] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                    <Icon size={20} className="text-[#c9a96e] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1a1a2e] mb-3">{feature.title}</h3>
                  <p className="text-[#6b7280] leading-relaxed text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-28 bg-[#f8f5f0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="fade-up text-center mb-16">
            <div className="text-[#c9a96e] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Client Stories
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">
              Real Results. <span className="text-[#c9a96e]">Real People.</span>
            </h2>
            <p className="text-[#6b7280] text-lg">
              Don't take our word for it — hear from people who've been there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="testimonial-card bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-[#1a1a2e]/8 transition-all duration-400 hover:-translate-y-1 border border-[#e5e0d8] flex flex-col"
              >
                <div className="mb-6">
                  <StarRating rating={t.rating} />
                </div>
                <blockquote className="text-[#1a1a2e] leading-relaxed text-sm flex-1 mb-8">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-4 pt-6 border-t border-[#e5e0d8]">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#c9a96e]/30"
                  />
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm">{t.name}</div>
                    <div className="text-[#6b7280] text-xs mt-0.5">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-24 bg-[#1a1a2e] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #c9a96e 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a96e]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center fade-up">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Make <br />
            <span className="text-[#c9a96e]">Your Move?</span>
          </h2>
          <p className="text-slate-300 text-xl mb-10 max-w-xl mx-auto">
            One call is all it takes. Let's find — or sell — your perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15155550515"
              className="group inline-flex items-center justify-center gap-3 bg-[#c9a96e] hover:bg-[#b8924f] text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-[#c9a96e]/40 hover:-translate-y-1"
            >
              <Phone size={20} />
              Call Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-[#c9a96e] text-white hover:text-[#c9a96e] px-10 py-5 rounded-full text-lg font-medium transition-all duration-300"
            >
              <Mail size={18} />
              Send a Message
            </button>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="fade-up">
              <div className="text-[#c9a96e] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Get In Touch
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6">
                Let's Start the <br />
                <span className="text-[#c9a96e]">Conversation</span>
              </h2>
              <p className="text-[#6b7280] text-lg leading-relaxed mb-10">
                Whether you're buying your first home, selling a luxury estate, or just exploring your options — reach out and get a response within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm">Phone</div>
                    <a href="tel:+15155550515" className="text-[#6b7280] hover:text-[#c9a96e] transition-colors">
                      (515) 555-0515
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm">Email</div>
                    <a href="mailto:info@keepnitrealestate.com" className="text-[#6b7280] hover:text-[#c9a96e] transition-colors">
                      info@keepnitrealestate.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm">Area Served</div>
                    <div className="text-[#6b7280]">Des Moines Metro, IA</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Instagram size={18} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1a2e] text-sm">Instagram</div>
                    <a
                      href="https://www.instagram.com/keepnit.real.estate515"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6b7280] hover:text-[#c9a96e] transition-colors"
                    >
                      @keepnit.real.estate515
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="fade-up">
              {submitted ? (
                <div className="bg-[#f8f5f0] rounded-3xl p-12 text-center border border-[#e5e0d8]">
                  <div className="w-16 h-16 bg-[#c9a96e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-[#c9a96e]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#1a1a2e] mb-3">Message Sent!</h3>
                  <p className="text-[#6b7280]">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#f8f5f0] rounded-3xl p-8 border border-[#e5e0d8] space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                        Full Name <span className="text-[#c9a96e]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0d8] bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 focus:border-[#c9a96e] transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(515) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0d8] bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 focus:border-[#c9a96e] transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                      Email Address <span className="text-[#c9a96e]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0d8] bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 focus:border-[#c9a96e] transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1a1a2e] mb-2">
                      How can we help? <span className="text-[#c9a96e]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="I'm looking to buy a home in West Des Moines under $600K..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0d8] bg-white text-[#1a1a2e] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#c9a96e]/40 focus:border-[#c9a96e] transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1a1a2e] hover:bg-[#c9a96e] text-white py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-[#c9a96e]/30 hover:-translate-y-0.5"
                  >
                    Send Message →
                  </button>
                  <p className="text-center text-xs text-[#9ca3af]">
                    Or call directly: <a href="tel:+15155550515" className="text-[#c9a96e] font-medium">(515) 555-0515</a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a2e] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e] flex items-center justify-center">
                  <Home size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-lg leading-none">Keepnit</div>
                  <div className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase">Real Estate</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                Des Moines' most trusted luxury real estate agent. We help you buy, sell, and invest with confidence.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/keepnit.real.estate515"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-[#c9a96e] rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-[#c9a96e] rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/5 hover:bg-[#c9a96e] rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Services</h4>
              <ul className="space-y-3">
                {["Buy a Home", "Sell Your Home", "Luxury Estates", "Investment Property", "First-Time Buyers", "Relocation"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-[#c9a96e] text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Listings", "Testimonials", "Blog", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-[#c9a96e] text-sm transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Keepnit Real Estate. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-[#c9a96e] text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-[#c9a96e] text-xs transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-[#c9a96e] text-xs transition-colors">Equal Housing</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
