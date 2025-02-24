import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";

		document.documentElement.classList.add("theme-fade");
		setTimeout(() => {
			setTheme(newTheme);
			localStorage.setItem("theme", newTheme);
			document.documentElement.classList.remove("theme-fade");
		}, 50);
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
