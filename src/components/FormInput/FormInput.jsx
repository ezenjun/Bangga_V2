import React from 'react'
import './forminput.css'

const FormInput = (props) => {
    const {label, onChange, id, errorMessage,required,select,options, ...inputProps}= props;
    if(select){
        return (
            <div className="formInput">
                <label>{label}</label>
                <select name={label} id={label} form="form">
                    {options.map((option)=>(
                        <option value={option}>{option}</option>
                    ))}
                </select>
                <span className='errorMessage'>{errorMessage}</span>
            </div> 
        )
    }
    return(
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange} required={required} autoComplete='off'/>
            <span className='errorMessage'>{errorMessage}</span>
        </div> 
    )
}

export default FormInput
