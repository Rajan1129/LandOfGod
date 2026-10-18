import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { Menu, X, User as UserIcon, Shield, Calendar, LogOut, Compass, ChevronDown, MapPin, Phone } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unaDropdownOpen, setUnaDropdownOpen] = useState(false);
  const [mobileUnaOpen, setMobileUnaOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();
  const navigate = useNavigate();

  const unaMenuItems = [
    {
      name: 'Tattoo Artist Near Me',
      path: '/tattoo-artist-near-me',
      desc: '#1 Top-rated studio near you in Una & HP',
    },
    {
      name: 'Best Tattoo Artist in Una (HP)',
      path: '/best-tattoo-artist-in-una',
      desc: 'Top-rated master artistry & awards',
    },
    {
      name: 'Best Tattoo Studio in Himachal',
      path: '/best-tattoo-studio-in-himachal-pradesh',
      desc: '#1 Premier atelier in Himachal Pradesh',
    },
    {
      name: 'Amb Tattoo Studio',
      path: '/amb-tattoo-studio',
      desc: 'Top custom studio serving Amb & Una',
    },
    {
      name: 'Nangal Tattoo Studio',
      path: '/nangal-tattoo-studio',
      desc: '15 mins from Nangal Dam & Punjab border',
    },
    {
      name: 'Chintpurni Tattoo Studio',
      path: '/chintpurni-tattoo-studio',
      desc: 'Sacred Devbhoomi & Mata shrine ink',
    },
    {
      name: 'Tattoo Artist in Una',
      path: '/tattoo-artist-in-una',
      desc: 'Clinical sterile safety & fine lines',
    },
    {
      name: 'Tattoo Designer in Una',
      path: '/tattoo-designer-in-una',
      desc: 'Custom stencils & 3D placement lab',
    },
    {
      name: 'Full Una Studio Showcase',
      path: '/landofgod-best-tattoo-artist-in-una-tattoo-designer-in-una',
      desc: 'Friends Colony, Una profile & map',
    },
  ];

  const phoneDisplay = settings?.phone || '+91 78079 66080';
  const whatsappNumber = (settings?.whatsapp || '917807966080').replace(/[^0-9]/g, '');
  const studioName = settings?.studioName || 'LAND OF GOD';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', hash: '#top' },
    { name: '3D Studio', path: '/interactive-3d' },
    { name: 'Blogs', path: '/blog', hash: '#blog' },
    { name: 'Calendar', path: '/calendar', hash: '#booking' },
    { name: 'About', path: '/about', hash: '#about' },
    { name: 'Contact', path: '/contact', hash: '#contact' },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/' && link.hash) {
      const el = document.querySelector(link.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(link.path);
  };

  const hasCustomAvatar = Boolean(
    user?.avatar &&
    !user.avatar.includes('images.unsplash.com') &&
    !user.avatar.includes('ui-avatars.com') &&
    user.avatar.trim() !== ''
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-xl border-b border-white/10' : 'bg-studio-darker/90 backdrop-blur-sm border-b border-white/5'}`}>
      {/* Topmost Micro-Bar with Phone Icon */}
      <div className="bg-black/95 border-b border-white/[0.08] py-1 sm:py-1.5 px-3 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-2">
          {/* Direct Phone Call Action with Phone Icon */}
          <a
            href="tel:+917807966080"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-amber-400 hover:text-amber-300 font-bold transition-all group shrink-0"
            title="Call Land of God Tattoo Studio (+91 78079 66080)"
          >
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-400/30 group-hover:scale-105 transition-all">
              <Phone className="w-3 h-3 text-amber-400" />
            </span>
            <span className="text-[11px] sm:text-xs font-black tracking-wider text-amber-300 group-hover:text-amber-200">
              +91 78079 66080
            </span>
          </a>

          {/* Location & Studio Hours */}
          <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-[10px] md:text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Friends Colony, Una, HP</span>
            </span>
            <span className="text-zinc-600">•</span>
            <span>10:30 AM – 8:30 PM</span>
          </div>

          {/* WhatsApp Direct Inquiry Shortcut */}
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Header Bar */}
      <div className="max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink min-w-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-black p-0.5 border border-amber-400/50 shadow-md group-hover:border-amber-400 group-hover:scale-105 transition-all flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Land of God Tattoo Studio Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-extrabold text-xs sm:text-base tracking-wider text-white uppercase leading-tight truncate">
              LAND OF <span className="text-amber-400">GOD</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-wider text-zinc-400 uppercase font-semibold truncate">
              TATTOO STUDIO • UNA, HP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-3">
          {navLinks.slice(0, 2).map((link) => {
            const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.hash);
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 font-bold shadow-[0_0_10px_rgba(245,158,11,0.15)] border border-amber-400/30'
                    : 'text-studio-textMuted hover:text-studio-textMain hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Una Studio Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setUnaDropdownOpen(true)}
            onMouseLeave={() => setUnaDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setUnaDropdownOpen(!unaDropdownOpen)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                location.pathname.includes('-in-una')
                  ? 'text-amber-400 bg-amber-400/10 font-bold shadow-[0_0_10px_rgba(245,158,11,0.15)] border border-amber-400/30'
                  : 'text-studio-textMuted hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Una Studio</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  unaDropdownOpen ? 'rotate-180 text-amber-400' : ''
                }`}
              />
            </button>

            {unaDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-72 bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-1.5 border-b border-white/[0.08] mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block">
                    Una, Himachal Pradesh
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Local Atelier &amp; Artist Pages
                  </span>
                </div>
                {unaMenuItems.map((item) => {
                  const isItemActive =
                    location.pathname === item.path || location.pathname === `${item.path}/`;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setUnaDropdownOpen(false)}
                      className={`block px-3.5 py-2.5 transition-colors ${
                        isItemActive
                          ? 'bg-amber-400/10 text-amber-300'
                          : 'hover:bg-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold leading-snug flex items-center justify-between">
                        <span>{item.name}</span>
                        {isItemActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <div className="text-[11px] text-zinc-500 mt-0.5 font-normal">
                        {item.desc}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => {
            const isActive = location.pathname === link.path || (location.pathname === '/' && location.hash === link.hash);
            const isContact = link.name === 'Contact';

            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[13px] font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/10 font-bold shadow-[0_0_10px_rgba(245,158,11,0.15)] border border-amber-400/30'
                    : isContact
                    ? 'text-studio-textMuted hover:text-amber-300 hover:bg-white/5 border border-white/10'
                    : 'text-studio-textMuted hover:text-studio-textMain hover:bg-white/5'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Profile / Admin actions */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`h-9 px-3.5 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isAdmin
                    ? 'text-amber-300 bg-gradient-to-r from-amber-950/60 to-black border border-amber-500/50 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'text-studio-textMain bg-studio-card/80 border border-white/10 hover:bg-studio-card'
                }`}
              >
                {hasCustomAvatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-amber-400"
                  />
                ) : isAdmin ? (
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-studio-bronzeLight">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                )}
                <span className="truncate max-w-[100px]">
                  {isAdmin ? 'ADMIN' : user.name.split(' ')[0]}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 bg-studio-secondary/95 backdrop-blur-xl border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-white/10 text-xs text-studio-textMuted">
                    Signed in as <p className="font-semibold text-studio-textMain truncate mt-0.5">{user.email}</p>
                  </div>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-amber-400 hover:bg-amber-400/10 hover:text-amber-300 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Admin Portal</span>
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-studio-textMain hover:bg-white/5"
                    >
                      <UserIcon className="w-4 h-4 text-studio-bronzeLight" />
                      <span>My Profile & Inks</span>
                    </Link>
                  )}
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-950/20 text-left transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-studio-textMuted hover:text-amber-400 hover:bg-white/5 border border-white/10 transition-colors"
              title="Studio Administrator & Staff Portal"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400/80" />
              <span>Staff Admin</span>
            </Link>
          )}

          {/* Direct Phone Call Action */}
          <a
            href="tel:+917807966080"
            className="h-9 px-3.5 rounded-full flex items-center gap-1.5 text-xs font-bold tracking-wide text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-400/40 hover:border-amber-400 shadow-sm transition-all"
            title="Call +91 78079 66080"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>+91 78079 66080</span>
          </a>

          {/* Direct WhatsApp Action */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-wide text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 shadow-sm transition-all"
          >
            <span className="text-sm leading-none">💬</span>
            <span>WhatsApp</span>
          </a>

          {/* BOOK NOW Primary CTA */}
          <Link
            to="/booking"
            className="h-9 px-5 rounded-full flex items-center justify-center text-xs font-black uppercase tracking-[0.14em] text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.35)] transition-all duration-300 transform hover:scale-[1.03] active:scale-95"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Mobile Call, WhatsApp & Hamburger Toggle */}
        <div className="xl:hidden flex items-center space-x-1 sm:space-x-2 shrink-0">
          <a
            href="tel:+917807966080"
            className="bg-amber-950/70 border border-amber-400/40 text-amber-300 hover:text-white px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-bold rounded flex items-center space-x-1 transition-colors"
            title="Call +91 78079 66080"
          >
            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">+91 78079 66080</span>
            <span className="inline sm:hidden">Call</span>
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase rounded flex items-center space-x-1"
          >
            <span>💬</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-studio-textMain hover:text-studio-bronzeLight bg-studio-card/80 border border-studio-border"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-studio-secondary/95 backdrop-blur-xl border-b border-studio-border px-4 sm:px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-studio-border/50">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className="text-left text-sm py-2 px-3 rounded hover:bg-studio-card text-studio-textMuted hover:text-studio-bronzeLight transition-colors font-medium"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick({ name: 'Contact', path: '/contact', hash: '#contact' })}
              className="text-left text-sm py-2 px-3 rounded bg-studio-gold/10 text-studio-gold font-bold border border-studio-gold/30 hover:bg-studio-gold/20 transition-colors"
            >
              Contact Us
            </button>

            {/* Mobile Una Studio Dropdown */}
            <div className="col-span-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setMobileUnaOpen(!mobileUnaOpen)}
                className="w-full flex items-center justify-between text-left text-sm py-2.5 px-3 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-300 font-bold transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Una Studio Pages</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileUnaOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileUnaOpen && (
                <div className="pl-3 pr-2 py-1.5 space-y-1 bg-black/40 rounded-xl my-2 border border-white/5">
                  {unaMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileUnaOpen(false);
                      }}
                      className="block py-2 px-2 text-xs text-zinc-300 hover:text-amber-300 font-medium border-b border-white/5 last:border-0"
                    >
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-col space-y-3">
            {user ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-sm text-amber-400 font-bold py-2 px-3 rounded bg-amber-950/30 border border-amber-500/40"
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin Portal</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-sm text-studio-textMain py-2"
                  >
                    <UserIcon className="w-4 h-4 text-studio-bronzeLight" />
                    <span>Profile ({user.name})</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center space-x-2 text-sm text-red-400 py-2 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-studio-card border border-studio-border py-2 text-sm font-semibold uppercase tracking-wider text-studio-bronzeLight"
              >
                Admin Login
              </Link>
            )}

            <a
              href="tel:+917807966080"
              className="flex items-center justify-center space-x-2 text-center bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 font-bold py-2.5 text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: +91 78079 66080</span>
            </a>

            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-gradient-to-r from-studio-bronze to-studio-bronzeDark text-studio-darker font-bold py-3 uppercase tracking-widest text-xs shadow-bronze rounded-lg"
            >
              Book Studio Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
