import React from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import './TurnTable.css';

const currentDate = new Date()
var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const hour = currentDate.getHours()
const minute = currentDate.getMinutes()
const numDay = currentDate.getUTCDay()
const month =  months[currentDate.getMonth()]
const day = days[currentDate.getDay()]

function TurnTable() {

  return (
    <div className="Root-Container">
      <div className="Container">
        <div className="Left-Container">
          <h2>En atención</h2>
          <div className="Attention-Box-One">
            <h3>Turno 1</h3>
            <h3>Caja A</h3>
          </div>
          <div className="Attention-Box-Two">
            <h3>Turno 2</h3>
            <h3>Caja A</h3>
          </div>
          <div className="Attention-Box-One">
            <h3>Turno 3</h3>
            <h3>Caja A</h3>
          </div>
          <div className="Attention-Box-Two">
            <h3>Turno 4</h3>
            <h3>Caja A</h3>
          </div>
          <div className="Attention-Box-One">
            <h3>Turno 5</h3>
            <h3>Caja A</h3>
          </div>
        </div>
        <div className="Right-Container">
          <div className="Title-Container">
            <h2>Nombre de comunidad</h2>
            <h2>Turno</h2>
          </div>
          <div className="Attention-Box-Three">
            <h3>Comunidad A</h3>
            <h3>1</h3>
          </div>
          <div className="Attention-Box-Four">
            <h3>Comunidad B</h3>
            <h3>2</h3>
          </div>
          <div className="Attention-Box-Three">
            <h3>Comunidad C</h3>
            <h3>3</h3>
          </div>
        </div>
      </div>
      <img src={logo}/>
    </div>
  );
}

export default TurnTable;