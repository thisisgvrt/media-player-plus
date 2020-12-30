import Head from 'next/head'
import React, { useState } from 'react';

import VideoPlayer from '../components/VideoPlayer'
import VideoControls from '../components/VideoControls'
import ASRContainer from '../components/ASRContainer'

export default function Home() {
  const [timeStamp, setTimeStamp] = useState(0);
  const [isPlaying, setPlayingStatus] = useState(false);
  return (
    <>
      <Head>
        <title>Media player plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen grid grid-rows-4 grid-cols-8 gap-2">
        <div className="row-start-2 row-span-2 col-start-3 col-span-4">
          <VideoPlayer isPlaying={isPlaying} setPlayingStatus={setPlayingStatus} timeStamp={timeStamp} setTimeStamp={setTimeStamp}/>
        </div>
        <div className="row-start-2 row-span-2 col-start-7 col-span-2">
          <ASRContainer timeStamp={timeStamp} setTimeStamp={setTimeStamp}/>
        </div>
        <div className="row-start-4 row-span-1 col-start-3 col-span-4">
          <VideoControls isPlaying={isPlaying} setPlayingStatus={setPlayingStatus} timeStamp={timeStamp} setTimeStamp={setTimeStamp}/>
        </div>
      </div>
    </>
  )
}
