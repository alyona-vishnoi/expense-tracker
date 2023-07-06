import React from 'react'
import styled from 'styled-components'

/**
 * The Button function returns a styled button component with customizable properties such as
 * background color, padding, border radius, and text color, along with an icon and name displayed
 * within the button.
 * @returns A functional component named "Button" is being returned. It takes in several props such as
 * "name", "icon", "onClick", "bg", "bPad", "color", and "bRad". It returns a styled button element
 * with the given background color, padding, border radius, and text color. It also includes the icon
 * and name passed as props and triggers the onClick function when clicked
 */
function Button({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <ButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </ButtonStyled>
    )
}

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .4s ease-in-out;
`;


export default Button