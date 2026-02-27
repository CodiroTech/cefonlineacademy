import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import { Mentorship } from './mentorshipCircles';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = async () => {
  const header = await getPageHeader('mentorship-page');
  const title = header?.title ?? 'Mentorship Circles';
  const imageSrc = mediaUrl(header?.['header-image']) || '/mentor.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <ContentWithSearchSection
              imageSrc="/mentor.png"
              imageAlt="CEF Online Academy weekly sessions"
              heading="Join Our Mentorship Circles"
              searchPlaceholder="Search Circle"
              description={
              <>
              CEF’s Mentorship Circles provide a supportive and reflective space where participants connect revealed knowledge with
              acquired knowledge through guided conversations and personal growth discussions. Each circle allows learners to explore
              Quranic wisdom in a relatable way while receiving thoughtful guidance from experienced mentors.
              <br /><br />
              These circles nurture clarity, confidence, and strong character by encouraging meaningful dialogue, self-reflection, and
              purposeful action. Participants learn to think wisely, act ethically, and apply faith-grounded principles in their personal,
              family, and social lives—growing into individuals who lead with integrity and insight.
              </>
              }
      />
      <Mentorship />
    </div>
  );
}

export default Page;
