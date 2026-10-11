import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Calendar,
  ArrowRight,
  Compass,
  CheckCircle2,
  Clock,
  Layers,
  Heart
} from 'lucide-react';
import { createArtworkInquiryUrl } from '../utils/whatsapp';

export const UnaTattooArtistPage = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const rawPath = location.pathname.toLowerCase().replace(/\/+$/, '');

  let pageMeta = {
    title: 'Land of God — Best Tattoo Artist in Una | #1 Tattoo Designer in Una, HP',
    h1Main: 'Best Tattoo Artist in Una',
    h1Accent: '& Premier Tattoo Designer.',
    description: 'Looking for the best tattoo artist in Una? Land of God Tattoo Studio is the #1 rated tattoo designer in Una, Himachal Pradesh. Master Sunil specializes in sacred Devbhoomi Mahadev tattoos, fine-line realism, portraits, and 100% sterile hygiene. Book consultation today!',
    badge: '#1 Rated in Una, Himachal Pradesh',
    canonical: `https://tattoo-studio-nine.vercel.app${rawPath || '/landofgod-best-tattoo-artist-in-una-tattoo-designer-in-una'}/`,
  };

  if (rawPath === '/amb-tattoo-studio') {
    pageMeta = {
      title: 'Amb Tattoo Studio — Best Custom Tattoo Parlor near Amb, HP | Land of God',
      h1Main: 'Amb Tattoo Studio',
      h1Accent: '& Premier Tattoo Atelier near Amb, HP.',
      description: 'Looking for a top-rated tattoo studio near Amb, Himachal Pradesh? Land of God Tattoo Studio in Friends Colony, Una (just 25 mins from Amb) delivers master fine-line tattooing, 100% sterile safety, and custom Devbhoomi designs.',
      badge: 'Premier Tattoo Studio for Amb & Una Region',
      canonical: 'https://land-of-god-nine.vercel.app/amb-tattoo-studio/',
    };
  } else if (rawPath === '/nangal-tattoo-studio') {
    pageMeta = {
      title: 'Nangal Tattoo Studio — Top Rated Tattoo Parlor near Nangal Punjab & Una HP',
      h1Main: 'Nangal Tattoo Studio',
      h1Accent: '& Master Ink Artistry near Nangal.',
      description: 'Looking for the best tattoo studio near Nangal? Land of God Tattoo Studio is located right next door in Friends Colony, Una (15 mins from Nangal Dam). Renowned for sacred Devbhoomi realism, portraits, and clinical hospital-grade sterilization.',
      badge: 'Trusted by Clients Across Nangal & Una',
      canonical: 'https://land-of-god-nine.vercel.app/nangal-tattoo-studio/',
    };
  } else if (rawPath === '/chintpurni-tattoo-studio') {
    pageMeta = {
      title: 'Chintpurni Tattoo Studio — Sacred Devbhoomi Tattooing near Mata Chintpurni',
      h1Main: 'Chintpurni Tattoo Studio',
      h1Accent: '& Sacred Devbhoomi Tattoo Atelier.',
      description: 'Visiting sacred Maa Chintpurni Dham? Commemorate your spiritual journey with an authentic sacred tattoo from Master Sunil at Land of God Tattoo Studio in Friends Colony, Una. Specialists in Mahadev Trishul, Sanskrit mantras, and Maa Shakti iconography.',
      badge: 'Sacred Devbhoomi Tattoos • Near Chintpurni Shrine',
      canonical: 'https://land-of-god-nine.vercel.app/chintpurni-tattoo-studio/',
    };
  } else if (rawPath === '/best-tattoo-studio-in-himachal-pradesh') {
    pageMeta = {
      title: 'Best Tattoo Studio in Himachal Pradesh — Award-Winning Ink | Land of God',
      h1Main: 'Best Tattoo Studio in Himachal Pradesh',
      h1Accent: '& Northern India Premier Atelier.',
      description: 'Discover the #1 best tattoo studio in Himachal Pradesh. Land of God Tattoo Studio in Una combines international hygiene standards, 3D anatomical placement simulator, and master fine-line craftsmanship.',
      badge: '#1 Premier Tattoo Atelier in Himachal Pradesh',
      canonical: 'https://land-of-god-nine.vercel.app/best-tattoo-studio-in-himachal-pradesh/',
    };
  } else if (rawPath === '/best-tattoo-artist-in-una-himachal-pradesh') {
    pageMeta = {
      title: 'Best Tattoo Artist in Una Himachal Pradesh — Master Sunil | Land of God',
      h1Main: 'Best Tattoo Artist in Una Himachal Pradesh',
      h1Accent: '& Master Ink Artisan in Devbhoomi.',
      description: 'Looking for the best tattoo artist in Una, Himachal Pradesh? Master Sunil at Land of God Tattoo Studio offers 10+ years of award-winning mastery in sacred Devbhoomi ink, fine-line realism, and sterile clinical safety.',
      badge: 'Master Tattooist • Friends Colony, Una, HP',
      canonical: 'https://land-of-god-nine.vercel.app/best-tattoo-artist-in-una-himachal-pradesh/',
    };
  } else if (rawPath === '/best-tattoo-artist-in-una') {
    pageMeta = {
      title: 'Best Tattoo Artist in Una — Master Sunil | Land of God Tattoo Studio',
      h1Main: 'Best Tattoo Artist in Una',
      h1Accent: '& Master Ink Artisan in Himachal Pradesh.',
      description: 'Book the best tattoo artist in Una, HP. Master Sunil at Land of God Tattoo Studio brings 10+ years of award-winning mastery in sacred Devbhoomi ink, fine-line realism, and sterile clinical safety.',
      badge: 'Award-Winning Artist • Friends Colony, Una',
      canonical: 'https://land-of-god-nine.vercel.app/best-tattoo-artist-in-una/',
    };
  } else if (rawPath === '/tattoo-artist-in-una') {
    pageMeta = {
      title: 'Tattoo Artist in Una — Certified Sterile Custom Artistry | Land of God',
      h1Main: 'Tattoo Artist in Una',
      h1Accent: '& Sacred Devbhoomi Body Atelier.',
      description: 'Looking for a certified professional tattoo artist in Una? Visit Land of God Tattoo Studio for custom fine line tattoos, sacred Mahadev calligraphy, and single-use sterile safety.',
      badge: 'Certified Professional • Friends Colony, Una',
      canonical: 'https://land-of-god-nine.vercel.app/tattoo-artist-in-una/',
    };
  } else if (rawPath === '/tattoo-designer-in-una') {
    pageMeta = {
      title: 'Tattoo Designer in Una — 100% Bespoke Stencils & 3D Fitting Lab',
      h1Main: 'Tattoo Designer in Una',
      h1Accent: '& Custom Stencil Artwork Specialist.',
      description: 'Get your original custom tattoo designed in Una, Himachal Pradesh. Land of God Tattoo Studio crafts hand-drawn bespoke stencils mapped to your anatomy with our 3D visualizer.',
      badge: 'Bespoke Stencil Design • Friends Colony, Una',
      canonical: 'https://land-of-god-nine.vercel.app/tattoo-designer-in-una/',
    };
  }

  const studioName = settings?.studioName || 'LAND OF GOD TATTOO STUDIO';
  const street = settings?.address?.street || 'Friends Colony';
  const city = settings?.address?.city || 'Una';
  const state = settings?.address?.state || 'Himachal Pradesh';
  const phone = settings?.phone || '+91 78079 66080';
  const whatsapp = settings?.whatsapp || '+917807966080';

  const handleWhatsApp = (topic = 'General Tattoo Consultation in Una') => {
    const waUrl = createArtworkInquiryUrl(topic, 'Master Sunil', 'Una Studio');
    window.open(waUrl, '_blank');
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: 'Land of God Tattoo Studio',
    alternateName: 'Best Tattoo Artist & Tattoo Designer in Una',
    image: 'https://tattoo-studio-nine.vercel.app/images/tattoo_studio_hero.jpg',
    url: pageMeta.canonical,
    telephone: phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      addressRegion: state,
      postalCode: '174303',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.4685,
      longitude: 76.2708
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '11:00',
        closes: '19:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '520'
    }
  };

  const faqs = [
    {
      q: 'Who is the best tattoo artist in Una, Himachal Pradesh?',
      a: 'Master Sunil at Land of God Tattoo Studio in Friends Colony, Una is widely rated the best tattoo artist in Una, specializing in sacred Mahadev calligraphy, fine-line realism, geometric mandalas, and custom cover-up tattoos with over 10 years of master experience.'
    },
    {
      q: 'How can I get a custom tattoo designed in Una?',
      a: 'You can book a private consultation at Land of God Tattoo Studio in Friends Colony, Una, or chat directly via WhatsApp. Our master artists create 100% custom, hand-crafted stencils scaled to your unique anatomy, backed by our 3D anatomical placement visualizer.'
    },
    {
      q: 'Is tattooing safe and sterile at Land of God Tattoo Studio in Una?',
      a: 'Yes, absolutely. We maintain hospital-grade clinical hygiene with 100% single-use membrane cartridge needles, medical autoclave sterilization, certified hypoallergenic organic vegan inks, and strict sterile workstation prep.'
    },
    {
      q: 'What tattoo styles are available at Land of God in Una?',
      a: 'We offer Sacred Devbhoomi iconography (Mahadev, Trishul, Om), hyper-realistic portraits, geometric mandalas, Japanese Irezumi, minimalist fine line scripts, tribal art, and custom color realism.'
    },
    {
      q: 'Where is Land of God Tattoo Studio located in Una?',
      a: 'Our studio is located in Friends Colony, Una, Himachal Pradesh (PIN: 174303). We welcome clients from across Una, Nangal, Hoshiarpur, Kangra, Hamirpur, and all over Himachal Pradesh and Punjab.'
    }
  ];

  return (
    <div className="min-h-screen bg-studio-bg text-studio-textMain">
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta
          name="keywords"
          content="Best Tattoo Artist in Una, Tattoo Designer in Una, Tattoo Artist in Una, Land of God Tattoo Studio, Tattoo Shop in Una Himachal Pradesh, Master Sunil Tattoo Artist, Friends Colony Una Tattoos, Mahadev Trishul Tattoo Una, Sacred Devbhoomi Tattoos"
        />
        <link rel="canonical" href={pageMeta.canonical} />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.description} />
        <meta property="og:url" content={pageMeta.canonical} />
        <meta property="og:type" content="business.business" />
        <script type="application/ld+json">{JSON.stringify(schemaJson)}</script>
      </Helmet>

      {/* HERO BANNER */}
      <section className="relative min-h-[85vh] pt-32 pb-20 flex flex-col justify-center items-center text-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tattoo_studio_hero.jpg"
            alt="Best Tattoo Artist in Una - Land of God Tattoo Studio Interior"
            className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-studio-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/[0.08] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative space-y-6">
          
          {/* Location Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              {pageMeta.badge}
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="text-[11px] sm:text-xs text-zinc-300 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {street}, {city}
            </span>
          </div>

          {/* H1 Heading targeting keyword */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08] max-w-5xl mx-auto">
            {pageMeta.h1Main} <br />
            <span className="font-serif italic font-normal normal-case text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              {pageMeta.h1Accent}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed">
            Welcome to <strong className="text-white font-semibold">Land of God Tattoo Studio</strong> — the premier destination for sacred Devbhoomi iconography, realistic portraiture, geometric mandalas, and custom fine-line tattooing in Una, Himachal Pradesh. Led by certified Master Artist Sunil with hospital-grade European hygiene standards.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/booking')}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 text-black font-bold py-4 px-8 text-xs sm:text-sm uppercase tracking-[0.16em] rounded-2xl shadow-[0_12px_30px_rgba(251,191,36,0.35)] flex items-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Book Appointment in Una</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => handleWhatsApp('Consultation for Custom Tattoo in Una')}
              className="bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white font-medium py-4 px-7 text-xs sm:text-sm rounded-2xl transition-all flex items-center space-x-2 backdrop-blur-md hover:border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Master Sunil</span>
            </button>

            <Link
              to="/interactive-3d"
              className="bg-zinc-900/80 hover:bg-zinc-800 border border-amber-400/30 text-amber-300 hover:text-amber-200 font-medium py-4 px-7 text-xs sm:text-sm rounded-2xl transition-all flex items-center space-x-2 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>3D Body Visualizer</span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">100% Sterile</h4>
                <p className="text-[11px] text-zinc-400">Single-use needles</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">10+ Years Exp.</h4>
                <p className="text-[11px] text-zinc-400">Master Sunil (Una)</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">Custom Stencils</h4>
                <p className="text-[11px] text-zinc-400">Original Designs</p>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase">4.9/5 Rating</h4>
                <p className="text-[11px] text-zinc-400">500+ Local Reviews</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: WHY WE ARE THE #1 TATTOO DESIGNER IN UNA */}
      <section className="py-20 bg-zinc-950/60 border-t border-b border-white/5 relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Why Choose Us in Una
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase">
              The Gold Standard of Tattooing in Una, Himachal Pradesh
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              When choosing a tattoo artist in Una, precision, artistic depth, and sterile safety are paramount. At Land of God Tattoo Studio, every piece is treated as a lifelong masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Custom Anatomical Tattoo Design</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                As Una's leading custom tattoo designer, Master Sunil does not use generic internet stencils. Every design is hand-drawn, tailored to your story, and aligned to your exact muscle structure using our exclusive 3D placement studio.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Hospital-Grade Sterilization</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Your safety is non-negotiable. We operate under rigorous clinical hygiene protocols: 100% single-use membrane cartridge needles, medical-grade surface disinfection, autoclave sterilization, and premium European vegan pigments.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 hover:border-amber-400/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sacred Devbhoomi Heritage</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Rooted in the spiritual soil of Devbhoomi Himachal, we specialize in authentic Mahadev Trishul iconography, sacred Sanskrit mantras, ancient script calligraphy, and meditative geometric mandalas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: TATTOO STYLES & SPECIALTIES IN UNA */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Artistic Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase">
              Tattoo Styles Mastered in Una
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore the signature aesthetics crafted by Master Sunil at our Una atelier:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Sacred Devbhoomi & Mahadev',
                desc: 'Intricate Trishul, Damru, Mahakal faces, third eye, and Sanskrit mantras with lifelong crispness.',
                tag: 'Bestseller in Una'
              },
              {
                title: 'Fine Line & Micro Realism',
                desc: 'Single-needle precision tattoos, delicate floral botanicals, and razor-sharp script typography.',
                tag: 'Modern Aesthetic'
              },
              {
                title: 'Geometric & Sacred Mandalas',
                desc: 'Symmetrical sacred geometry, dotwork stippling, and anatomical sleeve compositions.',
                tag: 'Harmonic Precision'
              },
              {
                title: 'Hyper-Realistic Portraits',
                desc: 'Photorealistic faces, wildlife lions, wolves, and cinematic black-and-grey shading.',
                tag: 'Master Class'
              },
              {
                title: 'Neo-Traditional & Japanese',
                desc: 'Bold lines, dynamic movement, Japanese Koi fish, dragons, and rich gradient fills.',
                tag: 'Classic Ink'
              },
              {
                title: 'Custom Cover-Up Mastery',
                desc: 'Transform old or faded tattoos into breathtaking new artworks without laser surgery.',
                tag: 'Tattoo Restoration'
              }
            ].map((style, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 font-semibold border border-amber-400/30">
                    {style.tag}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{style.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{style.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to="/portfolio"
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                  >
                    <span>View Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleWhatsApp(`Inquiry for ${style.title} in Una`)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Inquire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: FAQS FOR LOCAL UNA SEARCHERS */}
      <section className="py-20 bg-zinc-950/70 border-t border-b border-white/5">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
              Tattooing in Una — All You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-2 text-left"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400 font-mono text-sm">Q{idx + 1}.</span>
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: STUDIO LOCATION & CONTACT CARD */}
      <section className="py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                Visit Our Una Atelier
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase leading-tight">
                Get Inked by the Best Tattoo Artist in Una
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                Ready to bring your tattoo vision to life? Visit our state-of-the-art studio in Friends Colony, Una, or schedule your private consultation with Master Sunil.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-zinc-300 text-sm">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Studio Address:</strong>
                    <span>{street}, {city}, {state} — 174303, India</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-zinc-300 text-sm">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Call / Phone:</strong>
                    <span>{phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-zinc-300 text-sm">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Studio Hours:</strong>
                    <span>Mon - Sat: 10:00 AM – 8:30 PM | Sun: 11:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/booking')}
                  className="bg-amber-400 hover:bg-amber-300 text-black font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Reserve Date &amp; Time
                </button>
                <button
                  onClick={() => handleWhatsApp('Direct Studio Consultation in Una')}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-6 rounded-xl text-xs flex items-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Directly</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900 min-h-[380px]">
              <iframe
                title="Land of God Tattoo Studio Una Location Map"
                src="https://maps.google.com/maps?q=Friends+Colony+Una+Himachal+Pradesh+174303&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[380px] border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-[1.2]"
                loading="lazy"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
