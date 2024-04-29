import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./layout/NavBar";
import NewTicket from "./pages/NewTicket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./pages/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import Ticket from "./pages/Ticket";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className="container min-h-screen mx-auto bg-[#f5f5f5] pt-[15vh] ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />} >
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />} >
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            <Route path="/tickets/:ticketId" element={<PrivateRoute />} >
              <Route path="/tickets/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
