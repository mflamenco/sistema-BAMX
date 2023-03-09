import './TurnTable.css';
import React, {useState, useEffect} from 'react';
import logo from '../../Assets/Logo_bamx.svg';

const currentDate = new Date()
var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function TurnTable() {
  const [dateState, setDateState] = useState(new Date())
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
}, []);

  return (
    <div className="Turn-root-container">
      <img className="Turn-img" src={logo}/>
      <div className="Turn-info-container">
        <div className="Turn-container">
          <div className="Turn-left-container">
            <h2 className="Turn-h2">En atención</h2>
            <div className="Attention-box-one">
              <h3 className="Turn-h3">Turno 1</h3>
              <h3 className="Turn-h3">Caja A</h3>
            </div>
            <div className="Attention-box-two">
              <h3 className="Turn-h3">Turno 2</h3>
              <h3 className="Turn-h3">Caja A</h3>
            </div>
            <div className="Attention-box-one">
              <h3 className="Turn-h3">Turno 3</h3>
              <h3 className="Turn-h3">Caja A</h3>
            </div>
            <div className="Attention-box-two">
              <h3 className="Turn-h3">Turno 4</h3>
              <h3 className="Turn-h3">Caja A</h3>
            </div>
            <div className="Attention-box-one">
              <h3 className="Turn-h3">Turno 5</h3>
              <h3 className="Turn-h3">Caja A</h3>
            </div>
          </div>
          <div className="Turn-right-container">
            <div className="Turn-title-container">
              <h2 className="Turn-h2">Nombre de comunidad</h2>
              <h2 className="Turn-h2">Turno</h2>
            </div>
            <div className="Attention-box-three">
              <h3 className="Turn-h3">Comunidad A</h3>
              <h3 className="Turn-h3">1</h3>
            </div>
            <div className="Attention-box-four">
              <h3 className="Turn-h3">Comunidad B</h3>
              <h3 className="Turn-h3">2</h3>
            </div>
            <div className="Attention-box-three">
              <h3 className="Turn-h3">Comunidad C</h3>
              <h3 className="Turn-h3">3</h3>
            </div>
          </div>
        </div>
        <div className="Turn-date-container">
          <h1 className="Turn-h1">
              {days[currentDate.getDay()]}
          </h1>
          <h1 className="Turn-h1">
              {dateState.getDate()} de {months[dateState.getMonth()]}
          </h1>
          <h1 className="Turn-h1">
              {dateState.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
              })}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TurnTable;