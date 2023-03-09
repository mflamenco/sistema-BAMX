import React from 'react';
import './WindowSelection.css';
import logo from '../../Assets/Logo_bamx.svg';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

  return (
    <div className="Selection-root-container">
      <div className="Selection-container">
        <h1 className="Selection-h1">¿Qué caja atenderas hoy?</h1>
        <div className="Selection-button-container">
          <div className="Selection-top-container">
            <WindowButton>Caja A</WindowButton>
            <WindowButton>Caja B</WindowButton>
            <WindowButton>Caja C</WindowButton>
          </div>
          <div className="Selection-bottom-container">
            <WindowButton>Caja D</WindowButton>
            <WindowButton>Administración</WindowButton>
            <WindowButton>Caja E</WindowButton>
          </div>
        </div>
        <ConfirmButton>Confirmar</ConfirmButton>
      </div>
      <img className="Selection-img" src={logo}/>
    </div>
  );
}

export default WindowSelection;