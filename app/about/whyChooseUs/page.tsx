import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { ChooseUs } from './chooseUs'
import { HallmarksOfExcellence } from '@/components/common/excellence'

const AboutPage = () => {
  return (
    <div>
      <AboutHeader title="Hallmarks of Excellence" imageSrc="/About Us Header.png"  />
      <ChooseUs /> 
      <HallmarksOfExcellence />
    </div>
  );
}

export default AboutPage;
