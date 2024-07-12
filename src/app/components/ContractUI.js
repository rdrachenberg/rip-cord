"use client"
import { ArrowDownSquareIcon } from "lucide-react"
import FunctionUI from "./FunctionUI"
export default function ContractUI({ abi, contract }) {

    return (
        <div>
            <div className='w-full flex justify-center align-middle items-center'>
                <ArrowDownSquareIcon className='flex w-10 h-10 text-center mt-3 mb-2 text-blue-600 bg-gray-200 rounded'/>
            </div>
            <h3 className='mt-3 text-black'>Step 2: Interact with the smart contract</h3>
            <h4 className='mt-3 font-bold'></h4>
            {abi !== 'undefined' ?
                <div className='container'>
                    {abi.map(fn => <FunctionUI key={fn.name} fn={fn} contract={contract}/>)}
                </div>
            : <div></div>}
            
        </div>
    )
}