import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useCallback, useState, useEffect } from "react";
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import { Navigate } from 'react-router-dom';
import { Text } from '@fluentui/react'
import logo from '../../Assets/Logo_bamx.svg';
import './TurnChange.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const TurnButton = styled(Button)({
  padding: '1vh 0',
  color: '#F7A600',
  borderRadius: '20px',
  border: '4px solid #F7A600;',
  width: '75%',
  fontWeight: '700',
  textTransform: 'capitalize',
  fontSize: '5vmin',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#F7A600',
    color: 'white'
  },
});

const LinkButton = styled(Button)({
  padding: '1vh 0',
  color: '#F7A600',
  borderRadius: '20px',
  border: '4px solid #F7A600;',
  width: '35%',
  fontWeight: '700',
  alignSelf: 'center',
  textTransform: 'capitalize',
  fontSize: '3vmin',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#F7A600',
    color: 'white'
  },
});

const LinkTextField = styled(TextField)({
  color: '#F7A600',
  alignSelf: 'center',
  width: '88%',
  fontWeight: '700',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ],
});

const BarButton = styled(Button)({
  color: 'white',
  display: 'flex',
  fontSize: '4vmin',
  justifySelf: 'flex-end',
  fontFamily: [
    'Bebas Neue',
    'cursive',
  ].join(','),
  '&:hover': {
    backgroundColor: 'white',
    opacity: '80%',
    color: '#E96D10',
    
  },
});

const style = {
  gap: '5.5vh',
  fontFamily: 'DM Sans',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  height: '32vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderRadius: '18px',
};

function TurnChange() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [hoverLogout, setHoverLogout] = useState('Logout');
  const [hoverLink, sethoverLink] = useState('Logout');

  const currentWindow = String(localStorage.getItem('window'))
  const [token] = useState(localStorage.getItem('user-token') || null)

  const [currentTurn, setTurn] = useState("")
  const [currentCommunity, setCommunity] = useState("")

  useEffect(
    getTurnsActive, // <- function that will run on every dependency update
    [] // <-- empty dependency array
  )

  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const navigate = useNavigate();

  function getWindowNumber(caja: String){
    if(caja === "Caja A"){
      return "1"
    } else if (caja === "Caja B"){
      return "2"
    } else if (caja === "Caja C"){
      return "3"
    } else if (caja === "Caja D"){
      return "4"
    } else if (caja === "Caja E"){
      return "5"
    }
    return "6"
  }

  function logout() {
    axios
      .get(api + "users/my", 
      {
        headers: {Authorization : `token ${token}`}
      })
      .then( result => {
        updateWindowWithUser(result.data.caja)
      })
      .catch(error => {
        console.log(error)
      })
  }

  async function updateWindowWithUser(windowSeleted: String){
    await axios
    .patch(api + "cajas/" + getWindowNumber(windowSeleted) + "/",
    {
      user: null
    },
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      localStorage.removeItem('user-token')
      localStorage.removeItem('window')

      navigate("/")
    })
    .catch( error => {
      console.log(error)
    })

  }

  

  function getTurn(){
    console.log(token)
    console.log(api + "cajas/" + getWindowNumber(currentWindow) + "/siguiente_turno/")
    axios
    .patch(api + "cajas/" + getWindowNumber(currentWindow) + "/siguiente_turno/",
    {},
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      console.log(result)
      if(result.data.status === "no hay turnos pendientes"){
        setTurn("No hay turnos activos en este momento")
        setCommunity("")
      } else {
        getTurnsActive()
      }
    })
    .catch( error => {
      console.log(error)
    })
  }

  async function getCommunityNameById(id: String){
    let nombre = ""
    await axios
    .get(api + "comunidades/" + id + "/", 
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      console.log(result.data)
      setCommunity(String(result.data.nombre))
    })
    .catch( error => {
      console.log(error)
    })
  }

  function getTurnsActive(){
    axios
    .get(api + "turnos/",
    {
      headers: {Authorization : `token ${token}`,
    }
    })
    .then( result => {
      for(let i = 0; i < result.data.length ; i++){
        console.log(result.data[i].caja)
        if(String(result.data[i].caja) === getWindowNumber(currentWindow)){
          setTurn("Turno " + String(result.data[i].numero))
          getCommunityNameById(result.data[i].comunidad)
        }
      }
    })
    .catch( error => {
      console.log(error)
    })
  }

  const hoverHandler = useCallback((isHover: boolean, indexButton: number) => {
    if (isHover) {
      if (indexButton === 0) {
        setHoverLogout('Logout-hover')
      } else {
        sethoverLink('Logout-hover')
      }
    } else {
      if (indexButton === 0) {
        setHoverLogout('Logout')
      } else {
        sethoverLink('Logout')
      }
    }
  }, []);

  let theme = createTheme({
    palette: {
      primary: {
        main: '#F7A600',
      },
      secondary: {
        main: '#EF8018',
      },
    },
  });

  if(!token){
    return <Navigate to="/"/>
  }

  return (
    <ThemeProvider theme={theme}>
    <div className="Turn-change">
      <img className="Turn-change-img" alt={'logo de banco de alimentos'} src={logo}/>
      <div className='Container'>
        <div className="Button-container">
          <BarButton 
          onMouseEnter={() => hoverHandler(true,0)}
          onMouseLeave={() => hoverHandler(false,0)} 
          onClick={() => logout()}
          startIcon={<LogoutIcon className={hoverLogout} width={'2vw'} />} >
            Cerrar Sesión
          </BarButton>
        </div>
        <div className="Container-body">
          <div className="Container-top">
            <div className="Turn">
              <Text className='h1'> Atendiendo en</Text>
              <div className="Turn-label">
                  <Text className="Turn-label-box">{localStorage.getItem('window')}</Text>
              </div>
              <Text className='h2'> *  Recuerda presionar el botón una vez que termines de atender a la comunidad</Text>
            </div>
            <div className="Turn">
              <Text className='h1'> Asistiendo a</Text>
              <div className="Turn-label">
                <Text className="Turn-label-text" id="turn-label"> {currentTurn} </Text>
                <Text className="Turn-label-text"> {currentCommunity} </Text>
              </div>
              <TurnButton onClick={getTurn}>
                Siguiente turno
              </TurnButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>

  );
}

export default TurnChange;