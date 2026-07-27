import React from 'react';
import { Button, Spin } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { eventTypeService } from '../../services/eventTypeService';
import { ROUTES } from '../../constants/routes';
import { designTokens } from '../../theme/designTokens';

// Service imagery fallback map matching high-res luxury event photography
const serviceImageMap = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  corporate: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  birthday: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
  anniversary: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
  exhibition: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  conference: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
};

/**
 * Modern Services Grid:
 * - NO DIVISION tags on cards
 * - Dynamic data & image URL coming from backend API (eventTypeService.getActiveEventTypes)
 * - Includes smooth card-interactive hover lift, image zoom, button press, and arrow nudge.
 */
export const ServicesPreview = () => {
  const navigate = useNavigate();

  const { data: eventTypes, isLoading, error } = useQuery({
    queryKey: ['publicEventTypes'],
    queryFn: eventTypeService.getActiveEventTypes,
  });

  return (
    <section style={{ padding: '24px 24px 80px 24px', background: designTokens.colors.bgAlt }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        
        {/* Clean Section Header */}
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
            Curated Event Services
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.6' }}>
            We deliver comprehensive event design, bespoke architecture, and production services tailored to your vision.
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '48px' }}><Spin size="large" /></div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: designTokens.colors.error }}>Unable to load services dynamically. Please check backend connection.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {eventTypes?.map((service) => {
              // Priority: 1. Custom image URL entered in Admin backend, 2. Code map fallback, 3. Default high-res wedding banner
              const bgImg = (service.imagePath && service.imagePath.startsWith('http'))
                ? service.imagePath
                : serviceImageMap[service.code] || serviceImageMap.wedding;

              return (
                <div
                  key={service.id}
                  className="card-interactive"
                  onClick={() => navigate(ROUTES.SERVICES)}
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
                  {/* Top Image Banner Header Header */}
                  <div style={{ position: 'relative', height: '210px', overflow: 'hidden' }}>
                    <img
                      src={bgImg}
                      alt={service.name}
                      className="card-img-zoom"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(15, 23, 42, 0.5) 0%, transparent 60%)',
                      }}
                    />
                  </div>

                  {/* Clean White Body */}
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h3
                        style={{
                          fontFamily: designTokens.typography.fontDisplay,
                          fontSize: '20px',
                          fontWeight: '800',
                          color: '#0F172A',
                          marginBottom: '10px',
                          letterSpacing: '-0.3px',
                        }}
                      >
                        {service.name}
                      </h3>

                      <p
                        style={{
                          color: '#475569',
                          fontSize: '14px',
                          lineHeight: '1.65',
                          marginBottom: '24px',
                        }}
                      >
                        {service.description}
                      </p>
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
                          navigate(ROUTES.SERVICES);
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
                        Inquire Category
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
                        <span>More Details</span>
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
