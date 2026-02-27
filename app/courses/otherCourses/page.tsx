import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import QuranTutoringCoursesSection from './course';
import CharacterProgram from './charProgram';

const Page = async () => {
  const header = await getPageHeader('other-courses-page');
  const title = header?.title ?? 'Other Courses';
  const imageSrc = mediaUrl(header?.['header-image']) || '/Other Courses.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <QuranTutoringCoursesSection />
      <CharacterProgram />
    </div>
  );
}

export default Page;
