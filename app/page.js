
'use client'

import React from "react";
import ConnectButton from '@/app/components/connectButton'

const Home = () => {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      <div >
        <h1 className="text-6xl">BasedBets</h1><br />
        <p className="text-2xl">An AI-powered Gambling/Betting Agent for Games.</p>
      </div>

      <ConnectButton />
    </div>
  );
};

export default Home;