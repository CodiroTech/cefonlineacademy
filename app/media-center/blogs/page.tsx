import React from 'react';
import { getBlogArticles } from '@/lib/api/pageHeaders';
import { getBlogs } from '@/lib/api/academy';
import { mediaUrl, stripHtml } from '@/lib/headless';
import { Blogs } from './blogheader';
import InspiringMindsSection from './blogs';

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

  const latestFromBlogArticles =
    backendBlogs.length > 0
      ? backendBlogs.map((b) => ({
          title: b.title ?? '',
          description: stripHtml(b.excerpt ?? b.content ?? ''),
          author: b.author ?? '',
          image: b.image_url ?? '/placeholder-course.png',
        }))
      : null;

  return (
    <div>
      <Blogs />
      {latestFromBlogArticles && latestFromBlogArticles.length > 0 && (
        <section className="w-full px-4 lg:px-12 pt-8 font-poppins">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#065D80] mb-6">
              Latest from the blog
            </h2>
            <InspiringMindsSection articles={latestFromBlogArticles} />
          </div>
        </section>
      )}
      {inspiringArticles.length > 0 && (
        <InspiringMindsSection articles={inspiringArticles} />
      )}
    </div>
  );
}

export default Page;
