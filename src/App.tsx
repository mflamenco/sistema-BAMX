import './App.css';
import TurnChange from './Components/TurnChange/TurnChange';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Components/Login/Login';
import RegisterCommunity from './Components/RegisterCommunity/RegisterCommunity';
import TurnTable from './Components/TurnTable/TurnTable';
import WindowSelection from './Components/WindowSelection/WindowSelection';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='/tabla-de-turnos' element={<TurnTable/>}/>
          <Route path='/registrar-comunidad' element={<RegisterCommunity/>}/>
          <Route path='/seleccion-de-caja' element={<WindowSelection/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;