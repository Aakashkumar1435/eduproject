import React from 'react';
import { Navbar } from '@/app/components/Mdcat/Navbar';
import MdcatTests from '@/app/components/Mdcat/Test/MdcatTestBody';
import FooterSection from '@/app/components/Mdcat/FooterSection';

export default function MdcatTestPage() {
  return (
    <>
    <Navbar />
    <MdcatTests />
    </>
  );
}