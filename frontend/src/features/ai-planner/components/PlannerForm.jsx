import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Switch, Button, Card, Row, Col } from 'antd';
import {
  StarOutlined,
  UsergroupAddOutlined,
  EnvironmentOutlined,
  CameraOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  CarOutlined,
  ThunderboltOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { designTokens } from '../../../theme/designTokens';

const { Option } = Select;
const { TextArea } = Input;

/**
 * PlannerForm component collecting validated user event parameters.
 * Redesigned with luxury cards, purple step badges, styled inputs, and hover glow buttons.
 */
export const PlannerForm = ({ onSubmit, loading, initialValues }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const formattedValues = {
      ...values,
      eventDate: values.eventDate ? values.eventDate.format('YYYY-MM-DD') : null,
    };
    onSubmit(formattedValues);
  };

  const formDefaults = {
    guestCount: 200,
    budget: 500000,
    venuePreference: 'BOTH',
    themePreference: 'Midnight Opulence',
    photographyRequired: true,
    entertainmentRequired: true,
    accommodationRequired: false,
    transportationRequired: false,
    ...initialValues,
    eventDate: initialValues?.eventDate ? dayjs(initialValues.eventDate) : dayjs().add(2, 'month'),
  };

  return (
    <Card
      style={{
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 50px rgba(15, 23, 42, 0.06)',
        background: '#FFFFFF',
        padding: '16px 20px',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={formDefaults}
        requiredMark={false}
      >
        {/* Section 1 Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: designTokens.colors.accentGradient,
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            1
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Primary Celebration Parameters
            </h3>
            <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
              Specify your event scale, location, date, and budget to enable intelligent catalog matching.
            </p>
          </div>
        </div>

        <Row gutter={[20, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="eventType"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Event Category *</span>}
              rules={[{ required: true, message: 'Please select an event category' }]}
            >
              <Select size="large" style={{ borderRadius: '12px' }} placeholder="Select Event Category">
                <Option value="Wedding">Wedding</Option>
                <Option value="Birthday">Birthday Celebration</Option>
                <Option value="Corporate Event">Corporate Event / Gala</Option>
                <Option value="Engagement">Engagement Ceremony</Option>
                <Option value="Reception">Wedding Reception</Option>
                <Option value="Anniversary">Anniversary Celebration</Option>
                <Option value="Conference">Conference / Convention</Option>
                <Option value="Product Launch">Product Launch</Option>
                <Option value="Award Ceremony">Award Ceremony</Option>
                <Option value="Private Party">Private Party</Option>
                <Option value="Luxury Celebration">Luxury Celebration</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="location"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>City / Event Destination *</span>}
              rules={[{ required: true, message: 'Please enter city or location' }]}
            >
              <Input
                prefix={<EnvironmentOutlined style={{ color: designTokens.colors.accent }} />}
                size="large"
                placeholder="e.g. Udaipur, Mumbai, Goa, Delhi, Bengaluru"
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="guestCount"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Expected Guests (10 - 10,000) *</span>}
              rules={[
                { required: true, message: 'Please enter guest count' },
                { type: 'number', min: 10, max: 10000, message: 'Guests must be between 10 and 10,000' },
              ]}
            >
              <InputNumber
                prefix={<UsergroupAddOutlined style={{ color: designTokens.colors.accent }} />}
                size="large"
                style={{ width: '100%', borderRadius: '12px' }}
                placeholder="200"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="budget"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Estimated Budget (₹ INR) *</span>}
              rules={[
                { required: true, message: 'Please enter budget' },
                { type: 'number', min: 1000, message: 'Budget must be greater than zero' },
              ]}
            >
              <InputNumber
                prefix={<span style={{ color: designTokens.colors.accent, fontWeight: '800' }}>₹</span>}
                size="large"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                style={{ width: '100%', borderRadius: '12px' }}
                placeholder="500,000"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              name="eventDate"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Target Event Date *</span>}
              rules={[{ required: true, message: 'Please select preferred date' }]}
            >
              <DatePicker
                size="large"
                style={{ width: '100%', borderRadius: '12px' }}
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="venuePreference"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Venue Setting Style</span>}
            >
              <Select size="large" style={{ borderRadius: '12px' }}>
                <Option value="INDOOR">Grand Indoor Banquet Hall</Option>
                <Option value="OUTDOOR">Open-Air Lush Garden / Lawn</Option>
                <Option value="BOTH">Hybrid Indoor & Outdoor Resort</Option>
                <Option value="Heritage Palace">Royal Heritage Palace</Option>
                <Option value="Beach Resort">Luxury Beachfront Resort</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="themePreference"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Design Theme Preference</span>}
            >
              <Select size="large" style={{ borderRadius: '12px' }}>
                <Option value="Midnight Opulence">Midnight Opulence (Deep Indigo & Gold)</Option>
                <Option value="Boho Botanical Garden">Boho Botanical Garden (Terracotta & Sage)</Option>
                <Option value="Monochrome Modernist">Monochrome Modernist (Sleek Slate)</Option>
                <Option value="Sunset Velvet Glow">Sunset Velvet Glow (Warm Crimson & Rose)</Option>
                <Option value="Royal Gold">Royal Gold & Ivory</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Section 2 Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '28px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #F1F5F9',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: designTokens.colors.accentGradient,
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            2
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Service Inclusions & Customization
            </h3>
            <p style={{ color: '#64748B', fontSize: '13px', margin: 0 }}>
              Toggle optional concierge services to incorporate into the AI architectural allocation.
            </p>
          </div>
        </div>

        <Row gutter={[20, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="photographyRequired" valuePropName="checked" label={<span style={{ fontWeight: '600', color: '#475569' }}><CameraOutlined /> Photography & Video</span>}>
              <Switch checkedChildren="Included" unCheckedChildren="No" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="entertainmentRequired" valuePropName="checked" label={<span style={{ fontWeight: '600', color: '#475569' }}><CustomerServiceOutlined /> Sound & DJ / Band</span>}>
              <Switch checkedChildren="Included" unCheckedChildren="No" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="accommodationRequired" valuePropName="checked" label={<span style={{ fontWeight: '600', color: '#475569' }}><HomeOutlined /> Guest Accommodation</span>}>
              <Switch checkedChildren="Included" unCheckedChildren="No" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item name="transportationRequired" valuePropName="checked" label={<span style={{ fontWeight: '600', color: '#475569' }}><CarOutlined /> Luxury Transport</span>}>
              <Switch checkedChildren="Included" unCheckedChildren="No" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 16]} style={{ marginTop: '12px' }}>
          <Col xs={24} md={12}>
            <Form.Item
              name="specialRequirements"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Special Requirements (Optional)</span>}
            >
              <TextArea
                rows={3}
                maxLength={1000}
                placeholder="e.g. Jain food counters, wheelchair access, stage fireworks..."
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="additionalNotes"
              label={<span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Additional Notes (Optional)</span>}
            >
              <TextArea
                rows={3}
                maxLength={1000}
                placeholder="e.g. Sunset timing preference, high priority on stage lighting..."
                style={{ borderRadius: '12px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<ThunderboltOutlined />}
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '30px',
            background: designTokens.colors.accentGradient,
            fontSize: '18px',
            fontWeight: '800',
            marginTop: '20px',
            boxShadow: '0 10px 30px rgba(124, 58, 237, 0.4)',
            border: 'none',
          }}
        >
          Generate Bespoke AI Event Plan
        </Button>
      </Form>
    </Card>
  );
};
