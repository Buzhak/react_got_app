import React from "react";
import img from './error.jpg'
import styled from 'styled-components'

const ErrorBlock = styled.div.attrs({
    className: "error-block"
})`
    &.error-block {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 50px;
        margin: auto 20px;
    }

    span {
        font-size: 1.1rem;
        text-transform: uppercase;
        color: red;
    }
`

const ErrorMessage = () => {
    return (
        <ErrorBlock>
            <img src={img} alt="error"></img>
            <span>Somesing goes wrong...</span>
        </ErrorBlock>
    )    
}

export default ErrorMessage;