"use client"
import Image from "next/image";
import Connect from "./components/Connect";
import Upload from "./components/Upload";
import { useState } from "react";

export default function Home() {
  const [signer, setSigner] = useState(undefined);
  const [abi, setAbi] = useState(undefined);
  const [contract, setContract] = useState('');

  if(signer){
    console.log(signer.address)
  }

  return (
    <main className="flex grow min-h-screen flex-col items-center p-2 sm:p-24 bg-gradient-to-r from-slate-300 to-slate-500 ">
      <div className='bg-gradient-to-r from-cyan-300 to-blue-700 rounded p-1 drop-shadow-[0_5px_5px_rgba(255,255,255, 0.9)]'>
        <div className='bg-black p-5 text-white text-lg rounded '>A tool to use for interacting with any EVM compatiable smart contract</div>
      </div>
      <div className='rounded-xl max-w-sm sm:max-w-[620px] p-1 mt-3 m-3 bg-gradient-to-l from-cyan-300 to-blue-700'>
        <div className='grow max-w-lg sm:max-w-lg sm:min-w-[600px] sm:min-h-screen mx-auto p-8 rounded-xl text-xl bg-white `rounded-[calc(1.5rem-1px)]` '>
        {signer ? (
          <div className='container'>
            <div className='text-black text-sm truncate'>Connected Address: {signer.address}</div>
            <Upload signer={signer} setAbi={setAbi} setContract={setContract} abi={abi} contract={contract}/>
          </div>
        ) : ( 
          <Connect setSigner={setSigner}/>
        )
        }
        </div>
      </div>
    </main>
  );
}
