import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Input, Button, Card, Select, DatePicker, InputNumber, Modal, Tag, Row, Col } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  SendOutlined,
  EnvironmentOutlined,
  StarOutlined,
  GiftOutlined,
  BgColorsOutlined,
  UsergroupAddOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { COMPANY_CONTACT } from '../constants/navigation';
import { eventTypeService } from '../services/eventTypeService';
import { packageService } from '../services/packageService';
import { themeService } from '../services/themeService';
import { enquiryService } from '../services/enquiryService';
import { formatCurrency } from '../utils/formatters';
import { designTokens } from '../theme/designTokens';

const { Option } = Select;
const { TextArea } = Input;

/**
 * Luxury Contact & Celebration Booking Portal:
 * - Clean light background layout without heavy dark hero banner
 * - Perfectly proportioned, sleek submit CTA button
 * - Pre-fills automatically if arriving from AI Event Planner
 * - Submits AI Event Plan & Planner Input payload to backend
 */
export const Contact = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const aiState = location.state?.aiPlannerState;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: eventTypes, isLoading: loadingTypes } = useQuery({
    queryKey: ['publicEventTypes'],
    queryFn: eventTypeService.getActiveEventTypes,
  });

  const { data: packages, isLoading: loadingPackages } = useQuery({
    queryKey: ['publicPackages'],
    queryFn: packageService.getActivePackages,
  });

  const { data: themes, isLoading: loadingThemes } = useQuery({
    queryKey: ['publicThemes'],
    queryFn: themeService.getActiveThemes,
  });

  useEffect(() => {
    if (aiState && eventTypes && eventTypes.length > 0) {
      const matchedType = eventTypes.find(
        (t) => t.name.toLowerCase() === (aiState.eventType || '').toLowerCase()
      ) || eventTypes[0];

      const matchedPackage = packages?.find(
        (p) => p.name.toLowerCase() === (aiState.aiPlan?.recommendedPackage || '').toLowerCase()
      );

      const matchedTheme = themes?.find(
        (th) => th.name.toLowerCase() === (aiState.aiPlan?.recommendedTheme || '').toLowerCase()
      );

      form.setFieldsValue({
        city: aiState.location || '',
        eventTypeId: matchedType?.id,
        eventPackageId: matchedPackage?.id,
        eventThemeId: matchedTheme?.id,
        eventDate: aiState.eventDate ? dayjs(aiState.eventDate) : dayjs().add(2, 'month'),
        expectedGuests: aiState.guestCount || 100,
        estimatedBudget: aiState.budget || 300000,
        venueType: aiState.venuePreference && ['INDOOR', 'OUTDOOR', 'BOTH'].includes(aiState.venuePreference) ? aiState.venuePreference : 'BOTH',
        additionalRequirements: aiState.specialRequirements || aiState.additionalNotes || '',
      });
    }
  }, [aiState, eventTypes, packages, themes, form]);

  const submitMutation = useMutation({
    mutationFn: enquiryService.submitEnquiry,
    onSuccess: (data) => {
      Modal.success({
        title: 'Celebration Request Received Successfully!',
        content: (
          <div style={{ padding: '8px 0' }}>
            <p>Thank you <strong>{data.fullName}</strong>. Your event specifications have been registered with EventEasy.</p>
            <div style={{ background: '#F8FAFC', padding: '18px', borderRadius: '16px', margin: '16px 0', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Reference Number</span>
              <strong style={{ color: '#6366F1', fontSize: '24px', fontFamily: designTokens.typography.fontDisplay }}>{data.enquiryNumber}</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>
              A Dedicated Event Concierge will review your specifications and reach out within 24 hours.
            </p>
          </div>
        ),
        okText: 'Done',
      });
      form.resetFields();
    },
    onError: (err) => {
      Modal.error({
        title: 'Submission Failed',
        content: err.message || 'Unable to submit enquiry. Please check your parameters.',
      });
    },
  });

  const handleSubmit = (values) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      city: values.city,
      eventTypeId: values.eventTypeId,
      eventPackageId: values.eventPackageId || null,
      eventThemeId: values.eventThemeId || null,
      eventDate: values.eventDate ? values.eventDate.format('YYYY-MM-DD') : null,
      expectedGuests: values.expectedGuests,
      venue: values.venue || '',
      venueType: values.venueType || null,
      estimatedBudget: values.estimatedBudget,
      additionalRequirements: values.additionalRequirements || '',
      // AI Attachments
      plannerInputJson: aiState ? JSON.stringify(aiState) : null,
      aiEventPlanJson: aiState?.aiPlan ? JSON.stringify(aiState.aiPlan) : null,
      aiPlanSummary: aiState?.aiPlan ? `${aiState.eventType || 'Event'} • ${aiState.guestCount || 100} Guests • ${aiState.aiPlan.recommendedTheme || 'Signature Theme'} • ${aiState.aiPlan.recommendedPackage || 'Custom Package'}` : null,
      aiModel: aiState?.aiPlan?.aiModel || 'gemini-1.5-flash',
      aiProvider: aiState?.aiPlan?.aiProvider || 'Google Gemini',
      promptVersion: aiState?.aiPlan?.promptVersion || 'v1.0',
    };

    submitMutation.mutate(payload);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <>
      <Helmet>
        <title>Plan Your Celebration | EventEasy Concierge</title>
      </Helmet>

      <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '115px', paddingBottom: '90px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Clean Light Title Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h1
              style={{
                fontSize: '38px',
                fontWeight: '900',
                color: '#0F172A',
                letterSpacing: '-0.8px',
                lineHeight: '1.2',
                marginBottom: '10px',
                fontFamily: designTokens.typography.fontDisplay,
              }}
            >
              Plan Your Celebration
            </h1>

            <p style={{ fontSize: '15px', color: '#475569', margin: 0, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.6' }}>
              Fill out the details below and an Event Concierge will connect with you within 24 hours.
            </p>
          </div>

          {/* AI Event Plan Attachment Notification Banner */}
          {aiState?.aiPlan && (
            <Card
              style={{
                borderRadius: '24px',
                border: '1px solid #C7D2FE',
                background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                boxShadow: '0 12px 30px rgba(99, 102, 241, 0.12)',
                marginBottom: '28px',
                padding: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', color: '#4338CA', fontWeight: '800', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', marginBottom: '8px' }}>
                    <StarOutlined /> Attached AI Event Proposal
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1E1B4B', margin: 0 }}>
                    {aiState.aiPlan.title || 'Personalized Luxury Proposal'}
                  </h3>
                  <p style={{ color: '#4338CA', fontSize: '13px', margin: '4px 0 0 0' }}>
                    {aiState.eventType} • {aiState.guestCount} Guests • {aiState.location} • Budget: ₹{Number(aiState.budget || 0).toLocaleString()}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {aiState.aiPlan.recommendedPackage && (
                    <Tag color="purple" style={{ borderRadius: '16px', fontWeight: '700', padding: '4px 12px', fontSize: '12px' }}>
                      <GiftOutlined /> {aiState.aiPlan.recommendedPackage}
                    </Tag>
                  )}
                  {aiState.aiPlan.recommendedTheme && (
                    <Tag color="geekblue" style={{ borderRadius: '16px', fontWeight: '700', padding: '4px 12px', fontSize: '12px' }}>
                      <BgColorsOutlined /> {aiState.aiPlan.recommendedTheme}
                    </Tag>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* MAIN LUXURY ENQUIRY FORM CARD */}
          <Card
            style={{
              borderRadius: '24px',
              background: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.06)',
              border: '1px solid #E2E8F0',
              padding: '24px 20px',
              marginBottom: '48px',
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              {/* Section 1: Contact Information */}
              <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)', color: '#FFFFFF', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  1
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Client Contact Details
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>Provide your contact information for concierge response.</span>
                </div>
              </div>

              <Row gutter={[20, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="fullName"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Full Name *</span>}
                    rules={[
                      { required: true, message: 'Please enter your full name' },
                      { pattern: /^[a-zA-Z\s']+$/, message: 'Name must contain letters and spaces only' },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: '#6366F1' }} />}
                      placeholder="e.g. Rahul Sharma"
                      size="large"
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Email Address *</span>}
                    rules={[
                      { required: true, message: 'Please enter your email address' },
                      { type: 'email', message: 'Please enter a valid email format' },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: '#6366F1' }} />}
                      placeholder="rahul@example.com"
                      size="large"
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="phone"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Phone / WhatsApp Number *</span>}
                    rules={[
                      { required: true, message: 'Please enter your phone number' },
                      { pattern: /^[+\d\s()-]{7,20}$/, message: 'Please enter a valid phone number' },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined style={{ color: '#6366F1' }} />}
                      placeholder="+91 98765 43210"
                      size="large"
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="city"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>City / Event Destination *</span>}
                    rules={[{ required: true, message: 'Please enter your city or destination' }]}
                  >
                    <Input
                      prefix={<EnvironmentOutlined style={{ color: '#6366F1' }} />}
                      placeholder="e.g. Mumbai, Goa, Udaipur, Delhi, Bengaluru"
                      size="large"
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Section 2: Celebration Category & Catalog Specs */}
              <div style={{ marginTop: '20px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)', color: '#FFFFFF', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  2
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Celebration Category & Styling Preferences
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>Select preferred package and theme from EventEasy catalog.</span>
                </div>
              </div>

              <Row gutter={[20, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="eventTypeId"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Event Category *</span>}
                    rules={[{ required: true, message: 'Please select an event category' }]}
                  >
                    <Select placeholder="Select event category" loading={loadingTypes} size="large" style={{ borderRadius: '12px' }}>
                      {eventTypes?.map((type) => (
                        <Option key={type.id} value={type.id}>
                          {type.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="eventPackageId"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Preferred Package (Optional)</span>}
                  >
                    <Select placeholder="Select package (Optional)" loading={loadingPackages} allowClear size="large" style={{ borderRadius: '12px' }}>
                      {packages?.map((pkg) => (
                        <Option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({formatCurrency(pkg.price)})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="eventThemeId"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Preferred Theme (Optional)</span>}
                  >
                    <Select placeholder="Select theme (Optional)" loading={loadingThemes} allowClear size="large" style={{ borderRadius: '12px' }}>
                      {themes?.map((thm) => (
                        <Option key={thm.id} value={thm.id}>
                          {thm.name} ({thm.category})
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Section 3: Schedule, Scale & Budget */}
              <div style={{ marginTop: '20px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)', color: '#FFFFFF', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  3
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Schedule, Guest Scale & Budget
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>Specify date, headcount, and budget target.</span>
                </div>
              </div>

              <Row gutter={[20, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="eventDate"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Target Event Date *</span>}
                    rules={[{ required: true, message: 'Please select an event date' }]}
                  >
                    <DatePicker
                      disabledDate={disabledDate}
                      size="large"
                      style={{ width: '100%', borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="expectedGuests"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Expected Guests *</span>}
                    rules={[
                      { required: true, message: 'Please enter expected guests' },
                      { type: 'number', min: 1, message: 'Guests must be at least 1' },
                    ]}
                  >
                    <InputNumber
                      prefix={<UsergroupAddOutlined style={{ color: '#6366F1' }} />}
                      placeholder="e.g. 250"
                      size="large"
                      style={{ width: '100%', borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    name="estimatedBudget"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Estimated Budget (₹ INR) *</span>}
                    rules={[
                      { required: true, message: 'Please enter estimated budget' },
                      { type: 'number', min: 0, message: 'Budget must be non-negative' },
                    ]}
                  >
                    <InputNumber
                      prefix={<span style={{ color: '#6366F1', fontWeight: '800' }}>₹</span>}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      placeholder="e.g. 500,000"
                      size="large"
                      style={{ width: '100%', borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="venue"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Target Venue / Resort Name (Optional)</span>}
                  >
                    <Input
                      prefix={<BankOutlined style={{ color: '#6366F1' }} />}
                      placeholder="e.g. Taj Lake Palace, Leela Resort, Private Farmhouse"
                      size="large"
                      style={{ borderRadius: '12px' }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="venueType"
                    label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Venue Setting Style (Optional)</span>}
                  >
                    <Select placeholder="Select setting style" size="large" style={{ borderRadius: '12px' }}>
                      <Option value="INDOOR">Grand Indoor Banquet Hall</Option>
                      <Option value="OUTDOOR">Open-Air Lush Garden / Beach</Option>
                      <Option value="BOTH">Hybrid Indoor & Outdoor Resort</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Section 4: Special Requirements */}
              <div style={{ marginTop: '20px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)', color: '#FFFFFF', fontWeight: '800', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  4
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    Special Instructions & Requirements
                  </h3>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>Tell us about specific decor preferences, dietary counters, stage FX...</span>
                </div>
              </div>

              <Form.Item
                name="additionalRequirements"
                style={{ marginBottom: '28px' }}
              >
                <TextArea
                  rows={4}
                  placeholder="Share details about Jain food counters, fireworks permission, wheelchair accessibility, sound limits..."
                  style={{ borderRadius: '14px', padding: '14px 16px', fontSize: '14px' }}
                />
              </Form.Item>

              {/* Well-Proportioned Centered Submit CTA Button */}
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitMutation.isPending}
                  icon={<SendOutlined />}
                  style={{
                    height: '46px',
                    padding: '0 36px',
                    borderRadius: '23px',
                    background: 'linear-gradient(135deg, #6366F1 0%, #4338CA 100%)',
                    fontSize: '15px',
                    fontWeight: '700',
                    border: 'none',
                    boxShadow: '0 6px 18px rgba(99, 102, 241, 0.25)',
                  }}
                >
                  Submit Celebration Request
                </Button>
              </div>
            </Form>
          </Card>

          {/* 3-Column Concierge Desk Info Cards Below */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div
              className="card-interactive"
              style={{
                background: '#FFFFFF',
                padding: '28px 24px',
                borderRadius: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                textAlign: 'center',
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#EEF2FF', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '22px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}>
                <PhoneOutlined />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>Direct Concierge Hotline</h4>
              <p style={{ fontSize: '15px', color: '#6366F1', fontWeight: '800', margin: 0 }}>{COMPANY_CONTACT.phone}</p>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '6px' }}>{COMPANY_CONTACT.workingHours}</span>
            </div>

            <div
              className="card-interactive"
              style={{
                background: '#FFFFFF',
                padding: '28px 24px',
                borderRadius: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                textAlign: 'center',
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#EEF2FF', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '22px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}>
                <MailOutlined />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>Email Support</h4>
              <p style={{ fontSize: '15px', color: '#6366F1', fontWeight: '800', margin: 0 }}>{COMPANY_CONTACT.email}</p>
              <span style={{ fontSize: '12px', color: '#64748B', display: 'block', marginTop: '6px' }}>24/7 Digital Concierge Desk</span>
            </div>

            <div
              className="card-interactive"
              style={{
                background: '#FFFFFF',
                padding: '28px 24px',
                borderRadius: '24px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
                textAlign: 'center',
              }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#EEF2FF', color: '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', fontSize: '22px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)' }}>
                <EnvironmentOutlined />
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>India Headquarters</h4>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: '1.5' }}>{COMPANY_CONTACT.address}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
