import "./App.css";
import "./Util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Manifesto from "./pages/Manifesto";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import LogIn from "./pages/LogIn";
import EmailVerificationSent from "./pages/EmailVerificationSent";
import MyPieceOfRandomRainbow from "./pages/MyPieceOfRandomRainbow";
import NewVideo from "./pages/NewVideo";
import PasswordRecovery from "./pages/PasswordRecover";
import CreateNewPassord from "./pages/CreateNewPassword";
import AdminController from "./pages/AdminController";
import VideoUpdateAdmin from "./pages/VideoUpdateAdmin";
import ProfileUser from "./pages/ProfileUser";
import ArtistProfile from "./pages/ArtistProfile";
import { ProvideAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import EmailVerified from "./pages/EmailVerified";
import { inject } from "@vercel/analytics";
import Layout from "./Layout";

function App() {
  inject();
  return (
    <ProvideAuth>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home/0" />
            </Route>
            <Route path="/manifesto" component={Manifesto} />
            <Route path="/home/:token" component={Home} />
            {/* <Route path="/welcome" component={Welcome} /> */}
            <Route path="/sign-in" component={SignIn} />
            <Route path="/log-in" component={LogIn} />
            <Route
              path="/email-verification-sent"
              component={EmailVerificationSent}
            />
            <Route path="/profile/:usernameData" component={ArtistProfile} />
            <Route path="/email-verified/:token" component={EmailVerified} />
            <ProtectedRoute
              path="/:idUser/add-new-video"
              element={<NewVideo />}
            />
            <ProtectedRoute
              path="/:idUser/update/:videoId"
              element={<NewVideo />}
            />
            <ProtectedRoute
              path="/my-piece-of-random-rainbow"
              element={<MyPieceOfRandomRainbow />}
            />
            {/* <ProtectedRoute
              path="/users/:idUser/videos"
              element={MyPieceOfRandomRainbow}
            /> */}
            <ProtectedRoute path="/profile" element={<ProfileUser />} />
            <Route path="/password-recovery" component={PasswordRecovery} />
            <Route path="/new-password/:token" component={CreateNewPassord} />
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
        </Layout>
      </Router>
    </ProvideAuth>
  );
}

export default App;
