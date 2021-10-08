import './App.scss';
import Home from './Pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './Pages/Projects';
import ToDoList from './Pages/ToDoList';
import Remainder from './Pages/EventsRemainder';
import Pokemon from './Pages/Pokemon';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'><Home /></Route>
        <Route path='/Projects'><Projects /></Route>
        <Route path='/ToDoList'><ToDoList /></Route>
        <Route path='/Remainder'><Remainder /></Route>
        <Route path='/Pokemon'><Pokemon /></Route>
      </Switch>
    </Router>
  );
}

export default App;
