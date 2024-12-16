import dotenv from 'dotenv';
import fs from 'fs';
import * as glob from 'glob';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    throw new Error('Failed to fetch SEO pages');
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
    return null;
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

const generateSitemap = async () => {
  const pages = await getAppPages();

  // Generate XML Sitemap
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map(
            (page) => `
            <url>
                <loc>${`https://goods2load.com${page.url}`}</loc>
                ${page.updatedAt ? `<lastmod>${page.updatedAt}</lastmod>` : ''}
            </url>`,
          )
          .join('')}
    </urlset>`;

  fs.writeFileSync(
    path.join(__dirname, 'public', 'sitemap.xml'),
    sitemapContent,
  );

  // Generate JSON Sitemap
  const groupedSitemapJson = pages.reduce((acc, page) => {
    if (!page.category) return acc;
    if (!acc[page.category]) acc[page.category] = [];
    acc[page.category || 'other'].push({
      url: `https://goods2load.com${page.url}`,
      cateogry: page.category,
      subCategory: page.subCategory,
      title: page.title,
      lastmod: page.updatedAt,
    });
    return acc;
  }, {});

  fs.writeFileSync(
    path.join(__dirname, 'public', 'sitemap.json'),
    JSON.stringify(groupedSitemapJson, null, 2),
  );
};

try {
  await generateSitemap();
  console.log('Sitemap generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
