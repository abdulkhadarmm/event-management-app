import React from 'react';
import { Rate, Avatar } from 'antd';
import { EnvironmentOutlined, CheckCircleFilled, MessageOutlined } from '@ant-design/icons';
import { designTokens } from '../../theme/designTokens';

/**
 * Ultra-Luxury Client Testimonials Showcase:
 * - Clean header (No pill badge) matching overall project design system
 * - 3-Column responsive card grid with interactive hover lift (.card-interactive)
 * - High-res client avatars, location tags, rating stars, and verified client badges
 */
export const Testimonials = () => {
  const testimonials = [
    {
      id: 't1',
      name: 'Victoria & Arthur Sterling',
      event: 'Royal Palace Destination Wedding',
      location: 'The Taj Lake Palace, Udaipur',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'EventEasy orchestrated our wedding at Udaipur with absolute perfection. Every detail from stage lighting to fresh floral architecture exceeded all expectations.',
      rating: 5,
      verifiedTag: 'Verified Royal Couple',
    },
    {
      id: 't2',
      name: 'Vikram Singhania & Board',
      event: 'Global Tech Leadership Summit',
      location: 'Jio World Convention Centre, Mumbai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'The executive conference production was flawless. Their team handled VIP hospitality, 4K LED wall engineering, and gala banquet dining seamlessly.',
      rating: 5,
      verifiedTag: 'Verified Corporate Client',
    },
    {
      id: 't3',
      name: 'Ananya & Rohan Kapoor',
      event: 'Golden Jubilee Gala Reception',
      location: 'The Leela Palace, New Delhi',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      comment: 'From the bespoke lighting ambiance to live entertainment coordination, EventEasy transformed our golden jubilee into an unforgettable royal affair.',
      rating: 5,
      verifiedTag: 'Verified Milestone Host',
    },
  ];

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
            Endorsements of Excellence
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.6' }}>
            Read experiences shared by couples and corporate leaders who entrusted their milestone celebrations to EventEasy.
          </p>
        </div>

        {/* 3-Column Responsive Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="card-interactive"
              style={{
                borderRadius: '24px',
                background: designTokens.colors.surface,
                border: `1px solid ${designTokens.colors.border}`,
                boxShadow: designTokens.shadows.card,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* Top Row: Warm Gold Rating Stars + Verified Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <Rate
                    disabled
                    defaultValue={item.rating}
                    style={{ color: '#F59E0B', fontSize: '16px' }}
                  />

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#059669',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                    }}
                  >
                    <CheckCircleFilled style={{ fontSize: '12px' }} />
                    <span>{item.verifiedTag}</span>
                  </div>
                </div>

                {/* Quote Content */}
                <p
                  style={{
                    fontSize: '15px',
                    color: '#334155',
                    fontStyle: 'italic',
                    lineHeight: '1.75',
                    marginBottom: '28px',
                    position: 'relative',
                  }}
                >
                  "{item.comment}"
                </p>
              </div>

              {/* Bottom Author Profile */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: `1px solid ${designTokens.colors.borderSubtle}`,
                }}
              >
                <Avatar
                  src={item.avatar}
                  size={52}
                  style={{
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                    flexShrink: 0,
                  }}
                />

                <div style={{ overflow: 'hidden' }}>
                  <h4
                    style={{
                      fontFamily: designTokens.typography.fontDisplay,
                      fontSize: '17px',
                      fontWeight: '800',
                      color: '#0F172A',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.2px',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                  >
                    {item.name}
                  </h4>

                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {item.event}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    <EnvironmentOutlined style={{ color: designTokens.colors.accent }} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
