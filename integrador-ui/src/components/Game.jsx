import React, { useState } from 'react'

const Game = (props) => {
/*TODO
 Agregar componentes
    Status oponente: define si se juega contra cpu u otro jugador
    Barra de opciones con botones
    Area de player: contador de victorias, ultima opcion elegida
    Area de CPU/otro player: idem a player
    Area con numero de partidas jugadas, empates
    Boton de reiniciar contadores
    boton volver a menu
    popup/alerta que simule espera; puede servir como 'cortina' para vs local
    popup/alerta que muestre quien gano y pregunte si se quiere continuar jugando
 */

const [player1, setPlayer1] = useState({
    choice : null,
    wins : 0
  })
  const [player2, setPlayer2] = useState({
    playerChoice : null,
    wins : 0
  })
  const [gameData, setGameData] = useState({
      currentPlayer : player1,
      gamesPlayed : 0,
      winner : null,
  })

  const options = ["rock", "paper", "scissors", "lizard", "Spock"];

  const vsPlayer = props.location.state.vsPlayer; // false = vsCpu, true = vsPlayer

  const winner = () => {
      if(player1.playerChoice == player2.playerChoice) {
          return "Draw"
      }
      if (player1Victory) {
        return "Player 1"
      } else {
          return "Player 2"
      }
  }

  const player1Victory = () => {
    return (player1.choice  == "rock" && (player2.choice == "scissors" || player2.choice == "lizard"))
    || (player1.choice == "paper" && (player2.choice == "rock" || player2.choice == "Spock"))
    || (player1.choice == "scissors" && (player2.choice == "paper" || player2.choice == "lizard"))
    || (player1.choice == "lizard" && (player2.choice == "Spock" || player2.choice == "paper"))
    || (player1.choice == "Spock" && (player2.choice == "rock") || player2.choice == "scissors") 
  }
   
  const play = (event) => {
    event.preventDefault();

    let choosen = event.target.value
    console.log(choosen)
    console.log()

    if (vsPlayer) {
      setGameData({...gameData, currentPlayer : player2})
      setPlayer1({...player1, playerChoice : choosen})
    } else {
      setPlayer2({...player2, playerChoice : pcChoice()})
    }

  }

  const pcChoice = () => {
    return options[Math.floor(Math.random() * options.length)];
  }

  const reset = () => {
    setGameData({...gameData, currentPlayer : player1})
    setPlayer1({...player1, playerChoice : null})
    setPlayer2({...player1, playerChoice : null})
  }

    return (
        <div className="container">
          <form onSubmit={play}>
          <div className="row">
            <div className="col-xs-1" align="center">
              {options.map((option) =>
                <>
                <input type="radio" id={option} name="choice" value={option}/>
                <label for={option}>{option}</label>
                </>
              )}
            </div>
          </div>
          <div className="row">
                <input on type="submit" value="Submit"></input>
          </div>
          </form>
          <div> {!!winner ? winner() : "Waiting" } </div>
          <div> {!!player1.choice ? player1.choice : "Waiting p1"} </div>
          <div> {!!player2.choice ? player2.choice : "Waiting p2"} </div>
          <button onClick={reset}>Reset</button>
        </div>
    )

}

export default Game;