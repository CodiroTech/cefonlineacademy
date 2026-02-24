import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import CourseDescriptionSection from './description';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Course Description" imageSrc="/1.png" />
      <CourseDescriptionSection />
      
    </div>
  );
}

export default Page;
