import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 Page Not Found | EventEasy</title>
      </Helmet>

      <div style={{ padding: '96px 24px', textAlign: 'center' }}>
        <Result
          status="404"
          title="404"
          subTitle="The luxury page or experience you requested could not be found."
          extra={
            <Button type="primary" onClick={() => navigate(ROUTES.HOME)} style={{ background: '#1E1B4B' }}>
              Return to Homepage
            </Button>
          }
        />
      </div>
    </>
  );
};
