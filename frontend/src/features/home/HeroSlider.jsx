import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined, StarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES } from '../../config/heroSlidesConfig';
import { designTokens } from '../../theme/designTokens';

/**
 * Modern Full-Screen Hero Slider featuring high-impact sans-serif typography,
 * crisp zero-text-shadow readability, luminous left gradient backdrop, and bold pill CTAs.
 */
export const HeroSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [stage, setStage] = useState('FADE_IN'); // 'FADE_IN' | 'IDLE' | 'FADE_OUT' | 'BG_CHANGE' | 'POST_BG_WAIT'

  const navigate = useNavigate();
  const timeoutsRef = useRef([]);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    clearTimeouts();
    if (document.hidden) return;

    if (stage === 'FADE_IN') {
      const t = setTimeout(() => {
        setStage('IDLE');
      }, 1200);
      timeoutsRef.current.push(t);
    } else if (stage === 'IDLE') {
      const t = setTimeout(() => {
        setStage('FADE_OUT');
      }, 5000);
      timeoutsRef.current.push(t);
    } else if (stage === 'FADE_OUT') {
      const t = setTimeout(() => {
        setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
        setStage('BG_CHANGE');
      }, 400);
      timeoutsRef.current.push(t);
    } else if (stage === 'BG_CHANGE') {
      const t = setTimeout(() => {
        setStage('POST_BG_WAIT');
      }, 600);
      timeoutsRef.current.push(t);
    } else if (stage === 'POST_BG_WAIT') {
      const t = setTimeout(() => {
        setStage('FADE_IN');
      }, 150);
      timeoutsRef.current.push(t);
    }

    return () => clearTimeouts();
  }, [stage, slideIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeouts();
      } else {
        setStage('FADE_IN');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const slide = HERO_SLIDES[slideIndex];

  // Helper calculating GPU-accelerated staggered animation styles per element
  const getElementStyle = (delayMs = 0) => {
    let opacity = 0;
    let translateY = '20px';
    let durationMs = 700;
    let easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
    let transitionDelay = 0;

    if (stage === 'FADE_IN' || stage === 'IDLE') {
      opacity = 1;
      translateY = '0px';
      durationMs = 700;
      easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
      transitionDelay = stage === 'FADE_IN' ? delayMs : 0;
    } else if (stage === 'FADE_OUT') {
      opacity = 0;
      translateY = '-10px';
      durationMs = 400;
      easing = 'ease-in-out';
      transitionDelay = 0;
    } else {
      opacity = 0;
      translateY = '20px';
      durationMs = 0;
      easing = 'ease';
      transitionDelay = 0;
    }

    return {
      opacity,
      transform: `translateY(${translateY}) translateZ(0)`,
      transition: `opacity ${durationMs}ms ${easing} ${transitionDelay}ms, transform ${durationMs}ms ${easing} ${transitionDelay}ms`,
      willChange: 'opacity, transform',
    };
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '680px',
        overflow: 'hidden',
        background: designTokens.colors.bg,
      }}
    >
      {/* Background Media Layers: Completely Static (NO zoom/scale/pan) */}
      {HERO_SLIDES.map((bgSlide, idx) => {
        const isActive = idx === slideIndex;

        return (
          <div
            key={bgSlide.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: 'opacity 600ms ease-in-out',
              zIndex: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
              willChange: 'opacity',
            }}
          >
            {/* Local Video Asset Loader with Image Fallback */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={bgSlide.posterUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'none',
              }}
            >
              <source src={bgSlide.videoUrl} type="video/mp4" />
              <img
                src={bgSlide.posterUrl}
                alt={bgSlide.heading}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </video>

            {/* Luminous Soft Left Gradient Overlay guaranteeing 100% crystal clear legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.82) 38%, rgba(255, 255, 255, 0.25) 68%, transparent 95%)',
              }}
            />

            {/* Subtle Minimal Bottom Transition Blend */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        );
      })}

      {/* Hero Content Container - Vertically Centered Left Side */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          maxWidth: designTokens.spacing.containerMaxWidth,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Unique key forces clean React state reset per slide */}
        <div key={`slide-content-${slideIndex}`} style={{ maxWidth: '680px', paddingTop: '96px' }}>
          
          {/* 1. Unadorned Editorial Category Label (delay: 0ms) */}
          <div style={getElementStyle(0)}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px',
              }}
            >
              <StarOutlined style={{ color: '#4F46E5', fontSize: '12px' }} />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#4F46E5',
                  textTransform: 'uppercase',
                  letterSpacing: '3.5px',
                  fontFamily: designTokens.typography.fontBody,
                }}
              >
                {slide.label}
              </span>
            </div>
          </div>

          {/* 2. Heading (delay: 100ms) - Crisp Zero Text Shadow */}
          <div style={getElementStyle(100)}>
            <h1
              style={{
                fontFamily: designTokens.typography.fontDisplay,
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: '800',
                lineHeight: '1.08',
                marginBottom: '6px',
                color: '#0F172A',
                letterSpacing: '-1px',
                textShadow: 'none',
              }}
            >
              {slide.heading}
            </h1>
          </div>

          {/* 3. Highlight Text (delay: 180ms) - High Contrast Indigo */}
          <div style={getElementStyle(180)}>
            <span
              style={{
                fontFamily: designTokens.typography.fontDisplay,
                fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                fontWeight: '800',
                lineHeight: '1.08',
                marginBottom: '28px',
                display: 'block',
                color: '#4F46E5',
                letterSpacing: '-1px',
                textShadow: 'none',
              }}
            >
              {slide.highlightText}
            </span>
          </div>

          {/* 4. Description Text (delay: 260ms) */}
          <div style={getElementStyle(260)}>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#334155',
                fontFamily: designTokens.typography.fontBody,
                lineHeight: '1.65',
                marginBottom: '40px',
                maxWidth: '560px',
                textShadow: 'none',
              }}
            >
              {slide.description}
            </p>
          </div>

          {/* 5 & 6. High-Impact Action Pill Buttons (delays: 340ms & 420ms) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {/* 5. Primary Pill Button (delay: 340ms) */}
            <div style={getElementStyle(340)}>
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => navigate(slide.primaryCtaLink)}
                style={{
                  height: '54px',
                  padding: '0 38px',
                  borderRadius: designTokens.radii.pill,
                  fontSize: '16px',
                  fontWeight: '700',
                  background: '#0F172A',
                  color: '#FFFFFF',
                  borderColor: 'transparent',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.25)',
                }}
              >
                {slide.primaryCtaText}
              </Button>
            </div>

            {/* 6. Secondary Pill Button (delay: 420ms) */}
            <div style={getElementStyle(420)}>
              <Button
                size="large"
                onClick={() => navigate(slide.secondaryCtaLink)}
                style={{
                  height: '54px',
                  padding: '0 34px',
                  borderRadius: designTokens.radii.pill,
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#0F172A',
                  background: '#FFFFFF',
                  border: '2px solid #0F172A',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                }}
              >
                {slide.secondaryCtaText}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
