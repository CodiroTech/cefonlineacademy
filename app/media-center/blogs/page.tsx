import React from 'react';
import { getBlogArticles } from '@/lib/api/pageHeaders';
import { getBlogs } from '@/lib/api/academy';
import { mediaUrl } from '@/lib/headless';
import { Blogs } from './blogheader';
import InspiringMindsSection from './blogs';
import { BlogListFromBackend } from './blogList';

const Page = async () => {
  const [blogArticles, backendBlogs] = await Promise.all([
    getBlogArticles(),
    getBlogs(),
  ]);
  const inspiringArticles = blogArticles.map((a) => ({
    title: a.title ?? '',
    description: a.description ?? '',
    author: a.author ?? '',
    image: mediaUrl(a.image) || '/placeholder-course.png',
  }));

  return (
    <div>
      <Blogs />
      {backendBlogs.length > 0 && <BlogListFromBackend blogs={backendBlogs} />}
      <InspiringMindsSection articles={inspiringArticles.length > 0 ? inspiringArticles : undefined} />
    </div>
  );
}

export default Page;
