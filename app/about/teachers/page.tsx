import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { MeetOurTeachersSection } from './MeetOurTeachersSection';

const AboutPage = () => {
  return (
    <div>
      <AboutHeader title="Our Esteemed Teachers" imageSrc="/About Us Header.png" />
      <MeetOurTeachersSection />
    </div>
  );
}

export default AboutPage;
