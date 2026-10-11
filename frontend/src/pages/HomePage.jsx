import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { BookingSection } from '../components/home/BookingSection';
import { AftercareSection } from '../components/home/AftercareSection';
import { BlogSection } from '../components/home/BlogSection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage = () => {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden">
      <Helmet>
        <title>LAND OF GOD TATTOO STUDIO — Premier Custom Tattoo & Sacred Art Atelier | Una, Himachal Pradesh</title>
        <meta
          name="description"
          content="Land of God Tattoo Studio in Una, Himachal Pradesh. Northern India's destination for custom tattoos, sacred Devbhoomi calligraphy, fine-line realism, 100% hospital-grade clinical hygiene, and master tattooists."
        />
        <meta property="og:title" content="LAND OF GOD TATTOO STUDIO — Premier Custom Tattoo Atelier | Una, HP" />
        <meta property="og:description" content="Custom Tattoos, Sacred Devbhoomi Artistry & Fine-Line Realism in Una, Himachal Pradesh. 100% Sterile Hygiene & Certified Master Artists." />
        <meta property="og:image" content="https://land-of-god-nine.vercel.app/logo.png" />
        <meta property="og:image:secure_url" content="https://land-of-god-nine.vercel.app/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Land of God Tattoo Studio Official Logo" />
        <meta name="twitter:image" content="https://land-of-god-nine.vercel.app/logo.png" />
        <link rel="canonical" href="https://land-of-god-nine.vercel.app/" />
      </Helmet>

      {/* Main Sections Stream */}
      <main>
        <Hero />
        <AboutSection />
        <PortfolioSection />
        <ReviewsSection />
        <BookingSection />
        <AftercareSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
};
