import React from 'react';
import { Helmet } from 'react-helmet-async';
import { GalleryPreview } from '../features/home/GalleryPreview';
import { designTokens } from '../theme/designTokens';

export const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Portfolio Gallery | EventEasy</title>
      </Helmet>
      <div style={{ paddingTop: '100px', background: designTokens.colors.bg }}>
        <GalleryPreview />
      </div>
    </>
  );
};

export default Gallery;
