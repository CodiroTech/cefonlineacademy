import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { Blogs } from './blogheader';
import InspiringMindsSection from './blogs';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Blogs" imageSrc="/Blogs.png" />
      <Blogs />
      <InspiringMindsSection />
    </div>
  );
}

export default Page;
