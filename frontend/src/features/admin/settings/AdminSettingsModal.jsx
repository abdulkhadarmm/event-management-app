import React, { useState, useEffect } from 'react';
import { Modal, Tabs, Form, Input, Button, notification, Card } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined, SafetyCertificateOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../../../hooks/useAuth';
import { authService } from '../../../services/authService';
import { storage } from '../../../utils/storage';
import { useAuthStore } from '../../../store/useAuthStore';

/**
 * Executive Admin Account & Security Settings Modal component:
 * Allows administrators to update their login email address, name details,
 * and change account password securely.
 */
export const AdminSettingsModal = ({ open, onClose }) => {
  const { user } = useAuth();
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (open && user) {
      profileForm.setFieldsValue({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
      passwordForm.resetFields();
    }
  }, [open, user, profileForm, passwordForm]);

  const handleUpdateProfile = async (values) => {
    setLoadingProfile(true);
    try {
      const updatedUser = await authService.updateProfile(values);
      storage.setUser(updatedUser);
      useAuthStore.setState({ user: updatedUser });

      notification.success({
        message: 'Profile Updated',
        description: 'Your account email and name details have been updated successfully.',
      });
      onClose();
    } catch (err) {
      notification.error({
        message: 'Update Failed',
        description: err.message || 'Unable to update account profile details.',
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChangePassword = async (values) => {
    setLoadingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      notification.success({
        message: 'Password Changed',
        description: 'Your administrator account password has been changed successfully.',
      });
      passwordForm.resetFields();
      onClose();
    } catch (err) {
      notification.error({
        message: 'Password Change Failed',
        description: err.message || 'Incorrect current password or invalid request.',
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined /> Account Profile & Email
        </span>
      ),
      children: (
        <Form form={profileForm} layout="vertical" onFinish={handleUpdateProfile} style={{ marginTop: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Form.Item
              name="firstName"
              label={<span style={{ fontWeight: '700', color: '#334155' }}>First Name</span>}
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
            </Form.Item>

            <Form.Item
              name="lastName"
              label={<span style={{ fontWeight: '700', color: '#334155' }}>Last Name</span>}
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input prefix={<UserOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>Administrator Email Address</span>}
            rules={[
              { required: true, message: 'Please enter email address' },
              { type: 'email', message: 'Please enter a valid email format' },
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loadingProfile}
            block
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
              borderRadius: '30px',
              height: '44px',
              fontWeight: '700',
              marginTop: '12px',
            }}
          >
            Save Account Details
          </Button>
        </Form>
      ),
    },
    {
      key: 'password',
      label: (
        <span>
          <LockOutlined /> Security & Password
        </span>
      ),
      children: (
        <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword} style={{ marginTop: '16px' }}>
          <Form.Item
            name="currentPassword"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>Current Password</span>}
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>New Password</span>}
            rules={[
              { required: true, message: 'Please enter new password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>Confirm New Password</span>}
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94A3B8' }} />} size="large" style={{ borderRadius: '10px' }} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loadingPassword}
            block
            style={{
              background: '#0F172A',
              borderRadius: '30px',
              height: '44px',
              fontWeight: '700',
              marginTop: '12px',
            }}
          >
            Update Password
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SafetyCertificateOutlined style={{ color: '#7C3AED', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
            Account & Security Settings
          </span>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={520}
      style={{ borderRadius: '20px' }}
    >
      <Tabs defaultActiveKey="profile" items={tabItems} />
    </Modal>
  );
};
