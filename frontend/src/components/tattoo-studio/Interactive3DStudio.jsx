import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Maximize2,
  Move
} from 'lucide-react';
import { getFullImageUrl } from '../../utils/imageHelper';

// 8 High-Resolution Real Human Male Perspectives for 360° Studio Exploration
const MASCULINE_360_FRAMES = [
  { angle: 0, label: '0° Front', src: '/images/masculine_front.jpg', flip: false },
  { angle: 45, label: '45° Front-Right', src: '/images/masculine_front_right.jpg', flip: false },
  { angle: 90, label: '90° Right', src: '/images/masculine_right.jpg', flip: false },
  { angle: 135, label: '135° Back-Right', src: '/images/masculine_back_right.jpg', flip: false },
  { angle: 180, label: '180° Back', src: '/images/masculine_back.jpg', flip: false },
  { angle: 225, label: '225° Back-Left', src: '/images/masculine_back_right.jpg', flip: true },
  { angle: 270, label: '270° Left', src: '/images/masculine_right.jpg', flip: true },
  { angle: 315, label: '315° Front-Left', src: '/images/masculine_front_right.jpg', flip: true },
];

// 8 High-Resolution Real Human Female Perspectives for 360° Studio Exploration
const FEMININE_360_FRAMES = [
  { angle: 0, label: '0° Front', src: '/images/female_front.jpg', flip: false },
  { angle: 45, label: '45° Front-Right', src: '/images/female_front_right.jpg', flip: false },
  { angle: 90, label: '90° Right', src: '/images/female_right.jpg', flip: false },
  { angle: 135, label: '135° Back-Right', src: '/images/female_back_right.jpg', flip: false },
  { angle: 180, label: '180° Back', src: '/images/female_back.jpg', flip: false },
  { angle: 225, label: '225° Back-Left', src: '/images/female_back_right.jpg', flip: true },
  { angle: 270, label: '270° Left', src: '/images/female_right.jpg', flip: true },
  { angle: 315, label: '315° Front-Left', src: '/images/female_front_right.jpg', flip: true },
];

const ANATOMY_360_FRAMES = MASCULINE_360_FRAMES;

// Clean anatomical coordinates on the real human body across all 360° frames
const ANATOMICAL_PLACEMENTS = {
  Forearm: {
    name: 'Forearm',
    label: 'Forearm',
    defaultTheta: 0,
    defaultScale: 1.15,
    frames: {
      0: { left: 20.5, top: 38.5, width: 11.0, height: 16.0, rotate: -26, opacity: 1 },
      45: { left: 29.5, top: 42.0, width: 11.5, height: 16.5, rotate: -15, opacity: 1 },
      90: { left: 54.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 1 },
      135: { left: 33.0, top: 42.0, width: 11.0, height: 16.0, rotate: 12, opacity: 1 },
      180: { left: 20.5, top: 38.5, width: 11.0, height: 16.0, rotate: 26, opacity: 1 },
      225: { left: 67.0, top: 42.0, width: 11.0, height: 16.0, rotate: -12, opacity: 1 },
      270: { left: 46.0, top: 43.5, width: 11.0, height: 16.0, rotate: 0, opacity: 1 },
      315: { left: 70.5, top: 42.0, width: 11.5, height: 16.5, rotate: 15, opacity: 1 },
    },
  },
  'Upper Arm': {
    name: 'Upper Arm',
    label: 'Upper Arm',
    defaultTheta: 45,
    defaultScale: 1.20,
    frames: {
      0: { left: 25.0, top: 29.5, width: 12.0, height: 15.0, rotate: -22, opacity: 1 },
      45: { left: 33.0, top: 31.5, width: 12.0, height: 15.0, rotate: -12, opacity: 1 },
      90: { left: 54.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 1 },
      135: { left: 36.5, top: 31.5, width: 12.0, height: 15.0, rotate: 10, opacity: 1 },
      180: { left: 25.0, top: 29.5, width: 12.0, height: 15.0, rotate: 22, opacity: 1 },
      225: { left: 63.5, top: 31.5, width: 12.0, height: 15.0, rotate: -10, opacity: 1 },
      270: { left: 46.0, top: 32.5, width: 12.0, height: 15.0, rotate: 0, opacity: 1 },
      315: { left: 67.0, top: 31.5, width: 12.0, height: 15.0, rotate: 12, opacity: 1 },
    },
  },
  Shoulder: {
    name: 'Shoulder',
    label: 'Shoulder',
    defaultTheta: 45,
    defaultScale: 1.10,
    frames: {
      0: { left: 31.0, top: 22.5, width: 12.5, height: 12.5, rotate: -12, opacity: 1 },
      45: { left: 36.5, top: 23.5, width: 12.5, height: 12.5, rotate: -8, opacity: 1 },
      90: { left: 54.0, top: 23.5, width: 12.5, height: 13.0, rotate: 0, opacity: 1 },
      135: { left: 40.0, top: 23.5, width: 12.5, height: 12.5, rotate: 8, opacity: 1 },
      180: { left: 31.0, top: 22.5, width: 12.5, height: 12.5, rotate: 12, opacity: 1 },
      225: { left: 60.0, top: 23.5, width: 12.5, height: 12.5, rotate: -8, opacity: 1 },
      270: { left: 46.0, top: 23.5, width: 12.5, height: 13.0, rotate: 0, opacity: 1 },
      315: { left: 63.5, top: 23.5, width: 12.5, height: 12.5, rotate: 8, opacity: 1 },
    },
  },
  Chest: {
    name: 'Chest',
    label: 'Chest',
    defaultTheta: 0,
    defaultScale: 1.40,
    frames: {
      0: { left: 50.0, top: 26.5, width: 22.0, height: 15.0, rotate: 0, opacity: 1 },
      45: { left: 52.0, top: 26.5, width: 19.0, height: 15.0, rotate: -4, opacity: 1 },
      90: { left: 46.0, top: 28.0, width: 12.0, height: 14.0, rotate: -4, opacity: 0.8 },
      135: { left: 44.0, top: 28.5, width: 10.0, height: 12.0, rotate: -2, opacity: 0.1 },
      180: { left: 50.0, top: 27.0, width: 12.0, height: 12.0, rotate: 0, opacity: 0.0 },
      225: { left: 56.0, top: 28.5, width: 10.0, height: 12.0, rotate: 2, opacity: 0.1 },
      270: { left: 54.0, top: 28.0, width: 12.0, height: 14.0, rotate: 4, opacity: 0.8 },
      315: { left: 48.0, top: 26.5, width: 19.0, height: 15.0, rotate: 4, opacity: 1 },
    },
  },
  Back: {
    name: 'Back',
    label: 'Back',
    defaultTheta: 180,
    defaultScale: 1.50,
    frames: {
      0: { left: 50.0, top: 27.0, width: 12.0, height: 12.0, rotate: 0, opacity: 0.0 },
      45: { left: 46.0, top: 28.0, width: 10.0, height: 12.0, rotate: -2, opacity: 0.1 },
      90: { left: 42.0, top: 28.0, width: 12.0, height: 15.0, rotate: 4, opacity: 0.75 },
      135: { left: 52.0, top: 26.5, width: 20.0, height: 17.0, rotate: 4, opacity: 1 },
      180: { left: 50.0, top: 26.5, width: 24.0, height: 18.0, rotate: 0, opacity: 1 },
      225: { left: 48.0, top: 26.5, width: 20.0, height: 17.0, rotate: -4, opacity: 1 },
      270: { left: 58.0, top: 28.0, width: 12.0, height: 15.0, rotate: -4, opacity: 0.75 },
      315: { left: 54.0, top: 28.0, width: 10.0, height: 12.0, rotate: 2, opacity: 0.1 },
    },
  },
  Spine: {
    name: 'Spine',
    label: 'Spine',
    defaultTheta: 180,
    defaultScale: 1.15,
    frames: {
      0: { left: 50.0, top: 32.0, width: 6.0, height: 15.0, rotate: 0, opacity: 0.0 },
      45: { left: 46.0, top: 32.0, width: 6.0, height: 15.0, rotate: 0, opacity: 0.0 },
      90: { left: 42.0, top: 32.0, width: 7.0, height: 25.0, rotate: 0, opacity: 0.6 },
      135: { left: 52.0, top: 32.0, width: 9.5, height: 28.0, rotate: 2, opacity: 1 },
      180: { left: 50.0, top: 32.0, width: 10.0, height: 30.0, rotate: 0, opacity: 1 },
      225: { left: 48.0, top: 32.0, width: 9.5, height: 28.0, rotate: -2, opacity: 1 },
      270: { left: 58.0, top: 32.0, width: 7.0, height: 25.0, rotate: 0, opacity: 0.6 },
      315: { left: 54.0, top: 32.0, width: 6.0, height: 15.0, rotate: 0, opacity: 0.0 },
    },
  },
  Ribs: {
    name: 'Ribs',
    label: 'Ribs',
    defaultTheta: 0,
    defaultScale: 1.15,
    frames: {
      0: { left: 50.0, top: 36.0, width: 16.0, height: 14.0, rotate: 0, opacity: 1 },
      45: { left: 50.0, top: 36.0, width: 15.0, height: 14.0, rotate: -4, opacity: 1 },
      90: { left: 47.0, top: 36.5, width: 13.0, height: 15.0, rotate: 0, opacity: 0.95 },
      135: { left: 46.0, top: 37.0, width: 13.0, height: 14.0, rotate: 2, opacity: 0.7 },
      180: { left: 50.0, top: 36.5, width: 14.0, height: 14.0, rotate: 0, opacity: 0.2 },
      225: { left: 54.0, top: 37.0, width: 13.0, height: 14.0, rotate: -2, opacity: 0.7 },
      270: { left: 53.0, top: 36.5, width: 13.0, height: 15.0, rotate: 0, opacity: 0.95 },
      315: { left: 50.0, top: 36.0, width: 15.0, height: 14.0, rotate: 4, opacity: 1 },
    },
  },
  Thigh: {
    name: 'Thigh',
    label: 'Thigh',
    defaultTheta: 0,
    defaultScale: 1.40,
    frames: {
      0: { left: 42.0, top: 57.0, width: 15.0, height: 19.0, rotate: 0, opacity: 1 },
      45: { left: 46.0, top: 57.5, width: 15.0, height: 19.0, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 58.0, width: 15.0, height: 19.0, rotate: 0, opacity: 1 },
      135: { left: 50.0, top: 58.0, width: 15.0, height: 19.0, rotate: 2, opacity: 1 },
      180: { left: 42.0, top: 57.0, width: 15.0, height: 19.0, rotate: 0, opacity: 1 },
      225: { left: 50.0, top: 58.0, width: 15.0, height: 19.0, rotate: -2, opacity: 1 },
      270: { left: 48.0, top: 58.0, width: 15.0, height: 19.0, rotate: 0, opacity: 1 },
      315: { left: 54.0, top: 57.5, width: 15.0, height: 19.0, rotate: 2, opacity: 1 },
    },
  },
  Calf: {
    name: 'Calf',
    label: 'Calf',
    defaultTheta: 0,
    defaultScale: 1.25,
    frames: {
      0: { left: 41.0, top: 76.5, width: 12.0, height: 18.0, rotate: 0, opacity: 1 },
      45: { left: 45.0, top: 77.0, width: 12.0, height: 18.0, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 77.5, width: 12.0, height: 18.0, rotate: 0, opacity: 1 },
      135: { left: 49.0, top: 77.5, width: 12.0, height: 18.0, rotate: 2, opacity: 1 },
      180: { left: 41.0, top: 76.5, width: 12.0, height: 18.0, rotate: 0, opacity: 1 },
      225: { left: 51.0, top: 77.5, width: 12.0, height: 18.0, rotate: -2, opacity: 1 },
      270: { left: 48.0, top: 77.5, width: 12.0, height: 18.0, rotate: 0, opacity: 1 },
      315: { left: 55.0, top: 77.0, width: 12.0, height: 18.0, rotate: 2, opacity: 1 },
    },
  },
  Wrist: {
    name: 'Wrist',
    label: 'Wrist',
    defaultTheta: 0,
    defaultScale: 0.95,
    frames: {
      0: { left: 16.5, top: 48.5, width: 9.0, height: 10.0, rotate: -30, opacity: 1 },
      45: { left: 26.0, top: 51.0, width: 9.0, height: 10.0, rotate: -18, opacity: 1 },
      90: { left: 54.0, top: 52.0, width: 9.0, height: 10.0, rotate: 0, opacity: 1 },
      135: { left: 29.5, top: 51.0, width: 9.0, height: 10.0, rotate: 15, opacity: 1 },
      180: { left: 16.5, top: 48.5, width: 9.0, height: 10.0, rotate: 30, opacity: 1 },
      225: { left: 70.5, top: 51.0, width: 9.0, height: 10.0, rotate: -15, opacity: 1 },
      270: { left: 46.0, top: 52.0, width: 9.0, height: 10.0, rotate: 0, opacity: 1 },
      315: { left: 73.5, top: 51.0, width: 9.0, height: 10.0, rotate: 18, opacity: 1 },
    },
  },
  Neck: {
    name: 'Neck',
    label: 'Neck',
    defaultTheta: 0,
    defaultScale: 1.05,
    frames: {
      0: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: 0, opacity: 1 },
      45: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: -2, opacity: 1 },
      90: { left: 51.5, top: 16.5, width: 11.0, height: 8.5, rotate: 0, opacity: 1 },
      135: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: 2, opacity: 1 },
      180: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: 0, opacity: 1 },
      225: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: -2, opacity: 1 },
      270: { left: 48.5, top: 16.5, width: 11.0, height: 8.5, rotate: 0, opacity: 1 },
      315: { left: 50.0, top: 16.0, width: 11.0, height: 8.5, rotate: 2, opacity: 1 },
    },
  },
  Ankle: {
    name: 'Ankle',
    label: 'Ankle',
    defaultTheta: 0,
    defaultScale: 0.90,
    frames: {
      0: { left: 39.0, top: 90.0, width: 10.0, height: 8.5, rotate: 0, opacity: 1 },
      45: { left: 43.0, top: 90.0, width: 10.0, height: 8.5, rotate: -2, opacity: 1 },
      90: { left: 52.0, top: 90.0, width: 10.0, height: 8.5, rotate: 0, opacity: 1 },
      135: { left: 48.0, top: 90.0, width: 10.0, height: 8.5, rotate: 2, opacity: 1 },
      180: { left: 39.0, top: 90.0, width: 10.0, height: 8.5, rotate: 0, opacity: 1 },
      225: { left: 52.0, top: 90.0, width: 10.0, height: 8.5, rotate: -2, opacity: 1 },
      270: { left: 48.0, top: 90.0, width: 10.0, height: 8.5, rotate: 0, opacity: 1 },
      315: { left: 57.0, top: 90.0, width: 10.0, height: 8.5, rotate: 2, opacity: 1 },
    },
  },
};

// Continuous smooth interpolation for coordinates across 360 degrees
const getInterpolatedPlacement = (areaKey, theta) => {
  const config = ANATOMICAL_PLACEMENTS[areaKey];
  if (!config) return null;

  const normalizedTheta = ((theta % 360) + 360) % 360;
  const frameIdx = Math.floor(normalizedTheta / 45);
  const nextIdx = (frameIdx + 1) % 8;
  const t = (normalizedTheta - frameIdx * 45) / 45;

  const frameA = ANATOMY_360_FRAMES[frameIdx];
  const frameB = ANATOMY_360_FRAMES[nextIdx];

  const coordsA = config.frames?.[frameA.angle];
  const coordsB = config.frames?.[frameB.angle];

  if (!coordsA && !coordsB) return null;

  // Cubic smoothstep curve for natural organic blending
  const easeT = t * t * (3 - 2 * t);

  // Cylindrical foreshortening
  const defaultAngle = config.defaultTheta ?? 0;
  const angleDelta = Math.abs((((normalizedTheta - defaultAngle) % 360) + 540) % 360 - 180);
  const cosFactor = Math.max(0.55, Math.cos((angleDelta * Math.PI) / 180));
  const perspectiveX = cosFactor;

  if (coordsA && coordsB) {
    return {
      left: coordsA.left + (coordsB.left - coordsA.left) * easeT,
      top: coordsA.top + (coordsB.top - coordsA.top) * easeT,
      width: coordsA.width + (coordsB.width - coordsA.width) * easeT,
      height: coordsA.height + (coordsB.height - coordsA.height) * easeT,
      rotate: coordsA.rotate + (coordsB.rotate - coordsA.rotate) * easeT,
      opacity: (coordsA.opacity ?? 1) * (1 - easeT) + (coordsB.opacity ?? 1) * easeT,
      scale: config.defaultScale || 1.15,
      perspectiveX,
    };
  }

  if (coordsA) {
    return {
      ...coordsA,
      opacity: (coordsA.opacity ?? 1) * (1 - easeT),
      scale: config.defaultScale || 1.15,
      perspectiveX,
    };
  }

  return coordsB || null;
};

export const Interactive3DStudio = ({
  selectedBodyArea = 'Forearm',
  onSelectBodyArea,
  selectedDesign,
  placedTattoos = [],
  compact = false,
  avatarGender: controlledGender,
  onAvatarGenderChange,
}) => {
  // Model Avatar Gender State (Female / Male)
  const [internalGender, setInternalGender] = useState('female');
  const avatarGender = controlledGender !== undefined ? controlledGender : internalGender;
  const setAvatarGender = (g) => {
    setInternalGender(g);
    if (onAvatarGenderChange) onAvatarGenderChange(g);
  };

  const activeFrames = avatarGender === 'female' ? FEMININE_360_FRAMES : MASCULINE_360_FRAMES;

  // Continuous fluid angle physics refs
  const targetAngleRef = useRef(0);
  const currentAngleRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const isAutoSpinRef = useRef(false);

  // States
  const [displayAngle, setDisplayAngle] = useState(0);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [isAutoSpin, setIsAutoSpin] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Interactive In-Skin Stencil Fine-Tuning Controls
  const [userScale, setUserScale] = useState(1.0);
  const [userOffsetY, setUserOffsetY] = useState(0);
  const [userOffsetX, setUserOffsetX] = useState(0);
  const [userRotate, setUserRotate] = useState(0);

  // Reset user custom adjustments whenever the body part or design changes
  useEffect(() => {
    setUserScale(1.0);
    setUserOffsetY(0);
    setUserOffsetX(0);
    setUserRotate(0);
  }, [selectedBodyArea, selectedDesign?.id, selectedDesign?._id, selectedDesign?.name]);

  // Preload all real human 360 frame images for both female and male into browser cache
  useEffect(() => {
    [...FEMININE_360_FRAMES, ...MASCULINE_360_FRAMES].forEach((frame) => {
      const img = new Image();
      img.src = frame.src;
    });
  }, []);

  // Frame-rate independent physics damping loop with ultra-smooth 60fps interpolation
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // Cap max dt to avoid jumps
      lastTime = now;

      // 1. Auto-spin continuous rotation (when active and user is not dragging)
      if (isAutoSpinRef.current && !isDraggingRef.current) {
        targetAngleRef.current = ((targetAngleRef.current + 20 * dt) % 360 + 360) % 360;
      }

      // 2. Smooth momentum throw decay after mouse release
      if (!isDraggingRef.current && Math.abs(velocityRef.current) > 0.02) {
        targetAngleRef.current = ((targetAngleRef.current - velocityRef.current * 42 * dt) % 360 + 360) % 360;
        velocityRef.current *= Math.pow(0.85, dt * 60);
      } else if (!isDraggingRef.current) {
        velocityRef.current = 0;
      }

      // 3. Critically-damped exponential lerp towards targetAngle (avoids sudden snapping)
      let diff = targetAngleRef.current - currentAngleRef.current;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;

      if (Math.abs(diff) > 0.01) {
        // High responsive lerp factor for fluid responsiveness
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

  // Smoothly auto-align angle when a specific body region is selected
  useEffect(() => {
    if (selectedBodyArea && ANATOMICAL_PLACEMENTS[selectedBodyArea]) {
      const idealTheta = ANATOMICAL_PLACEMENTS[selectedBodyArea].defaultTheta;
      if (typeof idealTheta === 'number') {
        velocityRef.current = 0;
        targetAngleRef.current = idealTheta;
      }
    }
  }, [selectedBodyArea]);

  // Pointer dragging handlers with direct 1:1 control and velocity tracking
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    velocityRef.current = 0;

    // Pause auto-spin during manual interaction
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

    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
    const deltaX = clientX - lastPointerXRef.current;

    dragDistanceRef.current += Math.abs(deltaX);
    lastPointerXRef.current = clientX;

    // Smooth linear response: 0.55 degrees per pixel
    targetAngleRef.current = ((targetAngleRef.current - deltaX * 0.55) % 360 + 360) % 360;

    // Smooth filtered velocity calculation
    velocityRef.current = velocityRef.current * 0.4 + (deltaX * 0.3) * 0.6;
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
  };

  // Step rotation by discrete angle increments (e.g., 45°)
  const handleStepRotate = (delta) => {
    velocityRef.current = 0;
    setIsAutoSpin(false);
    isAutoSpinRef.current = false;
    const currentBase = Math.round(targetAngleRef.current / 45) * 45;
    targetAngleRef.current = ((currentBase + delta) % 360 + 360) % 360;
  };

  // Direct snap to preset perspective
  const handleSnapToAngle = (angle) => {
    velocityRef.current = 0;
    setIsAutoSpin(false);
    isAutoSpinRef.current = false;
    targetAngleRef.current = ((angle % 360) + 360) % 360;
  };

  // Toggle auto turntable spin
  const toggleAutoSpin = () => {
    const nextVal = !isAutoSpin;
    setIsAutoSpin(nextVal);
    isAutoSpinRef.current = nextVal;
    velocityRef.current = 0;
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(1.45, Math.round((z + 0.15) * 100) / 100));
  const handleZoomOut = () => setZoom((z) => Math.max(0.9, Math.round((z - 0.15) * 100) / 100));
  const handleResetView = () => {
    setZoom(1);
    setIsAutoSpin(false);
    isAutoSpinRef.current = false;
    velocityRef.current = 0;
    targetAngleRef.current = 0;
  };

  // Continuous frame crossfade math
  const normalizedTheta = ((displayAngle % 360) + 360) % 360;
  const frameIdx = Math.floor(normalizedTheta / 45);
  const nextIdx = (frameIdx + 1) % 8;
  const t = (normalizedTheta - frameIdx * 45) / 45;
  const easeT = t * t * (3 - 2 * t);

  // Friendly perspective label
  const getAngleLabel = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return 'Front View (0°)';
    if (deg >= 22.5 && deg < 67.5) return 'Front-Right (45°)';
    if (deg >= 67.5 && deg < 112.5) return 'Right Profile (90°)';
    if (deg >= 112.5 && deg < 157.5) return 'Back-Right (135°)';
    if (deg >= 157.5 && deg < 202.5) return 'Back View (180°)';
    if (deg >= 202.5 && deg < 247.5) return 'Back-Left (225°)';
    if (deg >= 247.5 && deg < 292.5) return 'Left Profile (270°)';
    return 'Front-Left (315°)';
  };

  const anglePresets = [
    { label: 'Front', angle: 0 },
    { label: '45°', angle: 45 },
    { label: 'Right', angle: 90 },
    { label: 'Back', angle: 180 },
    { label: 'Left', angle: 270 },
  ];

  return (
    <div className="relative w-full flex flex-col items-center select-none space-y-3">
      
      {/* 1. TOP ATELIER CONTROL BAR (HUD) */}
      <div className="w-full flex items-center justify-between px-2.5 sm:px-3 py-2 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-lg z-30 max-w-full overflow-hidden">
        
        {/* Left: Heading Compass Readout */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 block leading-tight">
              360° Perspective
            </span>
            <span className="text-xs font-mono font-bold text-amber-300">
              {getAngleLabel(Math.round(displayAngle))}
            </span>
          </div>
        </div>

        {/* Center: Model Avatar Gender Switcher (Female / Male) */}
        <div className="flex items-center p-1 bg-black/70 rounded-xl border border-white/10 shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => setAvatarGender('female')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
              avatarGender === 'female'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold shadow-md shadow-amber-400/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Switch to Female Anatomical Model"
          >
            <span className="text-xs">♀</span>
            <span>Female Model</span>
          </button>
          <button
            type="button"
            onClick={() => setAvatarGender('male')}
            className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
              avatarGender === 'male'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-extrabold shadow-md shadow-amber-400/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            title="Switch to Male Anatomical Model"
          >
            <span className="text-xs">♂</span>
            <span>Male Model</span>
          </button>
        </div>

        {/* Center-Right: Angle Quick Presets */}
        <div className="hidden lg:flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10">
          {anglePresets.map((preset) => {
            const isNear = Math.abs(normalizedTheta - preset.angle) < 22.5 ||
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

        {/* Right: Controls (Auto-Spin, Zoom, Reset) */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          {/* Step Rotate Left */}
          <button
            type="button"
            onClick={() => handleStepRotate(-45)}
            className="hidden sm:inline-flex p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-white/10 transition-colors"
            title="Rotate Left 45°"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Auto-Spin Toggle */}
          <button
            type="button"
            onClick={toggleAutoSpin}
            className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 sm:gap-1.5 transition-all border ${
              isAutoSpin
                ? 'bg-amber-400 text-black font-bold border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-white/10 hover:bg-zinc-800'
            }`}
            title="Toggle 360° Cinematic Turntable"
          >
            {isAutoSpin ? (
              <>
                <Pause className="w-3 h-3 fill-black" />
                <span className="hidden xs:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span className="hidden xs:inline">Auto-Spin</span>
              </>
            )}
          </button>

          {/* Step Rotate Right */}
          <button
            type="button"
            onClick={() => handleStepRotate(45)}
            className="hidden sm:inline-flex p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-white/10 transition-colors"
            title="Rotate Right 45°"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <div className="hidden sm:block w-[1px] h-4 bg-white/10 mx-0.5" />

          {/* Zoom Out */}
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= 0.9}
            className="hidden sm:inline-flex p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 disabled:opacity-40 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= 1.45}
            className="hidden sm:inline-flex p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 disabled:opacity-40 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
            title="Reset to 0° Front (1x)"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 2. CENTER: 3D MANNEQUIN TURNTABLE CANVAS */}
      <div
        className={`relative w-full ${compact ? 'h-[400px] sm:h-[500px]' : 'h-[440px] sm:h-[540px] md:h-[640px] lg:h-[680px]'} flex items-center justify-center bg-gradient-to-b from-zinc-950 via-zinc-900/70 to-zinc-950 rounded-2xl sm:rounded-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden cursor-grab active:cursor-grabbing`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        style={{ touchAction: 'none' }}
      >
        {/* Floating Avatar Model Selector Badge inside 3D Viewport */}
        <div className="absolute top-3 left-3 z-30 flex items-center p-1 bg-black/85 backdrop-blur-md rounded-2xl border border-amber-400/40 shadow-2xl">
          <button
            type="button"
            onClick={() => setAvatarGender('female')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              avatarGender === 'female'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-md shadow-amber-400/30 font-extrabold'
                : 'text-zinc-300 hover:text-white hover:bg-white/10 font-bold'
            }`}
            title="Switch to Female Avatar"
          >
            <span className="text-xs sm:text-sm font-bold">♀</span>
            <span>Female</span>
          </button>
          <button
            type="button"
            onClick={() => setAvatarGender('male')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              avatarGender === 'male'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black shadow-md shadow-amber-400/30 font-extrabold'
                : 'text-zinc-300 hover:text-white hover:bg-white/10 font-bold'
            }`}
            title="Switch to Male Avatar"
          >
            <span className="text-xs sm:text-sm font-bold">♂</span>
            <span>Male</span>
          </button>
        </div>

        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-amber-500/[0.04] rounded-full blur-[130px]" />
        </div>

        {/* Scalable Container for Zoom */}
        <div
          className="relative h-full aspect-[2/3] flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: '50% 50%',
          }}
        >
          {/* ALL 8 PHOTOREALISTIC HUMAN FRAMES (SEAMLESS 60FPS CROSSFADE) */}
          <div className="relative w-full h-full">
            {activeFrames.map((f, i) => {
              let frameOpacity = 0;
              if (i === frameIdx) {
                frameOpacity = 1 - easeT;
              } else if (i === nextIdx) {
                frameOpacity = easeT;
              }

              return (
                <img
                  key={`${avatarGender}-${f.src}-${f.flip ? 'flip' : 'normal'}`}
                  src={f.src}
                  alt={`${avatarGender} ${f.label}`}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none filter contrast-105 brightness-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transform-gpu will-change-transform"
                  style={{
                    transform: f.flip ? 'scaleX(-1)' : 'none',
                    opacity: frameOpacity,
                    visibility: frameOpacity > 0.01 ? 'visible' : 'hidden',
                  }}
                />
              );
            })}

            {/* REALISTIC IN-SKIN TATTOO ON THE HUMAN BODY */}
            {(() => {
              if (!selectedDesign) return null;
              const coords = getInterpolatedPlacement(selectedBodyArea, displayAngle);
              if (!coords || coords.opacity < 0.08) return null;

              const rawSrc = selectedDesign.dataUri || selectedDesign.previewImage || selectedDesign.image || '';
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
                      transform: `rotate(${coords.rotate + userRotate}deg) scale(${coords.scale * adminScale * userScale})`,
                      transformOrigin: '50% 50%',
                    }}
                  >
                    {/* Realistic in-skin ink simulation */}
                    <div
                      className="relative w-full h-full flex items-center justify-center pointer-events-none"
                      style={{
                        transform: `scaleX(${coords.perspectiveX || 1})`,
                        WebkitMaskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',
                        maskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 82%, transparent 100%)',
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
                            filter: 'contrast(1.6) brightness(0.72) sepia(0.18) hue-rotate(-15deg) drop-shadow(0 0.5px 1px rgba(25, 15, 10, 0.45))',
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
            {Object.keys(ANATOMICAL_PLACEMENTS).map((key) => {
              const config = ANATOMICAL_PLACEMENTS[key];
              const dynamicPlacement = getInterpolatedPlacement(key, displayAngle);
              const fallbackCoords = config.frames?.[0] || config.frames?.[180] || { left: 50, top: 50, width: 20, height: 15 };
              const currentCoords = dynamicPlacement || fallbackCoords;

              if (dynamicPlacement && dynamicPlacement.opacity < 0.25) return null;

              const isSelected = selectedBodyArea.toLowerCase() === key.toLowerCase();
              const isHovered = hoveredPart === key;

              return (
                <div
                  key={key}
                  onPointerDown={(e) => {
                    // Prevent canvas drag capture from hijacking direct hit-zone taps
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectBodyArea) onSelectBodyArea(key);
                  }}
                  onMouseEnter={() => setHoveredPart(key)}
                  onMouseLeave={() => setHoveredPart(null)}
                  className={`absolute z-30 cursor-pointer pointer-events-auto -translate-x-1/2 -translate-y-1/2 rounded-2xl transition-all duration-200 group ${
                    isSelected
                      ? 'ring-2 ring-amber-400 bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                      : isHovered
                      ? 'ring-1 ring-amber-300/80 bg-white/10 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                      : 'hover:bg-amber-400/10'
                  }`}
                  style={{
                    left: `${currentCoords.left}%`,
                    top: `${currentCoords.top}%`,
                    width: `${Math.max(15, currentCoords.width || 16)}%`,
                    height: `${Math.max(13, currentCoords.height || 14)}%`,
                  }}
                  title={`Click to preview design on ${config.name}`}
                >
                  {/* Subtle target crosshair / indicator dot */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                      isSelected || isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-ping" />
                  </div>

                  {(isHovered || isSelected) && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/95 text-amber-300 border border-amber-400/50 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none flex items-center gap-1 z-40 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{config.name}</span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* Drag Guidance Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20 w-full px-4 flex justify-center">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] text-zinc-300 shadow-xl max-w-full text-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="truncate sm:whitespace-normal">Drag horizontally to rotate 360° • Tap body to fit</span>
          </div>
        </div>

      </div>

      {/* 3. STENCIL FIT & SCALE FINE-TUNING HUD */}
      {selectedDesign && (
        <div className="w-full bg-zinc-950/90 border border-amber-500/20 rounded-2xl p-3 px-4 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shadow-lg">
          
          <div className="flex items-center space-x-2">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Stencil Fit:
            </span>
            <span className="text-xs text-amber-300 font-semibold">
              {selectedDesign.name} on {selectedBodyArea}
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Stencil Scale Slider */}
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

            {/* Shift Up/Down Offset */}
            <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setUserOffsetY((y) => Math.max(-15, y - 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Stencil Up"
              >
                ▲ Up
              </button>
              <button
                type="button"
                onClick={() => setUserOffsetY((y) => Math.min(15, y + 2))}
                className="px-2 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-white hover:bg-white/10"
                title="Shift Stencil Down"
              >
                ▼ Down
              </button>
            </div>

            {/* Rotate Offset */}
            <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setUserRotate((r) => r - 5)}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-amber-300 hover:bg-white/10"
                title="Rotate Stencil -5°"
              >
                ↺
              </button>
              <button
                type="button"
                onClick={() => setUserRotate((r) => r + 5)}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold text-zinc-300 hover:text-amber-300 hover:bg-white/10"
                title="Rotate Stencil +5°"
              >
                ↻
              </button>
            </div>

            {/* Quick Fit Presets */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => {
                  setUserScale(0.85);
                  setUserOffsetY(0);
                  setUserRotate(0);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${
                  userScale === 0.85 ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Fit Small
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserScale(1.0);
                  setUserOffsetY(0);
                  setUserRotate(0);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${
                  userScale === 1.0 && userOffsetY === 0 ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => {
                  setUserScale(1.25);
                  setUserOffsetY(0);
                  setUserRotate(0);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-semibold border ${
                  userScale === 1.25 ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'
                }`}
              >
                Full Muscle
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 4. BOTTOM SCRUB DIAL (Interactive 0° - 360° Slider) */}
      <div className="w-full bg-zinc-950/80 border border-white/10 rounded-2xl p-2.5 px-4 backdrop-blur-xl flex items-center space-x-4 shadow-lg">
        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase shrink-0">
          Scrub 360°
        </span>
        <input
          type="range"
          min="0"
          max="359"
          value={Math.round(displayAngle)}
          onChange={(e) => {
            setIsAutoSpin(false);
            isAutoSpinRef.current = false;
            velocityRef.current = 0;
            targetAngleRef.current = Number(e.target.value);
          }}
          className="w-full accent-amber-400 bg-zinc-800 h-1.5 rounded-lg cursor-pointer"
        />
        <span className="text-xs font-mono font-bold text-amber-400 shrink-0 w-12 text-right">
          {Math.round(displayAngle)}°
        </span>
      </div>

    </div>
  );
};
