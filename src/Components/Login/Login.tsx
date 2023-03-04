import TextField from '@mui/material/TextField';
import logo from '../../Assets/Logo_tilted.svg';
import Button from '@mui/material/Button';
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

  return (
    <ThemeProvider theme={theme}>
      <div className="Container">
        <div className="Left-container">
          <img src={logo}/>
        </div>
        <div className="Right-container">
          <h1> Ingresa con <br/> tu ID </h1>
          <TextField id="outlined-basic" label="ID" variant="outlined" color='secondary' className='TextField'/>
          <TextField id="outlined-basic" label="Contraseña" variant="outlined" color='secondary' type='password' className='TextField'/>
          <LoginButton>Entrar</LoginButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Login;