import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Alert, notification, Breadcrumb, Button } from 'antd';
import {
  StarOutlined,
  HomeOutlined,
  RocketOutlined,
  PrinterOutlined,
  EditOutlined,
  ReloadOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { PlannerForm } from '../features/ai-planner/components/PlannerForm';
import { PlannerResult } from '../features/ai-planner/components/PlannerResult';
import { aiService } from '../services/aiService';
import { ROUTES } from '../constants/routes';
import { designTokens } from '../theme/designTokens';

/**
 * Public AIEventPlannerPage page component.
 * Unified luxury header architecture with clean top navbar clearance, breadcrumbs, and scroll management.
 */
export const AIEventPlannerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState(null);
  const [aiPlan, setAiPlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGeneratePlan = async (values) => {
    setLoading(true);
    setError(null);
    setInputData(values);

    try {
      const planResponse = await aiService.generatePlan(values);
      setAiPlan(planResponse);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('AI Event Plan Generation Error:', err);
      setError(err.message || 'Failed to generate AI Event Plan. Please try again.');
      notification.error({
        message: 'Plan Generation Error',
        description: err.message || 'Unable to connect to AI Event Consultant service.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (inputData) {
      handleGeneratePlan(inputData);
    }
  };

  const handleEditInputs = () => {
    setAiPlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToEnquiry = (updatedData) => {
    window.scrollTo(0, 0);
    navigate(ROUTES.CONTACT, {
      state: {
        aiPlannerState: updatedData || { ...inputData, aiPlan },
      },
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '90px' }}>
      {/* Dynamic Luxury Hero Banner Section with Top Navbar Clearance */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #312E81 100%)',
          padding: aiPlan ? '100px 24px 60px 24px' : '115px 24px 80px 24px',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Subtle Ambient Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb Header */}
          <Breadcrumb
            items={[
              { title: <a href={ROUTES.HOME} style={{ color: '#CBD5E1' }}><HomeOutlined /> Home</a> },
              { title: <span style={{ color: '#E9D5FF', fontWeight: '700' }}><StarOutlined /> AI Event Architect</span> },
            ]}
            style={{ marginBottom: '24px' }}
          />

          {!aiPlan ? (
            /* Mode A: Planning Form Header */
            <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#E9D5FF',
                  fontWeight: '700',
                  fontSize: '13px',
                  padding: '6px 20px',
                  borderRadius: '30px',
                  marginBottom: '18px',
                  boxShadow: '0 4px 20px rgba(124, 58, 237, 0.2)',
                }}
              >
                <StarOutlined style={{ color: '#F472B6' }} /> Powered by EventEasy AI Engine
              </div>

              <h1
                style={{
                  fontSize: '44px',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '-1.2px',
                  lineHeight: '1.15',
                  marginBottom: '16px',
                  fontFamily: designTokens.typography.fontDisplay,
                }}
              >
                Bespoke Event Architecture & Planning
              </h1>

              <p
                style={{
                  fontSize: '16px',
                  color: '#CBD5E1',
                  margin: '0 auto',
                  lineHeight: '1.7',
                  maxWidth: '720px',
                }}
              >
                Consult our intelligent AI event architect. Receive location-aware venue guidance, budget distribution in ₹,
                theme styling matching active EventEasy catalog packages, and step-by-step milestone execution schedules.
              </p>
            </div>
          ) : (
            /* Mode B: Generated Proposal Header with Action Bar */
            <div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(167, 243, 208, 0.15)',
                      border: '1px solid rgba(167, 243, 208, 0.3)',
                      color: '#6EE7B7',
                      fontWeight: '700',
                      fontSize: '13px',
                      padding: '5px 16px',
                      borderRadius: '30px',
                      marginBottom: '12px',
                    }}
                  >
                    <StarOutlined /> AI Architectural Plan Generated
                  </div>

                  <h1
                    style={{
                      fontSize: '34px',
                      fontWeight: '900',
                      color: '#FFFFFF',
                      letterSpacing: '-0.8px',
                      margin: '0 0 8px 0',
                      fontFamily: designTokens.typography.fontDisplay,
                    }}
                  >
                    {aiPlan.title || 'Personalized Event Architecture Proposal'}
                  </h1>

                  <p style={{ color: '#CBD5E1', fontSize: '15px', margin: 0, maxWidth: '680px' }}>
                    {inputData?.eventType} • {inputData?.guestCount} Guests • {inputData?.location} • ₹{Number(inputData?.budget || 0).toLocaleString()} Budget
                  </p>
                </div>

                {/* Top Action Toolbar inside Hero Header */}
                <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                  <Button
                    icon={<PrinterOutlined />}
                    onClick={handlePrint}
                    style={{ borderRadius: '24px', fontWeight: '600', height: '44px', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    Print Plan
                  </Button>

                  <Button
                    icon={<EditOutlined />}
                    onClick={handleEditInputs}
                    style={{ borderRadius: '24px', fontWeight: '600', height: '44px', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    Edit Inputs
                  </Button>

                  <Button
                    icon={<ReloadOutlined />}
                    onClick={handleRegenerate}
                    style={{ borderRadius: '24px', fontWeight: '600', height: '44px', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    Regenerate
                  </Button>

                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    onClick={() => handleProceedToEnquiry()}
                    style={{
                      borderRadius: '24px',
                      fontWeight: '800',
                      height: '46px',
                      padding: '0 24px',
                      fontSize: '15px',
                      background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                      border: 'none',
                      boxShadow: '0 8px 24px rgba(124, 58, 237, 0.5)',
                    }}
                  >
                    Proceed with Enquiry
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div style={{ maxWidth: '1140px', margin: '-30px auto 0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        {/* Error Alert */}
        {error && (
          <Alert
            message="Planner Consultation Alert"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: '24px', borderRadius: '16px', border: '1px solid #FECDD3' }}
          />
        )}

        {/* Loading Spinner State */}
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '70px 20px',
              background: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.05)',
            }}
          >
            <Spin size="large" indicator={<RocketOutlined style={{ fontSize: '52px', color: '#7C3AED' }} spin />} />
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginTop: '28px', marginBottom: '8px' }}>
              Consulting EventEasy AI Architect...
            </h3>
            <p style={{ color: '#64748B', fontSize: '14px', margin: 0, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
              Synthesizing location venue acoustics, guest count logistics, budget allocation in ₹, and matching active database packages.
            </p>
          </div>
        )}

        {/* Form View */}
        {!loading && !aiPlan && (
          <PlannerForm
            onSubmit={handleGeneratePlan}
            loading={loading}
            initialValues={inputData}
          />
        )}

        {/* Results Proposal View */}
        {!loading && aiPlan && (
          <PlannerResult
            plan={aiPlan}
            inputData={inputData}
            onProceedToEnquiry={handleProceedToEnquiry}
            onRegenerate={handleRegenerate}
            onEditInputs={handleEditInputs}
          />
        )}
      </div>
    </div>
  );
};

export default AIEventPlannerPage;
