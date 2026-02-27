import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { getPageHeader } from '@/lib/api/pageHeaders';
import { mediaUrl } from '@/lib/headless';
import { Webinars } from './webinar';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = async () => {
  const header = await getPageHeader('webinars-page');
  const title = header?.title ?? 'Webinars';
  const imageSrc = mediaUrl(header?.['header-image']) || '/webinar.png';

  return (
    <div>
      <AboutHeader title={title} imageSrc={imageSrc} />
      <ContentWithSearchSection
                          imageSrc="/webinar.png"
                          imageAlt="CEF Online Academy weekly sessions"
                          heading="Explore Our Webinars"
                          searchPlaceholder="Search Webinars"
                          description={
                          <>
                          CEF Online Academy’s webinars provide enriching learning experiences that connect revealed knowledge with acquired
                          knowledge. Each webinar brings together expert speakers who offer clear, relevant, and practical insights, helping
                          participants understand how Quranic guidance shapes thinking, behavior, and decision-making in today’s world. <br /><br />
                          Through these interactive online sessions, learners gain clarity, purpose, and a stronger value system. Our webinars inspire
                          participants to reflect deeply, act ethically, and apply faith-aligned understanding to personal, social, and professional
                          challenges, nurturing individuals who grow with wisdom and character.
                          </>
                          }
      />
      <Webinars />
    </div>
  );
}

export default Page;
