import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { designTokens } from '../theme/designTokens';

/**
 * Administrator Login Page component matching project design language:
 * - NO pre-filled credentials
 * - NO seed credentials box
 * - NO icon on Sign In button
 * - Styled with dark pill CTA button (#0F172A) and clean inputs
 */
export const AdminLogin = () => {
  const [form] = Form.useForm();
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (values) => {
    setLocalError(null);
    try {
      await login(values);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (err) {
      setLocalError(err.message || 'Invalid administrator email or password.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Portal Login | EventEasy</title>
      </Helmet>

      <div>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              fontFamily: designTokens.typography.fontDisplay,
              fontSize: '28px',
              fontWeight: '800',
              color: '#0F172A',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            Administrator Access
          </h2>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            Enter your credentials to access the EventEasy analytics portal.
          </p>
        </div>

        {(error || localError) && (
          <Alert
            message="Authentication Failed"
            description={localError || error}
            type="error"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '12px' }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>Email Address</span>}
            rules={[
              { required: true, message: 'Please enter your admin email address' },
              { type: 'email', message: 'Please enter a valid email format' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#94A3B8', marginRight: '6px' }} />}
              placeholder="Enter your administrator email"
              size="large"
              style={{ height: '48px', borderRadius: '12px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontWeight: '700', color: '#334155' }}>Password</span>}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#94A3B8', marginRight: '6px' }} />}
              placeholder="Enter your password"
              size="large"
              style={{ height: '48px', borderRadius: '12px' }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            block
            className="btn-animated"
            size="large"
            style={{
              height: '48px',
              fontSize: '15px',
              fontWeight: '700',
              borderRadius: '9999px',
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              marginTop: '16px',
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.2)',
            }}
          >
            Sign In to Dashboard
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AdminLogin;
