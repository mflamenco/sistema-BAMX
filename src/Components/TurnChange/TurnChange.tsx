import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from "react";
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import logo from '../../Assets/Logo_bamx.svg';
import './TurnChange.css';



const TurnButton = styled(Button)({
  padding: '1vh 0',
  color: '#F7A600',
  borderRadius: '20px',
  border: '6px solid #F7A600;',
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


function TurnChange() {

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

  return (
    <div className="Turn-change">
      <img src={logo}/>
      <div className='Container'>
        <div className="Button-container">
          <BarButton 
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
        </div>
        <div className="Container-body">
          <div className="Container-top">
            <text className='h1'> Actualmente asistiendo a</text>
            <div className="Turn">
              <div className="Turn-label">
                <text> turno 1</text>
                <text> comunidad A</text>
              </div>
              <TurnButton>
                Finalizar turno
              </TurnButton>
            </div>
          </div>
          <text className='h2'> *  Recuerda presionar el botón una vez que termines de atender a la comunidad</text>
        </div>
      </div>
    </div>
  );
}

export default TurnChange;