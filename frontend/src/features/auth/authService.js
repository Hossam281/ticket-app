import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_BASE_URL+"/api/users";

const register = async (userData) => {
    const regURL=`${API_URL}/register`;
    const response = await axios.post(regURL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Registration Successful");
    }

    return response.data;
}

const logout = () => {
    localStorage.removeItem("user")
}
const login = async (userData) => {
    const loginURL=`${API_URL}/login`;
    const response = await axios.post(loginURL, userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login Successful");
    }

    return response.data;
}


const authService = {
    register,
    logout,
    login
}

export default authService