import React from 'react'

function NumerInput({name, value, setValue}) {
    return (
        <div className="space-x-z item-center flex ">
            <label htmlFor={name}>{name}</label>
            <span className="flex  items-center">   
                <button
                disabled={value <= 0}
                onClick={()=>!(value<= 0) && setValue((val)=>val - 1)}
                className="border-4 rounded-full items-center p-2 mx-5 w-12 font-extrabold text-xl"
                >
                -
                </button>
                <input 
                value={value}
                min={0}
                max={20}
                id={name}
                onChange={(e)=>setValue(e.target.value)}
                placeholder="Add dates"
                className="focus:outline-none w-4 items-center"
                />
                <button
                onClick={()=>!(value >= 20) && setValue((val)=>val+1)}
                className="border-4 rounded-full p-2 mx-5 w-12 font- text-xl"
                >
                +    
                </button>
            </span>
        </div>
    )
}

export default NumerInput
