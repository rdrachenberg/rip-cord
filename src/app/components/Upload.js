"use client"
import { Contract } from "ethers";
import { useState } from "react"
import { CheckCircle } from "lucide-react";
import ContractUI from "./ContractUI";
export default function Upload({ signer, setAbi, setContract, abi, contract }) {

    const [isContractUploaded, setIsContractUploaded] = useState(false);
    const [abiString, setAbiString] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(undefined)

    const updateContractABI = data => {
        setError(undefined);
        setAbiString(data.target.value.trim());
    }

    const buildUI = e => {
        try {
            let abiObj = JSON.parse(abiString);
            // console.log(abiObj);
            const contract = new Contract(address, abiObj, signer);
            abiObj = abiObj.filter(ele => ele.type === 'function');
            console.log(abiObj);
            setAbi(abiObj);
            setContract(contract);
            setIsContractUploaded(true);
            
        } catch (error) {
            setError('Not valid JSON. Please submit valid JSON.')
            console.log(error);

        }

        console.log('buildUI submit triggered!')
    }

    return (
        <div className='mt-8'>
            <h2 className='text-black'>Step 1: Upload the smart contract ABI</h2>
            <h3 className='text-black'></h3>
            <form className='form'>
                <div className='mb-3 mt-2'>
                    <label htmlFor='abi' className='form-label text-black'></label>
                    <textarea 
                        name='abi'
                        className='mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 text-black
                            focus:outline-none
                            focus:border-sky-500
                            focus:ring-1
                            focus:ring-sky-500
                            focus:invalid:border-red-500 focus:invalid:ring-red-500
                            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'
                        rows='10'
                        cols='60'
                        placeholder='Paste the smart contract ABI here'
                        disabled={isContractUploaded}
                        onChange={updateContractABI}
                    />
                </div>
                <div className='mb-3 mt-4'>
                    <label htmlFor='address' className='form-label'>Contract address</label>
                    <input 
                        name='address'
                        type='text'
                        className='form-control bg-gray-200 p-5 basis-2/3 w-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] '
                        value={address}
                        placeholder='0x...'
                        disabled={isContractUploaded}
                        onChange={newValue => setAddress(newValue.target.value)}
                    />
                </div>
                {isContractUploaded ? (
                    <div>
                        <div className='flex flex-row-1 justify-center align-middle items-center'>
                            {error ? (
                                <div className='bg-red-300 w-full p-4'>Error: {error}</div>
                            ) : (
                                <div>
                                    <div className='flex flex-row-1 justify-center align-middle items-center'>
                                        <div className='flex flex-col-2 text-black'>Functions Loaded</div>
                                        <CheckCircle className='w-7 h-7 text-green-500 justify-center align-middle items-center ml-2'/>
                                    </div>
                                </div>
                            )}
                        </div> 
                        <div><ContractUI abi={abi} contract={contract}/></div>
                    </div>
                ) : (
                    <div className='bg-blue-500 w-full rounded-full text-center text-white p-3 mt-36 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                        <div className='' onClick={buildUI} disabled={ !abiString || !address }>Submit</div>
                    </div>
                )}
            </form>
        </div>
    )
}