import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import FAQSection from './faq';
import OfficeInfoSection from './contactHeader';
import { Contact } from 'lucide-react';
import ContactSection from './form';
import { HelpDesk } from './desk';

const Page = () => {
  return (
    <div>
      <AboutHeader title="Contact Us" imageSrc="/Kid.png" />
      <OfficeInfoSection />
      <FAQSection />
      <ContactSection />
      <HelpDesk />
      
    </div>
  );
}

export default Page;
