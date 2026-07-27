import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Card, Statistic, Tag, Table, Spin, Alert, Button } from 'antd';
import {
  CalendarOutlined,
  CrownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

import { useAuth } from '../../../hooks/useAuth';
import { dashboardService } from '../../../services/dashboardService';
import { formatDate } from '../../../utils/formatters';

const PIE_COLORS = ['#7C3AED', '#06B6D4', '#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#EF4444'];

/**
 * EventEasy Administrator Analytics Dashboard matching the Bordio reference design:
 * Vivid gradient metric cards, soft white chart containers, purple bar charts, and soft pastel rings.
 */
export const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: stats, isLoading, isError, refetch } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: dashboardService.getStats,
  });

  const statusPieData = stats?.statusDistribution
    ? Object.entries(stats.statusDistribution).map(([name, value]) => ({ name, value }))
    : [];

  const eventTypeBarData = stats?.eventTypeDistribution
    ? Object.entries(stats.eventTypeDistribution).map(([name, value]) => ({ name, count: value }))
    : [];

  const recentEnquiriesColumns = [
    {
      title: 'Enquiry No',
      dataIndex: 'enquiryNumber',
      key: 'enquiryNumber',
      render: (num) => <strong style={{ color: '#7C3AED', fontWeight: '700' }}>{num}</strong>,
    },
    {
      title: 'Client Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name) => <span style={{ fontWeight: '600', color: '#111827' }}>{name}</span>,
    },
    { title: 'Event Type', dataIndex: 'eventType', key: 'eventType', render: (t) => t?.name || 'N/A' },
    { title: 'Event Date', dataIndex: 'eventDate', key: 'eventDate', render: (d) => formatDate(d) },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        if (status === 'CONFIRMED') color = 'green';
        if (status === 'CONTACTED') color = 'cyan';
        if (status === 'CANCELLED') color = 'red';
        return <Tag color={color} style={{ borderRadius: '12px', fontWeight: '600', padding: '2px 10px' }}>{status}</Tag>;
      },
    },
  ];

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '96px' }}>
        <Spin size="large" tip="Loading Analytics Dashboard..." />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Analytics Connection Failed"
        description="Unable to load statistics. Please check backend connection."
        type="error"
        action={<Button icon={<ReloadOutlined />} onClick={() => refetch()}>Retry</Button>}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Analytics Dashboard | EventEasy</title>
      </Helmet>

      <div>
        {/* Page Title & Refresh Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>
              Analytics
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0 0' }}>
              Real-time event performance, enquiry pipelines, and engagement metrics.
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => refetch()}
            style={{ borderRadius: '20px', fontWeight: '600', borderColor: '#E5E7EB', padding: '0 20px', height: '40px' }}
          >
            Refresh
          </Button>
        </div>

        {/* Bordio Style Top Row Vivid Gradient Metric Cards */}
        <Row gutter={[20, 20]}>
          {/* Card 1: Total Enquiries */}
          <Col xs={24} sm={12} lg={6}>
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                padding: '24px',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(124, 58, 237, 0.25)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '14px' }}>
                  Dec 2026
                </span>
                <EllipsisOutlined style={{ fontSize: '20px', opacity: 0.8, cursor: 'pointer' }} />
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>Total Enquiries Received</div>
              <div style={{ fontSize: '36px', fontWeight: '800', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                {stats?.totalEnquiries || 0}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>Pipeline Leads</div>
            </div>
          </Col>

          {/* Card 2: Confirmed Events */}
          <Col xs={24} sm={12} lg={6}>
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #0D9488 0%, #06B6D4 100%)',
                padding: '24px',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(13, 148, 136, 0.25)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '14px' }}>
                  Confirmed Rate
                </span>
                <EllipsisOutlined style={{ fontSize: '20px', opacity: 0.8, cursor: 'pointer' }} />
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>Confirmed Events</div>
              <div style={{ fontSize: '36px', fontWeight: '800', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                {stats?.confirmedEvents || 0}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>Booking Success</div>
            </div>
          </Col>

          {/* Card 3: Pending Enquiries */}
          <Col xs={24} sm={12} lg={6}>
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                padding: '24px',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '14px' }}>
                  Pending Action
                </span>
                <EllipsisOutlined style={{ fontSize: '20px', opacity: 0.8, cursor: 'pointer' }} />
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>Pending Enquiries</div>
              <div style={{ fontSize: '36px', fontWeight: '800', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                {stats?.pendingEnquiries || 0}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>Awaiting Quote</div>
            </div>
          </Col>

          {/* Card 4: Upcoming Events */}
          <Col xs={24} sm={12} lg={6}>
            <div
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
                padding: '24px',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(139, 92, 246, 0.25)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '600', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 12px', borderRadius: '14px' }}>
                  Upcoming
                </span>
                <EllipsisOutlined style={{ fontSize: '20px', opacity: 0.8, cursor: 'pointer' }} />
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9, fontWeight: '500' }}>Upcoming Galas & Events</div>
              <div style={{ fontSize: '36px', fontWeight: '800', margin: '8px 0 4px 0', letterSpacing: '-0.5px' }}>
                {stats?.upcomingEvents || 0}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.85 }}>Active Schedule</div>
            </div>
          </Col>
        </Row>

        {/* Analytics Charts Row */}
        <Row gutter={[20, 20]} style={{ marginTop: '24px' }}>
          {/* Status Breakdown Ring Chart */}
          <Col xs={24} lg={12}>
            <Card
              title={<span style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>Pipeline Breakdown</span>}
              style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
            >
              <div style={{ height: 300 }}>
                {statusPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={5}
                      >
                        {statusPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ textAlign: 'center', paddingTop: '110px', color: '#9CA3AF' }}>No enquiry data yet</div>
                )}
              </div>
            </Card>
          </Col>

          {/* Enquiries by Category Bar Chart */}
          <Col xs={24} lg={12}>
            <Card
              title={<span style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>Category Performance</span>}
              style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
            >
              <div style={{ height: 300 }}>
                {eventTypeBarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={eventTypeBarData}>
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis allowDecimals={false} stroke="#6B7280" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#7C3AED" radius={[10, 10, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ textAlign: 'center', paddingTop: '110px', color: '#9CA3AF' }}>No category data yet</div>
                )}
              </div>
            </Card>
          </Col>

          {/* Monthly Trend Area Chart */}
          <Col xs={24}>
            <Card
              title={<span style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>Monthly Enquiry Growth</span>}
              style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
            >
              <div style={{ height: 260 }}>
                {stats?.monthlyTrend ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.monthlyTrend}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis allowDecimals={false} stroke="#6B7280" />
                      <Tooltip />
                      <Area type="monotone" dataKey="count" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div style={{ textAlign: 'center', paddingTop: '90px', color: '#9CA3AF' }}>No trend data yet</div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Recent Enquiries Table Feed */}
        <div style={{ marginTop: '24px' }}>
          <Card
            title={<span style={{ fontWeight: '700', fontSize: '18px', color: '#111827' }}>Recent Enquiries</span>}
            extra={
              <Button
                type="link"
                icon={<ArrowRightOutlined />}
                onClick={() => navigate('/admin/enquiries')}
                style={{ color: '#7C3AED', fontWeight: '600' }}
              >
                View All Enquiries
              </Button>
            }
            style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}
          >
            <Table
              columns={recentEnquiriesColumns}
              dataSource={stats?.recentEnquiries || []}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
