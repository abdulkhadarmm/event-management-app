import { ROUTES } from './routes';

/**
 * Public navigation menu items configuration for EventEasy.
 */
export const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'AI Planner', path: ROUTES.AI_PLANNER, badge: 'AI' },
  { label: 'About Us', path: ROUTES.ABOUT },
  { label: 'Services', path: ROUTES.SERVICES },
  { label: 'Packages', path: ROUTES.PACKAGES },
  { label: 'Themes', path: ROUTES.THEMES },
  { label: 'Gallery', path: ROUTES.GALLERY },
];

/**
 * EventEasy contact details for footer and contact page (India Headquarters).
 */
export const COMPANY_CONTACT = {
  name: 'EventEasy',
  tagline: 'Modern Luxury Event Architecture & Platform',
  email: 'concierge@eventeasy.in',
  phone: '+91 98765 43210',
  address: 'Level 8, Express Towers, Nariman Point, Mumbai, Maharashtra 400021',
  workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM IST',
};
