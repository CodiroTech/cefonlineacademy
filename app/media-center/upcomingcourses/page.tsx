import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader, getUpcomingSection } from '@/lib/api/pageHeaders';
import { getUpcomingCourses } from '@/lib/api/academy';
import { mediaUrl } from '@/lib/headless';
import { UpcomingCourses } from './upcomingcourses';
import { OurCourses } from './courses';

const Page = async () => {
  const [header, section, courses] = await Promise.all([
    getPageHeader('upcoming-courses-page'),
    getUpcomingSection(),
    getUpcomingCourses(6),
  ]);
  const title = header?.title ?? 'Upcoming Courses & Sessions';
  const imageSrc = mediaUrl(header?.['header-image']) || '/Upcoming.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <UpcomingCourses section={section} />
      <OurCourses courses={courses} />
    </div>
  );
}

export default Page;
