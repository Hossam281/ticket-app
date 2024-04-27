import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login , reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    setFormData({
      email: "",
      password: "",
    });

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const userData = {
      email: formData.email,
      password: formData.password,
    };
    dispatch(login(userData));
  };
    if (isLoading) {
      return <Spinner />;
    }
  return (
    <div className="min-h-screen flex  justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-6 flex items-center justify-center gap-4 text-3xl font-extrabold text-gray-900">
          <FaSignInAlt />
          Login
        </div>
        <p className=" text-center font-extrabold text-2xl text-gray-500">
          Please login to your account
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className=" flex  flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                required
                value={formData.email}
                type="email"
                autoComplete="email"
                className=" rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className=" rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 z-50 right-0 px-2 py-1 text-sm text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
