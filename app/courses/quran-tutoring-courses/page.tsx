import React from 'react';
import { CourseFiltersProvider } from './CourseFiltersContext';
import QuranTutoringCoursesSection from './course';
import TajweedCoursesSection from './tutorcourse';

const Page = async () => {
  return (
    <div>
      <CourseFiltersProvider>
        <QuranTutoringCoursesSection />
        <TajweedCoursesSection />
      </CourseFiltersProvider>
    </div>
  );
}

export default Page;
