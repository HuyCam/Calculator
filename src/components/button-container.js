import React from 'react';
import Button from './button';
const ButtonContain = (props) => {
    const buttonsJSX = props.buttons.map((btn) => <Button button={btn} key={btn.value} clickEvent={props.clickEvent} /> );

    return buttonsJSX;
};

export default ButtonContain;

//<Button button={btn} key={btn.value} clickEvent={props.clickEvent} />