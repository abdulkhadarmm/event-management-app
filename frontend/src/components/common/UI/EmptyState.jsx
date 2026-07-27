import React from 'react';
import { Empty, Button } from 'antd';

/**
 * Reusable empty state placeholder widget.
 */
export const EmptyState = ({ title = 'No Data Available', description = 'There are no items to display at this time.', actionText, onAction }) => {
  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <Empty
        description={
          <div>
            <h3 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{title}</h3>
            <p style={{ color: '#64748B', fontSize: '14px' }}>{description}</p>
          </div>
        }
      >
        {actionText && (
          <Button type="primary" onClick={onAction} style={{ marginTop: '16px', background: '#1E1B4B' }}>
            {actionText}
          </Button>
        )}
      </Empty>
    </div>
  );
};
