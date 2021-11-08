import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/login';
import ToDoPage from './pages/to-do';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/to-do' component={ToDoPage} />
      </Switch>
    </Router>
  );
}

export default App;
