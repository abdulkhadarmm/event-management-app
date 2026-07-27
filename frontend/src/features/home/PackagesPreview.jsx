import React from 'react';
import { Card, Button, List, Spin } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { packageService } from '../../services/packageService';
import { formatCurrency } from '../../utils/formatters';
import { ROUTES } from '../../constants/routes';
import { designTokens } from '../../theme/designTokens';

/**
 * Modern Pricing Packages Grid:
 * - Fixed badge collision by using flex row layout with zero overlap between title and popular tag
 * - Card-interactive hover lift animation
 * - Button animated press & hover shadow animation
 * - Action CTA button positioned near the TOP under price/description for 100% visibility
 * - Clean dashed separator above feature inclusions list
 */
export const PackagesPreview = () => {
  const navigate = useNavigate();

  const { data: packages, isLoading, error } = useQuery({
    queryKey: ['publicPackages'],
    queryFn: packageService.getActivePackages,
  });

  return (
    <section style={{ padding: '24px 24px 80px 24px', background: designTokens.colors.bg }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        
        {/* Clean Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
          <h2
            style={{
              fontFamily: designTokens.typography.fontDisplay,
              fontSize: designTokens.typography.sectionTitle,
              fontWeight: '800',
              color: designTokens.colors.textPrimary,
              lineHeight: '1.18',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Transparent Event Packages
          </h2>

          <p style={{ fontSize: designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.55' }}>
            Select from our signature curated event packages or request a bespoke package tailored to your exact budget.
          </p>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '48px' }}><Spin size="large" /></div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: designTokens.colors.error }}>Unable to load packages dynamically. Please check backend connection.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'stretch' }}>
            {packages?.map((pkg) => {
              const isPopular = pkg.popularFlag;

              return (
                <div
                  key={pkg.id}
                  className="card-interactive"
                  onClick={() => navigate(ROUTES.CONTACT)}
                  style={{
                    borderRadius: '24px',
                    background: isPopular ? '#FFFFFF' : designTokens.colors.surface,
                    border: isPopular ? `2px solid ${designTokens.colors.accent}` : `1px solid ${designTokens.colors.border}`,
                    boxShadow: isPopular ? designTokens.shadows.glow : designTokens.shadows.card,
                    position: 'relative',
                    padding: '32px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Top Header Row with Title + Popular Tag (Flex layout - NO OVERLAP) */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                      <h3
                        style={{
                          fontFamily: designTokens.typography.fontDisplay,
                          fontSize: '22px',
                          fontWeight: '800',
                          color: '#0F172A',
                          margin: 0,
                          lineHeight: '1.25',
                          letterSpacing: '-0.3px',
                          flex: 1,
                        }}
                      >
                        {pkg.name}
                      </h3>

                      {isPopular && (
                        <span
                          style={{
                            flexShrink: 0,
                            background: designTokens.colors.accent,
                            color: '#FFFFFF',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '10px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            whiteSpace: 'nowrap',
                            marginTop: '2px',
                          }}
                        >
                          Most Popular
                        </span>
                      )}
                    </div>

                    {/* Price (Big Prominent Heading) */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '36px',
                          fontWeight: '800',
                          color: '#0F172A',
                          fontFamily: designTokens.typography.fontDisplay,
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {formatCurrency(pkg.price)}
                      </span>
                      <span style={{ fontSize: '14px', color: '#64748B', fontWeight: '500' }}>/ event</span>
                    </div>

                    {/* Subtitle Description */}
                    <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px', minHeight: '42px' }}>
                      {pkg.subtitle}
                    </p>

                    {/* TOP ACTION CTA BUTTON */}
                    <Button
                      type="primary"
                      className="btn-animated"
                      block
                      size="large"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.CONTACT);
                      }}
                      style={{
                        height: '48px',
                        fontWeight: '700',
                        fontSize: '15px',
                        borderRadius: '9999px',
                        background: isPopular ? designTokens.colors.accent : '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        boxShadow: isPopular ? '0 6px 18px rgba(99, 102, 241, 0.35)' : '0 4px 14px rgba(15, 23, 42, 0.15)',
                      }}
                    >
                      Inquire Package
                    </Button>

                    {/* Dashed Separator Line */}
                    <div style={{ borderTop: `1px dashed ${designTokens.colors.border}`, margin: '24px 0 20px 0' }} />

                    {/* Feature Inclusions List */}
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
                      Package Inclusions:
                    </div>

                    <List
                      dataSource={pkg.features}
                      renderItem={(item) => (
                        <List.Item style={{ border: 'none', padding: '6px 0', fontSize: '14px', color: '#475569' }}>
                          <CheckOutlined style={{ color: isPopular ? designTokens.colors.accent : '#10B981', marginRight: '10px', fontSize: '14px' }} />
                          <span>{item.featureName}</span>
                        </List.Item>
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
