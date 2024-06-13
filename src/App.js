import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'; 
import Welcome from './pages/Welcome';
import Manifesto from './pages/Manifesto';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import LogIn from './pages/LogIn';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/welcome' />
        </Route>
        <Route path='/manifesto' component={Manifesto} />
        <Route path='/home' component={Home} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/log-in' component={LogIn} />
      </Switch>
    </Router>
  );
}

export default App;
