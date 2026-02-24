import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { MeetOurSpeakers } from './MeetOurSpeakers';

const AboutPage = () => {
  return (
    <div>
      <AboutHeader title="Our Distinguished Speakers" imageSrc="/About Us Header.png" />
      <MeetOurSpeakers />
    </div>
  );
}

export default AboutPage;
