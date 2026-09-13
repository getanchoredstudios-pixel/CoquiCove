# Coquí Cove

Boutique tropical glamping landing page for Coquí Cove in Trujillo Alto, Puerto Rico. Imported from the selected Claude design in Arena, preserving the original React components, styling, photography, animations, gallery, FAQ, and booking modal.

## Run locally

Use Node.js 22.12+.

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static host. Vite bundles the application into a single HTML file; images and Google Fonts are loaded remotely.

## Edit the website

- `src/lib/site.ts`: copy, photo references, navigation, and FAQ content.
- `src/index.css`: colors, typography, and animation styles.
- `src/sections/`: page sections.
- `src/components/`: availability form and booking modal.
- `src/lib/booking.ts`: booking and analytics integration points.
- `index.html`: SEO and social metadata.

## Before accepting real bookings

This is the original design prototype, not an operating reservation system. `submitInquiry` currently simulates success without sending or storing an inquiry. Connect a real booking/CRM endpoint and handle server errors before making the form available to guests.

Confirm the contact email, placeholder phone number, social links, domain/canonical URL, property amenities, travel estimates, policies, and other business claims. Replace stock photography with approved property photos. The testimonial areas are placeholders for verified guest stories. Policy links currently point to the FAQ and need actual policy content before launch.

Analytics hooks are present; no analytics account or booking provider is configured. No hosting deployment is configured by this import.
