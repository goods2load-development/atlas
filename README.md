# Goods2load Frontend

## Description

Goods2Load is a project designed for logistics and freight management. Built with Next.js, it leverages a modern tech stack to enhance performance and developer experience.

# Installation and Setup

## Prerequisites

Node.js (recommended version: 18 or higher)

## Getting Started

### Clone the repository:

```bash
    git clone https://github.com/digitalityagency/goods2load-FE.git
    cd goods2load
```

### Install dependencies:

```bash
    npm install
```

### Start the development server:

```bash
    npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# CI/CD

## GitHub Actions Configuration

### The CI/CD pipeline is managed using GitHub Actions. It is triggered automatically on:

- Pushes to the development branch.
- Pull requests targeting the development branch.

### Key Features

- Linting, TypeScript type checking, and code formatting.
- Build process to prepare the project for deployment.
- Automatic addition of the sitemap.xml file to version control.

## Workflow Details

### Here is an overview of the GitHub Actions configuration:

```bash
name: CI/CD

on:
  push:
    branches:

- development
    pull_request:
      branches:
- development

jobs:
 build:
 runs-on: ubuntu-latest

    env:
      NEXT_PUBLIC_BASE_URL: 'https://api.dev.goods2load.com/'
      NEXT_PUBLIC_CLIENT_URL: 'http://localhost:3000'

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run lint
        run: npm run lint

      - name: Build project
        run: npm run build
```

## Husky Configuration

### Format code

```bash
yarn format
git add .

### Check TypeScript types

yarn tsc --noEmit

### Build the project

yarn build
git add public/sitemap.xml

### Run lint-staged to lint only staged files

npx lint-staged

```

## Notes

- The GitHub Actions pipeline ensures a consistent development workflow by running automated tasks on every push and pull request.
- The Husky hooks prevent invalid or unformatted code from being committed, maintaining code quality throughout the project.

# You need those variables in your env:

1. **NEXT_PUBLIC_BASE_URL**
2. **NEXTAUTH_URL**
3. **GOOGLE_CLIENT_ID**
4. **GOOGLE_CLIENT_SECRET**
5. **AUTH_SECRET**
6. **WEGLOT_API_KEY**
7. **NEXT_PUBLIC_KEY_GET_GEOLOCATION**
8. **NEXT_PUBLIC_GOOGLE_API_KEY**
9. **NEXT_PUBLIC_TINY_KEY**
10. **JWT_ACCESS_SECRET**
11. **NEXT_PUBLIC_CLIENT_URL**
12. **NEXT_PUBLIC_AVIATION_EDGE_API_KEY**
13. **NEXT_PUBLIC_DATALASTIC_API_KEY**
14. **NEXT_PUBLIC_GEONAMES_API_KEY**

# Project Information

- Staging: Hosted on https://stage.goods2load.com
- Development: Hosted on https://dev.goods2load.com

# Styles and Project Architecture

## Component Organization

- \_components/: Contains reusable UI components like buttons, modals, navigation menus, etc.
- app/: Standard Next.js page structure where each file represents a route.
- hooks/: Custom React hooks for managing state and side effects.
- interfaces/: This folder defines TypeScript interfaces used throughout the application to ensure strong typing and consistency across the project.
- lib/utils/: Utility functions and helpers used throughout the application.
- lib/: Context providers for managing global state across the app.

## Styling Technologies

### Tailwind CSS

- tailwind.config.js: Contains the Tailwind CSS configuration, where custom colors, spacing, and themes are defined.

### Tailwind Plugins:

- tailwindcss-animate: Used for animations in the application.
- tailwindcss-scoped-groups: Provides scoped styling for groups of elements.
- tailwind-merge: Ensures class name merging in Tailwind, avoiding duplication.

## Key Configuration Files

### Here are the main configuration files found in the project:

- next.config.js: Configuration for the Next.js application, including custom webpack settings, environmental variables, and build configurations.
- tailwind.config.js: The configuration file for Tailwind CSS, defining custom themes, colors, spacing, and breakpoints.
- tsconfig.json: TypeScript configuration file, setting up paths and compiler options.
- .eslintrc.json: ESLint configuration for code linting and style checks.
- .prettierrc: Prettier configuration for consistent code formatting.

## Project Dependencies

### The project leverages a wide range of dependencies and libraries, such as:

- next-auth: For user authentication and session management.
- react-hook-form: A popular library for managing form state and validation.
- @radix-ui/react-\*: Provides accessible UI components for building complex UIs, like dropdowns, modals, and tooltips.
- axios: For making HTTP requests throughout the application.
- zod: A TypeScript-first schema validation library for data validation and type checking.

## Development Tools

- husky: Ensures that Git hooks are in place, such as pre-commit and pre-push hooks for formatting, linting, and type-checking before pushing changes.
- lint-staged: Lints only the staged files during commits to save time and ensure only the necessary files are checked.
- prettier: Code formatting tool to maintain consistent code style.

## Deployment

### Development (dev):

- The development environment is deployed to Vercel.
- Vercel automatically detects changes pushed to the development branch and triggers a deployment.
- The application is accessible via the Vercel-provided URL for the development environment, ensuring that every update pushed to the development branch is reflected in real-time.

### Staging (stage):

- The staging environment is deployed on a Google Cloud VM instance.
- The staging version is tied to the stage branch in the project repository.
- Changes pushed to the stage branch do not automatically trigger a deployment. Instead, a manual process is required.
- To deploy the latest changes to the staging environment, you need to manually log in to the Google Cloud VM and run git pull to fetch the latest changes.
- After pulling the changes, you must manually rebuild the project (usually with a command like npm run build or similar, depending on your project configuration).
- Once the build is complete, the staging environment is updated and accessible via a custom domain. This setup ensures that staging-specific changes and features can be tested before they are deployed to production.
