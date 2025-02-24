import { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart, FaPhone } from "react-icons/fa";
import { getAllCards, likeToggleCard } from "../services/cardService";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function Favorites() {
	const { isAuthenticated, userData } = useContext(AuthContext);
	const [cards, setCards] = useState([]);
	const { theme } = useContext(ThemeContext);
	const { searchTerm } = useContext(SearchContext);
	const navigate = useNavigate();

	useEffect(() => {
		getAllCards()
			.then((res) =>
				setCards(
					res.data.filter((card) =>
						card.title.toLowerCase().includes(searchTerm.toLowerCase())
					)
				)
			)
			.catch((err) => console.error(err));
	}, [searchTerm]);

	const handleLike = (cardId) => {
		likeToggleCard(cardId)
			.then((updatedCard) => {
				setCards((prevCards) =>
					prevCards.map((card) =>
						card._id === updatedCard.data._id ? updatedCard.data : card
					)
				);
			})
			.catch((err) => console.error(err));
	};

	const handleCopyPhone = async (phoneNumber) => {
		try {
			await navigator.clipboard.writeText(phoneNumber);
			toast.success("Phone Number Copied To Clipboard");
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};
	const handelCardClick = (id) => navigate("/card-details/" + id);

	return (
		<>
			<div className="container py-5">
				{!isAuthenticated ? (
					<div className="container d-flex flex-column align-items-center">
						<h1 style={{ color: "var(--text)" }}>Page Unavailable</h1>
						<br />
						<h1 style={{ color: "var(--text)" }}>Please Login</h1>
					</div>
				) : (
					<div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
						{cards.map((card) => {
							const isLikedByUser =
								isAuthenticated && card.likes.includes(userData._id);
							if (isLikedByUser) {
								return (
									<>
										<div
											key={card._id}
											className="col"
											onClick={() => handelCardClick(card._id)}
										>
											<div
												className="card h-100 shadow-lg border-0"
												style={{
													borderRadius: "20px",
													maxWidth: "325px",
													margin: "auto",
													background: theme === "dark" ? "#2c3e50" : "#ffffff",
													color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
												}}
											>
												<img
													src={card.image.url}
													alt={card.image.alt}
													className="card-img-top"
													style={{
														height: "200px",
														objectFit: "cover",
														borderTopLeftRadius: "20px",
														borderTopRightRadius: "20px",
													}}
												/>
												<div className="card-body d-flex flex-column">
													<h5 className="card-title fw-bold">{card.title}</h5>
													<p className="card-text text-muted small">
														{card.subtitle}
													</p>
													<ul className="list-unstyled flex-grow-1">
														<li>
															<strong>📞 Phone:</strong> {card.phone}
														</li>
														<li>
															<strong>📍 Address:</strong> {card.address.street}
															, {card.address.city}
														</li>
														<li>
															<strong>🔢 Card Number:</strong> {card.bizNumber}
														</li>
													</ul>
												</div>
												<div
													className="card-footer d-flex justify-content-between border-0"
													style={{
														borderBottomLeftRadius: "20px",
														borderBottomRightRadius: "20px",
														background:
															theme === "dark" ? "#34495e" : "#f8f9fa",
													}}
												>
													<div className="ms-auto d-flex">
														<button
															className="card-btn btn btn-outline-primary rounded-circle mx-2"
															onClick={() => handleCopyPhone(card.phone)}
														>
															<FaPhone />
														</button>

														<button
															onClick={() => handleLike(card._id)}
															className={`card-btn btn rounded-circle ${
																isLikedByUser
																	? "btn-danger"
																	: "btn-outline-danger"
															}`}
														>
															{isLikedByUser ? <FaHeart /> : <FaRegHeart />}
														</button>
													</div>
												</div>
											</div>
										</div>
									</>
								);
							} else {
								return <></>;
							}
						})}
					</div>
				)}
			</div>
		</>
	);
}

export default Favorites;
