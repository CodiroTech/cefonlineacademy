import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { UpcomingCourses } from './upcomingcourses';
import { OurCourses } from './courses';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Upcoming Courses & Sessions" imageSrc="/Upcoming.png" />
      <UpcomingCourses />
      <OurCourses />
    </div>
  );
}

export default Page;
