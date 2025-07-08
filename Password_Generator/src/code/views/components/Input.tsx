import * as React from 'react';

interface InputData {
    label: string;
    placeholder: string;
    type: string;
    value: string;
    name: string;
    setValue: (e:React.ChangeEvent<HTMLInputElement>)=>void;
}

const Input:React.FC<InputData> = ({
    label,
    placeholder,
    type="text",
    value,
    setValue,
    name,
    ...props
})=>{
    const id:string = Date.now().toString();

    return(
        <>  
            <div>
                {label && <label
                    htmlFor={id}
                >{label}</label>}

                <input 

                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={setValue}
                    {...props}
                />
            </div>
        </>
    )
}

export default Input;