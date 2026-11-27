# Veya

Veya is a responsive online shop built for the Noroff JavaScript Frameworks course assignment. This repository is named `FED2-JSF-CA`.

[Open Veya on Netlify](https://hallsi90-fed2-jsf-ca-veya-online-shop.netlify.app/)

## Features

- Browse products, search by title and sort by selling price.
- Open product details to see images, ratings, tags and customer reviews where available.
- Add and remove items, edit quantities and see the updated total and cart count. The cart is saved in the current browser.
- Complete checkout to see a confirmation and clear the cart.
- Validate the contact form and see feedback for each invalid field.
- See feedback for pending requests, API errors, unavailable products and searches without matches.

## Getting started

Use Node.js 22.19.0 and npm. Run these commands in your terminal.

```bash
git clone https://github.com/hallsi90/FED2-JSF-CA.git
cd FED2-JSF-CA
npm ci
npm run dev
```

Open the local URL printed by Vite.

| Command           | Purpose                                                           |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Start the development server.                                     |
| `npm run lint`    | Run ESLint.                                                       |
| `npm test`        | Run the Vitest suite once.                                        |
| `npm run build`   | Run the TypeScript checks and build the site into `dist/`.        |
| `npm run preview` | Serve the production build locally after running `npm run build`. |

The automated tests cover product image alternative text, contact validation rules, cart quantities and totals, and the shopping flow from search to checkout.

## Technology choices

- **React and TypeScript** for reusable UI components and explicit types for products, component props and cart state.
- **Vite and Tailwind CSS** for the development server, production build and responsive styling.
- **React Router** for the catalogue, product details, cart, checkout confirmation and contact routes.
- **Zustand** for shared cart state and browser storage.
- **React Hook Form and Zod** for contact form state and validation.
- **Vitest and React Testing Library** for automated checks and **ESLint** for linting.

## Product data

The catalogue uses `GET /online-shop` with pagination, and each detail page uses `GET /online-shop/<id>`. Product data and image URLs come from the [Noroff v2 Online Shop API](https://docs.noroff.dev/docs/v2/basic/online-shop).

## Deployment

Netlify serves the Vite build from `dist/`. The configuration in `public/_redirects` lets the browser open or refresh a direct app route, such as a product page.

## Limitations

- Checkout is simulated. It clears the local cart and shows a confirmation. It does not process payments or create orders.
- The contact form validates input in the browser. Its submission is simulated and no message is sent.
- Prices are displayed in NOK as a project convention. The API does not provide a currency field.
- The dependency audit on 24 November 2026 flagged a moderate advisory for `minimatch` through the development dependency `typescript-eslint`.

## AI usage

See [AI_LOG.md](./AI_LOG.md) for the project's AI usage record.
