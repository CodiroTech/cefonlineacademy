import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import QuranTutoringCoursesSection from './course';
import TajweedCoursesSection from './tutorcourse';
import FahmHifdhCoursesSection from './fahmhifdh';


const Page = () => {
  return (
    <div>
      <AboutHeader title="Quran Tutoring Courses" imageSrc="/Quran Tutoring.png" />
      <QuranTutoringCoursesSection />
      <TajweedCoursesSection />
      <FahmHifdhCoursesSection />

    </div>
  );
}

export default Page;
