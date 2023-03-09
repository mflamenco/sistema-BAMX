import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useCallback, useState } from "react";
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import { ReactComponent as TrashIcon } from '../../Assets/Icon_trash.svg';

import logo from '../../Assets/Logo_bamx.svg';
import './App.css';

const ItemText = styled(ListItemText)({
  color: '#AC5300',
  fontSize: '10vmin',
  textAlign: 'left',
  fontWeight: '700',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ],
});

const Item = styled(ListItem)({
  color: '#AC5300',
  width: '48vw',
  height: '9vh',
  fontSize: '3.5vmin',
  textAlign: 'center',
  fontWeight: '700',
  borderBottom: '4px solid #ECECEC;',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ],
});

const CreateButton = styled(Button)({
  padding: '1vh 0',
  margin: '7vh 3.5vw 0 0',
  color: '#029D3A',
  borderRadius: '20px',
  border: '4px solid #029D3A;',
  width: '15vw',
  fontWeight: '700',
  textTransform: 'capitalize',
  fontSize: '3.5vmin',
  fontFamily: [
    'DM Sans',
    'sans-serif',
  ].join(','),
  '&:hover': {
    backgroundColor: '#029D3A',
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
          <text className='h1'> Colaboradores actuales</text>
          <div className='Container-table'>
            <div className='Table-left' >
            <List>
                <Item
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <TrashIcon />
                    </IconButton>
                  }
                >
                  <ItemText
                    primary="Single-line item"
                  />
                </Item>
                <Item
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <TrashIcon />
                    </IconButton>
                  }
                >
                  <ItemText
                    primary="Single-line item"
                  />
                </Item>
                <Item
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <TrashIcon />
                    </IconButton>
                  }
                >
                  <ItemText
                    primary="Single-line item"
                  />
                </Item>
            </List>
            </div>
            <div className='TableRight'>
            <CreateButton>
                Crear colaborador
              </CreateButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurnChange;