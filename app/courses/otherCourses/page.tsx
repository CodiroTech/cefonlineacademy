import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import QuranTutoringCoursesSection from './course';
import CharacterProgram from './charProgram';


const Page = () => {
  return (
    <div>
      <AboutHeader title="Other Courses" imageSrc="/Other Courses.png" />
      <QuranTutoringCoursesSection />
      <CharacterProgram />

    </div>
  );
}

export default Page;
