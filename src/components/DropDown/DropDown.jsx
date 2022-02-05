import React, { useState } from 'react'
import {CaretDownOutlined} from '@ant-design/icons'
import './dropdown.css'

const DropDown = (props) => {
    const[isActive, setIsActive] = useState(false);
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e)=> setIsActive(!isActive)}>
                {props.selected}
                <CaretDownOutlined color='pink'/>
                {isActive && (
                    <div className="dropdown-content">
                        {props.items.map((item, index)=>(
                            <div className="dropdown-item" onClick={(e) =>{
                                props.setSelected(item) 
                                setIsActive(false)} }>
                                {item}
                            </div>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDown
