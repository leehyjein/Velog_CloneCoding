import React from 'react';
import styled from 'styled-components'

const Button = (props) => {
        const {children, text, header, headerL, X, a, greenB, fz, width, className, _onClick} = props;

        const styles = {fz, width,};

    if(header){
        return(
            <>
                <HeaderB onClick={_onClick}>
                    {text? text : children}
                </HeaderB>
            </>
        )
    }

    if(headerL){
        return(
            <>
                <HeaderLoginB onClick={_onClick}>
                    {text? text : children}
                </HeaderLoginB>
            </>
        )
    }

    if(greenB){
        return(
            <GreenB onClick={_onClick}>
                {text? text : children}
            </GreenB>
        )
    }

    if(X){
        return(
            <XB onClick={_onClick}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </XB>
        )
    }

    if(a){
        return(
            <>
                <AB {...styles} className={className} onClick={_onClick}>
                    {text? text : children}
                </AB>
            </>
        )
    }
    
    return (
        <>
        </>
    );
};

Button.defaultProps = {
    text: null,
    header: false,
    width: '100%',
    className: null,
    headerL: false,
    greenB: false,
    X: false,
    _onClick: ()=>{},
}

const HeaderB = styled.button`
    height: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background-color: #212529;
    color: #fff;
    transition: all 0.125s ease-in 0s;
    cursor: pointer;

    &:hover {
        background-color: #343a40;
    }
`;

const HeaderLoginB = styled.button`
    height: 2rem;
    padding: 0 1rem;
    font-size: 1rem;
    border-radius: 1rem;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background: #f8f9fa;
    border: 1px solid #212529;
    color: #212529;
    transition: all 0.125s ease-in 0s;
    cursor: pointer;
    margin-right:1.25rem;

    &:hover {
        background: #212529;
        color: #fff;
    }
`;

const GreenB = styled.button`
    display: inline-block;
    background: #12b886;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 2px;
    width: 6rem;
    height: 3rem;
    word-break: keep-all;
    cursor: pointer;
`
const XB = styled.button`
    display: block;
    border: none;
    background-color: transparent;
    border-radius: none;
    padding: 0;
    margin: 0;
    position: absolute;
    color: #868e96;
    top: 1.5rem;
    right: 1.5rem;

    svg{
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

`

const AB = styled.button`
    border: none;
    outline: none;
    padding: 0;
    border-radius: 0;
    background-color: transparent;
    display: block;
    color: #212529;
    cursor: pointer
    ${props => props.fz ? `font-size: ${props.fz};` : ''};
    ${props => props.width ? `width: ${props.width};` : ''};
`

export default Button;