import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaStar, FaThLarge, FaUserShield } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.js";
import { ThemeContext } from "../context/ThemeContext.js";

function Footer() {
	const { isAuthenticated, userData } = useContext(AuthContext);
	const { theme } = useContext(ThemeContext);

	return (
		<footer
			className={`d-flex justify-content-center align-items-center p-3 bg-${
				theme === "light" ? "light" : "dark"
			} text-${
				theme === "light" ? "dark" : "light"
			} position-fixed bottom-0 w-100`}
			style={{
				boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
				gap: "75px",
			}}
		>
			<Link to="/" className="icon-link">
				<FaHome size={25} />
			</Link>

			{isAuthenticated && (
				<>
					<Link to="/favorites" className="icon-link">
						<FaStar size={25} />
					</Link>
					{(userData.isAdmin || userData.isBusiness) && (
						<Link to="/my-cards" className="icon-link">
							<FaThLarge size={25} />
						</Link>
					)}
					{userData.isAdmin && (
						<Link to="/sandbox" className="icon-link">
							<FaUserShield size={25} />
						</Link>
					)}
				</>
			)}
		</footer>
	);
}

export default Footer;
