import React, { useState, useEffect } from 'react';
import './WindowSelection.css';
import logo from '../../Assets/Logo_bamx.svg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material';

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
  color: '#029D3A',
  borderRadius: '7px',
  border: '4px solid #029D3A;',
  textTransform: "capitalize",
  fontWeight: 400,
  fontFamily: [
    'Bebas Neue',
    'cursive',
  ].join(','),
  '&:hover': {
    backgroundColor: '#029D3A',
    color: 'white'
  },
});

function WindowSelection() {
  const [token] = useState(localStorage.getItem('user-token') || null)
  
  // Variables to know when a button is selected
  const [windowA, setWindowA] = useState(false)
  const [windowB, setWindowB] = useState(false)
  const [windowC, setWindowC] = useState(false)
  const [windowD, setWindowD] = useState(false)
  const [windowE, setWindowE] = useState(false)
  const [windowAdmin, setWindowAdmin] = useState(false)

  // Variables to disable buttons when one is selected
  const [disableA, setDisableA] = useState(false)
  const [disableB, setDisableB] = useState(false)
  const [disableC, setDisableC] = useState(false)
  const [disableD, setDisableD] = useState(false)
  const [disableE, setDisableE] = useState(false)
  const [disableAdmin, setDisableAdmin] = useState(false)

  // Variables to save informatiom about the selected window
  const [windowSelect, setWindowSelect] = useState("")
  const [disableConfirm, setDisableConfirm] = useState(true) 

  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const navigate = useNavigate();

  useEffect(
    createTurnVariable, // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )
  
  function createTurnVariable(){
    localStorage.setItem('turn', "0")
  }

  if(token){
    if (localStorage.getItem('window')) {
      if(localStorage.getItem('window') === "Administración") {
        return <Navigate to="/registrar-comunidad"/>
      } else {
        return <Navigate to="/cambio-de-turno"/>
      }
    } 
  } else {
    return <Navigate to="/"/>
  }

  function sendTurntable() {
    return <Navigate to="/tabla-de-turnos"/>
  }
  
  function setButtonSelected(button: HTMLInputElement, unselected: boolean){
    if(unselected){
      setDisableA(false)
      setDisableB(false)
      setDisableC(false)
      setDisableD(false)
      setDisableE(false)
      setDisableAdmin(false)
      setWindowSelect("")
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

  function selectWindow(window: String) {
    const button = document.getElementById(`${window}`) as HTMLInputElement;
    const buttons = document.getElementsByClassName("Button") as HTMLCollection

    if(window === "A"){
      setWindowA(!windowA)
      setButtonSelected(button, windowA)
      setWindowSelect("1")
      if(!windowA){
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, window, !windowA)

    } else if (window === "B"){
      console.log(windowB)
      setButtonSelected(button, windowB)
      setWindowB(!windowB)
      setWindowSelect("2")
      if(!windowB){
        setDisableA(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, window, !windowB)

    } else if (window === "C"){
      console.log(windowC)
      setButtonSelected(button, windowC)
      setWindowC(!windowC)
      setWindowSelect("3")
      if(!windowC){
        setDisableA(true)
        setDisableB(true)
        setDisableD(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, window, !windowC)

    } else if (window === "D"){
      setButtonSelected(button, windowD)
      setWindowD(!windowD)
      setWindowSelect("4")
      if(!windowD){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableE(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, window, !windowD)

    } else if (window === "E"){
      setButtonSelected(button, windowE)
      setWindowE(!windowE)
      setWindowSelect("5")
      if(!windowE){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableAdmin(true)
      }

      disableOrEnableButtons(buttons, window, !windowE)

    } else {
      setButtonSelected(button, windowAdmin)
      setWindowAdmin(!windowAdmin)
      setWindowSelect("6")
      if(!windowAdmin){
        setDisableA(true)
        setDisableB(true)
        setDisableC(true)
        setDisableD(true)
        setDisableE(true)
      }

      disableOrEnableButtons(buttons, window, !windowAdmin)

    }

  }

  function confirmSelection() {
    axios
      .get(api + "users/my", 
      {
        headers: {Authorization : `token ${token}`}
      })
      .then( result => {
        updateWindowWithUser(result.data.id)
      })
      .catch(error => {
        console.log(error)
      })
  }

  async function updateWindowWithUser(id: String){
    console.log(windowSelect)
    await axios
    .patch(api + "cajas/" + windowSelect + "/",
    {
      user: id
    },
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      console.log(result)
      if(windowSelect === "6"){
        localStorage.setItem('window', "Administración")
        navigate("/registrar-comunidad")
      } else{
        if(windowSelect === "1"){
          localStorage.setItem('window', "Caja A")
        } else if(windowSelect === "2"){
          localStorage.setItem('window', "Caja B")
        } else if(windowSelect === "3"){
          localStorage.setItem('window', "Caja C")
        } else if(windowSelect === "4"){
          localStorage.setItem('window', "Caja D")
        } else {
          localStorage.setItem('window', "Caja E")
        }
        navigate("/cambio-de-turno")
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
        <Link sx={{
          marginTop: '-7vh',
          fontSize: '3vmin',
        }} 
        className='Link-table' component="button" variant="body2" onClick={() => <Navigate to="/tabla-de-turnos"/>} color='#EA2040'>
          Ir a la tabla de turnos
        </Link>
      </div>
      <img className="Selection-img" alt='logo banco de alimentos' src={logo}/>
    </div>
  );
}

export default WindowSelection;