import React, { useState } from 'react';
import './WindowSelection.css';
import logo from '../../Assets/Logo_bamx.svg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';

const WindowButton = styled(Button)({
  fontSize: "6.17vmin",
  fontWeight: 600,
  padding: '1.5vh 1.5vw',
  color: 'black',
  borderRadius: '7px',
  border: '1px solid #EA2040;',
  textTransform: "capitalize",
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#EA2040',
    color: 'white'
  },
});

const ConfirmButton = styled(Button)({
  fontSize: '5vmin',
  padding: '0vh 4vw',
  color: '#EA2040',
  borderRadius: '7px',
  border: '4px solid #EA2040;',
  textTransform: "capitalize",
  fontWeight: 400,
  fontFamily: [
    'Bebas Neue',
    'cursive',
  ].join(','),
  '&:hover': {
    backgroundColor: '#EA2040',
    color: 'white'
  },
});

function WindowSelection() {
  const [token, setToken] = useState(localStorage.getItem('user-token') || null)
  const [cajaA, setCajaA] = useState(false)
  const [cajaB, setCajaB] = useState(false)
  const [cajaC, setCajaC] = useState(false)
  const [cajaD, setCajaD] = useState(false)
  const [cajaE, setCajaE] = useState(false)
  const [cajaAdmin, setCajaAdmin] = useState(false)
  const [cajaSeleccionada, setCajaSelect] = useState("")

  if(!token){
    return <Navigate to="/"/>
  }
  function setButtonSelected(button: HTMLInputElement, unselected: boolean){
    if(unselected){
      button.style.background = "transparent"
      button.style.color = "black"
    } else{
      button.style.background = "#EA2040"
      button.style.color = "white"
    }
  }
  
  function setButtonDisabled(button: HTMLInputElement){
    button.disabled = true
    button.style.background = "rgba(98, 98, 98, 0.65)"
    button.style.color = "rgba(255, 255, 255, 0.82)"
    button.style.border = "1px solid transparent"
  }

  function disableButtons(buttons: HTMLCollection, id: String){
    for(let i = 0; buttons.length; i++){
      if(buttons[i].id != id ){
        setButtonDisabled(buttons[i] as HTMLInputElement)
      }
    }
  }

  function selectWindow(caja: String) {
    const button = document.getElementById(`${caja}`) as HTMLInputElement;
    const buttons = document.getElementsByClassName("Button") as HTMLCollection

    if(caja = "A"){
      setButtonSelected(button, cajaA)
      setCajaA(!cajaA)
      setCajaSelect("Caja A")

    } else if (caja = "B"){
      setButtonSelected(button, cajaB)
      setCajaB(!cajaB)
      setCajaSelect("Caja B")

    } else if (caja = "C"){
      setButtonSelected(button, cajaC)
      setCajaC(!cajaC)
      setCajaSelect("Caja C")

    } else if (caja = "D"){
      setButtonSelected(button, cajaD)
      setCajaD(!cajaD)
      setCajaSelect("Caja D")

    } else if (caja = "E"){
      setButtonSelected(button, cajaE)
      setCajaE(!cajaE)
      setCajaSelect("Caja E")

    } else {
      setButtonSelected(button, cajaAdmin)
      setCajaAdmin(!cajaAdmin)
      setCajaSelect("Caja Admin")

    }

    disableButtons(buttons, caja)
  }

  return (
    <div className="Selection-root-container">
      <div className="Selection-container">
        <h1 className="Selection-h1">¿Qué caja atenderas hoy?</h1>
        <div className="Selection-button-container">
          <div className="Selection-top-container">
            <WindowButton className="Button" id='A' onClick={() => selectWindow("A")}>Caja A</WindowButton>
            <WindowButton className="Button" id='B' onClick={() => selectWindow("B")}>Caja B</WindowButton>
            <WindowButton className="Button" id='C' onClick={() => selectWindow("C")}>Caja C</WindowButton>
          </div>
          <div className="Selection-bottom-container">
            <WindowButton className="Button" id='D' onClick={() => selectWindow("D")}>Caja D</WindowButton>
            <WindowButton className="Button" id='Admin' onClick={() => selectWindow("Admin")}>Administración</WindowButton>
            <WindowButton className="Button" id='E' onClick={() => selectWindow("E")}>Caja E</WindowButton>
          </div>
        </div>
        <ConfirmButton>Confirmar</ConfirmButton>
      </div>
      <img className="Selection-img" src={logo}/>
    </div>
  );
}

export default WindowSelection;