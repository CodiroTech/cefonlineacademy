import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { Testimonials } from './testimonials';
import { StudentTestimonials } from './student';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Testimonials" imageSrc="/Testimonials.png" />
      <Testimonials />
      <StudentTestimonials />
    </div>
  );
}

export default Page;
