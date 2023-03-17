import './TurnTable.css';
import React, {useState, useEffect} from 'react';
import logo from '../../Assets/Logo_bamx.svg';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { ListItem } from '@mui/material';

const currentDate = new Date()
var days = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

type NextItem = {
  community: string;
  turn: string;
};

type CurrentItem = {
  turn: string;
  window: string;
};

type listItem = {
  id: number;
  numero: number;
  comunidad: number;
  nombre_comunidad: string;
  caja: number;
  en_atencion: boolean;
};

function TurnTable() {

  const [dateState, setDateState] = useState(new Date())

  const [boxOneOnAtt, setBoxOneOnAtt] = useState("")
  const [boxTwoOnAtt, setBoxTwoAtt] = useState("")
  const [boxThreeOnAtt, setBoxThreeOnAtt] = useState("")
  const [boxFourOnAtt, setBoxFourAtt] = useState("")
  const [boxFiveOnAtt, setBoxFiveOnAtt] = useState("")
  const [boxSixNext, setBoxSixNext] = useState("")
  const [boxSevenNext, setBoxSevenNext] = useState("")
  const [boxEightNext, setBoxEightNext] = useState("")

  const [boxOneOnAttWindow, setBoxOneOnAttWindow] = useState("")
  const [boxTwoOnAttWindow, setBoxTwoOnAttWindow] = useState("")
  const [boxThreeOnAttWindow, setBoxThreeOnAttWindow] = useState("")
  const [boxFourOnAttWindow, setBoxFourOnAttWindow] = useState("")
  const [boxFiveOnAttWindow, setBoxFiveOnAttWindow] = useState("")
  const [boxSixNextTurn, setBoxSixNextTurn] = useState("")
  const [boxSevenNextTurn, setBoxSevenNextTurn] = useState("")
  const [boxEightNextTurn, setBoxEightNextTurn] = useState("")

  const [token] = useState(localStorage.getItem('user-token') || null)
  const api = 'https://bamx-cxehn.ondigitalocean.app/'
  const [nextTurns, setNextTurns] = useState<NextItem[]>([])
  const [onAtentionTurns, setAttention] = useState<CurrentItem[]>([])

  const [completeList, setCompleteList] = useState<listItem[]>([])

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  useEffect(() => {
    setInterval(() => updateTurnos(), 1000);
  }, []);

  useEffect(() => {
    updateTable()
  }, [completeList]);


  function getWindowNumber(window: Number){
    if(window === 1){
      return "Caja A"
    } else if (window === 2){
      return "Caja B"
    } else if (window === 3){
      return "Caja C"
    } else if (window === 4){
      return "Caja D"
    }
    return "Caja E"
  }

  function updateTable(){
    getAttentionTurn()
    getAttentionWindow()
    getNextCommunity()
    getNextTurn()
  }


  function updateTurnos(){
    axios.get(api + "turnos/",
    {
      headers: {Authorization : `token ${token}`}
    })
    .then( result => {
      let tempComplete: listItem[] = []
      let tempNextList: NextItem[] = []
      let tempAttentionList: CurrentItem[] = []
      for(let i = 0; i < result.data.length; i++){
        tempComplete.push({id: result.data[i].id, numero: result.data[i].numero, comunidad: result.data[i].comunidad, nombre_comunidad: result.data[i].nombre_comunidad, caja: result.data[i].caja, en_atencion: result.data[i].en_atencion})
        if(result.data[i].en_atencion){
          tempAttentionList.push({turn: String(result.data[i].numero), window: String(getWindowNumber(result.data[i].caja))})
        } else {
          tempNextList.push({community: String(result.data[i].nombre_comunidad), turn: String(result.data[i].numero)})
        }
      }

      console.log(tempComplete)
      console.log(completeList)

      console.log(completeList !== tempComplete)
      console.log(completeList.length === 0)

      if(completeList.length === 0 || completeList !== tempComplete){
        console.log("ola")
        setCompleteList(tempComplete)
        setNextTurns(tempNextList)
        setAttention(tempAttentionList)
      }

    })
    .catch( error => {
      console.log(error)
    })
  }

  function getAttentionTurn(){
    console.log(onAtentionTurns)
    const boxContainer = document.getElementById("box-one") as HTMLInputElement;
    const box2Container = document.getElementById("box-two") as HTMLInputElement;
    const box3Container = document.getElementById("box-three") as HTMLInputElement;
    const box4Container = document.getElementById("box-four") as HTMLInputElement;
    const box5Container = document.getElementById("box-five") as HTMLInputElement;

    if(onAtentionTurns.length > 0){
      if(boxContainer == null){
        return
      }
      if(onAtentionTurns[0] != null){
        boxContainer.style.visibility = "visible"
        setBoxOneOnAtt("Turno " + String(onAtentionTurns[0].turn))
      } else{
        boxContainer.style.visibility = "hidden"
      }
      if(onAtentionTurns[1] != null){
        box2Container.style.visibility = "visible"
        setBoxTwoAtt("Turno " + String(onAtentionTurns[1].turn))
      } else{
        box2Container.style.visibility = "hidden"
      }
      if(onAtentionTurns[2] != null){
        box3Container.style.visibility = "visible"
        setBoxThreeOnAtt("Turno " + String(onAtentionTurns[2].turn))
      } else{
        box3Container.style.visibility = "hidden"
      }
      if(onAtentionTurns[3] != null){
        box4Container.style.visibility = "visible"
        setBoxFourAtt("Turno " + String(onAtentionTurns[3].turn))
      } else{
        box4Container.style.visibility = "hidden"
      }
      if(onAtentionTurns[4] != null){
        box5Container.style.visibility = "visible"
        setBoxFiveOnAtt("Turno " + String(onAtentionTurns[4].turn))
      } else{
        box5Container.style.visibility = "hidden"
      }
      
    } else{
      boxContainer.style.visibility = "hidden"
      box2Container.style.visibility = "hidden"
      box3Container.style.visibility = "hidden"
      box4Container.style.visibility = "hidden"
      box5Container.style.visibility = "hidden"
    }
  }

  function getAttentionWindow(){
    if(onAtentionTurns.length > 0){
      if(onAtentionTurns[0] != null){
        setBoxOneOnAttWindow(onAtentionTurns[0].window)
      }
      if(onAtentionTurns[1] != null){
        setBoxTwoOnAttWindow(onAtentionTurns[1].window)
      }
      if(onAtentionTurns[2] != null){
        setBoxThreeOnAttWindow(onAtentionTurns[2].window)
      }
      if(onAtentionTurns[3] != null){
        setBoxFourOnAttWindow(onAtentionTurns[3].window)
      }
      if(onAtentionTurns[4] != null){
        setBoxFiveOnAttWindow(onAtentionTurns[4].window)
      }
      
    }
  }

  function getNextCommunity(){
    console.log(nextTurns)
    const boxContainer = document.getElementById("box-six") as HTMLInputElement;
    const box2Container = document.getElementById("box-seven") as HTMLInputElement;
    const box3Container = document.getElementById("box-eight") as HTMLInputElement;

    if(nextTurns.length > 0){
      if(boxContainer == null){
        return
      }
      if(nextTurns[0] != null){
        boxContainer.style.visibility = "visible"
        setBoxSixNext(nextTurns[0].community)
      } else{
        boxContainer.style.visibility = "hidden"
      }
      if(nextTurns[1] != null){
        box2Container.style.visibility = "visible"
        setBoxSevenNext(nextTurns[1].community)
      } else{
        box2Container.style.visibility = "hidden"
      }
      if(nextTurns[2] != null){
        box3Container.style.visibility = "visible"
        setBoxEightNext(nextTurns[2].community)
      } else{
        box3Container.style.visibility = "hidden"
      }
      
    } else{
      boxContainer.style.visibility = "hidden"
      box2Container.style.visibility = "hidden"
      box3Container.style.visibility = "hidden"
    }
  }

  function getNextTurn(){ 
    if(nextTurns.length > 0){
      if(nextTurns[0] != null){
        setBoxSixNextTurn(String(nextTurns[0].turn))
      }
      if(nextTurns[1] != null){
        setBoxSevenNextTurn(String(nextTurns[1].turn))
      }
      if(nextTurns[2] != null){
        setBoxEightNextTurn(String(nextTurns[2].turn))
      }
      
    }
  }

  if(!token){
    return <Navigate to="/"/>
  }

  return (
    <div className="Turn-root-container">
      <img className="Turn-img" src={logo}/>
      <div className="Turn-info-container">
        <div className="Turn-container">
          <div className="Turn-left-container" >
            <h2 className="Turn-h2">En atención</h2>
            <div className="Attention-box-one" id='box-one'>
              <h3 className="Turn-h3" >{boxOneOnAtt}</h3>
              <h3 className="Turn-h3">{boxOneOnAttWindow}</h3>
            </div>
            <div className="Attention-box-two" id='box-two'>
              <h3 className="Turn-h3">{boxTwoOnAtt}</h3>
              <h3 className="Turn-h3">{boxTwoOnAttWindow}</h3>
            </div>
            <div className="Attention-box-one" id='box-three'>
              <h3 className="Turn-h3">{boxThreeOnAtt}</h3>
              <h3 className="Turn-h3">{boxThreeOnAttWindow}</h3>
            </div>
            <div className="Attention-box-two" id='box-four'>
              <h3 className="Turn-h3">{boxFourOnAtt}</h3>
              <h3 className="Turn-h3">{boxFourOnAttWindow}</h3>
            </div>
            <div className="Attention-box-one" id='box-five'>
              <h3 className="Turn-h3">{boxFiveOnAtt}</h3>
              <h3 className="Turn-h3">{boxFiveOnAttWindow}</h3>
            </div>
          </div>
          <div className="Turn-right-container">
            <div className="Turn-title-container">
              <h2 className="Turn-h2">Nombre de comunidad</h2>
              <h2 className="Turn-h2">Turno</h2>
            </div>
            <div className="Attention-box-three" id='box-six'>
              <h3 className="Turn-h3">{boxSixNext}</h3>
              <h3 className="Turn-h3">{boxSixNextTurn}</h3>
            </div>
            <div className="Attention-box-four" id='box-seven'>
              <h3 className="Turn-h3">{boxSevenNext}</h3>
              <h3 className="Turn-h3">{boxSevenNextTurn}</h3>
            </div>
            <div className="Attention-box-three" id='box-eight'>
              <h3 className="Turn-h3">{boxEightNext}</h3>
              <h3 className="Turn-h3">{boxEightNextTurn}</h3>
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