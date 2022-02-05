import React from 'react'
import './baseCard.css'
import styled from 'styled-components'

const BaseCard = props => {
    return (
        <div className="baseCard" style={{backgroundColor: props.backgroundColor, height: props.height, width: props.width, padding: props.padding, marginBottom:props.marginBottom, border:props.border}}>
            {props.children}
        </div>
    )
}

export default BaseCard
