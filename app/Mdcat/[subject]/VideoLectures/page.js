import React from 'react'
import { Navbar } from '@/app/components/Mdcat/Navbar';
import MdcatLectures from '@/app/components/Mdcat/VideoLectures/MdcatVideoLectureBody';
function MdcatVideoLectures() {
  return (
    <div>
      <Navbar />
      <MdcatLectures />
    </div>
  )
}

export default MdcatVideoLectures;