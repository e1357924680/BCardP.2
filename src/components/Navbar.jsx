import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMoon } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSunny } from "react-icons/io";
import { AuthContext } from "../context/AuthContext.js";
import LoginModal from "./LoginModal.jsx";
import { ThemeContext } from "../context/ThemeContext.js";
import SearchBar from "./SearchBar.jsx";

function Navbar() {
	const { isAuthenticated, userData } = useContext(AuthContext);
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<nav
			className={`navbar navbar-expand-lg navbar-${
				theme === "light" ? "light" : "dark"
			} bg-${theme === "light" ? "light" : "dark"}`}
		>
			<div className="container">
				<Link className="navbar-brand" to="/">
					<h1 style={{ textShadow: "3px 2px 4px rgba(0, 0, 0, 0.5)" }}>
						B-Card
					</h1>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item active">
							<Link className="nav-link" to="/about">
								About
							</Link>
						</li>
						{isAuthenticated && (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/favorites">
										Favorites
									</Link>
								</li>
								{(userData.isAdmin || userData.isBusiness) && (
									<li className="nav-item">
										<Link className="nav-link" to="/my-cards">
											My Cards
										</Link>
									</li>
								)}
								{userData.isAdmin && (
									<li className="nav-item">
										<Link className="nav-link" to="/sandbox">
											Sandbox
										</Link>
									</li>
								)}
							</>
						)}
					</ul>
					<div className="d-flex align-items-center">
						<button className="btn mx-2" id="themeToggle" onClick={toggleTheme}>
							{theme === "light" ? (
								<FaMoon size={25} />
							) : (
								<IoIosSunny size={30} style={{ color: "white" }} />
							)}
						</button>
						<div className="search-container">
							<SearchBar />
							<button className="btn search-btn" type="submit">
								<FaSearch />
							</button>
						</div>
						<div className="me-3 d-flex align-items-center">
							{userData._id ? (
								<>
									<Link className="btn btn-outline-primary mx-2" to="/profile">
										<CgProfile size={30} />
									</Link>
								</>
							) : (
								<div className="d-flex flex-column flex-md-row">
									<LoginModal />

									<Link
										className="btn btn-outline-primary mx-2 mt-2 mt-md-0"
										to="/register"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
