import React from 'react';
import { OurWeeklySessions } from './weeklylearningSessions';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = async () => {
  return (
    <div>
      <ContentWithSearchSection
        imageSrc="/session.png"
        imageAlt="CEF Online Academy weekly sessions"
        heading="Explore our Weekly Sessions"
        searchPlaceholder="Search Session"
        description={
        <>
        CEF Online Academy’s weekly learning sessions help participants connect revealed knowledge with acquired knowledge in
        a practical and meaningful way. Each session offers simple, insightful guidance that strengthens faith, nurtures
        understanding, and builds confidence in applying Quranic principles to daily life.
        <br /><br />
        Through consistent learning and reflection, participants develop clarity, purpose, and strong character. These sessions
        inspire individuals to think wisely, act ethically, and contribute positively to their families and communities, aligning
        personal growth with the values of a purposeful, faith-grounded life.
        </>
        }
      />

      <OurWeeklySessions />

    </div>
  );
}

export default Page;
