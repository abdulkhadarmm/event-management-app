import React from 'react';
import { Button, Spin } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { themeService } from '../../services/themeService';
import { ROUTES } from '../../constants/routes';
import { designTokens } from '../../theme/designTokens';

// High-resolution visual theme imagery map matching luxury event aesthetic fallback
const themeImageMap = {
  'Midnight Opulence': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'Boho Botanical Garden': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
  'Monochrome Modernist': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  'Sunset Velvet Glow': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
};

// Helper to parse dynamic color swatches from backend accentColor property
const getSwatches = (theme) => {
  if (theme?.accentColor) {
    if (theme.accentColor.includes(',')) {
      const parsed = theme.accentColor.split(',').map((s) => s.trim()).filter(Boolean);
      if (parsed.length > 0) return parsed;
    } else if (theme.accentColor.startsWith('#')) {
      return [theme.accentColor];
    }
  }
  return ['#1E1B4B', '#D97706', '#059669', '#F59E0B'];
};

/**
 * Modern Signature Event Themes Showcase Component matching project design language:
 * - Dynamically renders backend theme imagePath and accentColor swatches
 * - High-resolution theme photography header (220px) with card-img-zoom
 * - Category badge in frosted glass
 * - Interactive card lift animation (.card-interactive)
 * - Visual color palette swatches row dynamically populated from database
 * - Dark pill CTA button ("Inquire Theme") + "Explore Theme >" link
 */
export const ThemesPreview = () => {
  const navigate = useNavigate();

  const { data: themes, isLoading, error } = useQuery({
    queryKey: ['publicThemes'],
    queryFn: themeService.getActiveThemes,
  });

  return (
    <section style={{ padding: '24px 24px 80px 24px', background: designTokens.colors.bgAlt }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        
        {/* Clean Section Header (No Pill Badge) */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <h2
            style={{
              fontFamily: designTokens.typography.fontDisplay,
              fontSize: designTokens.typography.sectionTitle,
              fontWeight: '800',
              color: designTokens.colors.textPrimary,
              lineHeight: '1.2',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Signature Event Themes
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.6' }}>
            Immerse your guests in carefully curated visual atmospheres crafted by our master interior and event designers.
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '48px' }}><Spin size="large" /></div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: designTokens.colors.error }}>Unable to load themes dynamically. Please check backend connection.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {themes?.map((theme) => {
              const bgImg = (theme.imagePath && theme.imagePath.startsWith('http'))
                ? theme.imagePath
                : (themeImageMap[theme.name] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80');

              const swatches = getSwatches(theme);

              return (
                <div
                  key={theme.id}
                  className="card-interactive"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  style={{
                    background: designTokens.colors.surface,
                    borderRadius: '24px',
                    border: `1px solid ${designTokens.colors.border}`,
                    overflow: 'hidden',
                    boxShadow: designTokens.shadows.card,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Top Theme Image Banner Header */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={bgImg}
                      alt={theme.name}
                      className="card-img-zoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Dark Vignette Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)',
                      }}
                    />

                    {/* Top Left Category Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        background: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#0F172A',
                        letterSpacing: '0.8px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {theme.category}
                    </div>
                  </div>

                  {/* Clean White Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: designTokens.typography.fontDisplay,
                          fontSize: '22px',
                          fontWeight: '800',
                          color: '#0F172A',
                          marginBottom: '10px',
                          letterSpacing: '-0.3px',
                        }}
                      >
                        {theme.name}
                      </h3>

                      <p
                        style={{
                          color: '#475569',
                          fontSize: '14px',
                          lineHeight: '1.65',
                          marginBottom: '20px',
                        }}
                      >
                        {theme.description}
                      </p>

                      {/* Dynamic Visual Palette Color Swatches */}
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                          Color Palette
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {swatches.map((hex, i) => (
                            <span
                              key={i}
                              title={hex}
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: hex,
                                border: '2px solid #FFFFFF',
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                display: 'inline-block',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: `1px solid ${designTokens.colors.borderSubtle}`,
                      }}
                    >
                      <Button
                        type="primary"
                        className="btn-animated"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(ROUTES.CONTACT);
                        }}
                        style={{
                          borderRadius: '9999px',
                          background: '#0F172A',
                          color: '#FFFFFF',
                          fontWeight: '700',
                          fontSize: '13px',
                          height: '40px',
                          padding: '0 22px',
                          border: 'none',
                        }}
                      >
                        Inquire Theme
                      </Button>

                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: '700',
                          color: '#6366F1',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>Explore Theme</span>
                        <RightOutlined style={{ fontSize: '11px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
