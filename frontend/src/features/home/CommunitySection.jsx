import React from 'react';
import { BookOutlined, TeamOutlined, CommentOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { designTokens } from '../../theme/designTokens';

/**
 * Community Section matching reference image middle row:
 * Pill badge "Learn, Share, Grow Together", title "Join the Community",
 * 3 floating white cards with minimal icons.
 */
export const CommunitySection = () => {
  const cards = [
    {
      icon: <BookOutlined style={{ fontSize: '24px', color: designTokens.colors.accent }} />,
      title: 'Exclusive Learning Hub',
      description: 'Workshops, tutorials, and best practices to level up your event management capabilities.',
      linkText: 'Join Learning Hub',
    },
    {
      icon: <TeamOutlined style={{ fontSize: '24px', color: designTokens.colors.accent }} />,
      title: 'Networking With Peers',
      description: 'Meet like-minded creators, agency founders, and venue managers exchanging insights.',
      linkText: 'Start Networking Now',
    },
    {
      icon: <CommentOutlined style={{ fontSize: '24px', color: designTokens.colors.accent }} />,
      title: 'Direct Access To Experts',
      description: 'Get 1-on-1 strategic insights and technical support directly from the platform team.',
      linkText: 'Talk to Experts',
    },
  ];

  return (
    <section style={{ padding: designTokens.spacing.sectionDesktop, background: designTokens.colors.bgAlt }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              padding: '6px 18px',
              borderRadius: designTokens.radii.pill,
              background: designTokens.colors.surface,
              border: `1px solid ${designTokens.colors.border}`,
              fontSize: '12px',
              fontWeight: '600',
              color: designTokens.colors.textSecondary,
              marginBottom: '16px',
            }}
          >
            Learn, Share, Grow Together
          </div>

          <h2
            style={{
              fontFamily: designTokens.typography.fontDisplay,
              fontSize: designTokens.typography.sectionTitle,
              fontWeight: '800',
              color: designTokens.colors.textPrimary,
              lineHeight: '1.2',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            Join the Community
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.65' }}>
            Join a vibrant community of event planners, marketers, and brands exchanging insights, templates, and daily inspiration.
          </p>
        </div>

        {/* 3 Floating Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: designTokens.colors.surface,
                borderRadius: '20px',
                border: `1px solid ${designTokens.colors.border}`,
                padding: '36px 28px',
                textAlign: 'center',
                boxShadow: designTokens.shadows.subtle,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: designTokens.colors.bgAlt,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {c.icon}
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '700', color: designTokens.colors.textPrimary, marginBottom: '12px' }}>
                  {c.title}
                </h3>

                <p style={{ fontSize: '14px', color: designTokens.colors.textSecondary, lineHeight: '1.6', marginBottom: '28px' }}>
                  {c.description}
                </p>
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: designTokens.colors.accent, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>{c.linkText}</span>
                <ArrowRightOutlined style={{ fontSize: '12px' }} />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
