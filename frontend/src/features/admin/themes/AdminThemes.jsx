import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Card, Button, Modal, Form, Input, InputNumber, Switch, Tag, Space, notification, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { themeService } from '../../../services/themeService';

const { TextArea } = Input;

// Default palette map for themes
const defaultPaletteMap = {
  'Midnight Opulence': ['#1E1B4B', '#D97706', '#059669', '#F59E0B'],
  'Boho Botanical Garden': ['#059669', '#D97706', '#7C3AED', '#10B981'],
  'Monochrome Modernist': ['#0F172A', '#64748B', '#94A3B8', '#F8FAFC'],
  'Sunset Velvet Glow': ['#D97706', '#B45309', '#7C3AED', '#F59E0B'],
};

// Default image map for themes
const defaultImageMap = {
  'Midnight Opulence': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  'Boho Botanical Garden': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
  'Monochrome Modernist': 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
  'Sunset Velvet Glow': 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
};

export const AdminThemes = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const { data: themes, isLoading, refetch } = useQuery({
    queryKey: ['adminThemes'],
    queryFn: themeService.getAllThemes,
  });

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editingItem
        ? themeService.update(editingItem.id, values)
        : themeService.create(values),
    onSuccess: () => {
      notification.success({ message: 'Success', description: `Theme ${editingItem ? 'updated' : 'created'} successfully.` });
      queryClient.invalidateQueries(['adminThemes']);
      queryClient.invalidateQueries(['publicThemes']);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      notification.error({ message: 'Error', description: err.message || 'Operation failed.' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: themeService.delete,
    onSuccess: () => {
      notification.success({ message: 'Deleted', description: 'Theme soft-deleted.' });
      queryClient.invalidateQueries(['adminThemes']);
      queryClient.invalidateQueries(['publicThemes']);
    },
  });

  const handleOpenModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        imagePath: record.imagePath && record.imagePath.startsWith('http') ? record.imagePath : defaultImageMap[record.name] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        accentColor: record.accentColor && record.accentColor.includes(',') ? record.accentColor : (defaultPaletteMap[record.name] || ['#1E1B4B', '#D97706', '#059669', '#F59E0B']).join(', '),
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        activeStatus: true,
        displayOrder: (themes?.length || 0) + 1,
        accentColor: '#1E1B4B, #D97706, #059669, #F59E0B',
      });
    }
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Preview',
      dataIndex: 'imagePath',
      key: 'imagePath',
      render: (img, record) => {
        const validSrc = (img && img.startsWith('http'))
          ? img
          : (defaultImageMap[record.name] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=80');

        return (
          <img
            src={validSrc}
            alt={record.name}
            style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
          />
        );
      },
    },
    { title: 'Theme Name', dataIndex: 'name', key: 'name', render: (n) => <strong style={{ color: '#111827' }}>{n}</strong> },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (c) => <Tag color="purple" style={{ borderRadius: '10px' }}>{c}</Tag> },
    {
      title: 'Color Palette Swatches',
      dataIndex: 'accentColor',
      key: 'accentColor',
      render: (hexString, record) => {
        let hexList = [];
        if (hexString && hexString.includes(',')) {
          hexList = hexString.split(',').map((h) => h.trim());
        } else if (hexString && hexString.startsWith('#')) {
          hexList = [hexString, '#D97706', '#059669', '#F59E0B'];
        } else {
          hexList = defaultPaletteMap[record.name] || ['#1E1B4B', '#D97706', '#059669', '#F59E0B'];
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {hexList.map((hex, idx) => (
              <div
                key={idx}
                title={hex}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: hex,
                  border: '1.5px solid #FFFFFF',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                }}
              />
            ))}
          </div>
        );
      },
    },
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
          <Popconfirm title="Delete Theme?" onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Event Themes Management | EventEasy</title></Helmet>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Design Themes</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0 0' }}>Manage signature visual design themes and color palettes.</p>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => refetch()} style={{ borderRadius: '20px', height: '40px' }}>Refresh</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', height: '40px', fontWeight: '600' }}
            >
              Add Theme
            </Button>
          </Space>
        </div>

        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Table columns={columns} dataSource={themes || []} rowKey="id" loading={isLoading} />
        </Card>

        <Modal
          title={editingItem ? 'Edit Event Theme' : 'Create Event Theme'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={(val) => saveMutation.mutate(val)}>
            <Form.Item name="name" label="Theme Name" rules={[{ required: true, message: 'Please enter theme name' }]}>
              <Input placeholder="e.g. Midnight Opulence" />
            </Form.Item>

            <Form.Item name="category" label="Category Classification" rules={[{ required: true, message: 'Please enter category' }]}>
              <Input placeholder="e.g. Luxury Gala & Weddings" />
            </Form.Item>

            <Form.Item name="accentColor" label="Color Palette (Hex values separated by comma)">
              <Input placeholder="e.g. #1E1B4B, #D97706, #059669, #F59E0B" />
            </Form.Item>

            <Form.Item name="imagePath" label="Image Asset URL / Path" rules={[{ required: true, message: 'Please enter image URL' }]}>
              <Input placeholder="e.g. https://images.unsplash.com/photo-..." />
            </Form.Item>

            <Form.Item name="description" label="Visual Atmosphere Overview">
              <TextArea rows={3} placeholder="Describe the ambiance, lighting, floral arrangements, and aesthetic feel..." />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="displayOrder" label="Display Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item name="activeStatus" label="Active Availability" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit" loading={saveMutation.isPending} block style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', marginTop: '12px' }}>
              {editingItem ? 'Update Theme' : 'Create Theme'}
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminThemes;
