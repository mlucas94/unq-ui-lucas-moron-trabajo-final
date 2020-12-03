import React from 'react'
import { Link } from 'react-router-dom';

//TODO: Agregar boton de 'nuevo juego/vs computadora', redireccionar game
//TODO: imagen con instrucciones basicas. 
//TODO: Link a pagina del piedra papel tijera lagarto spock
//TODO EXTRA: Agregar boton modo hot-seat/2 jugadores local.


const Main = () => {
    return (
    <div align="center">
        <h1 className="p-5">Rock Paper Scisors Lizard Spock</h1>
        <Link className="btn btn-primary m-2" to={{pathname: `/game`, state:{vsPlayer : false}}}>Singleplayer</Link>
        <br/>
        <Link className="btn btn-danger m-2" to={{pathname: `/game`, state:{vsPlayer : true}}}>Local Multiplayer</Link>
        <br/>
        <a className="btn btn-info m-2" target="_blank" href="http://www.samkass.com/theories/RPSSL.html">About RPSSL</a>
    </div>
    )
}

export default Main;