import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHero } from '../components/common/PageHero';
import { AboutSection } from '../components/home/AboutSection';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Check, Clock } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen pb-20 bg-studio-bg">
      <Helmet>
        <title>About Us — Sacred Heritage &amp; Clinical Safety | LAND OF GOD TATTOO STUDIO (Una, HP)</title>
        <meta
          name="description"
          content="Discover the sacred art philosophy, 100% medical-grade sterilization, and master tattoo heritage of Land of God Tattoo Studio in Friends Colony, Una, Himachal Pradesh."
        />
        <meta name="keywords" content="About Land of God Tattoo Studio, Best Tattoo Shop Una, Rahul Choudhary Tattoo Artist, Sterile Tattooing Himachal Pradesh, Friends Colony Una Tattoos" />
      </Helmet>

      {/* Hero Section with High-Resolution Studio Background Image */}
      <PageHero
        badge="॥ DEVBHOOMI HERITAGE & MASTER ARTISTRY ॥"
        title="Best Tattoo Artist in Una, Himachal Pradesh"
        subtitle="Land of God Tattoo Studio — Owned & Led by Rahul Choudhary • Friends Colony, Una (HP)"
        bgImage="/images/tattoo_studio_interior_lux.jpg"
        bgAlt="Land of God Tattoo Studio Interior - Friends Colony Una"
        description={
          <>
            Welcome to Land of God Tattoo Studio in Friends Colony, Una (HP), founded, owned, and led by Master Tattoo Artist <strong className="text-white font-semibold">Rahul Choudhary</strong>. Our atelier brings world-class custom stenciling, hyper-realistic portraits, sacred Mahadev calligraphy, and single-use cartridge safety to tattoo lovers across Himachal Pradesh and Punjab.
          </>
        }
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        <AboutSection />

        {/* Studio Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl border border-studio-border/50 space-y-3">
            <ShieldCheck className="w-8 h-8 text-studio-bronze" />
            <h3 className="font-display font-bold text-lg text-studio-textMain">Hospital-Grade Sterility</h3>
            <p className="text-xs text-studio-textMuted leading-relaxed">
              We employ medical-grade autoclaves, sealed single-use needle cartridges, non-toxic organic pigment blends, and HEPA air purification in all private workstations.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-studio-border/50 space-y-3">
            <Award className="w-8 h-8 text-studio-bronze" />
            <h3 className="font-display font-bold text-lg text-studio-textMain">Bespoke Fine Artistry</h3>
            <p className="text-xs text-studio-textMuted leading-relaxed">
              We never replicate existing tattoos without permission. Every stencil is hand-drawn and anatomically scaled to conform to your unique muscle curves.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl border border-studio-border/50 space-y-3">
            <Sparkles className="w-8 h-8 text-studio-bronze" />
            <h3 className="font-display font-bold text-lg text-studio-textMain">Lifetime Vibrancy</h3>
            <p className="text-xs text-studio-textMuted leading-relaxed">
              Our master artists calibrate needle depth to prevent blowouts and pigment migration, ensuring that sharp fine lines and heavy blackwork stay crisp for decades.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
