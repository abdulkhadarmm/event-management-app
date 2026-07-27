import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS } from '../../../constants/navigation';
import { designTokens } from '../../../theme/designTokens';

export const FooterLinks = () => {
  const eventTypes = [
    'Luxury Weddings',
    'Corporate Galas',
    'Milestone Anniversaries',
    'VIP Birthday Celebrations',
    'Exhibitions & Summits',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px' }}>
      <div>
        <h4 style={{ color: designTokens.colors.accent, fontSize: '15px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Navigation
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 style={{ color: designTokens.colors.accent, fontSize: '15px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Event Services
        </h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {eventTypes.map((type, idx) => (
            <li key={idx} style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '14px' }}>
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
