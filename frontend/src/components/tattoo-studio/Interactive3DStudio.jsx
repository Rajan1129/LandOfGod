import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Compass,
  RotateCw,
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Eye,
  Sliders,
  ChevronLeft,
  Sparkles,
  X,
  Check,
  Flame,
  Clock,
  Award,
  Layers,
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Star,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { getFullImageUrl } from '../../utils/imageHelper';
import { createArtworkInquiryUrl } from '../../utils/whatsapp';

// High-Resolution Anatomical Color-Mapped Mannequin Frames (Matching Client Reference Exactly)
export const ANATOMY_360_FRAMES = [
  { angle: 0, label: '0° Front View', src: '/images/anatomy_front.jpg', flip: false },
  { angle: 45, label: '45° 3/4 Side View', src: '/images/anatomy_front_right.jpg', flip: false },
  { angle: 90, label: '90° Right Profile', src: '/images/anatomy_right.jpg', flip: false },
  { angle: 135, label: '135° Back-Right', src: '/images/anatomy_back_right.jpg', flip: false },
  { angle: 180, label: '180° Back View', src: '/images/anatomy_back.jpg', flip: false },
  { angle: 225, label: '225° Back-Left', src: '/images/anatomy_back_right.jpg', flip: true },
  { angle: 270, label: '270° Left Profile', src: '/images/anatomy_right.jpg', flip: true },
  { angle: 315, label: '315° Front-Left (3/4)', src: '/images/anatomy_front_right.jpg', flip: true },
];

// High-Resolution Masculine Frames
export const MASCULINE_360_FRAMES = [
  { angle: 0, label: '0° Front', src: '/images/masculine_front.jpg', flip: false },
  { angle: 45, label: '45° Front-Right', src: '/images/masculine_front_right.jpg', flip: false },
  { angle: 90, label: '90° Right', src: '/images/masculine_right.jpg', flip: false },
  { angle: 135, label: '135° Back-Right', src: '/images/masculine_back_right.jpg', flip: false },
  { angle: 180, label: '180° Back', src: '/images/masculine_back.jpg', flip: false },
  { angle: 225, label: '225° Back-Left', src: '/images/masculine_back_right.jpg', flip: true },
  { angle: 270, label: '270° Left', src: '/images/masculine_right.jpg', flip: true },
  { angle: 315, label: '315° Front-Left', src: '/images/masculine_front_right.jpg', flip: true },
];

// High-Resolution Feminine Frames
export const FEMININE_360_FRAMES = [
  { angle: 0, label: '0° Front', src: '/images/female_front.jpg', flip: false },
  { angle: 45, label: '45° Front-Right', src: '/images/female_front_right.jpg', flip: false },
  { angle: 90, label: '90° Right', src: '/images/female_right.jpg', flip: false },
  { angle: 135, label: '135° Back-Right', src: '/images/female_back_right.jpg', flip: false },
  { angle: 180, label: '180° Back', src: '/images/female_back.jpg', flip: false },
  { angle: 225, label: '225° Back-Left', src: '/images/female_back_right.jpg', flip: true },
  { angle: 270, label: '270° Left', src: '/images/female_right.jpg', flip: true },
  { angle: 315, label: '315° Front-Left', src: '/images/female_front_right.jpg', flip: true },
];

// Color palette mapping for anatomical muscle groups matching reference character
export const ANATOMICAL_COLORS = {
  Chest: { hex: '#22c55e', bg: 'rgba(34, 197, 94, 0.55)', border: '#4ade80', name: 'Pectorals (Chest)' },
  Shoulder: { hex: '#fb7185', bg: 'rgba(251, 113, 133, 0.55)', border: '#f43f5e', name: 'Deltoids (Shoulders)' },
  'Upper Arm': { hex: '#38bdf8', bg: 'rgba(56, 189, 248, 0.55)', border: '#0284c7', name: 'Biceps & Triceps (Arm)' },
  Forearm: { hex: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.55)', border: '#14b8a6', name: 'Brachioradialis (Forearm)' },
  Ribs: { hex: '#f472b6', bg: 'rgba(244, 114, 182, 0.55)', border: '#ec4899', name: 'Serratus & Core (Ribs)' },
  Back: { hex: '#10b981', bg: 'rgba(16, 185, 129, 0.55)', border: '#059669', name: 'Latissimus Dorsi (Back)' },
  Spine: { hex: '#f87171', bg: 'rgba(248, 113, 113, 0.55)', border: '#ef4444', name: 'Erector Spinae (Spine)' },
  Thigh: { hex: '#fbbf24', bg: 'rgba(251, 191, 36, 0.55)', border: '#f59e0b', name: 'Quadriceps (Thigh)' },
  Calf: { hex: '#c084fc', bg: 'rgba(192, 132, 252, 0.55)', border: '#a855f7', name: 'Gastrocnemius (Calf)' },
  Neck: { hex: '#818cf8', bg: 'rgba(129, 140, 248, 0.55)', border: '#6366f1', name: 'Trapezius (Neck)' },
  Wrist: { hex: '#cbd5e1', bg: 'rgba(203, 213, 225, 0.55)', border: '#94a3b8', name: 'Wrist / Hand' },
  Ankle: { hex: '#cbd5e1', bg: 'rgba(203, 213, 225, 0.55)', border: '#94a3b8', name: 'Ankle / Foot' },
};

// Curated Anatomical Tattoo Suggestions, Placement Guidance & Pain Ratings by Rahul Choudhary
export const BODY_PART_SUGGESTIONS = {
  Chest: {
    primaryDesignName: 'Polygonal Geometric Lion Monarch',
    reason: 'Pectoral muscle plates provide a broad, flat symmetrical canvas ideal for bold geometric monarchs, animals, and sacred shields.',
    painRating: 'Moderate (4/10)',
    healingTime: '2-3 weeks',
    placementAdvice: 'Center over the sternum or contour symmetrically across the pectoral muscle plate.',
    suggestedStyles: ['Geometric', 'Sacred Devbhoomi', 'Blackwork'],
    tagline: 'Bold, commanding presence across pectoral contours',
  },
  Forearm: {
    primaryDesignName: 'Sacred Mahadev Trishul & Damru',
    reason: 'The natural muscle cylinder of the forearm creates ideal vertical flow for sacred trishuls, calligraphy, and compass designs.',
    painRating: 'Low (2/10) - Highly Recommended for First Tattoo',
    healingTime: '10-14 days',
    placementAdvice: 'Align design along the flexor carpi radialis muscle line for seamless movement without distortion.',
    suggestedStyles: ['Sacred Devbhoomi', 'Geometric', 'Fine Line'],
    tagline: 'High everyday visibility & graceful vertical flow',
  },
  'Upper Arm': {
    primaryDesignName: 'Irezumi Dragon Koi Leaping Waves',
    reason: 'The rounded deltoid & bicep muscles give dynamic 3D curvature to flowing water, dragons, and wrapping half-sleeve motifs.',
    painRating: 'Low (2.5/10)',
    healingTime: '12-16 days',
    placementAdvice: 'Wraps effortlessly from outer bicep towards shoulder cap for a powerful sleeve flow.',
    suggestedStyles: ['Japanese', 'Blackwork', 'Geometric'],
    tagline: 'Dynamic curvature that flexes with muscle movement',
  },
  Shoulder: {
    primaryDesignName: 'Devbhoomi Radial Sacred Mandala',
    reason: 'The spherical deltoid cap serves as the perfect organic anchor for circular radial mandalas and sacred compasses.',
    painRating: 'Low - Moderate (3/10)',
    healingTime: '14-18 days',
    placementAdvice: 'Center the focal origin of the mandala over the acromion joint for 360° radial symmetry.',
    suggestedStyles: ['Mandala', 'Geometric', 'Sacred Devbhoomi'],
    tagline: 'Spherical muscle cap creates captivating 360° radial beauty',
  },
  Back: {
    primaryDesignName: 'Phoenix Rising From Sacred Flames',
    reason: 'The expansive latissimus dorsi canvas allows grand wing spans, high-contrast blackwork, and majestic mythological scale.',
    painRating: 'Low on lats (3/10), Moderate on spine (6/10)',
    healingTime: '2-3 weeks',
    placementAdvice: 'Spreads symmetrically across scapulae blades with tail feathers sweeping down lower lats.',
    suggestedStyles: ['Blackwork', 'Neo-Traditional', 'Sacred Devbhoomi'],
    tagline: 'Studio masterpiece canvas with maximum detail depth',
  },
  Spine: {
    primaryDesignName: 'Sacred Trishul Dagger Vertical Spine',
    reason: 'Vertebral alignment creates an elegant linear axis for sacred scripts, trishul daggers, and vertical chakras.',
    painRating: 'Spicy / Intense (7/10)',
    healingTime: '2-3 weeks',
    placementAdvice: 'Precisely aligned along the thoracic and lumbar spine vertebrae.',
    suggestedStyles: ['Neo-Traditional', 'Sacred Devbhoomi', 'Fine Line'],
    tagline: 'Sleek vertebral elongation with profound spiritual symbolism',
  },
  Ribs: {
    primaryDesignName: 'Fine Line Serpent & Blooming Peony',
    reason: 'Curving intercostal rib contours guide organic s-curves, flora, and undulating serpent forms.',
    painRating: 'Intense (8/10)',
    healingTime: '2-3 weeks',
    placementAdvice: 'Curves along the natural slant of the 6th-9th ribs for an elongated silhouette.',
    suggestedStyles: ['Fine Line', 'Traditional', 'Blackwork'],
    tagline: 'Sensual organic contour along natural rib curvature',
  },
  Thigh: {
    primaryDesignName: 'Nordic Howling Wolf & Forest Moon',
    reason: 'Massive quad muscle canvas holds large-scale portraits, mythical wolves, and detailed scenery with low pain.',
    painRating: 'Low (3/10)',
    healingTime: '14-20 days',
    placementAdvice: 'Centered on the anterior quadriceps or wrapping towards the outer iliotibial band.',
    suggestedStyles: ['Geometric', 'Blackwork', 'Neo-Traditional'],
    tagline: 'Grand scale canvas with low pain & easy concealability',
  },
  Calf: {
    primaryDesignName: 'Baroque Filigree Obsidian Skull',
    reason: 'The tapered diamond shape of the gastrocnemius muscle frames ornate skulls, shields, and sacred trishuls.',
    painRating: 'Moderate (4/10)',
    healingTime: '14-18 days',
    placementAdvice: 'Fitted centrally between the lateral and medial gastrocnemius heads.',
    suggestedStyles: ['Blackwork', 'Geometric', 'Sacred Devbhoomi'],
    tagline: 'Tapered diamond silhouette perfectly framing muscular calves',
  },
  Wrist: {
    primaryDesignName: 'Fine Line Butterfly & Botanical Lavender',
    reason: 'Delicate wrist tendons and joint require micro-scale fine lines, butterflies, or botanical stems.',
    painRating: 'Moderate (5/10)',
    healingTime: '10-12 days',
    placementAdvice: 'Positioned 1 inch below the distal wrist crease to minimize motion friction during healing.',
    suggestedStyles: ['Fine Line', 'Minimalist', 'Sacred Devbhoomi'],
    tagline: 'Delicate micro precision for everyday visibility',
  },
  Neck: {
    primaryDesignName: 'Om Namah Shivaya Sanskrit Mantra',
    reason: 'Nape and lateral neck curve beautifully accentuate spiritual scripts and sacred emblems.',
    painRating: 'Spicy (6.5/10)',
    healingTime: '10-14 days',
    placementAdvice: 'Centered on the upper nape (C7 vertebra) or subtly curved behind the earlobe.',
    suggestedStyles: ['Sacred Devbhoomi', 'Fine Line', 'Blackwork'],
    tagline: 'Distinguished sacred statement with high reverence',
  },
  Ankle: {
    primaryDesignName: 'Devbhoomi Sacred Lotus Unalome',
    reason: 'The malleolus bone curve invites vertical unalome spirals ascending upward along the Achilles.',
    painRating: 'Spicy near bone (6/10)',
    healingTime: '12-16 days',
    placementAdvice: 'Anchored just above the lateral malleolus or wrapping smoothly around the achilles tendon.',
    suggestedStyles: ['Sacred Devbhoomi', 'Fine Line', 'Minimalist'],
    tagline: 'Graceful ascending geometry along ankle contours',
  },
};

// Comprehensive Bilateral Hit Zones with unique IDs on the 3D Muscular Mannequin
export const HIT_ZONES = [
  // 1. Chest (Pectorals)
  {
    id: 'chest_center',
    key: 'Chest',
    label: 'Chest (Pectorals)',
    defaultTheta: 0,
    frames: {
      0: { left: 50.0, top: 25.0, width: 26.0, height: 13.0, rotate: 0, opacity: 1 },
      45: { left: 52.0, top: 25.5, width: 21.0, height: 13.0, rotate: -4, opacity: 1 },
      90: { left: 47.0, top: 26.5, width: 13.0, height: 13.0, rotate: -4, opacity: 0.65 },
      135: { left: 45.0, top: 26.5, width: 10.0, height: 10.0, rotate: -2, opacity: 0 },
      180: { left: 50.0, top: 25.0, width: 10.0, height: 10.0, rotate: 0, opacity: 0 },
      225: { left: 55.0, top: 26.5, width: 10.0, height: 10.0, rotate: 2, opacity: 0 },
      270: { left: 53.0, top: 26.5, width: 13.0, height: 13.0, rotate: 4, opacity: 0.65 },
      315: { left: 48.0, top: 25.5, width: 21.0, height: 13.0, rotate: 4, opacity: 1 },
    },
  },

  // 2. Right Shoulder (Deltoid)
  {
    id: 'shoulder_right',
    key: 'Shoulder',
    label: 'Right Shoulder',
    defaultTheta: 45,
    frames: {
      0: { left: 31.0, top: 23.0, width: 13.0, height: 13.0, rotate: -12, opacity: 1 },
      45: { left: 36.5, top: 23.5, width: 13.0, height: 13.0, rotate: -8, opacity: 1 },
      90: { left: 54.0, top: 23.5, width: 13.0, height: 13.0, rotate: 0, opacity: 1 },
      135: { left: 40.0, top: 23.5, width: 13.0, height: 13.0, rotate: 8, opacity: 1 },
      180: { left: 31.0, top: 23.0, width: 13.0, height: 13.0, rotate: 12, opacity: 1 },
      225: { left: 60.0, top: 23.5, width: 13.0, height: 13.0, rotate: -8, opacity: 0.25 },
      270: { left: 46.0, top: 23.5, width: 13.0, height: 13.0, rotate: 0, opacity: 0.1 },
      315: { left: 63.5, top: 23.5, width: 13.0, height: 13.0, rotate: 8, opacity: 0.3 },
    },
  },

  // 3. Left Shoulder (Deltoid)
  {
    id: 'shoulder_left',
    key: 'Shoulder',
    label: 'Left Shoulder',
    defaultTheta: 315,
    frames: {
      0: { left: 69.0, top: 23.0, width: 13.0, height: 13.0, rotate: 12, opacity: 1 },
      45: { left: 63.5, top: 23.5, width: 13.0, height: 13.0, rotate: -8, opacity: 0.3 },
      90: { left: 46.0, top: 23.5, width: 13.0, height: 13.0, rotate: 0, opacity: 0.1 },
      135: { left: 60.0, top: 23.5, width: 13.0, height: 13.0, rotate: 8, opacity: 0.25 },
      180: { left: 69.0, top: 23.0, width: 13.0, height: 13.0, rotate: -12, opacity: 1 },
      225: { left: 40.0, top: 23.5, width: 13.0, height: 13.0, rotate: -8, opacity: 1 },
      270: { left: 54.0, top: 23.5, width: 13.0, height: 13.0, rotate: 0, opacity: 1 },
      315: { left: 36.5, top: 23.5, width: 13.0, height: 13.0, rotate: 8, opacity: 1 },
    },
  },

  // 4. Right Upper Arm (Biceps/Triceps)
  {
    id: 'upperarm_right',
    key: 'Upper Arm',
    label: 'Right Upper Arm',
    defaultTheta: 45,
    frames: {
      0: { left: 24.5, top: 31.5, width: 12.0, height: 15.0, rotate: -22, opacity: 1 },
      45: { left: 33.0, top: 31.5, width: 12.0, height: 15.0, rotate: -12, opacity: 1 },
      90: { left: 54.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 1 },
      135: { left: 36.5, top: 31.5, width: 12.0, height: 15.0, rotate: 10, opacity: 1 },
      180: { left: 24.5, top: 31.5, width: 12.0, height: 15.0, rotate: 22, opacity: 1 },
      225: { left: 63.5, top: 31.5, width: 12.0, height: 15.0, rotate: -10, opacity: 0.2 },
      270: { left: 46.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 0.1 },
      315: { left: 67.0, top: 31.5, width: 12.0, height: 15.0, rotate: 12, opacity: 0.25 },
    },
  },

  // 5. Left Upper Arm (Biceps/Triceps)
  {
    id: 'upperarm_left',
    key: 'Upper Arm',
    label: 'Left Upper Arm',
    defaultTheta: 315,
    frames: {
      0: { left: 75.5, top: 31.5, width: 12.0, height: 15.0, rotate: 22, opacity: 1 },
      45: { left: 67.0, top: 31.5, width: 12.0, height: 15.0, rotate: 12, opacity: 0.25 },
      90: { left: 46.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 0.1 },
      135: { left: 63.5, top: 31.5, width: 12.0, height: 15.0, rotate: -10, opacity: 0.2 },
      180: { left: 75.5, top: 31.5, width: 12.0, height: 15.0, rotate: -22, opacity: 1 },
      225: { left: 36.5, top: 31.5, width: 12.0, height: 15.0, rotate: 10, opacity: 1 },
      270: { left: 54.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 1 },
      315: { left: 33.0, top: 31.5, width: 12.0, height: 15.0, rotate: -12, opacity: 1 },
    },
  },

  // 6. Right Forearm
  {
    id: 'forearm_right',
    key: 'Forearm',
    label: 'Right Forearm',
    defaultTheta: 0,
    frames: {
      0: { left: 21.0, top: 41.5, width: 11.0, height: 16.0, rotate: -26, opacity: 1 },
      45: { left: 29.5, top: 42.0, width: 11.5, height: 16.5, rotate: -15, opacity: 1 },
      90: { left: 54.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 1 },
      135: { left: 33.0, top: 42.0, width: 11.0, height: 16.0, rotate: 12, opacity: 1 },
      180: { left: 21.0, top: 41.5, width: 11.0, height: 16.0, rotate: 26, opacity: 1 },
      225: { left: 67.0, top: 42.0, width: 11.0, height: 16.0, rotate: -12, opacity: 0.2 },
      270: { left: 46.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 0.1 },
      315: { left: 70.5, top: 42.0, width: 11.5, height: 16.5, rotate: 15, opacity: 0.25 },
    },
  },

  // 7. Left Forearm
  {
    id: 'forearm_left',
    key: 'Forearm',
    label: 'Left Forearm',
    defaultTheta: 0,
    frames: {
      0: { left: 79.0, top: 41.5, width: 11.0, height: 16.0, rotate: 26, opacity: 1 },
      45: { left: 70.5, top: 42.0, width: 11.5, height: 16.5, rotate: 15, opacity: 0.25 },
      90: { left: 46.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 0.1 },
      135: { left: 67.0, top: 42.0, width: 11.0, height: 16.0, rotate: -12, opacity: 0.2 },
      180: { left: 79.0, top: 41.5, width: 11.0, height: 16.0, rotate: -26, opacity: 1 },
      225: { left: 33.0, top: 42.0, width: 11.0, height: 16.0, rotate: 12, opacity: 1 },
      270: { left: 54.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 1 },
      315: { left: 29.5, top: 42.0, width: 11.5, height: 16.5, rotate: -15, opacity: 1 },
    },
  },

  // 8. Ribs & Core / Abdominals
  {
    id: 'ribs_center',
    key: 'Ribs',
    label: 'Abdominals & Core',
    defaultTheta: 0,
    frames: {
      0: { left: 50.0, top: 35.5, width: 22.0, height: 17.0, rotate: 0, opacity: 1 },
      45: { left: 50.0, top: 35.5, width: 18.0, height: 17.0, rotate: -4, opacity: 1 },
      90: { left: 48.0, top: 36.5, width: 14.0, height: 17.0, rotate: 0, opacity: 0.8 },
      135: { left: 46.0, top: 37.0, width: 12.0, height: 14.0, rotate: 2, opacity: 0.2 },
      180: { left: 50.0, top: 36.5, width: 12.0, height: 14.0, rotate: 0, opacity: 0 },
      225: { left: 54.0, top: 37.0, width: 12.0, height: 14.0, rotate: -2, opacity: 0.2 },
      270: { left: 52.0, top: 36.5, width: 14.0, height: 17.0, rotate: 0, opacity: 0.8 },
      315: { left: 50.0, top: 35.5, width: 18.0, height: 17.0, rotate: 4, opacity: 1 },
    },
  },

  // 9. Back (Latissimus Dorsi)
  {
    id: 'back_center',
    key: 'Back',
    label: 'Upper Back & Lats',
    defaultTheta: 180,
    frames: {
      0: { left: 50.0, top: 27.0, width: 12.0, height: 12.0, rotate: 0, opacity: 0 },
      45: { left: 46.0, top: 28.0, width: 10.0, height: 12.0, rotate: -2, opacity: 0.15 },
      90: { left: 42.0, top: 28.0, width: 12.0, height: 15.0, rotate: 4, opacity: 0.7 },
      135: { left: 52.0, top: 27.0, width: 22.0, height: 17.0, rotate: 4, opacity: 1 },
      180: { left: 50.0, top: 27.0, width: 26.0, height: 18.0, rotate: 0, opacity: 1 },
      225: { left: 48.0, top: 27.0, width: 22.0, height: 17.0, rotate: -4, opacity: 1 },
      270: { left: 58.0, top: 28.0, width: 12.0, height: 15.0, rotate: -4, opacity: 0.7 },
      315: { left: 54.0, top: 28.0, width: 10.0, height: 12.0, rotate: 2, opacity: 0.15 },
    },
  },

  // 10. Spine & Lower Back
  {
    id: 'spine_center',
    key: 'Spine',
    label: 'Spine & Lower Back',
    defaultTheta: 180,
    frames: {
      0: { left: 50.0, top: 36.0, width: 8.0, height: 20.0, rotate: 0, opacity: 0 },
      45: { left: 46.0, top: 36.0, width: 8.0, height: 20.0, rotate: 0, opacity: 0 },
      90: { left: 43.0, top: 36.0, width: 8.0, height: 22.0, rotate: 0, opacity: 0.5 },
      135: { left: 52.0, top: 36.0, width: 12.0, height: 25.0, rotate: 2, opacity: 1 },
      180: { left: 50.0, top: 36.0, width: 14.0, height: 28.0, rotate: 0, opacity: 1 },
      225: { left: 48.0, top: 36.0, width: 12.0, height: 25.0, rotate: -2, opacity: 1 },
      270: { left: 57.0, top: 36.0, width: 8.0, height: 22.0, rotate: 0, opacity: 0.5 },
      315: { left: 54.0, top: 36.0, width: 8.0, height: 20.0, rotate: 0, opacity: 0 },
    },
  },

  // 11. Right Thigh (Quadriceps/Hamstrings)
  {
    id: 'thigh_right',
    key: 'Thigh',
    label: 'Right Thigh',
    defaultTheta: 0,
    frames: {
      0: { left: 42.0, top: 58.0, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      45: { left: 46.0, top: 58.0, width: 15.0, height: 20.0, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 58.5, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      135: { left: 50.0, top: 58.5, width: 15.0, height: 20.0, rotate: 2, opacity: 1 },
      180: { left: 42.0, top: 58.0, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      225: { left: 50.0, top: 58.5, width: 15.0, height: 20.0, rotate: -2, opacity: 0.3 },
      270: { left: 48.0, top: 58.5, width: 15.0, height: 20.0, rotate: 0, opacity: 0.2 },
      315: { left: 54.0, top: 58.0, width: 15.0, height: 20.0, rotate: 2, opacity: 0.35 },
    },
  },

  // 12. Left Thigh (Quadriceps/Hamstrings)
  {
    id: 'thigh_left',
    key: 'Thigh',
    label: 'Left Thigh',
    defaultTheta: 0,
    frames: {
      0: { left: 58.0, top: 58.0, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      45: { left: 54.0, top: 58.0, width: 15.0, height: 20.0, rotate: 2, opacity: 0.35 },
      90: { left: 48.0, top: 58.5, width: 15.0, height: 20.0, rotate: 0, opacity: 0.2 },
      135: { left: 50.0, top: 58.5, width: 15.0, height: 20.0, rotate: -2, opacity: 0.3 },
      180: { left: 58.0, top: 58.0, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      225: { left: 50.0, top: 58.5, width: 15.0, height: 20.0, rotate: 2, opacity: 1 },
      270: { left: 52.0, top: 58.5, width: 15.0, height: 20.0, rotate: 0, opacity: 1 },
      315: { left: 46.0, top: 58.0, width: 15.0, height: 20.0, rotate: -2, opacity: 1 },
    },
  },

  // 13. Right Calf (Gastrocnemius)
  {
    id: 'calf_right',
    key: 'Calf',
    label: 'Right Calf',
    defaultTheta: 0,
    frames: {
      0: { left: 41.5, top: 78.0, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      45: { left: 45.0, top: 78.5, width: 13.0, height: 18.0, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 78.5, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      135: { left: 49.0, top: 78.5, width: 13.0, height: 18.0, rotate: 2, opacity: 1 },
      180: { left: 41.5, top: 78.0, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      225: { left: 51.0, top: 78.5, width: 13.0, height: 18.0, rotate: -2, opacity: 0.3 },
      270: { left: 48.0, top: 78.5, width: 13.0, height: 18.0, rotate: 0, opacity: 0.2 },
      315: { left: 55.0, top: 78.5, width: 13.0, height: 18.0, rotate: 2, opacity: 0.35 },
    },
  },

  // 14. Left Calf (Gastrocnemius)
  {
    id: 'calf_left',
    key: 'Calf',
    label: 'Left Calf',
    defaultTheta: 0,
    frames: {
      0: { left: 58.5, top: 78.0, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      45: { left: 55.0, top: 78.5, width: 13.0, height: 18.0, rotate: 2, opacity: 0.35 },
      90: { left: 48.0, top: 78.5, width: 13.0, height: 18.0, rotate: 0, opacity: 0.2 },
      135: { left: 51.0, top: 78.5, width: 13.0, height: 18.0, rotate: -2, opacity: 0.3 },
      180: { left: 58.5, top: 78.0, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      225: { left: 49.0, top: 78.5, width: 13.0, height: 18.0, rotate: 2, opacity: 1 },
      270: { left: 52.0, top: 78.5, width: 13.0, height: 18.0, rotate: 0, opacity: 1 },
      315: { left: 45.0, top: 78.5, width: 13.0, height: 18.0, rotate: -2, opacity: 1 },
    },
  },

  // 15. Neck & Trapezius
  {
    id: 'neck_center',
    key: 'Neck',
    label: 'Neck & Trapezius',
    defaultTheta: 0,
    frames: {
      0: { left: 50.0, top: 16.5, width: 13.0, height: 9.0, rotate: 0, opacity: 1 },
      45: { left: 50.0, top: 16.5, width: 13.0, height: 9.0, rotate: -2, opacity: 1 },
      90: { left: 51.5, top: 17.0, width: 12.0, height: 9.0, rotate: 0, opacity: 1 },
      135: { left: 50.0, top: 16.5, width: 13.0, height: 9.0, rotate: 2, opacity: 1 },
      180: { left: 50.0, top: 16.5, width: 14.0, height: 11.0, rotate: 0, opacity: 1 },
      225: { left: 50.0, top: 16.5, width: 13.0, height: 9.0, rotate: -2, opacity: 1 },
      270: { left: 48.5, top: 17.0, width: 12.0, height: 9.0, rotate: 0, opacity: 1 },
      315: { left: 50.0, top: 16.5, width: 13.0, height: 9.0, rotate: 2, opacity: 1 },
    },
  },

  // 16. Right Wrist
  {
    id: 'wrist_right',
    key: 'Wrist',
    label: 'Right Wrist',
    defaultTheta: 0,
    frames: {
      0: { left: 16.5, top: 51.0, width: 10.0, height: 10.0, rotate: -30, opacity: 1 },
      45: { left: 26.0, top: 52.0, width: 10.0, height: 10.0, rotate: -18, opacity: 1 },
      90: { left: 54.0, top: 53.0, width: 10.0, height: 10.0, rotate: 0, opacity: 1 },
      135: { left: 29.5, top: 52.0, width: 10.0, height: 10.0, rotate: 15, opacity: 1 },
      180: { left: 16.5, top: 51.0, width: 10.0, height: 10.0, rotate: 30, opacity: 1 },
      225: { left: 70.5, top: 52.0, width: 10.0, height: 10.0, rotate: -15, opacity: 0.2 },
      270: { left: 46.0, top: 53.0, width: 10.0, height: 10.0, rotate: 0, opacity: 0.1 },
      315: { left: 73.5, top: 52.0, width: 10.0, height: 10.0, rotate: 18, opacity: 0.25 },
    },
  },

  // 17. Left Wrist
  {
    id: 'wrist_left',
    key: 'Wrist',
    label: 'Left Wrist',
    defaultTheta: 0,
    frames: {
      0: { left: 83.5, top: 51.0, width: 10.0, height: 10.0, rotate: 30, opacity: 1 },
      45: { left: 73.5, top: 52.0, width: 10.0, height: 10.0, rotate: 18, opacity: 0.25 },
      90: { left: 46.0, top: 53.0, width: 10.0, height: 10.0, rotate: 0, opacity: 0.1 },
      135: { left: 70.5, top: 52.0, width: 10.0, height: 10.0, rotate: -15, opacity: 0.2 },
      180: { left: 83.5, top: 51.0, width: 10.0, height: 10.0, rotate: -30, opacity: 1 },
      225: { left: 29.5, top: 52.0, width: 10.0, height: 10.0, rotate: 15, opacity: 1 },
      270: { left: 54.0, top: 53.0, width: 10.0, height: 10.0, rotate: 0, opacity: 1 },
      315: { left: 26.0, top: 52.0, width: 10.0, height: 10.0, rotate: -18, opacity: 1 },
    },
  },

  // 18. Right Ankle
  {
    id: 'ankle_right',
    key: 'Ankle',
    label: 'Right Ankle',
    defaultTheta: 0,
    frames: {
      0: { left: 40.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      45: { left: 43.0, top: 92.0, width: 11.0, height: 9.0, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      135: { left: 48.0, top: 92.0, width: 11.0, height: 9.0, rotate: 2, opacity: 1 },
      180: { left: 40.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      225: { left: 52.0, top: 92.0, width: 11.0, height: 9.0, rotate: -2, opacity: 0.3 },
      270: { left: 48.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 0.2 },
      315: { left: 57.0, top: 92.0, width: 11.0, height: 9.0, rotate: 2, opacity: 0.35 },
    },
  },

  // 19. Left Ankle
  {
    id: 'ankle_left',
    key: 'Ankle',
    label: 'Left Ankle',
    defaultTheta: 0,
    frames: {
      0: { left: 60.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      45: { left: 57.0, top: 92.0, width: 11.0, height: 9.0, rotate: 2, opacity: 0.35 },
      90: { left: 48.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 0.2 },
      135: { left: 52.0, top: 92.0, width: 11.0, height: 9.0, rotate: -2, opacity: 0.3 },
      180: { left: 60.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      225: { left: 48.0, top: 92.0, width: 11.0, height: 9.0, rotate: 2, opacity: 1 },
      270: { left: 52.0, top: 92.0, width: 11.0, height: 9.0, rotate: 0, opacity: 1 },
      315: { left: 43.0, top: 92.0, width: 11.0, height: 9.0, rotate: -2, opacity: 1 },
    },
  },
];

// Continuous smooth interpolation for coordinates across 360 degrees
const getInterpolatedZoneCoords = (zone, theta) => {
  if (!zone) return null;
  const normalizedTheta = ((theta % 360) + 360) % 360;
  const frameIdx = Math.floor(normalizedTheta / 45);
  const nextIdx = (frameIdx + 1) % 8;
  const t = (normalizedTheta - frameIdx * 45) / 45;

  const frameA = ANATOMY_360_FRAMES[frameIdx];
  const frameB = ANATOMY_360_FRAMES[nextIdx];

  const coordsA = zone.frames?.[frameA.angle];
  const coordsB = zone.frames?.[frameB.angle];

  if (!coordsA && !coordsB) return null;

  const easeT = t * t * (3 - 2 * t);

  const defaultAngle = zone.defaultTheta ?? 0;
  const angleDelta = Math.abs((((normalizedTheta - defaultAngle) % 360) + 540) % 360 - 180);
  const cosFactor = Math.max(0.55, Math.cos((angleDelta * Math.PI) / 180));

  if (coordsA && coordsB) {
    return {
      left: coordsA.left + (coordsB.left - coordsA.left) * easeT,
      top: coordsA.top + (coordsB.top - coordsA.top) * easeT,
      width: coordsA.width + (coordsB.width - coordsA.width) * easeT,
      height: coordsA.height + (coordsB.height - coordsA.height) * easeT,
      rotate: (coordsA.rotate || 0) + ((coordsB.rotate || 0) - (coordsA.rotate || 0)) * easeT,
      opacity: (coordsA.opacity ?? 1) * (1 - easeT) + (coordsB.opacity ?? 1) * easeT,
      scale: 1.15,
      perspectiveX: cosFactor,
    };
  }

  if (coordsA) {
    return {
      ...coordsA,
      opacity: (coordsA.opacity ?? 1) * (1 - easeT),
      scale: 1.15,
      perspectiveX: cosFactor,
    };
  }

  return coordsB || null;
};

export const Interactive3DStudio = ({
  selectedBodyArea = null, // null by default so no body part is highlighted until client clicks
  onSelectBodyArea,
  selectedZoneId: controlledZoneId = null,
  onSelectZoneId,
  selectedDesign = null,
  onSelectDesign,
  isTattooPreviewActive = false,
  onToggleTattooPreview,
  designs = [],
  compact = false,
  avatarGender: controlledGender,
  onAvatarGenderChange,
  showOptionsDrawer = false,
  onToggleOptionsDrawer,
  onNavigateBack,
}) => {
  // Model Avatar State: Default to 'anatomy'
  const [internalGender, setInternalGender] = useState('anatomy');
  const avatarGender = controlledGender !== undefined ? controlledGender : internalGender;
  const setAvatarGender = (g) => {
    setInternalGender(g);
    if (onAvatarGenderChange) onAvatarGenderChange(g);
  };

  const activeFrames =
    avatarGender === 'anatomy'
      ? ANATOMY_360_FRAMES
      : avatarGender === 'female'
        ? FEMININE_360_FRAMES
        : MASCULINE_360_FRAMES;

  // Track the EXACT clicked zone ID so ONLY that part highlights and blinks (not others!)
  const [internalZoneId, setInternalZoneId] = useState(null);
  const currentZoneId = controlledZoneId !== undefined ? controlledZoneId : internalZoneId;

  // Fluid angle physics refs
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isAutoSpinRef = useRef(false);

  // States
  const [displayAngle, setDisplayAngle] = useState(0);
  const [hoveredZoneId, setHoveredZoneId] = useState(null);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [internalOptionsOpen, setInternalOptionsOpen] = useState(true);
  const [styleFilter, setStyleFilter] = useState('All');

  const optionsOpen = showOptionsDrawer !== undefined ? showOptionsDrawer : internalOptionsOpen;
  const setOptionsOpen = (open) => {
    setInternalOptionsOpen(open);
    if (onToggleOptionsDrawer) onToggleOptionsDrawer(open);
  };

  // Fine-tuning adjustments for active tattoo stencil placement
  const [userScale, setUserScale] = useState(1.0);
  const [userOffsetY, setUserOffsetY] = useState(0);
  const [userOffsetX, setUserOffsetX] = useState(0);
  const [userRotate, setUserRotate] = useState(0);

  // Reset custom adjustments whenever body part or design changes
  useEffect(() => {
    setUserScale(1.0);
    setUserOffsetY(0);
    setUserOffsetX(0);
    setUserRotate(0);
  }, [selectedBodyArea, selectedDesign?.id, selectedDesign?._id, selectedDesign?.name]);

  // Preload all frames into browser cache
  useEffect(() => {
    [...ANATOMY_360_FRAMES, ...FEMININE_360_FRAMES, ...MASCULINE_360_FRAMES].forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
    });

    const handleGlobalRelease = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointerup', handleGlobalRelease);
    window.addEventListener('pointercancel', handleGlobalRelease);
    return () => {
      window.removeEventListener('pointerup', handleGlobalRelease);
      window.removeEventListener('pointercancel', handleGlobalRelease);
    };
  }, []);

  // Smooth 60fps momentum damping loop
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (isAutoSpinRef.current && !isDraggingRef.current) {
        targetAngleRef.current = ((targetAngleRef.current + 22 * dt) % 360 + 360) % 360;
      }

      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.02) {
        targetAngleRef.current = ((targetAngleRef.current - velocityRef.current * 42 * dt) % 360 + 360) % 360;
        velocityRef.current *= Math.pow(0.85, dt * 60);
      } else if (!isDraggingRef.current) {
        velocityRef.current = 0;
      }

      let diff = targetAngleRef.current - currentAngleRef.current;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;

      if (Math.abs(diff) > 0.01) {
        const lerpFactor = 1 - Math.exp(-18 * dt);
        currentAngleRef.current = ((currentAngleRef.current + diff * lerpFactor) % 360 + 360) % 360;
        setDisplayAngle(currentAngleRef.current);
      } else if (Math.abs(diff) > 0) {
        currentAngleRef.current = targetAngleRef.current;
        setDisplayAngle(targetAngleRef.current);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smoothly align angle when a body region is chosen
  useEffect(() => {
    if (!selectedBodyArea && !currentZoneId) return;
    const activeZone =
      HIT_ZONES.find((z) => z.id === currentZoneId) ||
      HIT_ZONES.find((z) => z.key.toLowerCase() === (selectedBodyArea || '').toLowerCase());
    if (activeZone && typeof activeZone.defaultTheta === 'number') {
      velocityRef.current = 0;
      targetAngleRef.current = activeZone.defaultTheta;
    }
  }, [currentZoneId, selectedBodyArea]);

  // Pointer drag controls
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    velocityRef.current = 0;

    if (isAutoSpinRef.current) {
      isAutoSpinRef.current = false;
      setIsAutoSpin(false);
    }

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    lastPointerXRef.current = clientX;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const clientX = e.clientX ?? 0;
    const deltaX = clientX - lastPointerXRef.current;

    dragDistanceRef.current += Math.abs(deltaX);
    lastPointerXRef.current = clientX;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const speed = isMobile ? 1.15 : 0.75;

    const nextAngle = ((targetAngleRef.current - deltaX * speed) % 360 + 360) % 360;
    targetAngleRef.current = nextAngle;
    currentAngleRef.current = nextAngle;
    setDisplayAngle(nextAngle);

    velocityRef.current = velocityRef.current * 0.4 + (deltaX * 0.35) * 0.6;
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
  };

  // Step rotation
  const handleStepRotate = (delta) => {
    velocityRef.current = 0;
    setIsAutoSpin(false);
    isAutoSpinRef.current = false;
    const currentBase = Math.round(targetAngleRef.current / 45) * 45;
    targetAngleRef.current = ((currentBase + delta) % 360 + 360) % 360;
  };

  const handleSnapToAngle = (angle) => {
    velocityRef.current = 0;
    setIsAutoSpin(false);
    isAutoSpinRef.current = false;
    targetAngleRef.current = ((angle % 360) + 360) % 360;
  };

  const toggleAutoSpin = () => {
    const nextVal = !isAutoSpin;
    setIsAutoSpin(nextVal);
    isAutoSpinRef.current = nextVal;
    velocityRef.current = 0;
  };

  // Body part click handler:
  // ONLY that clicked zone is highlighted and blinks!
  // No tattoo displays automatically.
  // Tattoo options for that part are immediately shown!
  const handleBodyPartClick = (zone) => {
    setInternalZoneId(zone.id);
    if (onSelectZoneId) onSelectZoneId(zone.id);
    if (onSelectBodyArea) onSelectBodyArea(zone.key);
    if (onToggleTattooPreview) onToggleTattooPreview(false); // Clean skin on click!
    setOptionsOpen(true); // Open the options for this part!
  };

  const normalizedTheta = ((displayAngle % 360) + 360) % 360;
  const activeFrameIdx = Math.round(normalizedTheta / 45) % 8;
  const targetFrameAngle = activeFrameIdx * 45;
  let relativeAngle = normalizedTheta - targetFrameAngle;
  while (relativeAngle < -180) relativeAngle += 360;
  while (relativeAngle > 180) relativeAngle -= 360;

  // Active zone details
  const activeZone =
    HIT_ZONES.find((z) => z.id === currentZoneId) ||
    (selectedBodyArea ? HIT_ZONES.find((z) => z.key.toLowerCase() === selectedBodyArea.toLowerCase()) : null);

  const activeKey = activeZone?.key || selectedBodyArea;

  const currentColor = activeKey
    ? ANATOMICAL_COLORS[activeKey] || {
        hex: '#fbbf24',
        bg: 'rgba(251, 191, 36, 0.55)',
        border: '#f59e0b',
        name: activeKey,
      }
    : null;

  const suggestionData = activeKey ? BODY_PART_SUGGESTIONS[activeKey] : null;

  // Matching designs for active body part - prioritized so tailored suggestion appears FIRST
  const matchingDesigns = useMemo(() => {
    if (!activeKey) return [];
    const directMatches = designs.filter((d) =>
      (d.bodyAreas || []).some(
        (a) =>
          a.toLowerCase() === activeKey.toLowerCase() ||
          activeKey.toLowerCase().includes(a.toLowerCase())
      )
    );

    const primaryName = suggestionData?.primaryDesignName?.toLowerCase();
    return [...directMatches].sort((a, b) => {
      const aIsPrimary = primaryName && a.name.toLowerCase().includes(primaryName);
      const bIsPrimary = primaryName && b.name.toLowerCase().includes(primaryName);
      if (aIsPrimary && !bIsPrimary) return -1;
      if (!aIsPrimary && bIsPrimary) return 1;
      return 0;
    });
  }, [activeKey, designs, suggestionData]);

  const displayDesigns = matchingDesigns.length > 0 ? matchingDesigns : designs;
  const filteredDesigns =
    styleFilter === 'All' ? displayDesigns : displayDesigns.filter((d) => d.style === styleFilter);

  // Quick 3 views matching user reference image
  const referenceAnglePresets = [
    { label: 'Front View', angle: 0 },
    { label: '3/4 Side View', angle: 45 },
    { label: 'Back View', angle: 180 },
  ];

  return (
    <div className="relative w-full flex flex-col items-center select-none space-y-3 font-sans">
      
      {/* 1. TOP CONTROL BAR */}
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-zinc-950/85 border border-white/10 backdrop-blur-xl shadow-lg z-20">
        
        {/* Left: Compass / Angle */}
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs"
            style={{
              backgroundColor: currentColor ? `${currentColor.hex}22` : '#ffffff10',
              color: currentColor ? currentColor.hex : '#ffffff',
            }}
          >
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block leading-tight">
              360° Anatomical View
            </span>
            <span className="text-xs font-mono font-bold text-white">
              {Math.round(displayAngle)}° • {activeFrames[activeFrameIdx]?.label || '360° Studio'}
            </span>
          </div>
        </div>

        {/* Center: Character Model Selector (Anatomical Character Default) */}
        <div className="flex items-center p-1 bg-black/70 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => setAvatarGender('anatomy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              avatarGender === 'anatomy'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-black shadow-md shadow-emerald-400/25 font-black'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Anatomical Muscle Character"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Anatomical Character</span>
          </button>

          <button
            type="button"
            onClick={() => setAvatarGender('male')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              avatarGender === 'male'
                ? 'bg-amber-400 text-black shadow-sm font-extrabold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Masculine Athletic Model"
          >
            <span>♂</span>
            <span className="hidden sm:inline">Male</span>
          </button>

          <button
            type="button"
            onClick={() => setAvatarGender('female')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              avatarGender === 'female'
                ? 'bg-amber-400 text-black shadow-sm font-extrabold'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Feminine Model"
          >
            <span>♀</span>
            <span className="hidden sm:inline">Female</span>
          </button>
        </div>

        {/* Right: Quick Angles (Front, 3/4 Side, Back) matching user image */}
        <div className="hidden md:flex items-center space-x-1.5 bg-black/60 p-1 rounded-xl border border-white/10">
          {referenceAnglePresets.map((preset) => {
            const isNear =
              Math.abs(normalizedTheta - preset.angle) < 22.5 ||
              (preset.angle === 0 && normalizedTheta > 337.5);
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSnapToAngle(preset.angle)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  isNear
                    ? 'bg-amber-400 text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* 2. MAIN 3D MANNEQUIN TURNTABLE VIEWPORT */}
      <div
        className={`relative w-full ${
          compact ? 'h-[420px] sm:h-[500px]' : 'h-[460px] sm:h-[560px] md:h-[640px]'
        } flex items-center justify-center bg-[#181a1c] rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden cursor-grab active:cursor-grabbing select-none`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ touchAction: 'none', userSelect: 'none' }}
      >
        {/* TOP-LEFT BACK BUTTON */}
        <button
          type="button"
          onClick={() => {
            if (onNavigateBack) onNavigateBack();
            else window.history.back();
          }}
          className="absolute top-4 left-4 z-30 p-2.5 rounded-2xl bg-black/70 hover:bg-black/90 text-white border border-white/15 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 group"
          title="Back to Previous Page"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* ACTIVE BODY PART STATUS BANNER */}
        {currentColor ? (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-black/85 backdrop-blur-md border shadow-2xl transition-all"
            style={{ borderColor: 'rgba(251, 191, 36, 0.4)' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">
              {activeZone?.label || currentColor.name}
            </span>
            <span className="text-[10px] text-zinc-400 font-bold hidden sm:inline">•</span>
            <span
              className="text-[10px] font-bold uppercase tracking-wider text-amber-300 hidden sm:inline"
            >
              Selected
            </span>
            <button
              type="button"
              onClick={() => setOptionsOpen(!optionsOpen)}
              className="ml-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black hover:bg-amber-300 transition-colors"
            >
              {optionsOpen ? 'Hide Options' : `Options (${matchingDesigns.length})`}
            </button>
          </div>
        ) : (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 shadow-xl text-zinc-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Click any body part to view tattoo options</span>
          </div>
        )}

        {/* BOTTOM-RIGHT 360° ROTATE BUTTON */}
        <button
          type="button"
          onClick={() => handleStepRotate(45)}
          className="absolute bottom-4 right-4 z-30 w-11 h-11 rounded-full bg-black/80 hover:bg-black text-amber-300 hover:text-white border border-amber-400/40 backdrop-blur-md shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          title="Rotate 45°"
        >
          <RotateCw className="w-5 h-5 transition-transform group-hover:rotate-45" />
        </button>

        {/* BOTTOM-LEFT AUTO-SPIN & ZOOM CONTROLS */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center space-x-1.5 p-1 bg-black/80 rounded-2xl border border-white/15 backdrop-blur-md shadow-xl">
          <button
            type="button"
            onClick={toggleAutoSpin}
            className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex items-center gap-1 transition-all ${
              isAutoSpin
                ? 'bg-amber-400 text-black'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title="Toggle 360 Turntable Spin"
          >
            {isAutoSpin ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="hidden xs:inline">{isAutoSpin ? 'Pause' : 'Auto-Spin'}</span>
          </button>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.4, z + 0.15))}
            className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.9, z - 0.15))}
            className="p-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => {
              setZoom(1);
              targetAngleRef.current = 0;
            }}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
            title="Reset View (0°)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AMBIENT BACKGROUND GLOW */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentColor ? currentColor.hex : '#38bdf8' }}
          />
        </div>

        {/* SCALABLE CONTAINER FOR ZOOM */}
        <div
          className="relative h-full aspect-[9/16] w-auto max-w-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '50% 50%',
          }}
        >
          {/* 360° CHARACTER VIEWPORT */}
          <div
            className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
            style={{
              transform: `perspective(1100px) rotateY(${-relativeAngle * 0.7}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDraggingRef.current ? 'none' : 'transform 0.12s ease-out',
            }}
          >
            {/* 360 FRAME IMAGES */}
            {activeFrames.map((f, i) => {
              const isCurrent = i === activeFrameIdx;
              return (
                <img
                  key={`${avatarGender}-${f.src}-${f.flip ? 'flip' : 'normal'}`}
                  src={f.src}
                  alt={`${avatarGender} ${f.label}`}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none filter contrast-105 brightness-105 drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] transform-gpu will-change-transform"
                  style={{
                    transform: f.flip ? 'scaleX(-1)' : 'none',
                    opacity: isCurrent ? 1 : 0,
                    visibility: isCurrent ? 'visible' : 'hidden',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/masculine_front.jpg';
                  }}
                />
              );
            })}

            {/* HIGHLIGHT ONLY ON THE EXACT CLICKED PART (NOT ON OTHER PARTS) */}
            {activeZone && (() => {
              const dynamicCoords = getInterpolatedZoneCoords(activeZone, displayAngle);
              if (!dynamicCoords || dynamicCoords.opacity < 0.12) return null;

              return (
                <div
                  key={`highlight-${activeZone.id}`}
                  className="absolute z-15 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${dynamicCoords.left + userOffsetX}%`,
                    top: `${dynamicCoords.top + userOffsetY}%`,
                    width: `${Math.max(dynamicCoords.width * 1.5, 16)}%`,
                    height: `${Math.max(dynamicCoords.height * 1.5, 16)}%`,
                    transform: `translate3d(-50%, -50%, 0) rotate(${dynamicCoords.rotate + userRotate}deg)`,
                    transformOrigin: '50% 50%',
                    opacity: dynamicCoords.opacity,
                  }}
                >
                  {/* Smooth Anatomical Muscle Glow (No Green Dots, No Radar Ping) */}
                  <div
                    className="w-full h-full rounded-2xl animate-pulse pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.18) 50%, transparent 80%)',
                      filter: 'blur(8px)',
                      mixBlendMode: 'screen',
                    }}
                  />
                  <div
                    className="absolute inset-1 rounded-2xl pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.3) 0%, rgba(251, 191, 36, 0.15) 55%, transparent 75%)',
                      filter: 'blur(4px)',
                      mixBlendMode: 'color-dodge',
                    }}
                  />
                </div>
              );
            })()}

            {/* TATTOO DISPLAY: ONLY IF EXPLICITLY ACTIVATED BY CLIENT */}
            {isTattooPreviewActive && selectedDesign && activeZone && (() => {
              const coords = getInterpolatedZoneCoords(activeZone, displayAngle);
              if (!coords || coords.opacity < 0.1) return null;

              const rawSrc =
                selectedDesign.dataUri || selectedDesign.previewImage || selectedDesign.image || '';
              const imgSrc = getFullImageUrl(rawSrc.replace(/\.jpg$/, '.png'));

              const widthMultiplier = (selectedDesign.customWidth || 100) / 100;
              const heightMultiplier = (selectedDesign.customHeight || 100) / 100;
              const adminScale = selectedDesign.customScale || 1.0;

              return (
                <div
                  className="absolute z-20 pointer-events-none flex items-center justify-center transform-gpu will-change-transform"
                  style={{
                    left: `${coords.left + userOffsetX}%`,
                    top: `${coords.top + userOffsetY}%`,
                    width: `${coords.width * widthMultiplier}%`,
                    height: `${coords.height * heightMultiplier}%`,
                    transform: 'translate3d(-50%, -50%, 0)',
                    transformOrigin: '50% 50%',
                  }}
                >
                  <div
                    className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
                    style={{
                      transform: `rotate(${coords.rotate + userRotate}deg) scale(${
                        coords.scale * adminScale * userScale
                      })`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    <div
                      className="relative w-full h-full flex items-center justify-center pointer-events-none"
                      style={{
                        transform: `scaleX(${coords.perspectiveX || 1})`,
                        WebkitMaskImage:
                          'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',
                        maskImage:
                          'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',
                      }}
                    >
                      {selectedDesign.svg ? (
                        <div className="w-full h-full flex items-center justify-center text-zinc-950 font-bold">
                          {selectedDesign.svg}
                        </div>
                      ) : imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={selectedDesign.name}
                          draggable={false}
                          className="w-full h-full object-contain pointer-events-none select-none"
                          style={{
                            mixBlendMode: 'multiply',
                            filter:
                              'contrast(1.6) brightness(0.72) sepia(0.18) hue-rotate(-15deg) drop-shadow(0 0.5px 1px rgba(25, 15, 10, 0.45))',
                            opacity: Math.min(0.92, coords.opacity * 0.92),
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* DIRECT BODY-PART CLICK HIT ZONES */}
            {HIT_ZONES.map((zone) => {
              const dynamicPlacement = getInterpolatedZoneCoords(zone, displayAngle);
              if (!dynamicPlacement || dynamicPlacement.opacity < 0.25) return null;

              // Only the EXACT clicked zone is considered selected
              const isSelected = currentZoneId === zone.id;
              const isHovered = hoveredZoneId === zone.id;
              const zoneColor = ANATOMICAL_COLORS[zone.key]?.hex || '#fbbf24';

              return (
                <div
                  key={zone.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (dragDistanceRef.current > 8) return;
                    handleBodyPartClick(zone);
                  }}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  className="absolute z-30 cursor-pointer pointer-events-auto -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150"
                  style={{
                    left: `${dynamicPlacement.left}%`,
                    top: `${dynamicPlacement.top}%`,
                    width: `${Math.max(14, dynamicPlacement.width || 16)}%`,
                    height: `${Math.max(12, dynamicPlacement.height || 14)}%`,
                  }}
                  title={`Click ${zone.label} to select and see tattoo options`}
                >
                  {/* Subtle Hover Feedback */}
                  {isHovered && !isSelected && (
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${zoneColor}66 0%, transparent 75%)`,
                        filter: 'blur(5px)',
                      }}
                    />
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* FLOATING OVERLAY: TATTOO SUGGESTIONS FOR CLICKED BODY PART DIRECTLY IN VIEWPORT */}
        {activeKey && optionsOpen && (
          <div
            className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 z-40 bg-black/95 border border-amber-500/40 rounded-2xl p-3.5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] transition-all animate-in fade-in slide-in-from-bottom-3 duration-250 pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/* Header with anatomical suggestion highlights */}
            <div className="flex items-start justify-between pb-2.5 mb-2.5 border-b border-white/10 gap-2">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center flex-wrap gap-2">
                  <div className="flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Suggested Tattoos for {activeZone?.label || activeKey}
                    </span>
                  </div>
                  {suggestionData && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/35">
                      ⭐ Top: {suggestionData.primaryDesignName}
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
                    ({matchingDesigns.length} tailored options)
                  </span>
                </div>

                {suggestionData && (
                  <p className="text-[11px] text-zinc-300 truncate max-w-xl">
                    <span className="text-amber-400 font-semibold">Artist Tip:</span> {suggestionData.tagline} • <span className="text-zinc-400">Pain: {suggestionData.painRating.split('-')[0].trim()}</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => setOptionsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                title="Dismiss overlay"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Horizontal Scroll of Tattoo Cards with Large Images */}
            <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar py-1">
              {matchingDesigns.map((d) => {
                const isCurrentlySelected =
                  selectedDesign?.id === d.id || selectedDesign?._id === d._id || selectedDesign?.name === d.name;
                const isPreviewing = isCurrentlySelected && isTattooPreviewActive;
                const isPrimary =
                  suggestionData?.primaryDesignName &&
                  d.name.toLowerCase().includes(suggestionData.primaryDesignName.toLowerCase());
                const rawImg = d.previewImage || d.dataUri || '';
                const imgSrc = getFullImageUrl(rawImg.replace(/\.jpg$/, '.png'));

                return (
                  <div
                    key={d.id || d._id || d.name}
                    className={`w-48 sm:w-56 shrink-0 rounded-xl p-2.5 flex flex-col justify-between border transition-all relative ${
                      isPrimary
                        ? isPreviewing
                          ? 'bg-amber-400/25 border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
                          : 'bg-zinc-900/95 border-amber-500/50 hover:border-amber-400'
                        : isPreviewing
                        ? 'bg-amber-400/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                        : 'bg-zinc-900/90 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {isPrimary && (
                      <div className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[8px] font-black uppercase tracking-wider shadow">
                        ⭐ Best Match
                      </div>
                    )}
                    <div className="flex items-center space-x-2.5 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-black/90 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={d.name}
                          className="w-full h-full object-contain filter drop-shadow"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/tattoos/mahadev_trishul.png';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-extrabold uppercase text-amber-400 block truncate">
                          {d.style || 'Custom'}
                        </span>
                        <h5 className="text-[11px] font-bold text-white truncate leading-tight">
                          {d.name}
                        </h5>
                        <span className="text-[9px] text-zinc-400 font-mono">
                          {d.estTime || '2-3 hrs'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectDesign) onSelectDesign(d);
                          if (onToggleTattooPreview) onToggleTattooPreview(!isPreviewing);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 ${
                          isPreviewing
                            ? 'bg-amber-400 text-black shadow-md'
                            : 'bg-white/10 hover:bg-white/20 text-white hover:text-amber-300'
                        }`}
                      >
                        {isPreviewing ? (
                          <>
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>On Body</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Preview</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const waUrl = createArtworkInquiryUrl(
                            d.name,
                            'Land of God Studio',
                            activeKey
                          );
                          window.open(waUrl, '_blank');
                        }}
                        className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40"
                        title="WhatsApp Inquiry"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 3. STENCIL FINE-TUNING HUD (ONLY ACTIVE IF A TATTOO IS CURRENTLY PREVIEWED ON SKIN) */}
      {isTattooPreviewActive && selectedDesign && activeKey && (
        <div className="w-full bg-zinc-950/90 border border-amber-500/30 rounded-2xl p-3 px-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Stencil Fit:
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              {selectedDesign.name} on {activeZone?.label || activeKey}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <div className="flex items-center space-x-2 bg-black/50 px-2.5 py-1 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-400 font-mono">Scale:</span>
              <input
                type="range"
                min="0.6"
                max="1.6"
                step="0.05"
                value={userScale}
                onChange={(e) => setUserScale(parseFloat(e.target.value))}
                className="w-20 accent-amber-400 h-1 bg-zinc-800 rounded cursor-pointer"
              />
              <span className="text-[10px] font-mono font-bold text-amber-400 w-8 text-right">
                {Math.round(userScale * 100)}%
              </span>
            </div>

            <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setUserOffsetY((y) => Math.max(-15, y - 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Up"
              >
                ▲ Up
              </button>
              <button
                type="button"
                onClick={() => setUserOffsetY((y) => Math.min(15, y + 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Down"
              >
                ▼ Down
              </button>
              <button
                type="button"
                onClick={() => setUserOffsetX((x) => Math.max(-15, x - 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Left"
              >
                ◀ Left
              </button>
              <button
                type="button"
                onClick={() => setUserOffsetX((x) => Math.min(15, x + 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Right"
              >
                ▶ Right
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onToggleTattooPreview) onToggleTattooPreview(false);
              }}
              className="px-2.5 py-1 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              Clear Tattoo From Body
            </button>
          </div>
        </div>
      )}

      {/* 4. EXPANDED TATTOO OPTIONS SECTION */}
      {activeKey && (
        <div className="w-full bg-zinc-950/90 border border-white/10 rounded-3xl p-5 backdrop-blur-2xl shadow-2xl transition-all">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shrink-0"
                style={{ backgroundColor: `${currentColor.hex}33`, border: `2px solid ${currentColor.hex}` }}
              >
                <Sparkles className="w-5 h-5" style={{ color: currentColor.hex }} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
                    Selected Body Part
                  </span>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/30"
                  >
                    Active Placement
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  Suggested Tattoos for <span style={{ color: currentColor.hex }}>{activeZone?.label || activeKey}</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-semibold">
                {filteredDesigns.length} tailored design{filteredDesigns.length !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>

          {/* Anatomical Recommendation Advice Card */}
          {suggestionData && (
            <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900/90 to-zinc-950 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Top Studio Recommendation</span>
                  </span>
                  <span className="text-xs text-amber-300 font-extrabold">
                    {suggestionData.primaryDesignName}
                  </span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  <strong className="text-white">Why this body part:</strong> {suggestionData.reason}
                </p>
                <p className="text-[11px] text-zinc-400">
                  <strong className="text-zinc-300">Placement & Contour Flow:</strong> {suggestionData.placementAdvice}
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10 w-full md:w-auto justify-end">
                <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 text-center">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Pain Rating</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{suggestionData.painRating}</span>
                </div>
                <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 text-center">
                  <span className="text-[9px] uppercase font-bold text-zinc-400 block">Healing</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{suggestionData.healingTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Style Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-3 no-scrollbar">
            {['All', 'Sacred Devbhoomi', 'Geometric', 'Fine Line', 'Blackwork', 'Japanese', 'Traditional', 'Mandala'].map(
              (style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setStyleFilter(style)}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border ${
                    styleFilter === style
                      ? 'bg-amber-400 text-black border-amber-400 shadow-md font-extrabold'
                      : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {style}
                </button>
              )
            )}
          </div>

          {/* Tattoo Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredDesigns.map((d) => {
              const isCurrentlySelected =
                selectedDesign?.id === d.id || selectedDesign?._id === d._id || selectedDesign?.name === d.name;
              const isPreviewingThis = isCurrentlySelected && isTattooPreviewActive;
              const isPrimary =
                suggestionData?.primaryDesignName &&
                d.name.toLowerCase().includes(suggestionData.primaryDesignName.toLowerCase());
              const rawImg = d.previewImage || d.dataUri || '';
              const imgSrc = getFullImageUrl(rawImg.replace(/\.jpg$/, '.png'));

              return (
                <div
                  key={d.id || d._id || d.name}
                  className={`relative rounded-2xl p-3.5 flex flex-col justify-between transition-all border ${
                    isPrimary
                      ? isPreviewingThis
                        ? 'bg-amber-400/20 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                        : 'bg-zinc-900/90 border-amber-500/50 hover:border-amber-400 shadow-md'
                      : isPreviewingThis
                      ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/40 shadow-xl'
                      : 'bg-zinc-900/80 border-white/10 hover:border-white/20 hover:bg-zinc-900'
                  }`}
                >
                  {isPrimary && (
                    <div className="mb-2 -mt-1 -mx-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/25 to-amber-400/10 border border-amber-500/35 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>#1 Suggested for {activeKey}</span>
                      </span>
                      <span className="text-[9px] font-mono font-bold text-amber-400/90">
                        Top Pick
                      </span>
                    </div>
                  )}
                  <div className="flex items-start space-x-3.5">
                    <div className="relative w-20 h-20 rounded-xl bg-black/90 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                      <img
                        src={imgSrc}
                        alt={d.name}
                        className="w-full h-full object-contain filter drop-shadow"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/tattoos/mahadev_trishul.png';
                        }}
                      />
                      {isPreviewingThis && (
                        <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-amber-400 text-black text-[8px] font-black uppercase">
                          ON BODY
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                        {d.style || 'Custom Design'}
                      </span>
                      <h4 className="text-sm font-extrabold text-white leading-tight line-clamp-1">
                        {d.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {d.description || 'Custom studio artwork by Master Rahul Choudhary.'}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-400" />
                          {d.estTime || '2-3 hrs'}
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">
                          {d.difficulty || 'Custom Masterpiece'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectDesign) onSelectDesign(d);
                        if (onToggleTattooPreview) {
                          onToggleTattooPreview(!isPreviewingThis);
                        }
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        isPreviewingThis
                          ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                          : 'bg-white/10 hover:bg-white/15 text-white hover:text-amber-300 border border-white/10'
                      }`}
                    >
                      {isPreviewingThis ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Previewing (Tap to Hide)</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview Tattoo on Body</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const waUrl = createArtworkInquiryUrl(
                          d.name,
                          'Land of God Studio',
                          activeKey
                        );
                        window.open(waUrl, '_blank');
                      }}
                      className="p-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 transition-colors"
                      title={`Inquire about ${d.name} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
