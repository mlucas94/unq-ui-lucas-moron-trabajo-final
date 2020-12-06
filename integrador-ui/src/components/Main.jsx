import React from 'react'
import { Link } from 'react-router-dom';
import "./Style.css";

const Main = () => {
    return (
    <div className="main-div bg-light" align="center">
        <div className="p-4" >
            <h1>Rock Paper Scisors Lizard Spock</h1>
            <b>A react version of the game popularized by The Big Bang Theory</b>
        </div>
        <Link className="btn btn-primary m-2" to={{pathname: `/game`, state:{vsPlayer : false}}}>Singleplayer</Link>
        <br/>
        <Link className="btn btn-danger m-2" to={{pathname: `/game`, state:{vsPlayer : true}}}>Local Multiplayer</Link>
        <br/>
        <a className="btn btn-info m-2" target="_blank" href="http://www.samkass.com/theories/RPSSL.html">About RPSSL</a>
        <br/>
        <img alt="rpssl" src="pptls.png" width="300" height="300" />
    </div>
    )
}

export default Main;