'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import { basedbets_e2e } from '../blockchain/basedbets_test';
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

                <br />
                <button
                    type="button"
                    onClick={() => basedbets_e2e({ treasury: '0xf47f2EF4e5Fe774620f22B27232ceC1625304f85' })}
                    className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Run End2End Contract Test
                </button>
            </div>
        </div >
    );
}
