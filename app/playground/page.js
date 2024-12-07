'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { basedbets_e2e } from '../blockchain/viemtest';
import { useWallet } from '@/app/Context/wallet';
import { BasedBetsInterface } from '@/app/blockchain/basedbets_interface';
import ConnectButton from "../components/connectButton";

export default function CompanyHomePage() {
    const params = useParams();
    const { wallet } = useWallet();

    const handleInputChange = (e) => {
        setShares(e.target.value);
    };

    const initialize = async () => {
        //Load stuff from the contract here
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md mt-8">
            <div className='p-5'>
                <h1 className="center text-5xl">Playground</h1>
                <ConnectButton />
            </div>
        </div >
    );
}
