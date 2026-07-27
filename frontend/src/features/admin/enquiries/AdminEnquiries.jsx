import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Card, Input, Select, DatePicker, Button, Tag, Space, Drawer, Modal, Form, notification, Tooltip, Popconfirm, Descriptions, Divider } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  CopyOutlined,
  PrinterOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { enquiryService } from '../../../services/enquiryService';
import { eventTypeService } from '../../../services/eventTypeService';
import { packageService } from '../../../services/packageService';
import { themeService } from '../../../services/themeService';
import { aiService } from '../../../services/aiService';
import { formatDate, formatCurrency } from '../../../utils/formatters';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export const AdminEnquiries = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [eventTypeFilter, setEventTypeFilter] = useState(null);
  const [packageFilter, setPackageFilter] = useState(null);
  const [themeFilter, setThemeFilter] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [statusForm] = Form.useForm();

  const { data: eventTypes } = useQuery({ queryKey: ['adminTypes'], queryFn: eventTypeService.getAllEventTypes });
  const { data: packages } = useQuery({ queryKey: ['adminPackages'], queryFn: packageService.getAllPackages });
  const { data: themes } = useQuery({ queryKey: ['adminThemes'], queryFn: themeService.getAllThemes });

  const queryParams = {
    search: search || undefined,
    status: statusFilter || undefined,
    eventTypeId: eventTypeFilter || undefined,
    packageId: packageFilter || undefined,
    themeId: themeFilter || undefined,
    startDate: dateRange?.[0] ? dateRange[0].format('YYYY-MM-DD') : undefined,
    endDate: dateRange?.[1] ? dateRange[1].format('YYYY-MM-DD') : undefined,
    page,
    size: pageSize,
    sortBy,
    sortDir,
  };

  const { data: pagedData, isLoading, refetch } = useQuery({
    queryKey: ['adminEnquiries', queryParams],
    queryFn: () => enquiryService.getEnquiries(queryParams),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }) => enquiryService.updateStatus(id, data),
    onSuccess: () => {
      notification.success({ message: 'Status Updated', description: 'Enquiry workflow status updated successfully.' });
      queryClient.invalidateQueries(['adminEnquiries']);
      queryClient.invalidateQueries(['adminDashboardStats']);
      setIsStatusModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: enquiryService.delete,
    onSuccess: () => {
      notification.success({ message: 'Enquiry Deleted', description: 'Enquiry record soft-deleted successfully.' });
      queryClient.invalidateQueries(['adminEnquiries']);
      queryClient.invalidateQueries(['adminDashboardStats']);
    },
  });

  const handleOpenStatusModal = (record) => {
    setSelectedEnquiry(record);
    statusForm.setFieldsValue({ status: record.status, adminNotes: record.adminNotes });
    setIsStatusModalOpen(true);
  };

  const handleStatusSubmit = (values) => {
    if (selectedEnquiry) {
      updateStatusMutation.mutate({ id: selectedEnquiry.id, data: values });
    }
  };

  const handleRegeneratePlan = async () => {
    if (!selectedEnquiry) return;
    setRegenerating(true);
    try {
      await aiService.regenerateEnquiryPlan(selectedEnquiry.id);
      notification.success({
        message: 'AI Plan Regenerated',
        description: 'New AI Event Plan proposal has been generated and saved for this enquiry.',
      });
      refetch();
      const updatedEnquiry = await enquiryService.getEnquiryById(selectedEnquiry.id);
      setSelectedEnquiry(updatedEnquiry);
    } catch (err) {
      notification.error({
        message: 'Regeneration Error',
        description: err.message || 'Failed to regenerate AI Event Plan.',
      });
    } finally {
      setRegenerating(false);
    }
  };

  const parseJson = (jsonString) => {
    if (!jsonString) return null;
    try {
      return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      return null;
    }
  };

  const columns = [
    {
      title: 'Enquiry No',
      dataIndex: 'enquiryNumber',
      key: 'enquiryNumber',
      render: (num) => <strong style={{ color: '#7C3AED', fontWeight: '700' }}>{num}</strong>,
    },
    {
      title: 'Customer',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name, r) => (
        <div>
          <div style={{ fontWeight: '600', color: '#111827' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>{r.email} | {r.phone}</div>
        </div>
      ),
    },
    {
      title: 'Event Type',
      dataIndex: 'eventType',
      key: 'eventType',
      render: (type) => <Tag color="purple" style={{ borderRadius: '10px' }}>{type?.name || 'N/A'}</Tag>,
    },
    {
      title: 'AI Plan Summary',
      dataIndex: 'aiPlanSummary',
      key: 'aiPlanSummary',
      render: (summary) => summary ? (
        <Tag color="geekblue" icon={<StarOutlined />} style={{ borderRadius: '12px', fontWeight: '600', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {summary}
        </Tag>
      ) : (
        <span style={{ color: '#94A3B8', fontSize: '12px' }}>Standard Enquiry</span>
      ),
    },
    {
      title: 'Event Date',
      dataIndex: 'eventDate',
      key: 'eventDate',
      render: (date) => formatDate(date),
    },
    {
      title: 'Budget',
      dataIndex: 'estimatedBudget',
      key: 'estimatedBudget',
      render: (b) => formatCurrency(b),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'gold';
        if (status === 'CONTACTED') color = 'cyan';
        if (status === 'QUOTATION_SENT') color = 'purple';
        if (status === 'NEGOTIATION') color = 'orange';
        if (status === 'CONFIRMED') color = 'green';
        if (status === 'COMPLETED') color = 'blue';
        if (status === 'CANCELLED') color = 'red';
        return <Tag color={color} style={{ fontWeight: '600', borderRadius: '12px' }}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details & AI Plan">
            <Button
              type="text"
              icon={<EyeOutlined style={{ color: '#7C3AED' }} />}
              onClick={() => { setSelectedEnquiry(record); setIsDetailDrawerOpen(true); }}
            />
          </Tooltip>
          <Tooltip title="Update Status">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: '#06B6D4' }} />}
              onClick={() => handleOpenStatusModal(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Enquiry"
            description="Are you sure you want to delete this enquiry?"
            onConfirm={() => deleteMutation.mutate(record.id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Soft Delete">
              <Button type="text" icon={<DeleteOutlined style={{ color: '#EF4444' }} />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const parsedPlan = selectedEnquiry ? parseJson(selectedEnquiry.aiEventPlanJson) : null;

  return (
    <>
      <Helmet>
        <title>Customer Enquiries Management | EventEasy</title>
      </Helmet>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>
              Customer Enquiries
            </h1>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0 0' }}>
              Search, filter, review AI Event Plans, and manage client booking requests.
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => refetch()}
            style={{ borderRadius: '20px', fontWeight: '600', borderColor: '#E5E7EB', height: '40px' }}
          >
            Refresh List
          </Button>
        </div>

        {/* Filter Controls Card */}
        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Space wrap size="middle">
            <Input
              placeholder="Search Name, No, Phone, Email, City..."
              prefix={<SearchOutlined style={{ color: '#9CA3AF' }} />}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              style={{ width: 260, borderRadius: '20px' }}
              allowClear
            />

            <Select
              placeholder="Filter Status"
              value={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(0); }}
              style={{ width: 160 }}
              allowClear
            >
              <Option value="NEW">NEW</Option>
              <Option value="CONTACTED">CONTACTED</Option>
              <Option value="QUOTATION_SENT">QUOTATION_SENT</Option>
              <Option value="NEGOTIATION">NEGOTIATION</Option>
              <Option value="CONFIRMED">CONFIRMED</Option>
              <Option value="COMPLETED">COMPLETED</Option>
              <Option value="CANCELLED">CANCELLED</Option>
            </Select>

            <Select
              placeholder="Event Type"
              value={eventTypeFilter}
              onChange={(v) => { setEventTypeFilter(v); setPage(0); }}
              style={{ width: 180 }}
              allowClear
            >
              {eventTypes?.map((t) => <Option key={t.id} value={t.id}>{t.name}</Option>)}
            </Select>

            <Select
              placeholder="Package"
              value={packageFilter}
              onChange={(v) => { setPackageFilter(v); setPage(0); }}
              style={{ width: 160 }}
              allowClear
            >
              {packages?.map((p) => <Option key={p.id} value={p.id}>{p.name}</Option>)}
            </Select>

            <Select
              placeholder="Theme"
              value={themeFilter}
              onChange={(v) => { setThemeFilter(v); setPage(0); }}
              style={{ width: 160 }}
              allowClear
            >
              {themes?.map((th) => <Option key={th.id} value={th.id}>{th.name}</Option>)}
            </Select>

            <RangePicker onChange={(dates) => { setDateRange(dates); setPage(0); }} style={{ width: 240, borderRadius: '20px' }} />
          </Space>
        </Card>

        {/* Enquiries Data Table */}
        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Table
            columns={columns}
            dataSource={pagedData?.content || []}
            rowKey="id"
            loading={isLoading}
            pagination={{
              current: (pagedData?.page || 0) + 1,
              pageSize: pagedData?.size || 10,
              total: pagedData?.totalElements || 0,
              onChange: (pageNumber, size) => {
                setPage(pageNumber - 1);
                setPageSize(size);
              },
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} enquiries`,
            }}
          />
        </Card>

        {/* View Details & AI Event Plan Drawer */}
        <Drawer
          title={`Enquiry & AI Event Plan - ${selectedEnquiry?.enquiryNumber}`}
          placement="right"
          width={640}
          onClose={() => setIsDetailDrawerOpen(false)}
          open={isDetailDrawerOpen}
        >
          {selectedEnquiry && (
            <div>
              {/* Customer Primary Details */}
              <Descriptions column={1} bordered size="small" style={{ marginBottom: '24px' }}>
                <Descriptions.Item label="Enquiry Number">
                  <strong style={{ color: '#7C3AED' }}>{selectedEnquiry.enquiryNumber}</strong>
                </Descriptions.Item>
                <Descriptions.Item label="Full Name">{selectedEnquiry.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{selectedEnquiry.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{selectedEnquiry.phone}</Descriptions.Item>
                <Descriptions.Item label="City">{selectedEnquiry.city}</Descriptions.Item>
                <Descriptions.Item label="Event Type">{selectedEnquiry.eventType?.name}</Descriptions.Item>
                <Descriptions.Item label="Preferred Package">{selectedEnquiry.eventPackage?.name || 'Custom'}</Descriptions.Item>
                <Descriptions.Item label="Preferred Theme">{selectedEnquiry.eventTheme?.name || 'Custom'}</Descriptions.Item>
                <Descriptions.Item label="Event Date">{formatDate(selectedEnquiry.eventDate)}</Descriptions.Item>
                <Descriptions.Item label="Expected Guests">{selectedEnquiry.expectedGuests}</Descriptions.Item>
                <Descriptions.Item label="Venue">{selectedEnquiry.venue || 'TBD'}</Descriptions.Item>
                <Descriptions.Item label="Venue Type">{selectedEnquiry.venueType || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Estimated Budget">{formatCurrency(selectedEnquiry.estimatedBudget)}</Descriptions.Item>
                <Descriptions.Item label="Additional Requirements">{selectedEnquiry.additionalRequirements || 'None'}</Descriptions.Item>
                <Descriptions.Item label="Workflow Status">
                  <Tag color="gold">{selectedEnquiry.status}</Tag>
                </Descriptions.Item>
              </Descriptions>

              {/* AI Event Plan Section */}
              <Divider style={{ margin: '24px 0' }}>
                <span style={{ color: '#7C3AED', fontWeight: '800', fontSize: '15px' }}>
                  <StarOutlined /> Attached AI Event Plan Proposal
                </span>
              </Divider>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontWeight: '700', color: '#1E293B' }}>
                  {selectedEnquiry.aiPlanSummary || 'AI Plan Proposal'}
                </span>

                <Button
                  type="primary"
                  icon={<SyncOutlined spin={regenerating} />}
                  onClick={handleRegeneratePlan}
                  loading={regenerating}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    borderRadius: '20px',
                    fontWeight: '700',
                    border: 'none',
                  }}
                >
                  Regenerate AI Plan
                </Button>
              </div>

              {parsedPlan ? (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                    {parsedPlan.title}
                  </h4>
                  <p style={{ color: '#475569', fontSize: '13px', lineHeight: '1.6', marginBottom: '16px' }}>
                    {parsedPlan.summary}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {parsedPlan.recommendedPackage && <Tag color="purple">Package: {parsedPlan.recommendedPackage}</Tag>}
                    {parsedPlan.recommendedTheme && <Tag color="magenta">Theme: {parsedPlan.recommendedTheme}</Tag>}
                  </div>

                  {parsedPlan.venueRecommendation && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ fontSize: '13px', color: '#1E293B' }}>Venue Advice:</strong>
                      <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>{parsedPlan.venueRecommendation} - {parsedPlan.venueReason}</p>
                    </div>
                  )}

                  {parsedPlan.decorRecommendations && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ fontSize: '13px', color: '#1E293B' }}>Decor Highlights:</strong>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#64748B' }}>
                        {parsedPlan.decorRecommendations.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                  )}

                  {parsedPlan.foodRecommendations && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ fontSize: '13px', color: '#1E293B' }}>Catering Recommendations:</strong>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#64748B' }}>
                        {parsedPlan.foodRecommendations.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  )}

                  {parsedPlan.assumptions && (
                    <div style={{ marginBottom: '12px', background: '#FFFBEB', padding: '10px', borderRadius: '10px' }}>
                      <strong style={{ fontSize: '12px', color: '#B45309' }}>Assumptions:</strong>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: '#78350F' }}>
                        {parsedPlan.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  )}

                  <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Model: {selectedEnquiry.aiModel || 'gemini-1.5-flash'}</span>
                    <span>Provider: {selectedEnquiry.aiProvider || 'Google Gemini'}</span>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px', background: '#F8FAFC', borderRadius: '16px' }}>
                  <p style={{ color: '#64748B', margin: 0 }}>No AI Event Plan generated yet for this enquiry.</p>
                  <Button
                    type="link"
                    icon={<StarOutlined />}
                    onClick={handleRegeneratePlan}
                    loading={regenerating}
                    style={{ fontWeight: '700', color: '#7C3AED', marginTop: '8px' }}
                  >
                    Generate AI Plan Now
                  </Button>
                </div>
              )}
            </div>
          )}
        </Drawer>

        {/* Update Status Modal */}
        <Modal
          title={`Update Status - ${selectedEnquiry?.enquiryNumber}`}
          open={isStatusModalOpen}
          onCancel={() => setIsStatusModalOpen(false)}
          footer={null}
        >
          <Form form={statusForm} layout="vertical" onFinish={handleStatusSubmit}>
            <Form.Item name="status" label="Enquiry Workflow Status" rules={[{ required: true }]}>
              <Select size="large">
                <Option value="NEW">NEW</Option>
                <Option value="CONTACTED">CONTACTED</Option>
                <Option value="QUOTATION_SENT">QUOTATION_SENT</Option>
                <Option value="NEGOTIATION">NEGOTIATION</Option>
                <Option value="CONFIRMED">CONFIRMED</Option>
                <Option value="COMPLETED">COMPLETED</Option>
                <Option value="CANCELLED">CANCELLED</Option>
              </Select>
            </Form.Item>

            <Form.Item name="adminNotes" label="Administrator Internal Notes">
              <TextArea rows={4} placeholder="Record conversation notes, quote amounts, or client feedback..." />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={updateStatusMutation.isPending}
              block
              size="large"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', borderRadius: '30px', marginTop: '12px' }}
            >
              Save Workflow Status
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminEnquiries;
