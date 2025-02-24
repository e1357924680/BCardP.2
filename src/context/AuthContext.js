import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
			setUserData(jwtDecode(token));
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("token", token);
		setIsAuthenticated(true);
		setUserData(jwtDecode(token));
		toast.success("Log in successfully");
	};

	const logout = () => {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
		setUserData({});
		toast.success("Log out successfully");
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
