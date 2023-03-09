import TextField from '@mui/material/TextField';
import logo from '../../Assets/Logo_tilted.svg';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { styled, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const LoginButton = styled(Button)({
  fontSize: '4.44vmin',
  padding: '6px 12px',
  width: '12.64vw',
  height: '6.17vh',
  margin: '7vh 0 0 0',
  paddingTop: '3vh',
  paddingBottom: '3vh',
  color: '#EA2040',
  borderRadius: '7px',
  border: '5px solid #EA2040;',
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

function Login() {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const api = 'http://localhost:8000/auth'
  const token = localStorage.getItem('user-token') || null

  const loginFunc = () => {
    axios
    .post(api, {
      username: username,
      password: password
    })
    .then(result => {
      console.log("siuu")
    })
    .catch(error => {
      console.log(username)
      console.log(username)
      console.log("nouu")
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Login-container">
        <div className="Login-left-container">
          <img className="Login-img" src={logo}/>
        </div>
        <div className="Login-right-container">
          <h1 className="Login-h1"> Ingresa con <br/> tu ID </h1>
          <TextField value={username} onChange={(newValue) => setUsername(newValue.target.value)} id="username-input" label="ID" variant="outlined" color='secondary' className='TextField'/>
          <TextField value={password} onChange={(newValue) => setPassword(newValue.target.value)} id="password-input" label="Contraseña" variant="outlined" color='secondary' type='password' className='TextField'/>
          <LoginButton onClick={loginFunc}>Entrar</LoginButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;