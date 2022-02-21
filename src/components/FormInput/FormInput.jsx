import React from 'react'
import './forminput.css'

const FormInput = (props) => {
    const {label, type,name,value,onChange, id, placeholder, errorMessage,required,select,options, ...inputProps}= props;
    // console.log("name",name);
    if(select){
        return (
            <div className="formInput">
                <label>{label}</label>
                <select name={name} id={label} onChange={onChange} form="form">
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
            <input id={id} name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} autoComplete='off'/>
            <span className='errorMessage'>{errorMessage}</span>
        </div> 
    )
}

export default FormInput