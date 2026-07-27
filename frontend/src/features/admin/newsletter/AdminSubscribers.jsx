import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Table, Tag, Input, Button, Statistic, Row, Col, Space, notification } from 'antd';
import {
  MailOutlined,
  SearchOutlined,
  CopyOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { adminNewsletterService } from '../../../services/adminNewsletterService';
import { formatDate } from '../../../utils/formatters';

/**
 * Admin Subscribers Management Page:
 * Displays real-time database newsletter subscriber list with search, stats, and copy email list functionality.
 */
export const AdminSubscribers = () => {
  const [searchText, setSearchText] = useState('');

  const { data: subscribers = [], isLoading, refetch } = useQuery({
    queryKey: ['adminNewsletterSubscribers'],
    queryFn: adminNewsletterService.getSubscribers,
  });

  const filteredSubscribers = subscribers.filter((sub) =>
    (sub.email || '').toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCopyEmails = () => {
    if (subscribers.length === 0) return;
    const emailList = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emailList);
    notification.success({
      message: 'Emails Copied',
      description: `${subscribers.length} email addresses copied to clipboard!`,
    });
  };

  const columns = [
    {
      title: '# ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => <strong style={{ color: '#7C3AED' }}>#{id}</strong>,
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <span style={{ fontWeight: '600', color: '#0F172A' }}>
          <MailOutlined style={{ color: '#6366F1', marginRight: '8px' }} />
          {email}
        </span>
      ),
    },
    {
      title: 'Subscribed Date & Time',
      dataIndex: 'subscribedAt',
      key: 'subscribedAt',
      render: (dateStr) => (dateStr ? formatDate(dateStr) : 'N/A'),
    },
    {
      title: 'Subscription Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color="green" icon={<CheckCircleOutlined />} style={{ borderRadius: '12px', fontWeight: '700', padding: '2px 10px' }}>
          {status || 'ACTIVE'}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Newsletter Subscribers | EventEasy Executive Desk</title>
      </Helmet>

      <div style={{ padding: '8px 0' }}>
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              Newsletter Subscribers
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', margin: '4px 0 0 0' }}>
              Manage website email subscribers received from public newsletter signups.
            </p>
          </div>

          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              style={{ borderRadius: '20px' }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={handleCopyEmails}
              style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', border: 'none' }}
            >
              Copy All Emails
            </Button>
          </Space>
        </div>

        {/* Statistic Cards */}
        <Row gutter={[20, 20]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
              }}
            >
              <Statistic
                title={<span style={{ fontWeight: '600', color: '#64748B' }}>Total Active Subscribers</span>}
                value={subscribers.length}
                prefix={<UsergroupAddOutlined style={{ color: '#7C3AED', marginRight: '8px' }} />}
                valueStyle={{ fontWeight: '800', color: '#0F172A' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Table Card */}
        <Card
          style={{
            borderRadius: '20px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ marginBottom: '20px', maxWidth: '360px' }}>
            <Input
              placeholder="Search subscribers by email..."
              prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
              style={{ borderRadius: '20px', padding: '8px 16px' }}
            />
          </div>

          <Table
            columns={columns}
            dataSource={filteredSubscribers}
            rowKey="id"
            loading={isLoading}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      </div>
    </>
  );
};
