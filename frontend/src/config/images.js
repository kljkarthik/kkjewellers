/**
 * KK JEWELLERS — Centralized Static Image Configuration
 *
 * All static images live in frontend/public/images/
 * Vite serves the public/ directory verbatim at the site root.
 * Reference these as absolute paths: /images/...
 *
 * DO NOT import files from public/ using JS import statements —
 * use the string paths directly in src attributes and style props.
 *
 * Dynamic product images continue to come from MongoDB → Cloudinary.
 * These constants are for static UI images only.
 */

export const IMAGES = {
  /**
   * Hero & full-bleed background images
   *
   * hero.main   → LuxuryHero background + Bridal campaign banner (1920px)
   * hero.heritage → Heritage/craftsmanship section + Login/AdminLogin BG overlay (1920px)
   */
  hero: {
    main: '/images/hero/hero-bg.jpg',
    heritage: '/images/hero/heritage-bg.jpg',
  },

  /**
   * Signature collection card images (Home page grid)
   */
  collections: {
    bridal:       '/images/collections/collection-bridal.jpg',
    royalGold:    '/images/collections/collection-gold.jpg',
    diamond:      '/images/collections/collection-diamond.jpg',
    contemporary: '/images/collections/collection-contemporary.jpg',
    mens:         '/images/collections/collection-mens.jpg',
  },

  /**
   * Story / editorial section images
   *
   * story.heritage → About Us "Our Story & Heritage" section + Register BG overlay
   */
  story: {
    heritage: '/images/story/showroom.jpg',
  },

  /**
   * Fallback images for broken or missing dynamic content
   *
   * fallback.product → Used when a product/gallery image fails to load.
   *                    The Cloudinary image is always tried first.
   * fallback.logo    → Temporary logo placeholder until backend settings load.
   *                    The actual logo URL comes from the database/admin settings.
   */
  fallback: {
    product: '/images/fallback/product-fallback.jpg',
    logo:    '/images/fallback/product-fallback.jpg',
  },

  /**
   * Auth page background overlays
   * All three use the same heritage image for visual consistency.
   */
  backgrounds: {
    login:      '/images/hero/heritage-bg.jpg',
    adminLogin: '/images/hero/heritage-bg.jpg',
    register:   '/images/story/showroom.jpg',
  },
};
