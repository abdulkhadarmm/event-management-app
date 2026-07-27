import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Card, Button, Modal, Form, Input, InputNumber, Switch, Tag, Space, notification, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { galleryService } from '../../../services/galleryService';

const { TextArea } = Input;

export const AdminGallery = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const { data: celebrations, isLoading, refetch } = useQuery({
    queryKey: ['adminGallery'],
    queryFn: galleryService.getAllGalleryItems,
  });

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editingItem
        ? galleryService.update(editingItem.id, values)
        : galleryService.create(values),
    onSuccess: () => {
      notification.success({ message: 'Success', description: `Celebration ${editingItem ? 'updated' : 'created'} successfully.` });
      queryClient.invalidateQueries(['adminGallery']);
      queryClient.invalidateQueries(['publicGallery']);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      notification.error({ message: 'Error', description: err.message || 'Operation failed.' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: galleryService.delete,
    onSuccess: () => {
      notification.success({ message: 'Deleted', description: 'Celebration soft-deleted.' });
      queryClient.invalidateQueries(['adminGallery']);
      queryClient.invalidateQueries(['publicGallery']);
    },
  });

  const handleOpenModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
      form.setFieldsValue({ activeStatus: true, displayOrder: (celebrations?.length || 0) + 1, year: new Date().getFullYear().toString() });
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
          alt={record.title}
          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
        />
      ),
    },
    { title: 'Title', dataIndex: 'title', key: 'title', render: (t) => <strong style={{ color: '#111827' }}>{t}</strong> },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (c) => <Tag color="purple" style={{ borderRadius: '10px' }}>{c}</Tag> },
    { title: 'Year', dataIndex: 'year', key: 'year' },
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
          <Popconfirm title="Delete Celebration?" onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Recent Celebrations Management | EventEasy</title></Helmet>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Recent Celebrations Portfolio</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0 0' }}>Add, edit, or toggle portfolio gallery celebrations.</p>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => refetch()} style={{ borderRadius: '20px', height: '40px' }}>Refresh</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', height: '40px', fontWeight: '600' }}
            >
              Add Celebration
            </Button>
          </Space>
        </div>

        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Table columns={columns} dataSource={celebrations || []} rowKey="id" loading={isLoading} />
        </Card>

        <Modal
          title={editingItem ? 'Edit Celebration Item' : 'Create Celebration Item'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={(val) => saveMutation.mutate(val)}>
            <Form.Item name="title" label="Celebration Title" rules={[{ required: true, message: 'Please enter title' }]}>
              <Input placeholder="e.g. Grand Royal Palace Wedding" />
            </Form.Item>

            <Form.Item name="location" label="Venue & Location" rules={[{ required: true, message: 'Please enter location' }]}>
              <Input placeholder="e.g. The Taj Lake Palace, Udaipur" />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="category" label="Category Tag" rules={[{ required: true, message: 'Please enter category' }]}>
                <Input placeholder="e.g. Luxury Wedding, Corporate Gala" />
              </Form.Item>

              <Form.Item name="year" label="Celebration Year" rules={[{ required: true, message: 'Please enter year' }]}>
                <Input placeholder="e.g. 2026" />
              </Form.Item>
            </div>

            <Form.Item name="imagePath" label="Image Asset URL / Path" rules={[{ required: true, message: 'Please enter image URL' }]}>
              <Input placeholder="e.g. https://images.unsplash.com/photo-..." />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="displayOrder" label="Display Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="activeStatus" label="Active Visibility" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit" loading={saveMutation.isPending} block style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', marginTop: '12px' }}>
              {editingItem ? 'Update Celebration' : 'Create Celebration'}
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminGallery;
