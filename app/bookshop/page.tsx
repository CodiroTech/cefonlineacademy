import React from 'react';
import { AboutHeader } from '@/components/common/aboutHeader';
import CEFBOOKSHOP from './course';
import BOOKDETAILS from './charProgram';

const Page = () => {
  return (
    <div>
      <AboutHeader title="CEF Bookshop" imageSrc="/1.png" />
      <CEFBOOKSHOP />
      <BOOKDETAILS />      
    </div>
  );
}

export default Page;
