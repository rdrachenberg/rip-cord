"use client"
import { useState } from "react";
import { Info } from "lucide-react";
export default function FunctionUI({ fn, contract }) {
    const initValues = fn.inputs.reduce((acc, input) => ({...acc, ...{[input.name] : ''}}), {});
    const [inputValues, setInputValues] = useState(initValues);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(undefined);
    const [txConfirmation, setTxConfirmation] = useState(undefined);

    const updateInputValue = (inputName, newValue) => {
        setResponse(undefined);
        setTxConfirmation(undefined);
        
        setInputValues({...inputValues, ...{[inputName]: newValue.target.value}});
    };

    const isDisabled = () => {
        return fn.inputs.some(input => inputValues[input.name] === '');
    };
    const executeFunctionCall = async () => {
        console.log('executeFunctionCall hit');
        setLoading(true);
        try {
            if(fn.stateMutability === 'view') {
                const response = await contract[fn.name](...Object.values(inputValues));
                setResponse(response.toString());
                return;
            }
    
            const tx = await contract[fn.name](...Object.values(inputValues));
            const txReceipt = await tx.wait();
            setTxConfirmation(`Your transaction was mined: ${txReceipt.hash}`);
            if(txReceipt) {
                console.log(txReceipt.hash);
            }
            
        } catch (error) {
            console.log(error);
            setError(`Error: ${error}`)
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className='mb-4 container rounded bg-gray-200 p-5 pb-2 text-black drop-shadow-[0_1.5px_1.2px_rgba(0,0,0,0.8)]'>
            <h3>{fn.name}</h3>
            <div className='input '>
                {fn.inputs.map(input => (
                    <div key={input.name} className='mb-6'>
                        <label htmlFor={input.name} className='div-label mr-8'>{input.name}</label>
                        <input 
                            name={input.name} 
                            type='text' 
                            className=' p-1'
                            value={inputValues[input.name]}
                            placeholder={input.type}
                            onChange={newValue => updateInputValue(input.name, newValue)}
                            />
                    </div>
                ))}
                {loading ? <div>Loading...</div> : <div></div>}
                {response && 
                    <div className='flex rounded bg-blue-200 drop-shadow-[0_1px_1.2px_rgba(0,0,0,0.8)] p-2 mt-3 mb-3'>
                        <Info className='flex justify-center align-middle items-center w-6 h-6'/>
                        <div className='ml-3 max-w-sm truncate'>{response}</div>
                    </div>
                }
                <div type='submit' className='flex justify-center align-middle items-center mt-3 mb-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-blue-300 bg-blue-500 hover:bg-blue-700 sm:w-[25%] hover:scale-105 border-2 hover:border-gray-200 p-1 rounded text-white' disabled={isDisabled} onClick={executeFunctionCall}>Submit</div>
            </div>
            {error && <div className='bg-gradient-to-r from-red-300 to-red-700 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-full p-4'>Error: {error}</div>}
            {txConfirmation && <div>{txConfirmation}</div>}
        </div>
    )
}