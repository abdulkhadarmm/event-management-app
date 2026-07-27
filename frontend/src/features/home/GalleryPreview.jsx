import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import { RightOutlined, EnvironmentOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { galleryService } from '../../services/galleryService';
import { ROUTES } from '../../constants/routes';
import { designTokens } from '../../theme/designTokens';

// Static fallback dataset matching initial database seed
const fallbackCelebrations = [
  { id: 'g1', title: 'Grand Royal Palace Wedding', location: 'The Taj Lake Palace, Udaipur', category: 'Luxury Wedding', year: '2026', imagePath: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 'g2', title: 'Tech Innovation Summit Gala', location: 'Jio World Convention Centre, Mumbai', category: 'Corporate Gala', year: '2026', imagePath: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
  { id: 'g3', title: 'Golden Jubilee Gala Reception', location: 'The Leela Palace, New Delhi', category: 'Anniversary', year: '2025', imagePath: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
  { id: 'g4', title: 'VIP Diamond Birthday Soirée', location: 'Four Seasons, Bengaluru', category: 'Milestone Birthday', year: '2025', imagePath: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' },
  { id: 'g5', title: 'Destination Beachside Sangeet', location: 'W Goa Resort, Vagator, Goa', category: 'Sangeet & Reception', year: '2025', imagePath: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80' },
  { id: 'g6', title: 'Luxury Product & Fashion Launch', location: 'ITC Grand Chola, Chennai', category: 'Product Launch', year: '2025', imagePath: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' },
  { id: 'g7', title: 'Royal Heritage Haveli Wedding', location: 'Umaid Bhawan Palace, Jodhpur', category: 'Destination Wedding', year: '2025', imagePath: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
  { id: 'g8', title: 'Corporate Excellence Leadership Awards', location: 'Taj Santacruz, Mumbai', category: 'Corporate Awards', year: '2025', imagePath: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
  { id: 'g9', title: 'Emerald Anniversary Garden Soirée', location: 'Rambagh Palace, Jaipur', category: 'Anniversary', year: '2025', imagePath: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 'g10', title: 'Bollywood Celebrity Music Night', location: 'JW Marriott, Juhu, Mumbai', category: 'VIP Gala', year: '2024', imagePath: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
  { id: 'g11', title: 'Intimate Sunset Mehendi Ceremony', location: 'Alila Diwa, South Goa', category: 'Mehendi & Cocktail', year: '2024', imagePath: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80' },
  { id: 'g12', title: 'Global Tech Keynote & Exhibition', location: 'BIEC, Bengaluru', category: 'Exhibition', year: '2024', imagePath: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' },
];

/**
 * Modern High-Impact Indian Event Portfolio Gallery Component:
 * - NO pill badge above header
 * - Data fetched dynamically from backend (galleryService.getPublicActiveGalleryItems) with fallback support
 * - Shows INITIAL 6 LATEST CARDS by default with a clean "View More" button (+6 on click)
 * - High-resolution event photography cards with card-img-zoom
 * - Frosted glass category & year tags
 * - Interactive card lift animation (.card-interactive)
 */
export const GalleryPreview = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: remoteData, isLoading } = useQuery({
    queryKey: ['publicGallery'],
    queryFn: galleryService.getPublicActiveGalleryItems,
    retry: 1,
  });

  const celebrations = (remoteData && remoteData.length > 0) ? remoteData : fallbackCelebrations;

  const displayedItems = celebrations.slice(0, visibleCount);
  const hasMore = celebrations.length > visibleCount;

  return (
    <section style={{ padding: '24px 24px 80px 24px', background: designTokens.colors.bg }}>
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
            Recent Celebrations
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.6' }}>
            Explore highlights from extraordinary royal weddings, corporate galas, and milestone bashes planned and managed by EventEasy.
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '48px' }}><Spin size="large" /></div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="card-interactive"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  style={{
                    borderRadius: '24px',
                    background: designTokens.colors.surface,
                    border: `1px solid ${designTokens.colors.border}`,
                    overflow: 'hidden',
                    boxShadow: designTokens.shadows.card,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* High-Resolution Event Photography Header */}
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={item.imagePath || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="card-img-zoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Vignette Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 60%)',
                      }}
                    />

                    {/* Top Left Category Tag Badge */}
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
                      {item.category}
                    </div>

                    {/* Top Right Year Tag */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#FFFFFF',
                      }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Card Body Info */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: designTokens.typography.fontDisplay,
                          fontSize: '20px',
                          fontWeight: '800',
                          color: '#0F172A',
                          marginBottom: '8px',
                          lineHeight: '1.3',
                          letterSpacing: '-0.3px',
                        }}
                      >
                        {item.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                        <EnvironmentOutlined style={{ color: designTokens.colors.accent }} />
                        <span>{item.location}</span>
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
                          padding: '0 20px',
                          border: 'none',
                        }}
                      >
                        View Showcase
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
                        <span>Inquire Venue</span>
                        <RightOutlined style={{ fontSize: '11px' }} />
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* VIEW MORE / SHOW LESS BUTTON */}
            {celebrations.length > 6 && (
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                {hasMore ? (
                  <Button
                    type="primary"
                    className="btn-animated"
                    size="large"
                    icon={<DownOutlined />}
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    style={{
                      height: '50px',
                      padding: '0 36px',
                      borderRadius: '9999px',
                      fontSize: '15px',
                      fontWeight: '700',
                      background: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.18)',
                    }}
                  >
                    View More
                  </Button>
                ) : (
                  <Button
                    className="btn-animated"
                    size="large"
                    icon={<UpOutlined />}
                    onClick={() => setVisibleCount(6)}
                    style={{
                      height: '48px',
                      padding: '0 32px',
                      borderRadius: '9999px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#0F172A',
                      background: '#FFFFFF',
                      border: '1.5px solid #0F172A',
                    }}
                  >
                    Show Less
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
