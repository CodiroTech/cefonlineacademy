import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import { CourseFiltersProvider } from './CourseFiltersContext';
import QuranTutoringCoursesSection from './course';
import TajweedCoursesSection from './tutorcourse';

const Page = async () => {
  const header = await getPageHeader('quran-tutoring-courses-page');
  const title = header?.title ?? 'Quran Tutoring Courses';
  const imageSrc = mediaUrl(header?.['header-image']) || '/Quran Tutoring.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <CourseFiltersProvider>
        <QuranTutoringCoursesSection />
        <TajweedCoursesSection />
      </CourseFiltersProvider>
    </div>
  );
}

export default Page;
