import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Table, Card, Button, Modal, Form, Input, InputNumber, Switch, Tag, Space, notification, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { packageService } from '../../../services/packageService';
import { formatCurrency } from '../../../utils/formatters';

const { TextArea } = Input;

export const AdminPackages = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const { data: packages, isLoading, refetch } = useQuery({
    queryKey: ['adminPackages'],
    queryFn: packageService.getAllPackages,
  });

  const saveMutation = useMutation({
    mutationFn: (values) =>
      editingItem
        ? packageService.update(editingItem.id, values)
        : packageService.create(values),
    onSuccess: () => {
      notification.success({ message: 'Success', description: `Package ${editingItem ? 'updated' : 'created'} successfully.` });
      queryClient.invalidateQueries(['adminPackages']);
      queryClient.invalidateQueries(['publicPackages']);
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      notification.error({ message: 'Error', description: err.message || 'Operation failed.' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: packageService.delete,
    onSuccess: () => {
      notification.success({ message: 'Deleted', description: 'Package soft-deleted.' });
      queryClient.invalidateQueries(['adminPackages']);
      queryClient.invalidateQueries(['publicPackages']);
    },
  });

  const handleOpenModal = (record = null) => {
    setEditingItem(record);
    if (record) {
      form.setFieldsValue({
        ...record,
        features: record.features || [],
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ activeStatus: true, popularFlag: false, displayOrder: (packages?.length || 0) + 1, features: [] });
    }
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Package Name', dataIndex: 'name', key: 'name', render: (n) => <strong style={{ color: '#111827' }}>{n}</strong> },
    { title: 'Price (INR)', dataIndex: 'price', key: 'price', render: (p) => <strong style={{ color: '#7C3AED' }}>{formatCurrency(p)}</strong> },
    {
      title: 'Popular',
      dataIndex: 'popularFlag',
      key: 'popularFlag',
      render: (pop) => pop ? <Tag color="gold" style={{ borderRadius: '10px' }}>MOST POPULAR</Tag> : <Tag style={{ borderRadius: '10px' }}>Standard</Tag>,
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
          <Popconfirm title="Delete Package?" onConfirm={() => deleteMutation.mutate(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Helmet><title>Event Packages Management | EventEasy</title></Helmet>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Pricing Packages</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0 0' }}>Manage curated service tiers and features in Indian Rupees (₹).</p>
          </div>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => refetch()} style={{ borderRadius: '20px', height: '40px' }}>Refresh</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleOpenModal()}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', height: '40px', fontWeight: '600' }}
            >
              Add Package
            </Button>
          </Space>
        </div>

        <Card style={{ borderRadius: '20px', border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <Table columns={columns} dataSource={packages || []} rowKey="id" loading={isLoading} />
        </Card>

        <Modal
          title={editingItem ? 'Edit Event Package' : 'Create Event Package'}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={640}
        >
          <Form form={form} layout="vertical" onFinish={(val) => saveMutation.mutate(val)}>
            <Form.Item name="name" label="Package Name" rules={[{ required: true, message: 'Please enter package name' }]}>
              <Input placeholder="e.g. Royal Signature Experience" />
            </Form.Item>

            <Form.Item name="subtitle" label="Subtitle Summary">
              <Input placeholder="e.g. Designed for grand weddings & corporate galas" />
            </Form.Item>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="price" label="Base Price (₹)" rules={[{ required: true, message: 'Please enter price' }]}>
                <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g. 450000" />
              </Form.Item>

              <Form.Item name="displayOrder" label="Display Order" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item name="popularFlag" label="Highlight Most Popular" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item name="activeStatus" label="Active Availability" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>

            <Form.Item name="description" label="Detailed Overview">
              <TextArea rows={2} placeholder="Summary of package scope..." />
            </Form.Item>

            {/* Dynamic Package Features List */}
            <h4 style={{ margin: '16px 0 8px 0', color: '#111827' }}>Package Feature Inclusions</h4>
            <Form.List name="features">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'featureName']}
                        rules={[{ required: true, message: 'Feature name required' }]}
                        style={{ width: 340, marginBottom: 0 }}
                      >
                        <Input placeholder="e.g. Up to 300 Guests" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'displayOrder']}
                        initialValue={name + 1}
                        style={{ width: 80, marginBottom: 0 }}
                      >
                        <InputNumber min={0} placeholder="Order" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'activeStatus']}
                        initialValue={true}
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Switch />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} style={{ color: '#EF4444' }} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add({ displayOrder: fields.length + 1, activeStatus: true })} block icon={<PlusOutlined />}>
                      Add Package Feature
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Button type="primary" htmlType="submit" loading={saveMutation.isPending} block style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)', borderRadius: '30px', marginTop: '12px' }}>
              {editingItem ? 'Update Package' : 'Create Package'}
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default AdminPackages;
