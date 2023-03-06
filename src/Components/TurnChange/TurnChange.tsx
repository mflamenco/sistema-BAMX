import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './TurnChange.css';
import { ReactComponent as LogoutIcon} from '../../Assets/Icon_logoutTest.svg';

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

const LogoutButton = styled(Button)({
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

  return (
    <div className="Turn-change">
      <LogoutButton startIcon={<LogoutIcon className='Logout' width={'2vw'} />}>Cerrar Sesión</LogoutButton>
      <div className="Container">
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
  );
}

export default TurnChange;