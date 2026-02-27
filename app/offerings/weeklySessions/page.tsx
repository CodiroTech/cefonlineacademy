import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import { OurWeeklySessions } from './weeklylearningSessions';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = async () => {
  const header = await getPageHeader('weekly-sessions-page');
  const title = header?.title ?? 'Weekly Learning Sessions';
  const imageSrc = mediaUrl(header?.['header-image']) || '/session.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
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
