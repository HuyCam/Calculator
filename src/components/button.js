import React, { Component } from 'react';

const Button = (props) => {
    return (
    <div className='d-inline-block align-middle button' onClick={(e) => {props.clickEvent(e, props.button)}}>
        {props.button.value}
    </div>);
};

export default Button;

/*
<p 
    onClick={(e) => {props.clickEvent(e, props.button)}} >
    {props.button.value}
    </p>
    */