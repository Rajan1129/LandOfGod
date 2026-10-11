import React from 'react';

export const PageHero = ({
  badge,
  title,
  subtitle,
  description,
  bgImage = '/images/tattoo_studio_hero.jpg',
  bgAlt = 'Land of God Tattoo Studio - Una, Himachal Pradesh',
  children,
  className = '',
  compact = false,
}) => {
  return (
    <section
      aria-label={typeof title === 'string' ? title : 'Page Header'}
      className={`relative pt-28 sm:pt-32 ${compact ? 'pb-10 sm:pb-14' : 'pb-14 sm:pb-20'} overflow-hidden text-center w-full max-w-full ${className}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={bgAlt}
          className="w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.15] scale-[1.01] transform transition-transform duration-1000"
        />

        {/* Multi-layered Cinematic Dark Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-studio-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/[0.08] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-amber-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {badge && (
            <div className="max-w-full flex justify-center px-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-bold text-studio-gold font-serif inline-flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/65 border border-amber-400/30 backdrop-blur-md shadow-lg shadow-black/50 max-w-full truncate">
                <span className="truncate">{badge}</span>
              </span>
            </div>
          )}

          {title && (
            <h1 className="ancient-carved-heading text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight break-words">
              {title}
            </h1>
          )}

          {subtitle && (
            <h2 className="text-xs sm:text-sm md:text-base text-studio-gold font-serif leading-snug">
              {subtitle}
            </h2>
          )}

          {description && (
            <div className="text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed max-w-2xl mx-auto">
              {typeof description === 'string' ? <p>{description}</p> : description}
            </div>
          )}

          {children && (
            <div className="pt-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
