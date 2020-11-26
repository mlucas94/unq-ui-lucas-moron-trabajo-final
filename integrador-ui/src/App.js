import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Game from './components/Game'
import Main from './components/Main'

const App = () => {
  
  return (
    <Router>
        <Switch>
          <Route path="/main" component={Main}/>
          <Route path="/game" component={Game}/>
          <Route path="*" component={Main}/>
        </Switch>
    </Router>
  )
}

  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/

export default App;
