import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import { CourseFiltersProvider } from '@/app/courses/quran-tutoring-courses/CourseFiltersContext';
import TajweedCoursesSection from '@/app/courses/quran-tutoring-courses/tutorcourse';
import OtherCoursesIntroSection from './course';

const Page = async () => {
  const header = await getPageHeader('other-courses-page');
  const title = header?.title ?? 'Other Courses';
  const imageSrc = mediaUrl(header?.['header-image']) || '/Other Courses.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <CourseFiltersProvider>
        <OtherCoursesIntroSection />
        <TajweedCoursesSection categoryType={2} fallbackSectionTitle="Other Courses" />
      </CourseFiltersProvider>
    </div>
  );
}

export default Page;
