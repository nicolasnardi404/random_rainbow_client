import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; 
import Welcome from './pages/Welcome';
import About from './pages/About';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
//import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/welcome' />
        </Route>
        <Route path='/about' component={About} />
        <Route path='/home' component={Home} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/sign-in' component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
