import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { OurPrograms } from './ourPrograms';

const AboutPage = () => {
  return (
    <div>
      <AboutHeader title="Our Accreditations" imageSrc="/About Us Header.png" />
      <OurPrograms />
    </div>
  );
}

export default AboutPage;
