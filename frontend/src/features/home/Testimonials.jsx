import React from 'react';
import { Card, Rate } from 'antd';
import { SectionHeader } from '../../components/common/UI/SectionHeader';
import { designTokens } from '../../theme/designTokens';

export const Testimonials = () => {
  const testimonials = [
    {
      id: 't1',
      name: 'Victoria & Arthur Sterling',
      event: 'Royal Destination Wedding',
      comment: 'EventEasy orchestrated our wedding at Plaza Hotel with absolute perfection. Every detail from stage lighting to floral architecture exceeded expectations.',
      rating: 5,
    },
    {
      id: 't2',
      name: 'Harrison Ford & Board',
      event: 'Global Tech Leadership Summit',
      comment: 'The executive conference production was flawless. Their team handled VIP hospitality, audio visual engineering, and gala dining seamlessly.',
      rating: 5,
    },
  ];

  return (
    <section style={{ padding: designTokens.spacing.sectionDesktop, background: designTokens.colors.bgAlt }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        <SectionHeader
          badgeText="Client Testimonials"
          title="Endorsements of Excellence"
          description="Read experiences shared by couples and corporate leaders who entrusted their milestone events to EventEasy."
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {testimonials.map((item) => (
            <Card
              key={item.id}
              style={{
                borderRadius: designTokens.radii.card,
                background: designTokens.colors.surface,
                border: `1px solid ${designTokens.colors.border}`,
                boxShadow: designTokens.shadows.subtle,
              }}
              styles={{ body: { padding: '36px 32px' } }}
            >
              <Rate disabled defaultValue={item.rating} style={{ color: designTokens.colors.accent, marginBottom: '20px', fontSize: '16px' }} />
              <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textPrimary, fontStyle: 'italic', lineHeight: '1.7', marginBottom: '24px' }}>
                "{item.comment}"
              </p>
              <div>
                <h4 style={{ fontFamily: designTokens.typography.fontDisplay, fontSize: '18px', fontWeight: '700', color: designTokens.colors.textPrimary, margin: 0 }}>
                  {item.name}
                </h4>
                <span style={{ fontSize: designTokens.typography.bodySmall, color: designTokens.colors.textSecondary }}>{item.event}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
