import React from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import './RegisterCommunity.css';
import { styled, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

let theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#EF8018',
    },
  },
});

function RegisterCommunity() {

  return (
    <ThemeProvider theme={theme}>
      <div className="Root-Container">
        <div className="Container">
          <h1>Ingresa el ID de la <br/> comunidad</h1> 
          <TextField id="outlined-basic" label="ID" variant="outlined" color='secondary' className='TextField'/>
          <ConfirmButton>Confirmar</ConfirmButton>
        </div>
        <img src={logo}/>
      </div>
    </ThemeProvider>
  );
}

export default RegisterCommunity;