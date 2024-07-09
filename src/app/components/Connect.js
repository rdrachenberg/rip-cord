"use client"
import { useState } from "react";
import Link from 'next/link'
import { Angry, TriangleAlert } from "lucide-react";
import { ethers } from 'ethers';



export default function Connect({ setSigner }) {
    const [error, setError] = useState(undefined);

    const connect = async () => {
        // console.log('Connect was hit');
        if(!window.ethereum) {
            setError('You need to install metamask to interact with this dapp');
            return;
        } else {
            console.log('Metamask detected')
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        // console.log(provider);
        try {
            const signer = await provider.getSigner();
            setSigner(signer);

        } catch (error) {
            console.log(error);
            setError('You need to accept the connection request from Metamask inorder to use this dapp');
        }
        

    };

    return (
        <div className='text-center'>
            <button className='min-w-lg w-32 border-2 border-red-400 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-700 hover:border-green-400 hover:scale-110 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]' onClick={connect}>Connect</button>
            {error && 
                <Link href={'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'}>
                    <div className='alert bg-red-200 p-3 mt-3 flex flex-row rounded-xl border-2 border-gray-500'>
                    <div className=''>
                        <TriangleAlert className='absolute basis-1/12 justify-center align-middle items-center w-5 rounded-full'/>
                        <div className='ml-3 basis-9/12'>{error}. Click here to install</div>
                    </div>
                    
                    
                        
                    
                    </div>
                </Link>
            }
        </div>
    )
}