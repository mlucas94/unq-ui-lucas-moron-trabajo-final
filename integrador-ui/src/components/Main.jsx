import React from 'react'
import { Link } from 'react-router-dom';

//TODO: Agregar boton de 'nuevo juego/vs computadora', redireccionar game
//TODO: imagen con instrucciones basicas. 
//TODO: Link a pagina del piedra papel tijera lagarto spock
//TODO EXTRA: Agregar boton modo hot-seat/2 jugadores local.


const Main = () => {
    return (
    <div>
        <h1>Main Page/Menu</h1>
        <Link className="btn btn-primary" to={{pathname: `/game`, state:{vsPlayer : false}}}>Singleplayer</Link>
        <br/>
        <Link className="btn btn-danger" to={{pathname: `/game`, state:{vsPlayer : true}}}>Local Multiplayer</Link>
    </div>
    )
}

export default Main;