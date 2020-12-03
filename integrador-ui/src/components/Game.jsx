import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const Game = (props) => {

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

  const [gameStatus, setGameStatus] = useState("Waiting for Player 1")

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
          setGameStatus("Draw")
          return;
      } else if (value) {
        setGameData({...gameData, winner : "Player 1", gamesPlayed : played + 1})
        setPlayer1({...player1, wins : player1.wins + 1});
        if(vsPlayer) {
          setGameStatus("Player 1 wins!")
        } else {
          setGameStatus("You win!")
        }
      } else {
        setGameData({...gameData, winner : "Player 2", gamesPlayed : played + 1})
        setPlayer2({...player2, wins : player2.wins + 1});
        if(vsPlayer) {
          setGameStatus("Player 2 wins!")
        } else {
          setGameStatus("CPU wins!")
        }
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
      setGameStatus("Waiting for Player 2")
      
    } else {
      let computerChoice = pcChoice();

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
    setGameStatus("Waiting for Player 1")
  }

  const playAgain = () => {
    setGameData({...gameData, currentPlayer : "player 1", winner: null});
    setPlayer1({...player1, choice : null});
    setPlayer2({...player2, choice : null});
    setGameInProgress(true);
    setGameStatus("Waiting for Player 1")
  }

  const showRules = () => {
    Swal.fire({
      
      title : "Rules", 
      html : "Scissors cuts Paper, <br>Paper covers Rock, <br>Rock crushes Lizard," +
      "<br>Lizard poisons Spock, <br>Spock smashes Scissors, <br>Scissors decapitates Lizard," + 
      " <br>Lizard eats Paper, <br>Paper disproves Spock, <br>Spock vaporizes Rock, <br>Rock crushes Scissors."
    })
  }

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <Link className="navbar-brand" to="/main">Return to main menu</Link>
        </nav>

        <div className="container-fluid">
          <div className="row justify-content-center align-items-end bg-info">
              <figure className="">
                <button type="button" className="btn btn-circle border-right" disabled={!gameInProgress} onClick={ () => handleChoose({option : "rock"})}>
                <img src="choices/rock.png" alt="rock" width="100" heigh="100"/></button>
                <figcaption align="center"><b>rock</b></figcaption>
              </figure>
              <figure>
                <button type="button" className="btn btn-circle border-right" disabled={!gameInProgress} onClick={ () => handleChoose({option : "paper"})}>
                <img src="choices/paper.png" alt="paper" width="100" heigh="100" /></button>
                <figcaption align="center" ><b>paper</b></figcaption>
              </figure>
              <figure>
                <button type="button" className="btn btn-circle border-right" disabled={!gameInProgress} onClick={ () => handleChoose({option : "scissors"})}>
                <img src="choices/scissors.png" alt="scissors" width="100" heigh="100" /></button>
                <figcaption align="center"><b>scissors</b></figcaption>
              </figure>
              <figure className="">
                <button type="button" className="btn btn-circle border-right" disabled={!gameInProgress} onClick={ () => handleChoose({option : "lizard"})}>
                <img src="choices/lizard.png" alt="lizard" width="100" heigh="100" /></button>
                <figcaption align="center"><b>lizard</b></figcaption>
              </figure>
              <figure>
                <button type="button" className="btn btn-circle" disabled={!gameInProgress} onClick={ () => handleChoose({option : "Spock"})}>
                <img src="choices/Spock.png" alt="Spock" width="100" heigh="100" /></button>
                <figcaption align="center"><b>Spock</b></figcaption>
              </figure>
          </div>

          <div className="row justify-content-center">
            <div>{gameStatus}</div>
          </div>

          <div className="row">
            <div className="col-xs col-sm col-md col-lg" align="center">
              P1 Score: {player1.wins}
              <br/>
              Player 1 choose: {player1.choice}
            </div>
            <div className="col-xs col-sm col-md col-lg" align="center">
              P2 Score: {player2.wins}
              <br/>
              Player 2 choose: {player2.choice}
            </div>
          </div>
          
          <div className="row justify-content-center">
            <button className="btn btn-primary m-5" onClick={playAgain} disabled={gameInProgress}>Continue</button>
            <button className="btn btn-danger m-5" onClick={reset}>Reset</button>
          </div>

          <div className="row justify-content-center">
            <button className="btn btn-info" onClick={showRules}>Rules</button>
          </div>

        </div>
      </>
    )

}

export default Game;