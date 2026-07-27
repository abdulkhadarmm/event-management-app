import React from 'react';
import { COMPANY_CONTACT } from '../../../constants/navigation';
import { designTokens } from '../../../theme/designTokens';

export const FooterContact = () => {
  return (
    <div>
      <h4 style={{ color: designTokens.colors.accent, fontSize: '15px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Concierge Desk
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.75)' }}>
        <div>📍 {COMPANY_CONTACT.address}</div>
        <div>📞 {COMPANY_CONTACT.phone}</div>
        <div>✉️ {COMPANY_CONTACT.email}</div>
        <div>⏰ {COMPANY_CONTACT.workingHours}</div>
      </div>
    </div>
  );
};
