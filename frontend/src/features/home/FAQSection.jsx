import React, { useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { designTokens } from '../../theme/designTokens';
import { useResponsive } from '../../hooks/useResponsive';

/**
 * FAQ Section matching the reference image layout:
 * Pill badge "Frequently Asked Questions", headline "Everything You Need to Know",
 * Responsive grid of rounded white accordion cards with subtle + / - expand toggles.
 */
export const FAQSection = () => {
  const [openKey, setOpenKey] = useState('1');
  const { isMobile } = useResponsive();

  const faqs = [
    {
      key: '1',
      question: 'What type of events can this platform manage?',
      answer: 'From luxury weddings and royal receptions to high-impact corporate summits and milestone bashes—our platform is built for events of any size and complexity.',
    },
    {
      key: '2',
      question: 'How does AI improve my event workflow?',
      answer: 'Our AI engine automates vendor matching, budget forecasting, guest invitation tracking, and real-time floorplan spatial optimization.',
    },
    {
      key: '3',
      question: 'Do I need technical skills to use the system?',
      answer: 'Zero coding or technical skills required. The platform features an intuitive drag-and-drop dashboard designed for effortless event administration.',
    },
    {
      key: '4',
      question: 'Can I integrate external tools like Google Calendar?',
      answer: 'Yes! Native two-way synchronization is available for Google Calendar, Outlook, Slack, WhatsApp Concierge, and Zoom.',
    },
    {
      key: '5',
      question: 'Is my event data secure & private?',
      answer: 'We utilize enterprise-grade 256-bit SSL encryption, SOC2 compliance standards, and daily automated cloud database backups.',
    },
    {
      key: '6',
      question: 'Does the AI generate reports automatically?',
      answer: 'Yes! One-click PDF & Excel executive summary reports are generated automatically for budget breakdowns, attendee RSVPs, and vendor quotes.',
    },
    {
      key: '7',
      question: 'Can I customize automation rules?',
      answer: 'Absolutely. Set automated email reminders for guest RSVPs, payment milestones, vendor contracts, and countdown notifications.',
    },
    {
      key: '8',
      question: 'Can I try the platform for free?',
      answer: 'Yes! Request preliminary access or schedule a 1-on-1 demo with our concierge team to explore all platform features.',
    },
  ];

  const toggle = (key) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <section style={{ padding: isMobile ? '40px 16px 60px 16px' : designTokens.spacing.sectionDesktop, background: designTokens.colors.bgAlt }}>
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto', width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
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
            Frequently Asked Questions
          </div>

          <h2
            style={{
              fontFamily: designTokens.typography.fontDisplay,
              fontSize: isMobile ? '24px' : designTokens.typography.sectionTitle,
              fontWeight: '800',
              color: designTokens.colors.textPrimary,
              lineHeight: '1.2',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            Everything You Need to Know
          </h2>

          <p style={{ fontSize: isMobile ? '14px' : designTokens.typography.bodyBase, color: designTokens.colors.textSecondary, lineHeight: '1.6' }}>
            Quick answers to the most common questions about our AI-powered event management platform.
          </p>
        </div>

        {/* 2-Column Responsive Accordion Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '16px' : '20px',
            alignItems: 'start',
            width: '100%',
          }}
        >
          {faqs.map((faq) => {
            const isOpen = openKey === faq.key;

            return (
              <div
                key={faq.key}
                onClick={() => toggle(faq.key)}
                style={{
                  background: designTokens.colors.surface,
                  borderRadius: '16px',
                  border: `1px solid ${designTokens.colors.border}`,
                  padding: isMobile ? '16px' : '24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: isOpen ? designTokens.shadows.hover : designTokens.shadows.subtle,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                  <h3
                    style={{
                      fontSize: isMobile ? '15px' : '16px',
                      fontWeight: '700',
                      color: designTokens.colors.textPrimary,
                      margin: 0,
                      lineHeight: '1.4',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: designTokens.colors.bgAlt,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? (
                      <MinusOutlined style={{ fontSize: '12px', color: designTokens.colors.textPrimary }} />
                    ) : (
                      <PlusOutlined style={{ fontSize: '12px', color: designTokens.colors.textSecondary }} />
                    )}
                  </div>
                </div>

                {isOpen && (
                  <p
                    style={{
                      marginTop: '12px',
                      marginBottom: 0,
                      fontSize: '14px',
                      color: designTokens.colors.textSecondary,
                      lineHeight: '1.6',
                      wordBreak: 'break-word',
                    }}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
