import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ContactSection } from '../components/home/ContactSection';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-studio-bg">
      <Helmet>
        <title>Contact &amp; Studio Location — LAND OF GOD TATTOO STUDIO (Una, HP)</title>
        <meta
          name="description"
          content="Visit Land of God Tattoo Studio in Friends Colony, Una, Himachal Pradesh. Chat directly on WhatsApp (+91 78079 66080) for custom inquiries and appointments."
        />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-studio-gold font-serif">
            ॥ VISIT OUR FRIENDS COLONY UNA ATELIER ॥
          </span>
          <h1 className="ancient-carved-heading text-3xl sm:text-5xl uppercase tracking-wider text-studio-textMain">
            Contact Best Tattoo Studio in Una, Himachal Pradesh
          </h1>
          <h2 className="text-sm sm:text-base text-studio-gold font-serif">
            Land of God Tattoo Studio — Owner: Rahul Choudhary • Friends Colony, Una, HP (174303)
          </h2>
          <p className="text-xs sm:text-sm text-studio-textMuted font-serif leading-relaxed">
            Directly accessible for clients across Una, Nangal (15 mins), Amb (25 mins via NH503), Chintpurni, and Anandpur Sahib. Connect directly with Owner Rahul Choudhary and Master Artists on WhatsApp at <strong className="text-studio-gold">+91 78079 66080</strong> for custom stencil consultations and appointments.
          </p>
        </div>

        <ContactSection />

        {/* REGIONAL DRIVING & TRANSIT GUIDE */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">From Nangal &amp; Anandpur Sahib</span>
            <h3 className="text-base font-bold text-white">15 Minutes via Nangal-Una Road</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cross Mehatpur border onto Una main highway. Turn towards Friends Colony for private dedicated parking and quiet studio suites.
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">From Amb &amp; Gagret</span>
            <h3 className="text-base font-bold text-white">25 Minutes via NH503</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Take the smooth 4-lane stretch from Amb straight into Una city center. Friends Colony is easily reachable without congested city traffic.
            </p>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">From Chintpurni &amp; Kangra</span>
            <h3 className="text-base font-bold text-white">45–60 Minutes Scenic Drive</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ideal stop for pilgrims and travelers returning from sacred Maa Chintpurni shrine seeking authentic spiritual Mahadev and Sanskrit ink.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
