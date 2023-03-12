import { getFocusStyle, getTheme, ITheme, List, mergeStyleSets, Pivot, PivotItem, TextField } from '@fluentui/react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactNode, useCallback, useState } from "react";
import { ReactComponent as LinkIcon } from '../../Assets/Icon_link.svg';
import { ReactComponent as LogoutIcon } from '../../Assets/Icon_logout.svg';
import SearchIcon from '../../Assets/Icon_search.svg';
import { ReactComponent as TrashIcon } from '../../Assets/Icon_trash.svg';
import logo from '../../Assets/Logo_bamx.svg';
import './AdminTable.css';

const iconProps = { iconName: 'Search Icon', ariaLabel: SearchIcon };
const theme: ITheme = getTheme();

type IItem = {
  name: string;
  id: string;
};


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

const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme),
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
        color: 'white',
        backgroundColor: '#FFD5AD',
        borderRadius: '14px',
      },
      div: {
        borderRadius: '14px',
        border: '0px',
        color: 'white',

      },
    width: '40vw',
    }
  ],
});

function AdminTable() {
  // const resultCountText =
  //   items.length === originalItems.length ? '' : ` (${items.length} of ${originalItems.length} shown)`;

  // const onFilterChanged = (_: any, text: string): void => {
  //   setItems(originalItems.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0));
  // };

  const [hoverLogout, setHoverLogout] = useState('Logout');
  const [hoverLink, sethoverLink] = useState('Logout');
  const [pivot, setPivot] = useState(true);


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

  const itemList: IItem[] = [
    {name: 'c1', id: 'i1'},
    {name: 'c2', id: 'i2'},
    {name: 'c1', id: 'i1'},
    {name: 'c2', id: 'i2'},
    {name: 'c1', id: 'i1'},
    {name: 'c2', id: 'i2'},
    {name: 'c1', id: 'i1'},
    {name: 'c2', id: 'i2'}
  ];

  const onRenderCell = (item: IItem| undefined, index: number | undefined): JSX.Element => {
    return (
      <div className={classNames.itemCell} data-is-focusable={true}>
        <div className={classNames.itemContent}>
          <div className={classNames.itemName}>{item?.name}</div>
          <IconButton aria-label="delete">
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    );
  };

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
          <div className='Container-bar'>
            <TextField
              iconProps={iconProps}
              className={classNames.search}
              placeholder={ 'Buscar'} //+ resultCountText}
              //onChange={onFilterChanged}
            />
            <Pivot linkFormat="tabs">
              <PivotItem headerText="Colaboradores">
              </PivotItem>
              <PivotItem headerText="Comunidad">
              {console.log('ayuda') as ReactNode}
              </PivotItem>
            </Pivot>
          </div>
          <div className='Container-table'>
            <div className='Table-left' >
            <List className='List' items={itemList} onRenderCell={onRenderCell} />
            </div>
          <div className='Table-right'>
            <CreateButton>
              Crear {pivot.toString()}
            </CreateButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminTable;