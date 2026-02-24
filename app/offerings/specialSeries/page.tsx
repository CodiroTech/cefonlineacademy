import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { OurSpecialSeries } from './series';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Special Series" imageSrc="/series.png" />
      <ContentWithSearchSection
                    imageSrc="/series.png"
                    imageAlt="CEF Online Academy weekly sessions"
                    heading="Explore Our Special Series"
                    searchPlaceholder="Search Series"
                    description={
                    <>
                    CEF Online Academy’s Special Series offers focused learning experiences that help participants connect revealed
                    knowledge with acquired knowledge on deeper, theme-based topics. Each series provides structured, insightful guidance
                    that enhances understanding and allows learners to explore Quranic principles in a more comprehensive and meaningful
                    way. <br /><br />
                    Through these dedicated learning journeys, participants gain clarity, purpose, and refined character. The series
                    encourages them to think critically, act ethically, and apply faith-driven wisdom to real-life challenges, empowering them
                    to grow as thoughtful, responsible, and value-driven individuals.
                    </>
                    }
      />
      <OurSpecialSeries />
    </div>
  );
}

export default Page;
