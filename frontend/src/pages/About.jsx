import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Breadcrumb } from 'antd';
import {
  LinkedinOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { designTokens } from '../theme/designTokens';

/**
 * Modern Tech-Event Platform About Us Page matching project design language:
 * Authentic luxury event management pillars (NO AI references), 2-column narrative with statistics banner,
 * leadership team profiles, core values, and dark scenery CTA.
 */
export const About = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: 'Elena Rostova',
      role: 'Founder & Executive Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: '15+ years orchestrating royal receptions, destination weddings, and global summit galas.',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Julian Vance',
      role: 'Head of Creative Spatial Design',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'Pioneered custom stage lighting architectures and artisanal floral engineering for elite venues.',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Marcus Sterling',
      role: 'Director of Operations & Logistics',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      bio: 'Oversees real-time vendor management, venue scouting, and master production timelines.',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Sophia Chen',
      role: 'Global Concierge & VIP Relations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'Oversees white-glove hospitality, Michelin menu curation, and red-carpet guest protocols.',
      linkedin: 'https://linkedin.com',
    },
  ];

  const pillars = [
    {
      title: 'Bespoke Stage & Venue Design',
      description: 'Custom floral arrangements, intelligent acoustic rigging, and tailored architectural set design.',
    },
    {
      title: 'End-to-End Event Coordination',
      description: 'Seamless vendor management, master timeline scheduling, and budget optimization.',
    },
    {
      title: 'White-Glove VIP Hospitality',
      description: 'Dedicated Event Directors and on-site concierge staff managing every guest detail.',
    },
  ];

  const coreValues = [
    { title: 'Uncompromising Precision', desc: 'Zero errors from initial concept through post-event teardown.' },
    { title: 'Artistic Innovation', desc: 'Pushing boundaries with immersive lighting, sound, and staging.' },
    { title: 'Transparent Integrity', desc: 'Clear itemized budgets with zero hidden surcharges or surprise fees.' },
    { title: 'Client-Centric Concierge', desc: 'Dedicated 24/7 personal event director managing your celebration.' },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | EventEasy</title>
      </Helmet>

      <div style={{ background: designTokens.colors.bg, color: designTokens.colors.textPrimary }}>
        
        {/* SECTION 1: FULL-WIDTH BACKGROUND PHOTO HERO BANNER */}
        <section
          style={{
            position: 'relative',
            paddingTop: '120px',
            paddingBottom: '90px',
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            color: '#FFFFFF',
            overflow: 'hidden',
          }}
        >
          {/* Full-Width Luxury Event Photography Background Image */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.35,
            }}
          />

          {/* Smooth Dark Gradient Vignette Overlay for Text Contrast */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.75) 50%, rgba(15, 23, 42, 0.4) 100%)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: designTokens.spacing.containerMaxWidth,
              margin: '0 auto',
              padding: '0 24px',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <Breadcrumb
                items={[
                  { title: <Link to={ROUTES.HOME} style={{ color: 'rgba(255, 255, 255, 0.7)' }}><HomeOutlined /> Home</Link> },
                  { title: <span style={{ color: '#FFFFFF', fontWeight: '700' }}>About Us</span> },
                ]}
              />
            </div>

            <h1
              style={{
                fontFamily: designTokens.typography.fontDisplay,
                fontSize: designTokens.typography.heroTitle,
                fontWeight: '800',
                color: '#FFFFFF',
                lineHeight: '1.1',
                marginBottom: '20px',
                letterSpacing: '-1px',
                maxWidth: '820px',
              }}
            >
              Architects of Unforgettable Event Experiences
            </h1>

            <p
              style={{
                fontSize: designTokens.typography.bodyLarge,
                color: 'rgba(255, 255, 255, 0.88)',
                fontFamily: designTokens.typography.fontBody,
                maxWidth: '660px',
                lineHeight: '1.65',
                marginBottom: '36px',
              }}
            >
              We blend spatial design, event coordination technology, and white-glove concierge management to redefine event production globally.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button
                type="primary"
                className="btn-animated"
                size="large"
                onClick={() => navigate(ROUTES.CONTACT)}
                style={{
                  height: '50px',
                  padding: '0 34px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: '700',
                  background: '#FFFFFF',
                  color: '#0F172A',
                  border: 'none',
                }}
              >
                Inquire Event Concierge
              </Button>

              <Button
                className="btn-animated"
                size="large"
                onClick={() => navigate(ROUTES.SERVICES)}
                style={{
                  height: '50px',
                  padding: '0 30px',
                  borderRadius: '9999px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Explore Our Services
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR STORY & NARRATIVE WITH STATS */}
        <section style={{ padding: '80px 24px', background: designTokens.colors.bg }}>
          <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '56px',
                alignItems: 'center',
              }}
            >
              {/* Left Column: Heading */}
              <div>
                <h2
                  style={{
                    fontFamily: designTokens.typography.fontDisplay,
                    fontSize: designTokens.typography.sectionTitle,
                    fontWeight: '800',
                    color: designTokens.colors.textPrimary,
                    lineHeight: '1.18',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Redefining Event Architecture Since 2016
                </h2>
              </div>

              {/* Right Column: Narrative */}
              <div>
                <p
                  style={{
                    fontSize: designTokens.typography.bodyLarge,
                    color: designTokens.colors.textSecondary,
                    lineHeight: '1.7',
                    marginBottom: '20px',
                  }}
                >
                  Founded by industry visionaries, EventEasy was established to bridge the gap between creative artistic vision and flawless operational execution. We believe that extraordinary events require both imaginative spatial staging and rigorous logistics.
                </p>
                <p
                  style={{
                    fontSize: designTokens.typography.bodyBase,
                    color: designTokens.colors.textSecondary,
                    lineHeight: '1.75',
                  }}
                >
                  From royal weddings in historic castles to high-impact corporate leadership galas, our team orchestrates every celebration with obsessive attention to detail, transparent pricing, and 24/7 concierge dedication.
                </p>
              </div>
            </div>

            {/* Statistics Banner */}
            <div
              style={{
                marginTop: '64px',
                paddingTop: '48px',
                borderTop: `1px solid ${designTokens.colors.border}`,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '32px',
                textAlign: 'center',
              }}
            >
              <div>
                <div style={{ fontFamily: designTokens.typography.fontDisplay, fontSize: '48px', fontWeight: '800', color: '#0F172A' }}>10+</div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Years Operational Mastery</div>
              </div>
              <div>
                <div style={{ fontFamily: designTokens.typography.fontDisplay, fontSize: '48px', fontWeight: '800', color: '#0F172A' }}>500+</div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Events Orchestrated</div>
              </div>
              <div>
                <div style={{ fontFamily: designTokens.typography.fontDisplay, fontSize: '48px', fontWeight: '800', color: '#0F172A' }}>99.8%</div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Client Satisfaction Rate</div>
              </div>
              <div>
                <div style={{ fontFamily: designTokens.typography.fontDisplay, fontSize: '48px', fontWeight: '800', color: '#0F172A' }}>50+</div>
                <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Global Destination Venues</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CORE PILLARS (AUTHENTIC EVENT MANAGEMENT SERVICES) */}
        <section style={{ padding: '80px 24px', background: designTokens.colors.bgAlt }}>
          <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
              <h2
                style={{
                  fontFamily: designTokens.typography.fontDisplay,
                  fontSize: designTokens.typography.sectionTitle,
                  fontWeight: '800',
                  color: designTokens.colors.textPrimary,
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px',
                }}
              >
                Our Core Pillars
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="card-interactive"
                  style={{
                    background: designTokens.colors.surface,
                    borderRadius: '24px',
                    border: `1px solid ${designTokens.colors.border}`,
                    padding: '36px 32px',
                    boxShadow: designTokens.shadows.subtle,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '12px' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.65', margin: 0 }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: LEADERSHIP TEAM PROFILES */}
        <section style={{ padding: '88px 24px', background: designTokens.colors.bg }}>
          <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
              <h2
                style={{
                  fontFamily: designTokens.typography.fontDisplay,
                  fontSize: designTokens.typography.sectionTitle,
                  fontWeight: '800',
                  color: designTokens.colors.textPrimary,
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px',
                }}
              >
                Meet Our Leadership Team
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  className="card-interactive"
                  style={{
                    background: designTokens.colors.surface,
                    borderRadius: '24px',
                    border: `1px solid ${designTokens.colors.border}`,
                    overflow: 'hidden',
                    boxShadow: designTokens.shadows.card,
                  }}
                >
                  <div style={{ height: '260px', overflow: 'hidden' }}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="card-img-zoom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                      {member.name}
                    </h3>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: designTokens.colors.accent, marginBottom: '12px' }}>
                      {member.role}
                    </div>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.6', marginBottom: '16px' }}>
                      {member.bio}
                    </p>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" style={{ color: '#0F172A', fontSize: '16px' }}>
                      <LinkedinOutlined />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR CORE VALUES */}
        <section style={{ padding: '80px 24px', background: designTokens.colors.bgAlt }}>
          <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
              <h2
                style={{
                  fontFamily: designTokens.typography.fontDisplay,
                  fontSize: designTokens.typography.sectionTitle,
                  fontWeight: '800',
                  color: designTokens.colors.textPrimary,
                  lineHeight: '1.2',
                }}
              >
                Our Core Values
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px' }}>
              {coreValues.map((v, i) => (
                <div key={i} style={{ paddingTop: '20px', borderTop: `2px solid ${designTokens.colors.border}` }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                    {v.title}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.65', margin: 0 }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: HIGH-IMPACT CTA BANNER */}
        <section style={{ padding: '88px 24px', background: designTokens.colors.bg }}>
          <div style={{ maxWidth: designTokens.spacing.containerMaxWidth, margin: '0 auto' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                padding: '80px 32px',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                boxShadow: '0 20px 50px rgba(15, 23, 42, 0.2)',
              }}
            >
              <div style={{ position: 'relative', zIndex: 10, maxWidth: '720px', margin: '0 auto' }}>
                <h2
                  style={{
                    fontFamily: designTokens.typography.fontDisplay,
                    fontSize: designTokens.typography.heroTitle,
                    fontWeight: '800',
                    color: '#FFFFFF',
                    lineHeight: '1.15',
                    marginBottom: '20px',
                    letterSpacing: '-0.5px',
                  }}
                >
                  Ready to Create Your Masterpiece Event?
                </h2>

                <p
                  style={{
                    fontSize: designTokens.typography.bodyLarge,
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: designTokens.typography.fontBody,
                    lineHeight: '1.65',
                    marginBottom: '40px',
                  }}
                >
                  Connect with our Event Concierge team today to discuss bespoke staging, floral architecture, and hospitality logistics.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <Button
                    type="primary"
                    className="btn-animated"
                    size="large"
                    onClick={() => navigate(ROUTES.CONTACT)}
                    style={{
                      height: '52px',
                      padding: '0 36px',
                      borderRadius: designTokens.radii.pill,
                      fontSize: '15px',
                      fontWeight: '700',
                      background: '#FFFFFF',
                      color: '#0F172A',
                      border: 'none',
                    }}
                  >
                    Plan Your Event Now
                  </Button>

                  <Button
                    className="btn-animated"
                    size="large"
                    onClick={() => navigate(ROUTES.SERVICES)}
                    style={{
                      height: '52px',
                      padding: '0 32px',
                      borderRadius: designTokens.radii.pill,
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    Explore Our Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default About;
