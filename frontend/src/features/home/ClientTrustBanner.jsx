import React from 'react';
import { designTokens } from '../../theme/designTokens';

/**
 * Client Trust Banner matching reference image row:
 * "Trusted by 4000+ companies of all sizes" with clean tech logos.
 */
export const ClientTrustBanner = () => {
  const brands = [
    { name: 'Adobe', font: 'sans-serif', weight: '800' },
    { name: 'Shopify', font: 'sans-serif', weight: '700' },
    { name: 'GitHub', font: 'monospace', weight: '700' },
    { name: 'Canva', font: 'sans-serif', weight: '600' },
    { name: 'Spotify', font: 'sans-serif', weight: '800' },
    { name: 'Dribbble', font: 'serif', weight: '700', style: 'italic' },
    { name: 'Twitch', font: 'monospace', weight: '800' },
  ];

  return (
    <section
      style={{
        padding: '48px 24px',
        background: designTokens.colors.bg,
        borderBottom: `1px solid ${designTokens.colors.border}`,
      }}
    >
      <div
        style={{
          maxWidth: designTokens.spacing.containerMaxWidth,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        <div style={{ maxWidth: '240px' }}>
          <h4
            style={{
              fontSize: '15px',
              fontWeight: '800',
              color: designTokens.colors.textPrimary,
              margin: 0,
              lineHeight: '1.3',
              letterSpacing: '-0.3px',
            }}
          >
            Trusted by 4000+ companies of all sizes
          </h4>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            opacity: 0.75,
          }}
        >
          {brands.map((b) => (
            <span
              key={b.name}
              style={{
                fontSize: '22px',
                fontWeight: b.weight,
                fontFamily: b.font,
                fontStyle: b.style || 'normal',
                color: designTokens.colors.textPrimary,
                letterSpacing: '-0.5px',
              }}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
