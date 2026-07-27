import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSlider } from '../features/home/HeroSlider';
import { ServicesPreview } from '../features/home/ServicesPreview';
import { PackagesPreview } from '../features/home/PackagesPreview';
import { CommunitySection } from '../features/home/CommunitySection';
import { ThemesPreview } from '../features/home/ThemesPreview';
import { GalleryPreview } from '../features/home/GalleryPreview';
import { Testimonials } from '../features/home/Testimonials';
import { FAQSection } from '../features/home/FAQSection';
import { ContactCTA } from '../features/home/ContactCTA';

/**
 * EventEasy Home Page assembling full-screen hero slider and feature sections.
 */
export const Home = () => {
  return (
    <>
      <Helmet>
        <title>EventEasy | Modern Event Architecture & Platform</title>
        <meta
          name="description"
          content="EventEasy curates bespoke weddings, corporate galas, milestone anniversaries, and VIP celebrations."
        />
      </Helmet>

      <div>
        <HeroSlider />
        <ServicesPreview />
        <PackagesPreview />
        <CommunitySection />
        <ThemesPreview />
        <GalleryPreview />
        <Testimonials />
        <FAQSection />
        <ContactCTA />
      </div>
    </>
  );
};

export default Home;
