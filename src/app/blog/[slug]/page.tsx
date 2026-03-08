import React from 'react';
import BlogDetailClient from './BlogDetailClient';

// All blog post slugs — must match the slugs defined in src/app/blog/page.tsx
const blogSlugs = [
  'sylfirm-x-guide',
  'intimate-care-faq',
  'visia-skin-analysis',
  'collagen-boost-2025',
  'real-case-pigmentation',
];

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
