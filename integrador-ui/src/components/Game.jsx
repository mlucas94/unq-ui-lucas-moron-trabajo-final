import React, { useState, useEffect } from 'react'

const Game = (props) => {
/*TODO
 Agregar componentes
    Status oponente: define si se juega contra cpu u otro jugador
    Barra de opciones con botones
    Area de player: contador de victorias, ultima opcion elegida
    Area de CPU/otro player: idem a player
    Area con numero de partidas jugadas
    Boton de reiniciar contadores
    boton volver a menu
    popup/alerta que simule espera; puede servir como 'cortina' para vs local
    popup/alerta que muestre quien gano y pregunte si se quiere continuar jugando
 */

 //TODO 1/12 Agregar un hook sesion que sirva para diferenciar si se esta jugando o se termino
 //Alt: Bloquear botones cuando el jugador 2 hace su eleccion o ponercurrent player en null
 


const [player1, setPlayer1] = useState({
    choice : null,
    wins : 0
  })

  const [player2, setPlayer2] = useState({
    choice : null,
    wins : 0
  });

  const [gameData, setGameData] = useState({
      currentPlayer : "player 1",
      gamesPlayed : 0,
      winner : null,
      victoryConditionP1 : [[2,3], [0,4], [1,3], [1,4], [0,2]]
      //Cada lista corresponde a las opciones que pierden frente al de esa posicion en la lista options
      //Ej. index 0 = roca, gana frente a index 2 y 3, tijera y lagarto
  })

  const [gameInProgress, setGameInProgress] = useState(true)

  const options = ["rock", "paper", "scissors", "lizard", "Spock"];

  const vsPlayer = props.location.state.vsPlayer; // false = vsCpu, true = vsPlayer

  //https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
  useEffect(() => {
    if(player2.choice && player1.choice) {
      winner();
    }
  },[player2.choice])

  useEffect(() => {
    if(player1.choice) {
      play();
    }
  },[player1.choice])

  const winner = () => {

      setGameInProgress(false);

      let value = player1Victory();

      let played = gameData.gamesPlayed;
      
      if(player1.choice == player2.choice) {
          setGameData({...gameData, winner : "Draw", gamesPlayed : played + 1})
          return;
      } else if (value) {
        setGameData({...gameData, winner : "Player 1", gamesPlayed : played + 1})
        setPlayer1({...player1, wins : player1.wins + 1});
      } else {
        setGameData({...gameData, winner : "Player 2", gamesPlayed : played + 1})
        setPlayer2({...player2, wins : player2.wins + 1});
      }
  }

  const player1Victory = () => {
    //Cambiar por matriz de resultados
    const indexP1 = options.indexOf(player1.choice)
    const indexP2 = options.indexOf(player2.choice)
    console.log("..........")
    console.log(indexP1)
    console.log("..........")
    console.log(indexP2)
    console.log("..........")
    let value = gameData.victoryConditionP1[indexP1].includes(indexP2)
    return value
  }

  const handleChoose = (choice) => {

    console.log("&&&&&&&&&")
    console.log(choice.option)
    
    if(gameData.currentPlayer == "player 1") {
      setPlayer1({...player1, choice : choice.option})
    } else {
      setPlayer2({...player2, choice : choice.option})
    }
  }
   
  const play = () => {

    //Usar un switch para agregar casos de 2 jugadores
    if (vsPlayer) {
      setGameData({...gameData, currentPlayer : "player 2"})
      
    } else {
      let computerChoice = pcChoice()
      console.log("computerChoice is")
      console.log(computerChoice)
      setPlayer2({
        ...player2,
        choice : computerChoice
      })
      console.log(player2.choice)
    }

  }

  const pcChoice = () => {
    return options[Math.floor(Math.random() * options.length)];
  }

  const reset = () => {
    setGameData({...gameData, currentPlayer : "player 1", winner: null, gamesPlayed : 0})
    setPlayer1({...player1, choice : null, wins: 0})
    setPlayer2({...player1, choice : null, wins: 0})
    setGameInProgress(true);
  }

  const playAgain = () => {
    setGameData({...gameData, currentPlayer : "player 1", winner: null});
    setPlayer1({...player1, choice : null});
    setPlayer2({...player2, choice : null});
    setGameInProgress(true);
  }

    return (
        <div className="container-fluid">
          <div className="row d-flex justify-content-center align-items-end bg-info">
              <figure>
                <figcaption align="center">rock</figcaption>
                <button type="button" className="btn btn-circle border" disabled={!gameInProgress} onClick={ () => handleChoose({option : "rock"})}>
                <img src="choices/rock.png" alt="rock" width="50" heigh="50"/></button>
                <figcaption align="center">rock</figcaption>
              </figure>
              <figure>
                <figcaption align="center" >paper</figcaption>
                <button type="button" className="btn btn-circle border" disabled={!gameInProgress} onClick={ () => handleChoose({option : "paper"})}>
                <img src="choices/paper.png" alt="paper" width="50" heigh="50" /></button>
                <figcaption align="center" >paper</figcaption>
              </figure>
              <figure>
                <figcaption align="center">scissors</figcaption>
                <button type="button" className="btn btn-circle border" disabled={!gameInProgress} onClick={ () => handleChoose({option : "scissors"})}>
                <img src="choices/scissors.png" alt="scissors" width="50" heigh="50" /></button>
                <figcaption align="center">scissors</figcaption>
              </figure>
              <figure>
                <figcaption align="center">lizard</figcaption>
                <button type="button" className="btn btn-circle border" disabled={!gameInProgress} onClick={ () => handleChoose({option : "lizard"})}>
                <img src="choices/lizard.png" alt="lizard" width="50" heigh="200" /></button>
                <figcaption align="center">lizard</figcaption>
              </figure>
              <figure>
                <figcaption align="center">Spock</figcaption>
                <button type="button" className="btn btn-circle border" disabled={!gameInProgress} onClick={ () => handleChoose({option : "Spock"})}>
                <img src="choices/Spock.png" alt="Spock" width="50" heigh="50" /></button>
                <figcaption align="center">Spock</figcaption>
              </figure>
          </div>
          <div> {!!gameData.winner ? gameData.winner : "Waiting" } </div>
          <div> {gameData.gamesPlayed} </div>
          <div> {player1.wins} </div>
          <div> {!!player2.choice ? player2.choice : "Waiting p2"} </div>
          <div> {player2.wins} </div>
          <button onClick={playAgain} disabled={gameInProgress}>Continue</button>
          <button onClick={reset} disabled={gameInProgress}>Reset</button>
        </div>
    )

}

export default Game;