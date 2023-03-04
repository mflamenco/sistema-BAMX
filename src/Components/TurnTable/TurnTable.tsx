import React from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import './TurnTable.css';

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
        </div>
      </div>
      <div className="Date-Container">

      </div>
      <img src={logo}/>
    </div>
  );
}

export default TurnTable;