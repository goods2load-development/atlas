// generate-sitemap.js
import dotenv from 'dotenv';
import fs from 'fs';
// To handle __dirname
import * as glob from 'glob';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Derive __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to fetch all blog posts
const getAllBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/blogs`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

const getSeoPagesUrls = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/seo-pages/urls`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  return response.json();
};

const getCategory = (url) => {
  if (url.includes('partners')) {
    return 'partners';
  } else if (url.includes('blog')) {
    return 'blog';
  } else if (url === '') {
    return 'home';
  } else if (
    ['terms-of-service', 'privacy-policy', 'cookie-policy'].includes(url)
  ) {
    return 'legacy';
  } else if (url.includes('about-us')) {
    return 'about';
  } else if (url.includes('sitemap')) {
    return 'sitemap';
  } else if (url.includes('help')) {
    return 'help';
  } else if (url.includes('sign-in')) {
    return 'sign-in';
  } else if (url.includes('registration')) {
    return 'sign-up';
  } else if (url.includes('career')) {
    return 'career';
  } else {
    return 'other';
  }
};

export const formatUrlToText = (url) => {
  if (url === '') return 'Home page';
  const lastSegment = url.substring(url.lastIndexOf('/') + 1);

  const formattedText = lastSegment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedText;
};

const getAppPages = async () => {
  const pagesDir = path.join(__dirname, 'app');
  const files = glob.sync('**/page.{js,ts,tsx}', { cwd: pagesDir });

  const [blogs, seoPages] = await Promise.all([
    getAllBlogs(),
    getSeoPagesUrls(),
  ]);
  const blogsUrls = blogs.data.map((post) => `blog/${post.slug}`);
  const seoPagesUrls = seoPages.map((item) => ({
    url: `/${item.slug}`,
    updatedAt: new Date().toISOString(),
    category: 'seo-page',
    subCategory: item.category.name,
    title: item.title,
  }));

  const pages = [...files, ...blogsUrls]
    .filter((file) => !file.includes('[') && !file.includes('dashboard'))
    .map((file) => {
      const url = file.replace(/page\.(ts|tsx|js)$/, '');
      const formattedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
      return {
        url: `/${formattedUrl}`,
        updatedAt: new Date().toISOString(),
        category: getCategory(formattedUrl),
        title: formatUrlToText(formattedUrl),
      };
    });

  return [...pages, ...seoPagesUrls];
};

// Function to generate sitemap
const generateSitemap = async () => {
  const pages = await getAppPages();
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap-image/1.1">
        ${pages
          .map(
            (page) => `
            <url>
                <loc>${`https://goods2load.com${page.url}`}</loc>
                <lastmod>${page.updatedAt}</lastmod>
                ${page.category ? `<category>${page.category}</category>` : ''}
                ${page.subCategory ? `<subcategory>${page.subCategory}</subcategory>` : ''}
                ${page.title ? `<title>${page.title}</title>` : ''}
            </url>`,
          )
          .join('')}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, 'public', 'sitemap.xml'),
    sitemapContent,
  );
};

// Execute the sitemap generation
try {
  await generateSitemap();
  console.log('Sitemap generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
