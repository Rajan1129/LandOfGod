import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHero } from '../components/common/PageHero';
import { BookingSection } from '../components/home/BookingSection';
import { ShieldCheck, Sparkles, Clock, Calendar } from 'lucide-react';

export const BookingPage = () => {
  return (
    <div className="min-h-screen pb-20 bg-studio-bg w-full max-w-full overflow-x-hidden">
      <Helmet>
        <title>Reserve Studio Appointment — LAND OF GOD TATTOO STUDIO (Una, HP)</title>
        <meta
          name="description"
          content="Reserve your sacred tattoo appointment at Land of God Tattoo Studio in Friends Colony, Una, Himachal Pradesh. Rahul Choudhary, direct WhatsApp booking (+91 78079 66080)."
        />
      </Helmet>

      {/* Hero Section with High-Resolution Studio Background Image */}
      <PageHero
        badge="🔱 DEVBHOOMI ATELIER APPOINTMENTS 🔱"
        title="॥ RESERVE YOUR INK SESSION ॥"
        subtitle="Custom Tattoo Consultations & Appointments — Friends Colony, Una (HP)"
        description={
          <>
            Select your preferred sacred style, placement, and resident artist. You can also chat directly on WhatsApp at <strong className="text-studio-gold">+91 78079 66080</strong>.
          </>
        }
        bgImage="/images/tattoo_studio_hero_bg.jpg"
        bgAlt="Land of God Tattoo Studio Appointment Booking"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Studio Policy Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          <div className="ancient-stone-card ancient-ornate-corner p-4 rounded-lg flex items-center space-x-3 text-xs font-serif">
            <ShieldCheck className="w-5 h-5 text-studio-gold shrink-0" />
            <span>100% Single-use disposable cartridges &amp; medical cleanroom</span>
          </div>
          <div className="ancient-stone-card ancient-ornate-corner p-4 rounded-lg flex items-center space-x-3 text-xs font-serif">
            <Clock className="w-5 h-5 text-studio-gold shrink-0" />
            <span>Pre-session sacred geometry alignment with Rahul Choudhary</span>
          </div>
          <div className="ancient-stone-card ancient-ornate-corner p-4 rounded-lg flex items-center space-x-3 text-xs font-serif">
            <Sparkles className="w-5 h-5 text-studio-gold shrink-0" />
            <span>Direct WhatsApp confirmation &amp; custom stencil preview</span>
          </div>
        </div>

        {/* Embed Full Booking Section Module */}
        <BookingSection />

      </div>
    </div>
  );
};
