import { Route, Routes } from "react-router-dom";
import Header from "./pages/header/Header";
import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup";
import Home from "./pages/home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SavedCities from "./pages/saved-cities/SavedCities";


function App() {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Header />
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/saved-cities" element={<SavedCities></SavedCities>}></Route>
      </Routes>
    </>
  );
}

export default App;
