import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * Reusable full-screen or section loader component.
 */
export const Loader = ({ tip = 'Loading EventEasy experience...', fullScreen = false }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 36, color: '#D97706' }} spin />;

  const content = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '40px',
      }}
    >
      <Spin indicator={antIcon} />
      {tip && <span style={{ color: '#64748B', fontSize: '14px', fontWeight: '500' }}>{tip}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};
