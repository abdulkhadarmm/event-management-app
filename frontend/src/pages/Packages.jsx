import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PackagesPreview } from '../features/home/PackagesPreview';
import { designTokens } from '../theme/designTokens';

/**
 * Packages page with 100px top padding ensuring page title sits cleanly below fixed navigation bar.
 */
export const Packages = () => {
  return (
    <>
      <Helmet>
        <title>Pricing Packages | EventEasy</title>
      </Helmet>
      <div style={{ paddingTop: '100px', background: designTokens.colors.bg }}>
        <PackagesPreview />
      </div>
    </>
  );
};

export default Packages;
