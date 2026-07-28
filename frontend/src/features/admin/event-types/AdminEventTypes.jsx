import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Card, Button, Modal, Form, Input, InputNumber, Switch, Tag, Space, notification, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { eventTypeService } from '../../../services/eventTypeService';
import { useResponsive } from '../../../hooks/useResponsive';

const { TextArea } = Input;

export const AdminEventTypes = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const { data: eventTypes, isLoading, refetch } = useQuery({
    queryKey: ['adminEventTypes'],
    queryFn: eventTypeService.getAllEventTypes,
  });

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editingItem
        ? eventTypeService.update(editingItem.id, values)
        : eventTypeService.create(values),
    onSuccess: () => {
      notification.success({ message: 'Success', description: `Event type ${editingItem ? 'updated' : 'created'} successfully.` });
      queryClient.invalidateQueries(['adminEventTypes']);
      queryClient.invalidateQueries(['publicEventTypes']);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      notification.error({ message: 'Error', description: err.message || 'Operation failed.' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: eventTypeService.delete,
    onSuccess: () => {
      notification.success({ message: 'Deleted', description: 'Event type soft-deleted.' });
      queryClient.invalidateQueries(['adminEventTypes']);
      queryClient.invalidateQueries(['publicEventTypes']);
    },
  });

  const handleOpenModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
      form.setFieldsValue({ activeStatus: true, displayOrder: (eventTypes?.length || 0) + 1 });
    }
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Preview',
      dataIndex: 'imagePath',
      key: 'imagePath',
      render: (img, record) => (
        <img
          src={img || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80'}
          alt={record.name}
          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ),
    },
    { title: 'Category Name', dataIndex: 'name', key: 'name', render: (n) => <strong style={{ color: '#111827' }}>{n}</strong> },
    { title: 'Code', dataIndex: 'code', key: 'code', render: (c) => <Tag color="purple" style={{ borderRadius: '10px' }}>{c}</Tag> },
    { title: 'Icon Name', dataIndex: 'iconName', key: 'iconName' },
    { title: 'Order', dataIndex: 'displayOrder', key: 'displayOrder' },
    {
      title: 'Active',
      dataIndex: 'activeStatus',
      key: 'activeStatus',
      render: (act) => <Tag color={act ? 'green' : 'red'} style={{ borderRadius: '10px' }}>{act ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined style={{ color: '#7C3AED' }} />} onClick={() => handleOpenModal(record)} />
          <Popconfirm title="Delete Event Type?" onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { isMobile } = useResponsive();

  return (
    <>
      <Helmet><title>Event Types Management | EventEasy</title></Helmet>

      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Event Categories</h1>
            <p style={{ color: '#6B7280', fontSize: isMobile ? '13px' : '14px', margin: '4px 0 0 0' }}>Manage public event offering categories.</p>
          </div>
          <Space wrap style={{ width: isMobile ? '100%' : 'auto', justifyContent: isMobile ? 'flex-start' : 'flex-end', gap: '8px' }}>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              style={{
                borderRadius: '24px',
                height: isMobile ? '36px' : '40px',
                padding: isMobile ? '0 12px' : '0 18px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                borderColor: '#E5E7EB',
              }}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                borderRadius: '24px',
                height: isMobile ? '36px' : '40px',
                padding: isMobile ? '0 16px' : '0 22px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                border: 'none',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
              }}
            >
              Add Event Type
            </Button>
          </Space>
        </div>

        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Table columns={columns} dataSource={eventTypes || []} rowKey="id" loading={isLoading} scroll={{ x: 'max-content' }} />
        </Card>

        <Modal
          title={editingItem ? 'Edit Event Type' : 'Create Event Type'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={(val) => saveMutation.mutate(val)}>
            <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please enter category name' }]}>
              <Input placeholder="e.g. Luxury Wedding" />
            </Form.Item>

            <Form.Item name="code" label="Unique Code (Slug)" rules={[{ required: true, message: 'Please enter category code' }]}>
              <Input placeholder="e.g. wedding" />
            </Form.Item>

            <Form.Item name="iconName" label="Icon Identifier Name">
              <Input placeholder="e.g. favorite, diamond, celebration, cake, business_center" />
            </Form.Item>

            <Form.Item name="imagePath" label="Image Asset URL / Path" rules={[{ required: true, message: 'Please enter image URL' }]}>
              <Input placeholder="e.g. https://images.unsplash.com/photo-..." />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={3} placeholder="Describe the category features..." />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="displayOrder" label="Display Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="activeStatus" label="Active Status" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit" loading={saveMutation.isPending} block style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', marginTop: '12px' }}>
              {editingItem ? 'Update Category' : 'Create Category'}
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminEventTypes;
