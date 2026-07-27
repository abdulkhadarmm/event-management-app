import React from 'react';
import { Button } from 'antd';
import { StarOutlined, ArrowRightOutlined, StarFilled } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

/**
 * Modern Luxury Hero Section for EventEasy Landing Page.
 */
export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: 'relative',
        background: 'radial-gradient(circle at 50% 20%, #1E1B4B 0%, #0F172A 100%)',
        color: '#FFFFFF',
        padding: '100px 24px 120px 24px',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorative Lighting Gradients */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
          
          {/* Hero Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                marginBottom: '24px',
              }}
            >
              <StarOutlined style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#FCD34D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Bespoke Luxury Events
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: '700',
                lineHeight: '1.15',
                marginBottom: '24px',
                color: '#FFFFFF',
              }}
            >
              Crafting Radiant <br />
              <span style={{ color: '#F59E0B', fontStyle: 'italic' }}>Moments</span> into Memories.
            </h1>

            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#CBD5E1',
                marginBottom: '36px',
                maxWidth: '540px',
              }}
            >
              EventEasy curates high-end weddings, corporate galas, and milestone celebrations. From concept architecture to seamless execution, we handle every extraordinary detail.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                iconPosition="end"
                onClick={() => navigate(ROUTES.SERVICES)}
                style={{
                  height: '52px',
                  paddingInline: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderColor: 'transparent',
                  boxShadow: '0 8px 24px rgba(217, 119, 6, 0.4)',
                }}
              >
                Explore Services
              </Button>

              <Button
                size="large"
                onClick={() => navigate(ROUTES.CONTACT)}
                style={{
                  height: '52px',
                  paddingInline: '28px',
                  fontSize: '16px',
                  fontWeight: '600',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Plan Your Event
              </Button>
            </div>

            {/* Social Trust Metrics */}
            <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', marginBottom: '4px' }}>
                  {[...Array(5)].map((_, i) => <StarFilled key={i} />)}
                </div>
                <div style={{ fontSize: '14px', color: '#94A3B8' }}>4.9/5 Rating from 250+ Couples & Brands</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                borderRadius: '24px',
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                style={{
                  height: '360px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <StarOutlined style={{ fontSize: '56px', color: '#FCD34D', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '28px', color: '#FFFFFF', marginBottom: '8px' }}>
                  Celebrate the Extraordinary
                </h3>
                <p style={{ color: '#E2E8F0', fontSize: '15px', maxWidth: '340px' }}>
                  Tailored event design, venue curation, floral architecture, and flawless guest experience management.
                </p>
              </div>

              {/* Floating Stat Widget */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  padding: '16px 24px',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#D97706', fontFamily: "'Playfair Display', serif" }}>
                  1,500+
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500', lineHeight: '1.3' }}>
                  Premium Events <br /> Executed Flawlessly
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
