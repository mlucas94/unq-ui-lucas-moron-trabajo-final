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

export default App;
