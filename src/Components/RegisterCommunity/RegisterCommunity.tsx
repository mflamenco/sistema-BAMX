import './RegisterCommunity.css';
import React, {useCallback, useState} from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import { styled, ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { ReactComponent as CloseIcon } from '../../Assets/Icon_close.svg';
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router-dom';
import { Box, IconButton, Modal } from '@mui/material';

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

  const [token, setToken] = useState(localStorage.getItem('user-token') || null)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [hoverLogout, setHoverLogout] = useState('Logout');
  const [hoverLink, sethoverLink] = useState('Logout');

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
      <div className="Register-root-container">
        <div className="Button-container">
            <BarButton 
            onClick={handleOpen}
            onMouseEnter={() => hoverHandler(true,1)}
            onMouseLeave={() => hoverHandler(false,1)} 
            startIcon={<LinkIcon className={hoverLink} width={'2vw'} />} >
              Actualizar google sheets
            </BarButton>
            <BarButton 
            onMouseEnter={() => hoverHandler(true,0)}
            onMouseLeave={() => hoverHandler(false,0)} 
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
                <LinkTextField id="outlined-basic" color='secondary' label="Nuevo link de Google Sheets" variant="outlined" />
                <LinkButton onClick={handleClose}>
                  Confirmar
                </LinkButton>
              </Box>
            </Modal>
          </div>
        <div className="Register-container">
          <h1 className="Register-h1">Ingresa el ID de la <br/> comunidad</h1> 
          <TextField id="outlined-basic" label="ID" variant="outlined" color='secondary' className='TextField'/>
          <ConfirmButton>Confirmar</ConfirmButton>
        </div>
        <img alt='logo de banco de alimentos' className="Register-img" src={logo}/>
      </div>
    </ThemeProvider>
  );
}

export default RegisterCommunity;