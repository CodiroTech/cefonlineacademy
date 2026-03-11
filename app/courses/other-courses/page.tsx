import React from 'react';
import { CourseFiltersProvider } from '@/app/courses/quran-tutoring-courses/CourseFiltersContext';
import TajweedCoursesSection from '@/app/courses/quran-tutoring-courses/tutorcourse';
import OtherCoursesIntroSection from './course';

const Page = async () => {
  return (
    <div>
      <CourseFiltersProvider>
        <OtherCoursesIntroSection />
        <TajweedCoursesSection categoryType={2} fallbackSectionTitle="Other Courses" />
      </CourseFiltersProvider>
    </div>
  );
}

export default Page;
