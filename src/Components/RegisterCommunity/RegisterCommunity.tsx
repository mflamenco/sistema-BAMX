import './RegisterCommunity.css';
import React, {useCallback, useState} from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import { Box, IconButton, Modal, TextField } from '@mui/material';
import { styled, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ReactComponent as CloseIcon } from '../../Assets/Icon_close.svg';
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


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

  const [token] = useState(localStorage.getItem('user-token') || null)
  const [id, setId] = useState('')
  const [link, setLink] = useState("")

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const navigate = useNavigate();

  const [hoverLogout, setHoverLogout] = useState('Logout');
  const [hoverLink, sethoverLink] = useState('Logout');

  function getCajaNumber(caja: String){
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
        updateCajaWithUser(result.data.caja)
      })
      .catch(error => {
        console.log(error)
      })
  }

  async function updateCajaWithUser(cajaSeleccionada: String){
    await axios
    .patch(api + "cajas/" + getCajaNumber(cajaSeleccionada) + "/",
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

  function updateGoogleLink(){
    axios
    .patch(api + "link/1/", {
      liga: link
    },
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      localStorage.setItem('link', link)
      console.log(result)
      handleClose()
    })
    .catch( error => {
      console.log(error)
    })
  }

  function confirmarIngresoDeComunidad() {
    axios
    .get(api + "comunidades/get_comunidad_por_clave_sae/?clave_sae=" + id, {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      postTurn(result.data.id)
    })
    .catch( error => {
      console.log(error)
    })
    
  }

  async function postTurn(comunidad: String){
    const turno = Number(localStorage.getItem("turn")) + 1
    console.log(turno)
    console.log(token)
    await axios
    .post(api + "turnos/", {
      numero: turno,
      comunidad: comunidad
    },
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      localStorage.setItem("turn", String(turno))
      // Clean input
      // Alert here
      console.log(result)
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

  if(!token){
    return <Navigate to="/"/>
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="Register-root-container" >
        <div className="Button-container">
            <BarButton
            onMouseEnter={() => hoverHandler(true,1)}
            onMouseLeave={() => hoverHandler(false,1)} 
            onClick={handleOpen}
            startIcon={<LinkIcon className={hoverLink} width={'2vw'} />} >
              Actualizar google sheets
            </BarButton>
            <BarButton 
            onMouseEnter={() => hoverHandler(true,0)}
            onMouseLeave={() => hoverHandler(false,0)} 
            onClick={() => logout()}
            startIcon={<LogoutIcon className={hoverLogout} width={'2vw'} />} >
              Cerrar Sesión
            </BarButton>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <LinkTextField id="outlined-basic" color='secondary' label="Nuevo link de Google Sheets" variant="outlined" onChange={(newValue) => setLink(newValue.target.value)} />
              <LinkButton onClick={updateGoogleLink}>
                Confirmar
              </LinkButton>
            </Box>
          </Modal>
          </div>
        <div className="Register-container">
          <h1 className="Register-h1">Ingresa el ID de la <br/> comunidad</h1> 
          <TextField id="outlined-basic" label="ID" onChange={(newValue) => setId(newValue.target.value)} variant="outlined" color='secondary' className='TextField'/>
          <ConfirmButton onClick={() => confirmarIngresoDeComunidad()}>Confirmar</ConfirmButton>
        </div>
        <img alt='logo de banco de alimentos' className="Register-img" src={logo}/>
      </div>
    </ThemeProvider>
  );
}

export default RegisterCommunity;