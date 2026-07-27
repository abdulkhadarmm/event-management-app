import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, Statistic, Tag, Table, Alert } from 'antd';
import {
  CalendarOutlined,
  CrownOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';

/**
 * EventEasy Administrator Dashboard Skeleton Page (Phase 1).
 */
export const AdminDashboard = () => {
  const { user } = useAuth();

  // Skeleton Table Data for Phase 1 Demo
  const recentEnquiriesSkeleton = [
    { key: '1', client: 'Victoria Sterling', eventType: 'Royal Wedding', date: '2026-08-15', status: 'NEW' },
    { key: '2', client: 'TechCorp International', eventType: 'Corporate Summit', date: '2026-09-02', status: 'IN_REVIEW' },
    { key: '3', client: 'Harrison Family', eventType: 'Anniversary Gala', date: '2026-09-20', status: 'CONFIRMED' },
  ];

  const columns = [
    { title: 'Client Name', dataIndex: 'client', key: 'client' },
    { title: 'Event Type', dataIndex: 'eventType', key: 'eventType' },
    { title: 'Preferred Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'NEW') color = 'gold';
        if (status === 'CONFIRMED') color = 'green';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | EventEasy</title>
      </Helmet>

      <div>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0F172A', marginBottom: '4px' }}>
            Welcome back, {user?.firstName || 'Administrator'}
          </h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>
            EventEasy SaaS Enterprise Architecture Foundation - Phase 1 Active
          </p>
        </div>

        <Alert
          message="Phase 1 Foundation Architecture Active"
          description="Business modules (Events, Packages, Themes, Enquiries) will be integrated in Phase 2. Authentication, security, database auditing, and UI themes are operational."
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          style={{ marginBottom: '32px', borderRadius: '12px' }}
        />

        {/* Dashboard Analytics Metric Cards */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderRadius: '16px' }}>
              <Statistic
                title="Total Enquiries (Phase 2)"
                value={24}
                prefix={<CalendarOutlined style={{ color: '#D97706' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderRadius: '16px' }}>
              <Statistic
                title="Active Event Types"
                value={6}
                prefix={<CrownOutlined style={{ color: '#10B981' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderRadius: '16px' }}>
              <Statistic
                title="Signature Themes"
                value={12}
                prefix={<CustomerServiceOutlined style={{ color: '#6366F1' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ borderRadius: '16px' }}>
              <Statistic
                title="Estimated Pipeline"
                value={145000}
                precision={0}
                prefix={<DollarOutlined style={{ color: '#F59E0B' }} />}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent Activity Skeleton Table */}
        <div style={{ marginTop: '36px' }}>
          <Card title="Recent Client Enquiries (API Skeleton Preview)" style={{ borderRadius: '16px' }}>
            <Table columns={columns} dataSource={recentEnquiriesSkeleton} pagination={false} />
          </Card>
        </div>
      </div>
    </>
  );
};
