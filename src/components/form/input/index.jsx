import React from "react";
import './input.css';

export default function Input(props) {
    return (
        <input
            placeholder={props.placeholder} 
            type='text' 
            onChange={props.calc}
            required={props.required}
        />
    )
}