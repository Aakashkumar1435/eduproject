import React from 'react';
import { HomeNavbar } from '../components/Mdcat/PageNavbar';
import MdcatTests from '@/app/components/Mdcat/Test/MdcatTestBody';
import Footer from '../components/footer/Footer';

export default function MdcatTestPage() {
  return (
    <>
    <HomeNavbar />
    <MdcatTests />
    <Footer />
    </>
  );
}