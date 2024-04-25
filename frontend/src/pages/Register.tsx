import { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch<any>();
  const { user, isSuccess, isLoading, isError, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      formData.password
    );
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!validatePassword) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      return;
    }
    if (!validateEmail) {
      toast.error("Invalid Email");
      return;
    }
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      dispatch(register(userData));
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return  (
    <div className="min-h-screen flex  justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8">
        <div className="mt-6 flex items-center justify-center gap-4 text-3xl font-extrabold text-gray-900">
          <FaUserAlt />
          Register
        </div>
        <p className=" text-center font-extrabold text-2xl text-gray-500">
          Please Create an account
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className=" flex  flex-col gap-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                required
                type="text"
                autoComplete="name"
                className=" rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
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
            <div>
              <label htmlFor="password" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  type={showPasswordConfirm ? "text" : "password"}
                  autoComplete="current-password"
                  className=" rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder=" Confirm Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 z-50 right-0 px-2 py-1 text-sm text-gray-500"
                  onClick={togglePasswordVisibilityConfirm}
                >
                  {showPasswordConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
