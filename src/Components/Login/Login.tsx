import TextField from '@mui/material/TextField';
import logo from '../../Assets/Logo_tilted.svg';
import './Login.css';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
    margin: 100,
  },
  //style for font size
  resize:{
    fontFamily: [
      'DM Sans',
      'sans-serif',
    ],
  },
}

function Login() {

  return (
    <div className="Container">
      <div className="Left-container">
        <img src={logo}/>
      </div>
      <div className="Right-container">
        <h1> Ingresa con tu ID </h1>
        <TextField id="outlined-basic" label="ID" variant="outlined" color='secondary' className='TextField'/>
        <TextField id="outlined-basic" label="Contraseña" variant="outlined" color='secondary' className='TextField' inputProps={styles.resize}/>
      </div>
    </div>
  );
}

export default Login;