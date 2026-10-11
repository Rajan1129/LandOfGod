import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import {
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Award,
  Sparkles,
  Star,
  Compass,
  MapPin,
  Calendar
} from 'lucide-react';
import { createArtworkInquiryUrl } from '../../utils/whatsapp';

export const Hero = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();

  const studioName = settings?.studioName || 'LAND OF GOD TATTOO STUDIO';
  const street = settings?.address?.street || 'Friends Colony';
  const city = settings?.address?.city || 'Una';
  const state = settings?.address?.state || 'Himachal Pradesh';

  const heroHeadline = settings?.heroHeadline;
  const heroSubtitle = settings?.heroSubtitle;

  const handleBook = () => {
    navigate('/booking');
  };

  const handleWhatsApp = () => {
    const summary = 'Consultation Inquiry - Land of God Tattoo Studio';
    const waUrl = createArtworkInquiryUrl(summary, 'Rahul Choudhary', 'Custom');
    window.open(waUrl, '_blank');
  };

  return (
    <section
      id="hero"
      aria-label="Tattoo Studio Hero Section"
      className="relative min-h-[92vh] pt-32 pb-24 flex flex-col justify-center items-center overflow-hidden bg-zinc-950 text-center w-full max-w-full"
    >
      {/* High-Resolution Tattoo Studio Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/tattoo_studio_hero.jpg"
          alt="Land of God Tattoo Studio Interior - Professional Custom Tattoo Atelier in Una, Himachal Pradesh"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.15] scale-[1.02] transform transition-transform duration-1000"
        />

        {/* Multi-layered Cinematic Dark Atmospheric Overlays for Optimal Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-studio-bg" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-amber-500/[0.06] rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative space-y-6 sm:space-y-8">
        
        {/* SEO Location & Studio Trust Pill */}
        <div className="inline-flex max-w-[calc(100%-1rem)] sm:max-w-full items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-lg shadow-black/40">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-300 truncate">
            {studioName}
          </span>
          <span className="text-zinc-500 text-xs hidden sm:inline">•</span>
          <span className="text-[10px] sm:text-xs text-zinc-300 font-medium hidden sm:flex items-center gap-1 shrink-0">
            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{city}, HP</span>
          </span>
        </div>

        {/* SEO Primary Heading (H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.08] max-w-5xl mx-auto break-words w-full">
          {heroHeadline && !heroHeadline.toLowerCase().includes('vision') ? (
            <span className="whitespace-pre-line">{heroHeadline}</span>
          ) : (
            <>
              Your Vision, <br />
              <span className="font-serif italic font-normal normal-case text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                Our Ink.
              </span>
            </>
          )}
        </h1>

        {/* SEO Body Paragraph */}
        <p className="text-xs sm:text-base md:text-xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed break-words w-full px-2">
          {heroSubtitle ? (
            heroSubtitle
          ) : (
            `Welcome to ${studioName} — Northern India's destination for custom tattoo masterpieces, sacred Devbhoomi calligraphy, hyper-realistic portraits, and fine-line geometry in Una, Himachal Pradesh. Executed with hospital-grade European sterilization, 100% single-use membrane needles, and personalized consultation.`
          )}
        </p>

        {/* Action Buttons / CTAs */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={handleBook}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 text-black font-bold py-3.5 sm:py-4 px-6 sm:px-8 text-xs sm:text-sm uppercase tracking-[0.16em] rounded-2xl shadow-[0_12px_30px_rgba(251,191,36,0.35)] flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4 stroke-[2.5]" />
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-200 hover:text-white font-medium py-3.5 sm:py-4 px-6 sm:px-7 text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center space-x-2 backdrop-blur-md hover:border-emerald-500/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Artist</span>
          </button>

          <Link
            to="/interactive-3d"
            className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 border border-amber-400/30 text-amber-300 hover:text-amber-200 font-medium py-3.5 sm:py-4 px-6 sm:px-7 text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center space-x-2 backdrop-blur-md"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>3D Anatomical Studio</span>
          </Link>

          <Link
            to="/portfolio"
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-amber-300 underline underline-offset-4 px-3 py-2 transition-colors inline-block"
          >
            View Portfolio →
          </Link>
        </div>

        {/* SEO Trust Badges & Clinical Standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto border-t border-white/10 text-left">
          <div className="p-4 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">100% Sterile</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">Autoclave &amp; Single-Use</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Master Artists</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">10+ Yrs Craftsmanship</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Custom Stencils</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">Bespoke Tattoo Design</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">4.9/5 Rating</h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">500+ Verified Reviews</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
