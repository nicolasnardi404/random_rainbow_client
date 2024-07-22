import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Manifesto from "./pages/Manifesto";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import EmailVerificationSent from "./pages/EmailVerificationSent";
import UserInterface from "./pages/UserInterface";
import NewVideo from "./pages/NewVideo";
import PasswordRecovery from "./pages/PasswordRecover";
import CreateNewPassord from "./pages/CreateNewPassword";
import AdminController from "./pages/AdminController";
import VideoUpdateAdmin from "./pages/VideoUpdateAdmin";
import { ProvideAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/welcome" />
          </Route>
          <Route path="/manifesto" component={Manifesto} />
          <Route path="/home/:token" component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/log-in" component={LogIn} />
          <Route
            path="/email-verification-sent"
            component={EmailVerificationSent}
          />
          {/* <Route path="/videos" component={UserInterface} /> */}
          <ProtectedRoute
            path="/:idUser/add-new-video"
            element={<NewVideo />}
          />
          <ProtectedRoute
            path="/:idUser/update/:videoId"
            element={<NewVideo />}
          />
          <ProtectedRoute path="/videos" element={<UserInterface />} />
          <ProtectedRoute
            path="/users/:idUser/videos"
            element={UserInterface}
          />
          <Route path="/password-recovery" component={<PasswordRecovery />} />
          <Route path="/new-password/:token" component={<CreateNewPassord />} />
          <ProtectedAdminRoute
            path="/admin-controller"
            element={<AdminController />}
            requiredRole="ROLE_ADMIN"
          />
          <ProtectedAdminRoute
            path="/admin-controller/review"
            element={<AdminController />}
            requiredRole="ROLE_ADMIN"
          />
          <ProtectedAdminRoute
            path="/admin/videos/update/:videoId"
            element={<VideoUpdateAdmin />}
            requiredRole="ROLE_ADMIN"
          />
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
