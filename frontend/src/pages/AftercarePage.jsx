import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHero } from '../components/common/PageHero';
import { AftercareSection } from '../components/home/AftercareSection';
import { ShieldAlert, CheckCircle, XCircle, HeartPulse, HelpCircle } from 'lucide-react';

export const AftercarePage = () => {
  return (
    <div className="min-h-screen pb-20 bg-studio-bg">
      <Helmet>
        <title>Official Tattoo Aftercare &amp; Pigment Preservation — LAND OF GOD TATTOO STUDIO (Una, HP)</title>
        <meta
          name="description"
          content="Official Land of God Tattoo Studio clinical aftercare instructions, 30-day dermal healing stages, and pigment preservation guidelines in Friends Colony, Una, HP."
        />
        <meta name="keywords" content="Tattoo Aftercare Una, Tattoo Healing Guide Himachal Pradesh, Sterile Tattoo Care Land of God" />
      </Helmet>

      {/* Hero Section with High-Resolution Studio Background Image */}
      <PageHero
        badge="॥ CLINICAL HEALING PROTOCOL ॥"
        title="Tattoo Aftercare Guide"
        subtitle="Medical Dermal Preservation & Color Lock-in — Land of God Tattoo Studio (Una)"
        description="Proper aftercare accounts for 50% of the final healed outcome. Follow our clinical stages for flawless pigment stabilization."
        bgImage="/images/tattoo_studio_interior_lux.jpg"
        bgAlt="Land of God Tattoo Studio Sterile Aftercare Cleanroom"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Healing Stages Progression Timeline */}
        <div className="glass-panel-dark p-6 sm:p-8 rounded-2xl border border-studio-border/60 mb-16 space-y-6">
          <h3 className="font-condensed font-black text-2xl uppercase tracking-wider text-studio-textMain">
            The 30-Day Dermal Healing Stages
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-studio-card p-5 rounded-xl border border-studio-border/40 space-y-2">
              <span className="text-xs font-bold text-studio-glowCyan uppercase tracking-wider">Days 1 – 4</span>
              <h4 className="font-display font-bold text-base text-studio-textMain">Stage 1: Open Dermis &amp; Plasma Weeping</h4>
              <p className="text-xs text-studio-textMuted leading-relaxed">
                Tenderness, swelling, and lymph fluid weeping are normal. Second-skin film locks in your body’s natural healing enzymes while blocking airborne contaminants.
              </p>
            </div>

            <div className="bg-studio-card p-5 rounded-xl border border-studio-border/40 space-y-2">
              <span className="text-xs font-bold text-studio-bronzeLight uppercase tracking-wider">Days 5 – 14</span>
              <h4 className="font-display font-bold text-base text-studio-textMain">Stage 2: Micro-Peeling &amp; Itching</h4>
              <p className="text-xs text-studio-textMuted leading-relaxed">
                Skin will flake like a mild sunburn. Under no circumstance should you peel dry skin flakes. Apply a micro-layer of unscented balm to soothe tightness.
              </p>
            </div>

            <div className="bg-studio-card p-5 rounded-xl border border-studio-border/40 space-y-2">
              <span className="text-xs font-bold text-studio-gold uppercase tracking-wider">Days 15 – 30+</span>
              <h4 className="font-display font-bold text-base text-studio-textMain">Stage 3: Deep Dermis Lock-In</h4>
              <p className="text-xs text-studio-textMuted leading-relaxed">
                The outer stratum corneum is sealed, and macrophages lock ink pigment permanently in place. Begin daily SPF 50+ application when exposed to sunlight.
              </p>
            </div>
          </div>
        </div>

        {/* Do's and Don'ts comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-6 rounded-xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-display font-bold text-lg uppercase">
              <CheckCircle className="w-5 h-5" />
              <span>Recommended Practices</span>
            </div>
            <ul className="space-y-2.5 text-xs text-studio-textMuted">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Wash 2-3 times daily with unscented antibacterial soap.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Pat dry gently with clean, disposable paper towels.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Apply a whisper-thin layer of balm (less is more).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Wear loose, breathable 100% cotton clothing.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Stay hydrated and get ample sleep during the initial week.</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-xl border border-red-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-red-400 font-display font-bold text-lg uppercase">
              <XCircle className="w-5 h-5" />
              <span>Strictly Prohibited</span>
            </div>
            <ul className="space-y-2.5 text-xs text-studio-textMuted">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>NO soaking in bathtubs, swimming pools, oceans, or hot tubs for 3 weeks.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>NO picking, peeling, or scratching flaking skin.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>NO direct sun tanning or UV tanning beds.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>NO heavy petroleum jelly (Vaseline) or scented lotions.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>NO heavy workout friction or rubbing against workout equipment.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Embed Interactive Aftercare Cards */}
        <AftercareSection />

      </div>
    </div>
  );
};
