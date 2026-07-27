import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const CustomerLoginPlaceholder = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '96px 24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <Result
        status="info"
        title="Customer Accounts Not Required"
        subTitle="EventEasy provides direct public event enquiries without mandatory customer registration. If you are a site administrator, please access the Admin Portal."
        extra={[
          <Button type="primary" key="contact" onClick={() => navigate(ROUTES.CONTACT)} style={{ background: '#D97706' }}>
            Submit Event Enquiry
          </Button>,
          <Button key="admin" onClick={() => navigate(ROUTES.ADMIN_LOGIN)}>
            Go to Admin Login
          </Button>,
        ]}
      />
    </div>
  );
};
