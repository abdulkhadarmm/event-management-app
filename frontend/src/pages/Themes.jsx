import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemesPreview } from '../features/home/ThemesPreview';
import { designTokens } from '../theme/designTokens';

export const Themes = () => {
  return (
    <>
      <Helmet>
        <title>Visual Themes | EventEasy</title>
      </Helmet>
      <div style={{ paddingTop: '100px', background: designTokens.colors.bgAlt }}>
        <ThemesPreview />
      </div>
    </>
  );
};

export default Themes;
