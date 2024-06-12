import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './components/BasicExample';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import SimplePage from './components/SimplePage';

function App() {
  return (
      <Switch> {/* Wrap your routes in a Switch component */}
        <Route exact path='/' component={() => (
          <div className="App">
            <BasicExample />
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                CREATING RANDOM RAINBOW IN REACT
              </p>
              <Button>this is btn</Button>
            </header>
          </div>
        )} />
        <Route path='/page' component={SimplePage} />
      </Switch>
  );
}

export default App;
