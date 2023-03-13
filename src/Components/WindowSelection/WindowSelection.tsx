import React, { useState } from 'react';
import './WindowSelection.css';
import logo from '../../Assets/Logo_bamx.svg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
  const [token] = useState(localStorage.getItem('user-token') || null)
  
  // Variables to know when a button is selected
  const [cajaA, setCajaA] = useState(false)
  const [cajaB, setCajaB] = useState(false)
  const [cajaC, setCajaC] = useState(false)
  const [cajaD, setCajaD] = useState(false)
  const [cajaE, setCajaE] = useState(false)
  const [cajaAdmin, setCajaAdmin] = useState(false)

  // Variables to disable buttons when one is selected
  const [disableA, setDisableA] = useState(false)
  const [disableB, setDisableB] = useState(false)
  const [disableC, setDisableC] = useState(false)
  const [disableD, setDisableD] = useState(false)
  const [disableE, setDisableE] = useState(false)
  const [disableAdmin, setDisableAdmin] = useState(false)

  // Variables to save informatiom about the selected window
  const [cajaSeleccionada, setCajaSelect] = useState("")
  const [disableConfirm, setDisableConfirm] = useState(true) 

  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const navigate = useNavigate();

  if(!token){
    return <Navigate to="/"/>
  }
  function setButtonSelected(button: HTMLInputElement, unselected: boolean){
    if(unselected){
      setDisableA(false)
      setDisableB(false)
      setDisableC(false)
      setDisableD(false)
      setDisableE(false)
      setDisableAdmin(false)
      setCajaSelect("")
      button.style.background = "transparent"
      button.style.color = "black"

      setDisableConfirm(true)
      
    } else{
      button.style.background = "#EA2040"
      button.style.color = "white"

      setDisableConfirm(false)
    }
  }
  
  function setButtonDisabled(button: HTMLInputElement, disable: boolean){
    if(disable){
      button.style.background = "rgba(98, 98, 98, 0.65)"
      button.style.color = "rgba(255, 255, 255, 0.82)"
      button.style.border = "1px solid transparent"
    } else{
      button.style.background = "transparent"
      button.style.color = "black"
      button.style.border = "1px solid #EA2040"
    }
  }

  function disableOrEnableButtons(buttons: HTMLCollection, id: String, disable: boolean){
    console.log(disable)
    for(let i = 0; i < buttons.length; i++){
      if(buttons[i].id !== id ){
        setButtonDisabled(buttons[i] as HTMLInputElement, disable)
      }
    }
  }

  function selectWindow(caja: String) {
    const button = document.getElementById(`${caja}`) as HTMLInputElement;
    const buttons = document.getElementsByClassName("Button") as HTMLCollection

    if(caja === "A"){
      setCajaA(!cajaA)
      setButtonSelected(button, cajaA)
      setCajaSelect("1")
      if(!cajaA){
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaA)

    } else if (caja === "B"){
      console.log(cajaB)
      setButtonSelected(button, cajaB)
      setCajaB(!cajaB)
      setCajaSelect("2")
      if(!cajaB){
        setDisableA(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaB)

    } else if (caja === "C"){
      console.log(cajaC)
      setButtonSelected(button, cajaC)
      setCajaC(!cajaC)
      setCajaSelect("3")
      if(!cajaC){
        setDisableA(true)
        setDisableB(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaC)

    } else if (caja === "D"){
      setButtonSelected(button, cajaD)
      setCajaD(!cajaD)
      setCajaSelect("4")
      if(!cajaD){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaD)

    } else if (caja === "E"){
      setButtonSelected(button, cajaE)
      setCajaE(!cajaE)
      setCajaSelect("5")
      if(!cajaE){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaE)

    } else {
      setButtonSelected(button, cajaAdmin)
      setCajaAdmin(!cajaAdmin)
      setCajaSelect("6")
      if(!cajaAdmin){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
      }

      disableOrEnableButtons(buttons, caja, !cajaAdmin)

    }

  }

  function confirmSelection() {
    axios
      .get(api + "users/my", 
      {
        headers: {Authorization : `token ${token}`}
      })
      .then( result => {
        updateCajaWithUser(result.data.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  async function updateCajaWithUser(id: String){
    console.log(cajaSeleccionada)
    await axios
    .patch(api + "cajas/" + cajaSeleccionada + "/",
    {
      user: id
    },
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      console.log(result)
      if(cajaSeleccionada === "6"){
        navigate("/registrar-comunidad")
      } else{
        //
      }
    })
    .catch( error => {
      console.log(error)
    })

  }

  return (
    <div className="Selection-root-container">
      <div className="Selection-container">
        <h1 className="Selection-h1">¿Qué caja atenderas hoy?</h1>
        <div className="Selection-button-container">
          <div className="Selection-top-container">
            <WindowButton className="Button" id="A" onClick={() => selectWindow("A")} disabled={disableA}>Caja A</WindowButton>
            <WindowButton className="Button" id="B" onClick={() => selectWindow("B")} disabled={disableB}>Caja B</WindowButton>
            <WindowButton className="Button" id="C" onClick={() => selectWindow("C")} disabled={disableC}>Caja C</WindowButton>
          </div>
          <div className="Selection-bottom-container">
            <WindowButton className="Button" id="D" onClick={() => selectWindow("D")} disabled={disableD}>Caja D</WindowButton>
            <WindowButton className="Button" id="Admin" onClick={() => selectWindow("Admin")} disabled={disableAdmin}>Administración</WindowButton>
            <WindowButton className="Button" id="E" onClick={() => selectWindow("E")} disabled={disableE}>Caja E</WindowButton>
          </div>
        </div>
        <ConfirmButton onClick={() => confirmSelection()} disabled={disableConfirm}>Confirmar</ConfirmButton>
      </div>
      <img className="Selection-img" src={logo}/>
    </div>
  );
}

export default WindowSelection;