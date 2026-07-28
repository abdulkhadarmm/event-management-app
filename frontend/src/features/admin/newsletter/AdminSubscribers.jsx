import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, Table, Tag, Input, Button, Statistic, Row, Col, notification } from 'antd';
import {
  MailOutlined,
  SearchOutlined,
  ReloadOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { adminNewsletterService } from '../../../services/adminNewsletterService';
import { formatDate } from '../../../utils/formatters';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * Admin Subscribers Management Page:
 * Displays real-time database newsletter subscriber list with search and stats.
 */
export const AdminSubscribers = () => {
  const [searchText, setSearchText] = useState('');
  const { isMobile } = useResponsive();

  const { data: subscribers = [], isLoading, refetch } = useQuery({
    queryKey: ['adminNewsletterSubscribers'],
    queryFn: adminNewsletterService.getSubscribers,
  });

  const filteredSubscribers = subscribers.filter((sub) =>
    (sub.email || '').toLowerCase().includes(searchText.toLowerCase())
  );

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
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
          <div>
            <h1 style={{ fontSize: isMobile ? '24px' : '26px', fontWeight: '900', color: '#0F172A', margin: 0 }}>
              Newsletter Subscribers
            </h1>
            <p style={{ color: '#64748B', fontSize: isMobile ? '13px' : '14px', margin: '4px 0 0 0' }}>
              Manage website email subscribers received from public newsletter signups.
            </p>
          </div>

          <Button
            icon={<ReloadOutlined />}
            onClick={() => refetch()}
            style={{
              borderRadius: '24px',
              height: isMobile ? '36px' : '40px',
              padding: isMobile ? '0 14px' : '0 18px',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: '600',
              borderColor: '#E5E7EB',
            }}
          >
            Refresh
          </Button>
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
            scroll={{ x: 'max-content' }}
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>
      </div>
    </>
  );
};
