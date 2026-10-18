import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Interactive3DStudio, ANATOMICAL_COLORS, HIT_ZONES, BODY_PART_SUGGESTIONS } from '../components/tattoo-studio/Interactive3DStudio';
import { designsAPI } from '../services/api';
import { Sparkles, ArrowRight, Star, X, Image as ImageIcon, Sliders, Check, Layers, RotateCcw, Flame, Palette, Clock, Award, ShieldCheck, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createArtworkInquiryUrl } from '../utils/whatsapp';

import { TATTOO_ARTWORKS_CATALOG } from '../components/tattoo-studio/TattooArtworks';
import { getFullImageUrl } from '../utils/imageHelper';

export const Interactive3DPage = () => {
  // Start with null so NO body part is highlighted until the client clicks
  const [selectedBodyArea, setSelectedBodyArea] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);

  // Default to 'anatomy' (Anatomical Color-Coded Muscle Mannequin Matching Client Reference)
  const [avatarGender, setAvatarGender] = useState('anatomy');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [designs, setDesigns] = useState(TATTOO_ARTWORKS_CATALOG);
  const [selectedDesign, setSelectedDesign] = useState(null);
  
  // No tattoo displayed automatically on click
  const [isTattooPreviewActive, setIsTattooPreviewActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bodyAreas = [
    'Chest', 'Forearm', 'Upper Arm', 'Shoulder', 'Ribs', 'Back', 'Spine', 'Thigh', 'Calf', 'Neck', 'Wrist', 'Ankle'
  ];

  const styles = [
    'All', 'Sacred Devbhoomi', 'Geometric', 'Fine Line', 'Blackwork', 'Japanese', 'Traditional', 'Mandala', 'Neo-Traditional'
  ];

  // Fetch designs from database
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await designsAPI.getAll();
        if (res.success && res.designs && res.designs.length > 0) {
          const dbList = res.designs
            .filter((d) => !d.previewImage?.includes('images.unsplash.com') && !d.previewImage?.includes('photo-'))
            .map((d) => ({
              id: d._id,
              _id: d._id,
              name: d.name,
              artist: d.artist || 'Rahul Choudhary',
              style: d.style || 'Custom',
              description: d.description || '',
              estTime: `${d.estTimeHours || 2} hrs`,
              difficulty: d.difficulty || 'Custom',
              previewImage: d.previewImage,
              dataUri: d.previewImage || d.transparentOverlay,
              bodyAreas: d.bodyAreas || ['Chest'],
              isDefaultReference: Boolean(d.isDefaultReference),
              isFromDB: true,
            }));

          const combined = [...TATTOO_ARTWORKS_CATALOG];
          dbList.forEach((dbItem) => {
            if (!combined.some((d) => d.name.toLowerCase() === dbItem.name.toLowerCase())) {
              combined.push(dbItem);
            }
          });

          setDesigns(combined);
        } else {
          setDesigns(TATTOO_ARTWORKS_CATALOG);
        }
      } catch (err) {
        console.error(err);
        setDesigns(TATTOO_ARTWORKS_CATALOG);
      }
    };
    fetchDesigns();
  }, []);

  // When a body part is clicked:
  // 1. Only that exact part highlights and blinks.
  // 2. NO tattoo displayed automatically.
  // 3. Tattoo options for that part immediately show.
  const handleSelectArea = (area) => {
    setSelectedBodyArea(area);
    const matchingZone = HIT_ZONES.find((z) => z.key.toLowerCase() === area.toLowerCase());
    if (matchingZone) {
      setSelectedZoneId(matchingZone.id);
    }
    setIsTattooPreviewActive(false);
    const suggestion = BODY_PART_SUGGESTIONS[area];
    toast.info(
      suggestion
        ? `🎯 Suggested for ${area}: ${suggestion.primaryDesignName}!`
        : `${area} selected! Showing matching tattoo options.`,
      {
        duration: 2500,
        id: 'body-area-switch',
      }
    );
  };

  const handleSelectZone = (zoneId) => {
    setSelectedZoneId(zoneId);
    const zone = HIT_ZONES.find((z) => z.id === zoneId);
    if (zone) {
      setSelectedBodyArea(zone.key);
      const suggestion = BODY_PART_SUGGESTIONS[zone.key];
      toast.info(
        suggestion
          ? `🎯 Suggested for ${zone.label}: ${suggestion.primaryDesignName}!`
          : `${zone.label} selected! Showing matching tattoo options.`,
        {
          duration: 2500,
          id: 'body-zone-switch',
        }
      );
    }
    setIsTattooPreviewActive(false);
  };

  const handleProceedToBooking = () => {
    const designParam = selectedDesign ? selectedDesign.name : 'Custom Masterpiece';
    const styleParam = selectedDesign ? selectedDesign.style : 'Custom';
    const placementParam = selectedBodyArea || 'Custom Placement';
    navigate(
      `/booking?style=${encodeURIComponent(styleParam)}&placement=${encodeURIComponent(
        placementParam
      )}&design=${encodeURIComponent(designParam)}`
    );
  };

  const activeColor = selectedBodyArea
    ? ANATOMICAL_COLORS[selectedBodyArea] || { hex: '#fbbf24', name: selectedBodyArea }
    : null;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#090b0e] text-left text-zinc-100 relative w-full max-w-full overflow-x-hidden">
      <Helmet>
        <title>3D Anatomical Tattoo Placement Studio — LAND OF GOD TATTOO STUDIO (Una)</title>
        <meta
          name="description"
          content="Select any body part on our 3D anatomical model to highlight only that part, blink, and explore curated tattoo designs before getting inked in Una."
        />
      </Helmet>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 p-6 sm:p-8">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/tattoo_studio_hero_bg.jpg"
              alt="3D Placement Simulator Studio"
              className="w-full h-full object-cover object-center filter brightness-[0.22] contrast-[1.1] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/[0.08] via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                <Sparkles className="w-3 h-3" />
                <span>3D Anatomical Studio • Friends Colony, Una (HP)</span>
              </div>
              <h1 className="ancient-carved-heading text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                3D Anatomical Tattoo Placement Simulator
              </h1>
              <h2 className="text-xs sm:text-sm text-studio-gold font-serif">
                Touch any body part on the character to highlight only that part and see tattoo options
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif">
                Click any body part on the 3D character. Only that exact part will highlight and pulse with blinking light while displaying the curated tattoo designs for that placement.
              </p>
            </div>

            {/* Active Highlight Badge */}
            {selectedBodyArea && (
              <div className="flex items-center space-x-2 bg-black/80 border border-amber-400/30 px-3.5 py-2 rounded-xl text-xs shadow-xl backdrop-blur-md self-start md:self-end">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-zinc-400 font-medium">Selected:</span>
                <span className="font-bold text-amber-300 uppercase tracking-wider">{selectedBodyArea}</span>
                {isTattooPreviewActive && selectedDesign && (
                  <>
                    <span className="text-zinc-600">•</span>
                    <span className="text-amber-400 font-semibold">{selectedDesign.name}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Model Avatar Selection & Target Muscle Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
          {/* Avatar Model Toggle Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900/90 rounded-2xl border border-white/10 w-fit shrink-0 shadow-sm">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2">
              Model:
            </span>
            <button
              type="button"
              onClick={() => setAvatarGender('anatomy')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                avatarGender === 'anatomy'
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-black font-extrabold shadow-md shadow-emerald-400/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Anatomical Character</span>
            </button>
            <button
              type="button"
              onClick={() => setAvatarGender('male')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                avatarGender === 'male'
                  ? 'bg-amber-400 text-black font-extrabold shadow-md shadow-amber-400/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>♂</span>
              <span>Male</span>
            </button>
            <button
              type="button"
              onClick={() => setAvatarGender('female')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                avatarGender === 'female'
                  ? 'bg-amber-400 text-black font-extrabold shadow-md shadow-amber-400/25'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>♀</span>
              <span>Female</span>
            </button>
          </div>

          <div className="text-[11px] text-zinc-400 hidden md:block">
            Click any body part on the character to highlight only that part • Drag to rotate 360°
          </div>
        </div>

        {/* Anatomical Zone Filter Pills */}
        <div className="flex items-center flex-wrap gap-1.5 mb-4 bg-zinc-900/60 p-2 rounded-2xl border border-white/5">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2">
            Target Muscle:
          </span>
          {bodyAreas.map((area) => {
            const isSelected = selectedBodyArea?.toLowerCase() === area.toLowerCase();
            const color = ANATOMICAL_COLORS[area]?.hex || '#fbbf24';
            return (
              <button
                key={area}
                onClick={() => handleSelectArea(area)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'text-black font-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
                style={{
                  backgroundColor: isSelected ? color : undefined,
                  boxShadow: isSelected ? `0 0 15px ${color}55` : undefined,
                }}
              >
                <span>{area}</span>
              </button>
            );
          })}
        </div>

        {/* Anatomical Recommendation Indicator */}
        {selectedBodyArea && BODY_PART_SUGGESTIONS[selectedBodyArea] && (
          <div className="mb-4 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-zinc-200 font-medium">
                  <strong className="text-amber-300">Suggested Tattoo for {selectedBodyArea}:</strong>{' '}
                  <span className="text-white font-bold">{BODY_PART_SUGGESTIONS[selectedBodyArea].primaryDesignName}</span>
                </span>
                <span className="text-zinc-400 text-[11px] block sm:inline sm:ml-2">
                  — {BODY_PART_SUGGESTIONS[selectedBodyArea].tagline}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-amber-400">
                Pain: {BODY_PART_SUGGESTIONS[selectedBodyArea].painRating.split('-')[0].trim()}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-emerald-400">
                Heals: {BODY_PART_SUGGESTIONS[selectedBodyArea].healingTime}
              </span>
            </div>
          </div>
        )}

        {/* CENTER 3D MANNEQUIN CANVAS WITH INTEGRATED OPTIONS */}
        <div className="relative w-full">
          <Interactive3DStudio
            selectedBodyArea={selectedBodyArea}
            onSelectBodyArea={handleSelectArea}
            selectedZoneId={selectedZoneId}
            onSelectZoneId={handleSelectZone}
            selectedDesign={selectedDesign}
            onSelectDesign={setSelectedDesign}
            isTattooPreviewActive={isTattooPreviewActive}
            onToggleTattooPreview={setIsTattooPreviewActive}
            designs={designs}
            avatarGender={avatarGender}
            onAvatarGenderChange={setAvatarGender}
            onNavigateBack={() => navigate('/')}
          />
        </div>

        {/* BOTTOM ACTION BAR WHEN A TATTOO IS ACTIVE */}
        {isTattooPreviewActive && selectedDesign && selectedBodyArea && (
          <div className="mt-6 bg-zinc-900/90 border border-amber-500/20 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 w-full lg:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-black/90 border-2 border-amber-500/30 p-2 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                  <img
                    src={getFullImageUrl(
                      (selectedDesign.previewImage || selectedDesign.dataUri || '').replace(/\.jpg$/, '.png')
                    )}
                    alt={selectedDesign.name}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/tattoos/mahadev_trishul.png';
                    }}
                  />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                      {selectedDesign.style || 'Custom Style'}
                    </span>
                    <span className="text-zinc-400 text-xs font-semibold">
                      Placed on <strong className="text-white bg-zinc-800 px-2 py-0.5 rounded">{selectedBodyArea}</strong>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {selectedDesign.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-1 max-w-xl">
                    {selectedDesign.description || 'Mastercrafted anatomical artwork by Rahul Choudhary.'}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-row flex-col items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const waUrl = createArtworkInquiryUrl(
                      selectedDesign.name,
                      'Land of God Studio',
                      selectedBodyArea
                    );
                    window.open(waUrl, '_blank');
                  }}
                  className="w-full sm:w-auto bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-bold py-3 px-5 text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>💬 WhatsApp Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToBooking}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black py-3 px-6 text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Book for {selectedBodyArea}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
