import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ServicesPreview } from '../features/home/ServicesPreview';
import { designTokens } from '../theme/designTokens';

/**
 * Services page with 100px top padding ensuring page title sits cleanly below fixed navigation bar.
 */
export const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services | EventEasy</title>
      </Helmet>
      <div style={{ paddingTop: '100px', background: designTokens.colors.bgAlt }}>
        <ServicesPreview />
      </div>
    </>
  );
};

export default Services;
