import React from 'react';
import { Result, Button } from 'antd';

/**
 * Reusable error state display widget.
 */
export const ErrorState = ({ title = 'Something went wrong', subTitle = 'An error occurred while loading this page section.', onRetry }) => {
  return (
    <div style={{ padding: '48px 24px' }}>
      <Result
        status="error"
        title={title}
        subTitle={subTitle}
        extra={
          onRetry && (
            <Button type="primary" onClick={onRetry} style={{ background: '#1E1B4B' }}>
              Try Again
            </Button>
          )
        }
      />
    </div>
  );
};
