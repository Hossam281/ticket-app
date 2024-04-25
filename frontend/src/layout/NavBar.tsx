import { Link } from "react-router-dom";
import { FaSignInAlt, FaRegUser, FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const userSignedIn = user;
  const links = [
    {
      id: 1,
      path: "/login",
      text: "Login",
      icon: <FaSignInAlt />,
    },
    {
      id: 2,
      path: "/register",
      text: "Register",
      icon: <FaRegUser />,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }
  return (
    <header className="flex items-center mb-4 p-3 border border-x-0 justify-between border-gray-600 shadow-md">
      <div>
        <Link to="/" className="text-sm md:text-2xl font-bold">
          Ticket App
        </Link>
      </div>
      <ul className="flex text-sm  md:text-lg  gap-4">
        {userSignedIn ? (
          <li className="flex justify-center rounded-md hover:bg-slate-200 px-2 h-[40px] ">
            <button
              onClick={handleLogout}
              className="flex items-center h-full"
            >
              <FaPowerOff />
              <span className="ml-2">Logout</span>
            </button>
          </li>
        ) : (
          links.map((link) => {
            return (
              <li
                key={link.id}
                className="flex justify-center rounded-md hover:bg-slate-200 px-2 h-[40px] "
              >
                <Link to={link.path} className="flex items-center h-full">
                  {link.icon}
                  <span className="ml-2">{link.text}</span>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </header>
  );
};

export default NavBar;
