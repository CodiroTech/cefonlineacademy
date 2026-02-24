import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { VisionMissionValues } from './VisionMissionValues';
import { OurStorySection } from './story';

const AboutPage = () => {
  return (
    <div>
      <AboutHeader title="About Us" imageSrc="/About Us Header.png" headingOffset="22%" />
      <OurStorySection />
      <VisionMissionValues />
      
    </div>
  );
}

export default AboutPage;
