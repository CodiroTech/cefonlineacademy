import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader, getBlogArticles } from '@/lib/api/pageHeaders';
import { getBlogs } from '@/lib/api/academy';
import { mediaUrl } from '@/lib/headless';
import { Blogs } from './blogheader';
import InspiringMindsSection from './blogs';
import { BlogListFromBackend } from './blogList';

const Page = async () => {
  const [header, blogArticles, backendBlogs] = await Promise.all([
    getPageHeader('blogs-page'),
    getBlogArticles(),
    getBlogs(),
  ]);
  const title = header?.title ?? 'Blogs';
  const imageSrc = mediaUrl(header?.['header-image']) || '/Blogs.png';
  const inspiringArticles = blogArticles.map((a) => ({
    title: a.title ?? '',
    description: a.description ?? '',
    author: a.author ?? '',
    image: mediaUrl(a.image) || '/placeholder-course.png',
  }));

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <Blogs />
      {backendBlogs.length > 0 && <BlogListFromBackend blogs={backendBlogs} />}
      <InspiringMindsSection articles={inspiringArticles.length > 0 ? inspiringArticles : undefined} />
    </div>
  );
}

export default Page;
