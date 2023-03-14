import './Login.css';
import TextField from '@mui/material/TextField';
import logo from '../../Assets/Logo_tilted.svg';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { styled, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const LoginButton = styled(Button)({
  fontSize: '4.44vmin',
  padding: '6px 12px',
  width: '12.64vw',
  height: '6.17vh',
  margin: '5vh 0 0 0',
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

  const [token, setToken] = useState(localStorage.getItem('user-token') || null)
  const [errorMess, setErrorMess] = useState("")
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const navigate = useNavigate();
  

  const getUserType = async (newtoken: string)=>{
    await axios
      .get(api + "users/my", 
      {
        headers: {Authorization : `token ${newtoken}`}
      })
      .then( result => {
        console.log(result.data.is_superuser)
        if(result.data.is_superuser){
          //
        } else{
          navigate("/seleccion-de-caja")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const loginFunc = () => {
    const errorMess = document.getElementById('login-error') as HTMLInputElement;
    axios
    .post(api + "api-token-auth/", {
      username: username,
      password: password
    })
    .then(result => {
      errorMess.style.display = "none"
      setToken(result.data.token)
      console.log(token)
      localStorage.setItem('user-token', result.data.token)
      
      getUserType(result.data.token)
    })
    .catch(error => {
      console.log(error)
      errorMess.style.display = "flex"

      setErrorMess("Tu usuario o tu contraseña es incorrecto")
      localStorage.removeItem('user-token')
      
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
          <h3 className="error-message" id="login-error"> {errorMess} </h3>
          <LoginButton onClick={loginFunc}>Entrar</LoginButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;