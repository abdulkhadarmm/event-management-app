import React from 'react';
import { Card, Progress, Row, Col } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../../utils/formatters';
import { designTokens } from '../../../theme/designTokens';

/**
 * BudgetBreakdown component displaying visual percentage allocation and INR amounts.
 * Redesigned with distinct category card styling, smooth gradients, and bold typography.
 */
export const BudgetBreakdown = ({ budgetItems, totalBudget }) => {
  if (!budgetItems || budgetItems.length === 0) return null;

  const categoryConfigs = [
    { color: '#7C3AED', bg: '#F3E8FF', border: '#E9D5FF' }, // Purple
    { color: '#EC4899', bg: '#FCE7F3', border: '#FBCFE8' }, // Pink
    { color: '#2563EB', bg: '#DBEAFE', border: '#BFDBFE' }, // Blue
    { color: '#059669', bg: '#D1FAE5', border: '#A7F3D0' }, // Emerald
    { color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' }, // Amber
    { color: '#4F46E5', bg: '#E0E7FF', border: '#C7D2FE' }, // Indigo
  ];

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: designTokens.colors.accentGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontSize: '20px',
              boxShadow: '0 6px 16px rgba(124, 58, 237, 0.3)',
            }}
          >
            <PieChartOutlined />
          </div>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Architectural Budget Allocation
            </h3>
            <span style={{ fontSize: '13px', color: '#64748B' }}>
              Estimated Distribution Total: <strong>{formatCurrency(totalBudget)}</strong>
            </span>
          </div>
        </div>
      </div>

      <Row gutter={[20, 20]}>
        {budgetItems.map((item, idx) => {
          const cfg = categoryConfigs[idx % categoryConfigs.length];
          const percent = item.percentage || 20;

          return (
            <Col xs={24} md={12} key={idx}>
              <div
                style={{
                  padding: '20px',
                  borderRadius: '18px',
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '15px' }}>
                    {item.category}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: '900', color: cfg.color, fontSize: '16px', display: 'block' }}>
                      {formatCurrency(item.allocatedAmount)}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: cfg.color }}>
                      ({percent}%)
                    </span>
                  </div>
                </div>

                <Progress
                  percent={percent}
                  strokeColor={cfg.color}
                  showInfo={false}
                  style={{ marginBottom: '10px' }}
                />

                <p style={{ margin: 0, fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                  {item.description}
                </p>
              </div>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};
