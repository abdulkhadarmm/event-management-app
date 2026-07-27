import React from 'react';
import { Card } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { designTokens } from '../../../theme/designTokens';

/**
 * TimelineSection component displaying event planning milestones over time.
 * Redesigned with custom vertical milestone timeline cards, purple connector line, and luxury badges.
 */
export const TimelineSection = ({ timelineItems }) => {
  if (!timelineItems || timelineItems.length === 0) return null;

  return (
    <Card
      style={{
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)',
        marginBottom: '28px',
        background: '#FFFFFF',
        padding: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #EC4899 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '20px',
            boxShadow: '0 6px 16px rgba(236, 72, 153, 0.3)',
          }}
        >
          <CalendarOutlined />
        </div>
        <div>
          <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Planning Timeline & Milestones
          </h3>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Structured execution schedule for seamless event delivery.
          </span>
        </div>
      </div>

      <div style={{ position: 'relative', paddingLeft: '28px' }}>
        {/* Glowing Vertical Timeline Bar */}
        <div
          style={{
            position: 'absolute',
            left: '11px',
            top: '12px',
            bottom: '24px',
            width: '3px',
            background: 'linear-gradient(180deg, #7C3AED 0%, #EC4899 100%)',
            borderRadius: '2px',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {timelineItems.map((item, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {/* Milestone Node Badge */}
              <div
                style={{
                  position: 'absolute',
                  left: '-28px',
                  top: '14px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '3px solid #7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
                  zIndex: 2,
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} />
              </div>

              {/* Milestone Content Card */}
              <div
                style={{
                  background: '#F8FAFC',
                  padding: '18px 22px',
                  borderRadius: '18px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.02)',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                      color: '#4338CA',
                      fontWeight: '800',
                      fontSize: '12px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    <ClockCircleOutlined /> {item.period}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {item.milestone}
                  </h4>
                </div>

                <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
