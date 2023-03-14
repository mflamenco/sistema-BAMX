import { getFocusStyle, getTheme, ITheme, List, mergeStyleSets, Pivot, PivotItem, SearchBox, Text, IPivotItemProps } from '@fluentui/react';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Box, IconButton, Modal, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useState } from "react";
import { ReactComponent as CloseIcon } from '../../Assets/Icon_close.svg';
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import { ReactComponent as TrashIcon } from '../../Assets/Icon_trash.svg';
import logo from '../../Assets/Logo_bamx.svg';
import './AdminTable.css';

initializeIcons();

const iconProps:IIconProps = { iconName: 'Search' };
const theme: ITheme = getTheme();

type IItem = {
  name: string;
  id: string;
};

const CreateButton = styled(Button)({
  padding: '1vh 0',
  color: '#029D3A',
  justifySelf: 'center',
  alignSelf: 'center',
  borderRadius: '20px',
  border: '4px solid #029D3A;',
  width: '17vw',
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

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      padding: 10,
      boxSizing: 'border-box',
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
    },
  ],
  itemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 10,
    displayDirection: 'row',
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  search: [
    {
      input: {
        fontFamily: 'DM Sans',   
        fontWeight: '600',
        color: '#AC5300',
        backgroundColor: '#FFD5AD',
        borderRadius: '14px',
        fontSize: '2.5vmin',
        marginLeft: '1vw',
      },
      i: {
        color: '#AC5300',
      },
      height: '5vh'
,      color: '#AC5300',
      backgroundColor: '#FFD5AD',
      borderRadius: '14px',
      border: '0',
      width: '40vw',
    }
  ],
});

const style = {
  gap: '5.5vh',
  fontFamily: 'DM Sans',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  borderRadius: '18px',
};

function AdminTable() {
  const [lastHeader, setLastHeader] = useState<{ props: IPivotItemProps } | undefined>(undefined);
  const [openL, setOpenL] = useState(false);
  const handleOpenL = () => setOpenL(true);
  const handleCloseL = () => setOpenL(false);

  const [openC, setOpenC] = useState(false);
  const handleOpenC = () => setOpenC(true);
  const handleCloseC = () => setOpenC(false);

  const [hoverLogout, setHoverLogout] = useState('Logout');
  const [hoverLink, setHoverLink] = useState('Logout');
  const [originalItemsCol, setOriginalItemsCol] = useState([
    {name: 'colaborador 1', id: 'i1'},
    {name: 'colaborador 2', id: 'i2'},
    {name: 'colaborador 3', id: 'i3'},
    {name: 'colaborador 4', id: 'i4'},
    {name: 'colaborador 5', id: 'i5'},
    {name: 'colaborador 6', id: 'i6'},
    {name: 'colaborador 7', id: 'i7'},
    {name: 'colaborador 8', id: 'i8'}
  ]);
  const [originalItemsCom, setOriginalItemsCom] = useState([
    {name: 'comunidad 1', id: 'i9'},
    {name: 'comunidad 2', id: 'i21'},
    {name: 'comunidad 3', id: 'i12'},
    {name: 'comunidad 4', id: 'i24'},
    {name: 'comunidad 5', id: 'i15'},
    {name: 'comunidad 6', id: 'i26'},
    {name: 'comunidad 7', id: 'i17'},
    {name: 'comunidad 8', id: 'i28'}
  ]);

  const [originalItems, setOriginalItems] = useState(originalItemsCol);
  const [items, setItems] = useState(originalItems);

  const onFilterChanged = (_: any, text: string | undefined): void => {
    if (text) {
      setItems(originalItems.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0));
    };
  };

  useEffect(() => {
    
    if (lastHeader?.props.headerText === 'Comunidad') {
      setOriginalItems(originalItemsCom)
      setItems(originalItemsCom)
    } else {
      setOriginalItems(originalItemsCol)
      setItems(originalItemsCol)

    }
  }, [lastHeader, originalItemsCol, originalItemsCom]);

  const hoverHandler = useCallback((isHover: boolean, indexButton: number) => {
    if (isHover) {
      if (indexButton === 0) {
        setHoverLogout('Logout-hover')
      } else {
        setHoverLink('Logout-hover')
      }
    } else {
      if (indexButton === 0) {
        setHoverLogout('Logout')
      } else {
        setHoverLink('Logout')
      }
    }
  }, []);

  const handleDelete = (id: string| undefined) => {
    const updatedList = items.filter((item) => item.id !== id);
    setItems(updatedList);
    setOriginalItems(updatedList);
    console.log(updatedList);
    if (lastHeader?.props.headerText === 'Comunidad') {
      setOriginalItemsCom(updatedList);
    } else {
      setOriginalItemsCol(updatedList);
    }
  };

  const onRenderCell = (item: IItem| undefined, index: number | undefined): JSX.Element => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item?.name}</div>
          <IconButton aria-label="delete" onClick={() => handleDelete(item?.id) }>
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  let theme = createTheme({
    palette: {
      primary: {
        main: '#029D3A',
      },
      secondary: {
        main: '#EF8018',
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <div className="Turn-change">
        <img alt='logo de banco de alimentos' className='Admin-img' src={logo}/>
        <div className='Container'>
          <div className="Button-container">
            <BarButton 
            onClick={handleOpenL}
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
            open={openL}
            onClose={handleCloseL}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <IconButton onClick={handleCloseL} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <LinkTextField id="outlined-basic" color='secondary' label="Nuevo link de Google Sheets" variant="outlined" />
                <LinkButton onClick={handleCloseL}>
                  Confirmar
                </LinkButton>
              </Box>
            </Modal>
          </div>
          <div className="Container-body">
            <Text className='h1-admin'> Colaboradores actuales</Text>
            <div className='Container-bar'>
            <SearchBox 
              iconProps={iconProps} 
              className={classNames.search}
              onEscape={ev => setItems(originalItems)}
              onClear={ev => setItems(originalItems)}
              onChange={(_, newValue) => onFilterChanged( _, newValue)}
              />
              <Pivot linkFormat="tabs" onLinkClick={setLastHeader}>
                <PivotItem headerText="Colaboradores">
                </PivotItem>
                <PivotItem headerText="Comunidad">
                </PivotItem>
              </Pivot>
            </div>
            <div className='Container-table'>
              <div className='Table-left' >
              <List className='List' items={items} onRenderCell={onRenderCell} />
              </div>
            <div className='Table-right'>
              <CreateButton onClick={handleOpenC}>
                Crear {lastHeader ? (lastHeader.props.headerText) : ("Colaboradores")}
              </CreateButton>
              <Modal
                open={openC}
                onClose={handleCloseC}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <IconButton onClick={handleCloseC} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <LinkTextField id="outlined-basic" color='primary' label={lastHeader ? (lastHeader.props.headerText === "Comunidad" ? ("Clave de comunidad"): ("Clave de colaborador")) : ("Clave de usuario")} variant="outlined" />
                    <LinkTextField id="outlined-basic" color='primary' label={lastHeader ? (lastHeader.props.headerText === "Comunidad" ? ("Nombre de comunidad"): ("Contraseña")) : ("Contraseña")} variant="outlined" />
                    <CreateButton onClick={handleCloseC}>
                      Crear
                    </CreateButton>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default AdminTable;