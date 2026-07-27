import React, { useState } from 'react';
import { Card, Button, Tag, Row, Col, Input } from 'antd';
import {
  StarOutlined,
  BankOutlined,
  BgColorsOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  CheckOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { BudgetBreakdown } from './BudgetBreakdown';
import { TimelineSection } from './TimelineSection';
import { designTokens } from '../../../theme/designTokens';

const { TextArea } = Input;

/**
 * PlannerResult component displaying complete AI-generated event plan proposal.
 * Clean modern SaaS design system, styled feature chips, clean white cards, and smooth proceed transition.
 */
export const PlannerResult = ({
  plan,
  inputData,
  onProceedToEnquiry,
  onRegenerate,
  onEditInputs,
}) => {
  const [specialReqs, setSpecialReqs] = useState(inputData?.specialRequirements || '');
  const [notes, setNotes] = useState(inputData?.additionalNotes || '');

  if (!plan) return null;

  const handleProceed = () => {
    onProceedToEnquiry({
      ...inputData,
      specialRequirements: specialReqs,
      additionalNotes: notes,
      aiPlan: plan,
    });
  };

  return (
    <div className="printable-event-plan">
      {/* Print-Only Header for PDF / Print Output */}
      <div className="print-only-header">
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0F172A', margin: 0 }}>EventEasy</h2>
          <span style={{ fontSize: '12px', color: '#64748B' }}>Event Architecture & Proposal Specification</span>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#475569' }}>
          <div><strong>Event Category:</strong> {inputData?.eventType}</div>
          <div><strong>Location:</strong> {inputData?.location}</div>
          <div><strong>Guest Count:</strong> {inputData?.guestCount}</div>
        </div>
      </div>

      {/* Executive Proposal Overview Card */}
      <Card
        style={{
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 40px rgba(15, 23, 42, 0.04)',
          marginBottom: '28px',
          background: '#FFFFFF',
          padding: '16px',
        }}
      >
        <div style={{ paddingBottom: '20px', borderBottom: '1px solid #F1F5F9' }}>
          <p style={{ fontSize: '16px', color: '#334155', lineHeight: '1.7', margin: '0 0 20px 0' }}>
            {plan.summary}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {plan.recommendedPackage && (
              <Tag
                color="purple"
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: 'none',
                  background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                  color: '#4338CA',
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.12)',
                }}
              >
                <GiftOutlined /> Recommended Package: <strong>{plan.recommendedPackage}</strong>
              </Tag>
            )}

            {plan.recommendedTheme && (
              <Tag
                color="magenta"
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: 'none',
                  background: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
                  color: '#BE185D',
                  boxShadow: '0 2px 8px rgba(236, 72, 153, 0.12)',
                }}
              >
                <BgColorsOutlined /> Recommended Theme: <strong>{plan.recommendedTheme}</strong>
              </Tag>
            )}
          </div>
        </div>

        {/* Venue & Guest Journey Cards */}
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          <Col xs={24} md={12}>
            <div
              style={{
                background: '#F8FAFC',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: designTokens.colors.accent, fontWeight: '800', fontSize: '16px' }}>
                <BankOutlined style={{ fontSize: '20px' }} /> Venue Guidance
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                {plan.venueRecommendation}
              </h4>
              <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
                {plan.venueReason}
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div
              style={{
                background: '#F8FAFC',
                padding: '24px',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: '#EC4899', fontWeight: '800', fontSize: '16px' }}>
                <StarOutlined style={{ fontSize: '20px' }} /> Guest Experience Journey
              </div>
              <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {plan.guestExperience}
              </p>
            </div>
          </Col>
        </Row>

        {/* Styled Feature Cards */}
        <Row gutter={[24, 24]} style={{ marginTop: '28px' }}>
          {plan.decorRecommendations && plan.decorRecommendations.length > 0 && (
            <Col xs={24} md={12}>
              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '18px', border: '1px solid #E2E8F0', height: '100%' }}>
                <h4 style={{ fontWeight: '800', color: '#0F172A', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BgColorsOutlined style={{ color: designTokens.colors.accent }} /> Theme & Decor Architecture
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.decorRecommendations.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 14px',
                        background: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #F1F5F9',
                        fontSize: '13px',
                        color: '#334155',
                        fontWeight: '500',
                      }}
                    >
                      <span style={{ color: designTokens.colors.accent, marginTop: '2px' }}>✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          )}

          {plan.foodRecommendations && plan.foodRecommendations.length > 0 && (
            <Col xs={24} md={12}>
              <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '18px', border: '1px solid #E2E8F0', height: '100%' }}>
                <h4 style={{ fontWeight: '800', color: '#0F172A', fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🍽️ Culinary & Catering Experience
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.foodRecommendations.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        padding: '10px 14px',
                        background: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #F1F5F9',
                        fontSize: '13px',
                        color: '#334155',
                        fontWeight: '500',
                      }}
                    >
                      <span style={{ color: '#EC4899', marginTop: '2px' }}>✦</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Card>

      {/* Budget Breakdown Component */}
      <BudgetBreakdown
        budgetItems={plan.budgetBreakdown}
        totalBudget={inputData?.budget || 500000}
      />

      {/* Timeline Section Component */}
      <TimelineSection timelineItems={plan.timeline} />

      {/* Planning Checklist & Risk Management Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: '28px' }}>
        {plan.planningChecklist && plan.planningChecklist.length > 0 && (
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: '24px',
                height: '100%',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                background: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircleOutlined style={{ color: '#10B981', fontSize: '20px' }} /> Master Planning Checklist
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.planningChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: '#F8FAFC',
                      borderRadius: '14px',
                      border: '1px solid #F1F5F9',
                      fontSize: '13px',
                      color: '#334155',
                      fontWeight: '600',
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#D1FAE5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>
                      <CheckOutlined />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        )}

        {plan.riskManagement && plan.riskManagement.length > 0 && (
          <Col xs={24} md={12}>
            <Card
              style={{
                borderRadius: '24px',
                height: '100%',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                background: '#FFFFFF',
              }}
            >
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SafetyCertificateOutlined style={{ color: designTokens.colors.accent, fontSize: '20px' }} /> Risk Management & Mitigation
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.riskManagement.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: '#F8FAFC',
                      borderRadius: '14px',
                      border: '1px solid #F1F5F9',
                      fontSize: '13px',
                      color: '#334155',
                      fontWeight: '500',
                    }}
                  >
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EEF2FF', color: designTokens.colors.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>
                      <SafetyCertificateOutlined />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        )}
      </Row>

      {/* Assumptions & Expert Tips Section */}
      <Card
        style={{
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
          marginBottom: '28px',
          background: '#FFFFFF',
          padding: '16px',
        }}
      >
        <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BulbOutlined style={{ color: designTokens.colors.accent, fontSize: '20px' }} /> Planning Assumptions & Expert Recommendations
        </h3>

        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '12px' }}>
              Planning Assumptions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(plan.assumptions || []).map((a, idx) => (
                <div key={idx} style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: designTokens.colors.accent, flexShrink: 0 }} />
                  {a}
                </div>
              ))}
            </div>
          </Col>

          <Col xs={24} md={12}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#475569', marginBottom: '12px' }}>
              Consultant Tips
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(plan.expertTips || []).map((t, idx) => (
                <div key={idx} style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EC4899', flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Editable Special Requirements & Prominent Proceed Button */}
      <Card
        className="no-print"
        style={{
          borderRadius: '24px',
          border: `2px solid ${designTokens.colors.accent}`,
          boxShadow: '0 15px 35px rgba(124, 58, 237, 0.12)',
          background: '#FFFFFF',
          padding: '16px',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Finalize Requirements & Submit Concierge Enquiry
          </h3>
          <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>
            Review or update special notes before transmitting your AI plan to EventEasy administrators.
          </p>
        </div>

        <Row gutter={[20, 16]}>
          <Col xs={24} md={12}>
            <div style={{ fontWeight: '700', color: '#334155', fontSize: '13px', marginBottom: '6px' }}>
              Special Requirements
            </div>
            <TextArea
              rows={3}
              value={specialReqs}
              onChange={(e) => setSpecialReqs(e.target.value)}
              placeholder="Add any additional customized requests..."
              style={{ borderRadius: '12px' }}
            />
          </Col>

          <Col xs={24} md={12}>
            <div style={{ fontWeight: '700', color: '#334155', fontSize: '13px', marginBottom: '6px' }}>
              Additional Notes
            </div>
            <TextArea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any specific timing or contact instructions..."
              style={{ borderRadius: '12px' }}
            />
          </Col>
        </Row>

        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          onClick={handleProceed}
          block
          style={{
            height: '58px',
            borderRadius: '30px',
            background: designTokens.colors.accentGradient,
            fontSize: '18px',
            fontWeight: '800',
            marginTop: '20px',
            border: 'none',
            boxShadow: '0 12px 32px rgba(124, 58, 237, 0.45)',
          }}
        >
          Proceed to Enquiry with AI Event Plan
        </Button>
      </Card>
    </div>
  );
};
