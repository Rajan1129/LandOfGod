import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHero } from '../components/common/PageHero';
import { ContactSection } from '../components/home/ContactSection';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="min-h-screen pb-20 bg-studio-bg w-full max-w-full overflow-x-hidden">
      <Helmet>
        <title>Contact &amp; Studio Location — LAND OF GOD TATTOO STUDIO (Una, HP)</title>
        <meta
          name="description"
          content="Visit Land of God Tattoo Studio in Friends Colony, Una, Himachal Pradesh. Chat directly on WhatsApp (+91 78079 66080) for custom inquiries and appointments."
        />
      </Helmet>

      {/* Hero Section with High-Resolution Studio Background Image */}
      <PageHero
        badge="॥ VISIT OUR FRIENDS COLONY UNA ATELIER ॥"
        title="Contact Best Tattoo Studio in Una, Himachal Pradesh"
        subtitle="Land of God Tattoo Studio — Owner: Rahul Choudhary • Friends Colony, Una, HP (174303)"
        description={
          <>
            Directly accessible for clients across Una, Nangal (15 mins), Amb (25 mins via NH503), Chintpurni, and Anandpur Sahib. Connect directly with Owner Rahul Choudhary and Master Artists on WhatsApp at <strong className="text-studio-gold">+91 78079 66080</strong> for custom stencil consultations and appointments.
          </>
        }
        bgImage="/images/tattoo_studio_interior_lux.jpg"
        bgAlt="Land of God Tattoo Studio Location in Una"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

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
