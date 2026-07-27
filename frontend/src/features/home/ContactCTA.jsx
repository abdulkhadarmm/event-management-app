import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { designTokens } from '../../theme/designTokens';

/**
 * High-Impact Dark CTA Banner matching the reference image layout:
 * Dark slate background with nature backdrop image, pill badge "Call to Action",
 * headline "Transform Your Event Operations With AI Precision", and dual pill CTA buttons.
 */
export const ContactCTA = () => {
  const navigate = useNavigate();

  return (
    <section style={{ padding: designTokens.spacing.sectionDesktop, background: designTokens.colors.bg }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            padding: '88px 32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2)',
          }}
        >
          {/* Subtle Background Scenery Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.25,
              mixBlendMode: 'luminosity',
            }}
          />

          <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                padding: '6px 18px',
                borderRadius: designTokens.radii.pill,
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '24px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              Call to Action
            </div>

            <h2
              style={{
                fontFamily: designTokens.typography.fontDisplay,
                fontSize: designTokens.typography.heroTitle,
                fontWeight: '800',
                color: '#FFFFFF',
                lineHeight: '1.15',
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}
            >
              Transform Your Event Operations With AI Precision
            </h2>

            <p
              style={{
                fontSize: designTokens.typography.bodyLarge,
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: designTokens.typography.fontBody,
                lineHeight: '1.65',
                marginBottom: '40px',
                maxWidth: '640px',
                margin: '0 auto 40px auto',
              }}
            >
              Automate workflows, optimize teams, and deliver unforgettable event experiences—all powered by next-generation intelligence. Elevate your events to new heights.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(ROUTES.CONTACT)}
                style={{
                  height: '52px',
                  padding: '0 36px',
                  borderRadius: designTokens.radii.pill,
                  fontSize: '15px',
                  fontWeight: '700',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: 'none',
                }}
              >
                Inquire Event Now
              </Button>

              <Button
                size="large"
                onClick={() => navigate(ROUTES.PACKAGES)}
                style={{
                  height: '52px',
                  padding: '0 32px',
                  borderRadius: designTokens.radii.pill,
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                Explore Offerings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
