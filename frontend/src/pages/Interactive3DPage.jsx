import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Interactive3DStudio } from '../components/tattoo-studio/Interactive3DStudio';
import { designsAPI } from '../services/api';
import { Sparkles, ArrowRight, Star, X, Image as ImageIcon, Sliders, Check, Layers, RotateCcw, Flame, Palette, Clock, Award, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { createArtworkInquiryUrl } from '../utils/whatsapp';

import { TATTOO_ARTWORKS_CATALOG } from '../components/tattoo-studio/TattooArtworks';
import { getFullImageUrl } from '../utils/imageHelper';

export const Interactive3DPage = () => {
  const [selectedBodyArea, setSelectedBodyArea] = useState('Forearm');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [designs, setDesigns] = useState(TATTOO_ARTWORKS_CATALOG);
  const [selectedDesign, setSelectedDesign] = useState(TATTOO_ARTWORKS_CATALOG[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const bodyAreas = [
    'Forearm', 'Upper Arm', 'Chest', 'Back', 'Shoulder', 'Neck', 'Wrist', 'Thigh', 'Calf', 'Ankle', 'Ribs', 'Spine'
  ];

  const styles = [
    'All', 'Sacred Devbhoomi', 'Geometric', 'Fine Line', 'Blackwork', 'Japanese', 'Traditional', 'Mandala', 'Neo-Traditional'
  ];

  // Helper to find best reference tattoo for a body area
  // Exact 1-to-1 canonical signature tattoo design mapping for every anatomical body part
  const EXACT_BODY_PART_TATTOOS = {
    'Forearm': 'Sacred Mahadev Trishul & Damru',
    'Chest': 'Polygonal Geometric Lion Monarch',
    'Shoulder': 'Devbhoomi Radial Sacred Mandala',
    'Upper Arm': 'Irezumi Dragon Koi Leaping Waves',
    'Back': 'Phoenix Rising From Sacred Flames',
    'Spine': 'Sacred Trishul Dagger Vertical Spine',
    'Ribs': 'Fine Line Serpent & Blooming Peony',
    'Thigh': 'Nordic Howling Wolf & Forest Moon',
    'Calf': 'Baroque Filigree Obsidian Skull',
    'Wrist': 'Fine Line Butterfly & Botanical Lavender',
    'Neck': 'Om Namah Shivaya Sanskrit Mantra',
    'Ankle': 'Devbhoomi Sacred Lotus Unalome',
  };

  // Helper to find the exact signature reference tattoo for any body area
  const findReferenceTattooForArea = useCallback((area, allDesigns) => {
    if (!area || !allDesigns || allDesigns.length === 0) return null;
    const cleanArea = area.trim();
    const lowerArea = cleanArea.toLowerCase();

    // 1. Strict Priority: Exact canonical artwork named specifically for this body part
    const exactName = EXACT_BODY_PART_TATTOOS[cleanArea];
    if (exactName) {
      const canonicalMatch = allDesigns.find(d =>
        d.name?.toLowerCase() === exactName.toLowerCase() ||
        d.id?.includes(lowerArea)
      );
      if (canonicalMatch) return canonicalMatch;
    }

    // 2. Dedicated artwork whose bodyAreas list strictly includes this area
    const strictAreaMatch = allDesigns.find(d =>
      (d.bodyAreas || []).some(a => a.toLowerCase() === lowerArea) &&
      Boolean(d.isDefaultReference)
    );
    if (strictAreaMatch) return strictAreaMatch;

    // 3. Any design tagged with this body area
    const anyTagged = allDesigns.find(d =>
      (d.bodyAreas || []).some(a => a.toLowerCase() === lowerArea || lowerArea.includes(a.toLowerCase()))
    );
    return anyTagged || allDesigns[0];
  }, []);

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
              bodyAreas: d.bodyAreas || ['Forearm'],
              isDefaultReference: Boolean(d.isDefaultReference),
              isFromDB: true,
            }));

          // Put authentic catalog designs first so exact body-part designs are always preferred
          const combined = [...TATTOO_ARTWORKS_CATALOG];
          dbList.forEach(dbItem => {
            if (!combined.some(d => d.name.toLowerCase() === dbItem.name.toLowerCase())) {
              combined.push(dbItem);
            }
          });

          setDesigns(combined);

          const initialDesign = findReferenceTattooForArea(selectedBodyArea, combined) || combined[0];
          setSelectedDesign(initialDesign);
        } else {
          setDesigns(TATTOO_ARTWORKS_CATALOG);
          if (!selectedDesign) {
            setSelectedDesign(TATTOO_ARTWORKS_CATALOG[0]);
          }
        }
      } catch (err) {
        console.error(err);
        setDesigns(TATTOO_ARTWORKS_CATALOG);
      }
    };
    fetchDesigns();
  }, [findReferenceTattooForArea, selectedBodyArea]);

  // When body area is clicked, smoothly switch to that body part and auto-show that part's exact design
  const handleSelectBodyArea = (area) => {
    setSelectedBodyArea(area);
    const matchingDesign = findReferenceTattooForArea(area, designs);
    if (matchingDesign) {
      setSelectedDesign(matchingDesign);
      toast.success(`Active on ${area}: ${matchingDesign.name}`, {
        duration: 2500,
        id: 'body-area-switch'
      });
    }
  };

  const handleProceedToBooking = () => {
    if (!selectedDesign) return;
    navigate(`/booking?style=${encodeURIComponent(selectedDesign.style)}&placement=${encodeURIComponent(selectedBodyArea)}&design=${encodeURIComponent(selectedDesign.name)}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#090b0e] text-left text-zinc-100 relative">
      <Helmet>
        <title>3D Tattoo Body Placement Studio — LAND OF GOD TATTOO STUDIO (Una)</title>
        <meta
          name="description"
          content="Explore anatomical tattoo placements in real-time on our 3D muscular model. Test custom designs and book your session in Friends Colony, Una."
        />
      </Helmet>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Professional Header with Background Image */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-6 p-6 sm:p-8">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/tattoo_studio_hero_bg.jpg"
              alt="3D Placement Simulator Studio - Land of God Tattoo Studio"
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
                3D Tattoo Placement Simulator — Best Tattoo Designer in Una
              </h1>
              <h2 className="text-xs sm:text-sm text-studio-gold font-serif">
                Interactive 360° Anatomical Fitting Lab by Land of God Tattoo Studio, Himachal Pradesh
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif">
                Select your design, then touch any body part to test exact anatomical scale, rotation, and flow before getting inked in Una.
              </p>
            </div>

            {/* Active Testing Badge */}
            {selectedDesign && (
              <div className="flex items-center space-x-2 bg-black/80 border border-amber-400/30 px-4 py-2.5 rounded-xl text-xs shadow-xl backdrop-blur-md self-start md:self-end">
                <span className="text-zinc-400 font-medium">Testing:</span>
                <span className="font-bold text-amber-300">{selectedDesign.name}</span>
                <span className="text-zinc-500">•</span>
                <span className="text-white font-semibold">{selectedBodyArea}</span>
              </div>
            )}
          </div>
        </div>

        {/* Anatomical Zone Filter Pills */}
        <div className="flex items-center flex-wrap gap-1.5 mb-4 bg-zinc-900/60 p-2 rounded-2xl border border-white/5">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider px-2">
            Target Muscle:
          </span>
          {bodyAreas.map(area => {
            const isSelected = selectedBodyArea.toLowerCase() === area.toLowerCase();
            return (
              <button
                key={area}
                onClick={() => handleSelectBodyArea(area)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                <span>{area}</span>
              </button>
            );
          })}
        </div>

        {/* CENTER 3D MANNEQUIN CANVAS */}
        <div className="relative w-full">
          <Interactive3DStudio
            selectedBodyArea={selectedBodyArea}
            onSelectBodyArea={handleSelectBodyArea}
            selectedDesign={selectedDesign}
            onSelectDesign={setSelectedDesign}
            designs={designs}
          />
        </div>

        {/* AVAILABLE DESIGNS SPECIFIC TO SELECTED BODY PART */}
        <div className="mt-5 bg-zinc-950/70 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-white">
                Available Designs for <span className="text-amber-400">{selectedBodyArea}</span>
              </h4>
            </div>
            <span className="text-[11px] text-zinc-400">
              {designs.filter(d => (d.bodyAreas || []).some(a => a.toLowerCase() === selectedBodyArea.toLowerCase())).length || designs.length} options ready to preview
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {(() => {
              // Priority 1: designs explicitly matching this body area
              const matchingDesigns = designs.filter(d =>
                (d.bodyAreas || []).some(a => a.toLowerCase() === selectedBodyArea.toLowerCase() || selectedBodyArea.toLowerCase().includes(a.toLowerCase()))
              );
              const displayList = matchingDesigns.length > 0 ? matchingDesigns : designs.slice(0, 6);

              return displayList.map((d) => {
                const isCurrent = selectedDesign?.id === d.id || selectedDesign?._id === d._id || selectedDesign?.name === d.name;
                const rawImg = d.previewImage || d.dataUri || '';
                const imgSrc = getFullImageUrl(rawImg.replace(/\.jpg$/, '.png'));

                return (
                  <button
                    key={d.id || d._id || d.name}
                    type="button"
                    onClick={() => {
                      setSelectedDesign(d);
                      toast.success(`Active on ${selectedBodyArea}: ${d.name}`, { duration: 1800, id: 'tattoo-pick' });
                    }}
                    className={`relative p-2 rounded-xl flex flex-col items-center text-center transition-all border ${
                      isCurrent
                        ? 'bg-amber-400/15 border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-900/90 border-white/10 hover:border-amber-400/40 hover:bg-zinc-800'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-black/80 p-1 mb-1.5 flex items-center justify-center overflow-hidden">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={d.name}
                          className="w-full h-full object-contain filter drop-shadow"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/tattoos/mahadev_trishul.png';
                          }}
                        />
                      ) : (
                        <Palette className="w-6 h-6 text-amber-400" />
                      )}
                      {isCurrent && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-white line-clamp-1 leading-tight">
                      {d.name}
                    </span>
                    <span className="text-[9px] text-amber-400/80 font-mono mt-0.5">
                      {d.style || 'Custom'}
                    </span>
                  </button>
                );
              });
            })()}
          </div>
        </div>

        {/* SELECTED TATTOO SHOWCASE & PLACEMENT DETAILS */}
        {selectedDesign && (
          <div className="mt-6 bg-zinc-900/90 border border-amber-500/20 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Left: High-Res Tattoo Image Preview & Comprehensive Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 w-full lg:w-auto">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black/90 border-2 border-amber-500/30 p-2 flex items-center justify-center shrink-0 shadow-inner group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none" />
                  {selectedDesign.previewImage || selectedDesign.dataUri ? (
                    <img
                      src={getFullImageUrl(selectedDesign.previewImage || selectedDesign.dataUri)}
                      alt={selectedDesign.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/tattoos/mahadev_trishul.png';
                      }}
                    />
                  ) : (
                    <Palette className="w-8 h-8 text-amber-400" />
                  )}
                  <span className="absolute bottom-1 right-1 bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                    ORIGINAL
                  </span>
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
                      {selectedDesign.style || 'Sacred Tattoo'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-zinc-300 text-[10px] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {selectedDesign.estTime || '2-3 hrs'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-white/10 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      {selectedDesign.difficulty || 'Custom Masterpiece'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    {selectedDesign.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed max-w-2xl">
                    {selectedDesign.description || 'Authentic handcrafted studio artwork designed for anatomical flow and sacred permanence.'}
                  </p>

                  <div className="text-[11px] text-zinc-400 pt-0.5 flex items-center gap-2 flex-wrap">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Artist: {selectedDesign.artist || 'Rahul Choudhary'} ({selectedDesign.artistTitle || 'Master Tattooist & Owner'})
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span>Currently placed on <strong className="text-white bg-zinc-800/80 px-2 py-0.5 rounded border border-white/10">{selectedBodyArea}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex sm:flex-row flex-col items-center gap-3 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    const waUrl = createArtworkInquiryUrl(
                      selectedDesign.name || '3D Tattoo Design',
                      'Land of God Studio',
                      selectedBodyArea
                    );
                    window.open(waUrl, '_blank');
                  }}
                  className="w-full sm:w-auto bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 hover:text-emerald-200 font-bold py-3 px-5 text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>💬 WhatsApp Inquiry</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToBooking}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black py-3 px-6 text-xs uppercase tracking-wider rounded-xl shadow-xl hover:shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all group"
                >
                  <span>Book Custom Session</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};
