import React from 'react';
import { Badge } from './Badge';
import { designTokens } from '../../../theme/designTokens';

/**
 * Reusable luxury section heading component with badge, editorial title, and description.
 */
export const SectionHeader = ({ badgeText, title, description, align = 'center', light = false }) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: '680px',
        margin: align === 'center' ? '0 auto 56px auto' : '0 0 56px 0',
      }}
    >
      {badgeText && <Badge variant={light ? 'white' : 'gold'}>{badgeText}</Badge>}
      <h2
        style={{
          fontFamily: designTokens.typography.fontDisplay,
          fontSize: designTokens.typography.sectionTitle,
          fontWeight: '700',
          color: light ? designTokens.colors.textOnDark : designTokens.colors.textPrimary,
          marginTop: '16px',
          marginBottom: '16px',
          lineHeight: '1.2',
          letterSpacing: '-0.3px',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: designTokens.typography.bodyBase,
            fontFamily: designTokens.typography.fontBody,
            color: light ? 'rgba(255, 255, 255, 0.8)' : designTokens.colors.textSecondary,
            lineHeight: '1.65',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
