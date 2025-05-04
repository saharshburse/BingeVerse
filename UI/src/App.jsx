import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import Register from "./pages/registor/registor";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/profile/profile"; 
import { useDispatch,useSelector } from "react-redux";
import {getUserEmail, setUser} from './store/userSlice'
import { useEffect } from "react";
import { decodeToken } from "./utils/utils";
import WatchlistPage from "./pages/watchListPage/watchListPage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function App() {
  const user=useSelector(getUserEmail);
  const dispatch=useDispatch();
  useEffect(() => {
      if (user) {
        
      } else {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = decodeToken(token);
          if (decoded) {
            const user = {
              email: decoded.email,
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              token: token,
            };
            dispatch(setUser(user));
            
          }
        }
      }
    }, [dispatch, user]);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/watchlist" element={<WatchlistPage   />} />
          <Route path="register" element={<Register />}></Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profie />} /> */}
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
    </div>
  );
}

export default App;
