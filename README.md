# FED2-JSF-CA

A responsive online shop built for the Noroff JavaScript Frameworks course assignment.

## Project status

The initial project setup is complete. Feature development is in progress.

Planned features include product browsing, product details, search, price sorting, a shopping cart, checkout confirmation and a validated contact form.

## Technologies

- React and TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- React Hook Form and Zod
- ESLint

## Getting started

Requirements: Node.js 22.19.0 and npm, or compatible versions.

1. Clone the repository:

   ```bash
   git clone https://github.com/hallsi90/FED2-JSF-CA.git
   ```

2. Open the project folder:

   ```bash
   cd FED2-JSF-CA
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the development server                   |
| `npm run lint`    | Run ESLint                                     |
| `npm run build`   | Check TypeScript and create a production build |
| `npm run preview` | Preview the production build locally           |

## Deployment

An early version is deployed to Netlify. Feature development is ongoing.

[View Veya](https://hallsi90-fed2-jsf-ca-veya-online-shop.netlify.app/)

## Known issues

A dependency audit reports a moderate-severity vulnerability affecting `minimatch` through `typescript-eslint`. This is being tracked for review before submission.
