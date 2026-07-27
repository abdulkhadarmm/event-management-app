import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>403 Access Denied | EventEasy</title>
      </Helmet>

      <div style={{ padding: '96px 24px', textAlign: 'center' }}>
        <Result
          status="403"
          title="403 - Access Denied"
          subTitle="You do not possess the required administrator privileges to access this area."
          extra={
            <Button type="primary" onClick={() => navigate(ROUTES.ADMIN_LOGIN)} style={{ background: '#1E1B4B' }}>
              Sign in as Admin
            </Button>
          }
        />
      </div>
    </>
  );
};
