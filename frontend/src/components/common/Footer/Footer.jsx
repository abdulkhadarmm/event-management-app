import React, { useState } from 'react';
import { Button, notification } from 'antd';
import {
  LinkedinOutlined,
  InstagramOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Logo } from '../Navbar/Logo';
import { ROUTES } from '../../../constants/routes';
import { designTokens } from '../../../theme/designTokens';
import { newsletterService } from '../../../services/newsletterService';

/**
 * Modern Tech-Event Platform Footer:
 * Real database integration for newsletter subscription and "Submitted" success state.
 */
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    try {
      await newsletterService.subscribe(email);
      setSubmitted(true);
      notification.success({
        message: 'Subscribed Successfully',
        description: 'Thank you for subscribing to EventEasy insights.',
      });
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      notification.error({
        message: 'Subscription Error',
        description: err.response?.data?.message || err.message || 'Unable to subscribe. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      style={{
        background: designTokens.colors.surfaceDarkAlt,
        color: designTokens.colors.textOnDark,
        padding: '80px 24px 40px 24px',
        fontFamily: designTokens.typography.fontBody,
      }}
    >
      <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
        
        {/* Top Grid Row: Brand Info + Navigation Columns + Newsletter Pill Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '48px',
            paddingBottom: '60px',
            borderBottom: `1px solid ${designTokens.colors.borderDark}`,
          }}
        >
          {/* Brand Info */}
          <div>
            <Logo variant="light" />
            <p
              style={{
                color: designTokens.colors.textOnDarkMuted,
                fontSize: '14px',
                lineHeight: '1.65',
                marginTop: '16px',
                maxWidth: '320px',
              }}
            >
              Powering unforgettable events with automation, insights, and intelligent workflows.
            </p>
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '16px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to={ROUTES.SERVICES} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Services</Link></li>
              <li><Link to={ROUTES.PACKAGES} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Packages</Link></li>
              <li><Link to={ROUTES.THEMES} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Design Themes</Link></li>
              <li><Link to={ROUTES.GALLERY} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Gallery</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#FFFFFF', marginBottom: '16px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to={ROUTES.ABOUT} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>About Us</Link></li>
              <li><Link to={ROUTES.CONTACT} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Contact Concierge</Link></li>
              <li><Link to={ROUTES.ADMIN_LOGIN} style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '14px' }}>Executive Desk</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter Signup Pill Form with DB integration & Submitted State */}
          <div style={{ maxWidth: '380px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '12px' }}>
              Subscribe to Our Newsletter & Get the Latest Insights
            </h4>
            <p style={{ color: designTokens.colors.textOnDarkMuted, fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
              Join our community of event planners, creators, and business leaders leveraging AI for event excellence.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${submitted ? '#10B981' : designTokens.colors.borderDark}`,
                  borderRadius: '30px',
                  padding: '4px 6px 4px 16px',
                  width: '100%',
                  transition: 'all 0.3s ease',
                }}
              >
                <input
                  type="email"
                  placeholder={submitted ? 'Subscribed!' : 'Enter your email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitted}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    width: '100%',
                  }}
                  required
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={submitted ? <CheckOutlined /> : null}
                  style={{
                    borderRadius: '30px',
                    background: submitted ? '#10B981' : '#FFFFFF',
                    color: submitted ? '#FFFFFF' : '#0F172A',
                    fontWeight: '700',
                    fontSize: '13px',
                    height: '36px',
                    padding: '0 20px',
                    border: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {submitted ? 'Submitted' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Legal & Social Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '32px',
            fontSize: '13px',
            color: designTokens.colors.textOnDarkMuted,
          }}
        >
          <div>
            © {new Date().getFullYear()} EventEasy. All rights reserved. • <span style={{ cursor: 'pointer' }}>Privacy Policy</span> • <span style={{ cursor: 'pointer' }}>Terms of Services</span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '18px' }}>
            <LinkedinOutlined style={{ cursor: 'pointer', color: designTokens.colors.textOnDarkMuted }} />
            <InstagramOutlined style={{ cursor: 'pointer', color: designTokens.colors.textOnDarkMuted }} />
            <FacebookOutlined style={{ cursor: 'pointer', color: designTokens.colors.textOnDarkMuted }} />
            <YoutubeOutlined style={{ cursor: 'pointer', color: designTokens.colors.textOnDarkMuted }} />
          </div>
        </div>

      </div>
    </footer>
  );
};
