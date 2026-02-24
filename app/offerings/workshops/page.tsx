import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import { WorkShop } from './workshop';
import { ContentWithSearchSection } from '@/components/common/offeringsContent';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Workshops" imageSrc="/workshop.png" />
      <ContentWithSearchSection
                    imageSrc="/workshop.png"
                    imageAlt="CEF Online Academy weekly sessions"
                    heading="Explore Our Workshops"
                    searchPlaceholder="Search Circle"
                    description={
                    <>
                    CEF’s workshops offer hands-on, immersive learning experiences that help participants connect revealed knowledge with
                    acquired knowledge in practical ways. Each workshop is designed to build real-life skills, strengthen understanding, and
                    translate Quranic guidance into meaningful action.
                    <br /><br />
                    Through interactive activities, guided practice, and reflective learning, participants develop clarity, confidence, and strong
                    character. Our workshops empower individuals to think responsibly, act ethically, and apply faith-grounded principles in
                    daily life, nurturing a generation ready to lead with wisdom and purpose.
                    </>
                    }
      />
      <WorkShop />
    </div>
  );
}

export default Page;
