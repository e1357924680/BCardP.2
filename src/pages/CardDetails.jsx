import { useNavigate, useParams } from "react-router-dom";
import {
	FaPhoneAlt,
	FaEnvelope,
	FaMapMarkerAlt,
	FaGlobe,
	FaArrowLeft,
} from "react-icons/fa";
import "../styles/BusinessLandingPage.css";
import { useEffect, useState, useContext } from "react";
import { getCardById } from "../services/cardService";
import { ThemeContext } from "../context/ThemeContext";

function CardDetails() {
	const [cardDetails, setCardDetails] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		getCardById(id)
			.then((res) => setCardDetails(res.data))
			.catch((err) => console.error(err.response?.data));
	}, [id]);

	const cardStyle = {
		background: theme === "dark" ? "var(--background)" : "var(--background)",
		color: theme === "dark" ? "var(--text)" : "var(--text)",
		border: "none",
	};

	const buttonStyle = {
		backgroundColor: theme === "dark" ? "var(--primary)" : "var(--primary)",
		color: theme === "dark" ? "var(--text)" : "var(--text)",
	};

	return (
		<div
			className="container business-landing-page py-5"
			style={{
				background:
					theme === "dark" ? "var(--background)" : "var(--background)",
				color: theme === "dark" ? "var(--text)" : "var(--text)",
			}}
		>
			<button
				className="btn btn-outline-primary mb-4"
				onClick={() => navigate("/")}
				style={buttonStyle}
			>
				<FaArrowLeft /> Back
			</button>

			<div className="card shadow-lg" style={cardStyle}>
				<div className="row g-0">
					{cardDetails.image && (
						<div className="col-md-4">
							<img
								src={cardDetails.image.url}
								alt={cardDetails.image.alt || "Business image"}
								className="img-fluid rounded-start"
								style={{
									height: "100%",
									objectFit: "cover",
									borderRadius: "10px 0 0 10px",
								}}
							/>
						</div>
					)}

					<div className="col-md-8">
						<div className="card-body">
							<h1 className="card-title">{cardDetails.title}</h1>
							<h4 className="card-subtitle mb-3 text-muted">
								{cardDetails.subtitle}
							</h4>
							<p className="card-text">
								{cardDetails.description || "No description provided."}
							</p>

							{cardDetails.address && (
								<p className="card-text">
									<FaMapMarkerAlt className="me-2" />
									{cardDetails.address.houseNumber} {cardDetails.address.street}
									, {cardDetails.address.city}, {cardDetails.address.state}{" "}
									{cardDetails.address.zip}, {cardDetails.address.country}
								</p>
							)}

							<hr />

							<div className="d-flex flex-column gap-2">
								<p>
									<FaPhoneAlt className="me-2 text-success" />
									{cardDetails.phone || "Not available"}
								</p>
								<p>
									<FaEnvelope className="me-2 text-danger" />
									<a
										href={`mailto:${cardDetails.email}`}
										className="text-decoration-none"
									>
										{cardDetails.email || "Not available"}
									</a>
								</p>
								{cardDetails.web && (
									<p>
										<FaGlobe className="me-2 text-info" />
										<a
											href={cardDetails.web}
											target="_blank"
											rel="noopener noreferrer"
											className="text-decoration-none"
										>
											{cardDetails.web}
										</a>
									</p>
								)}
								<p>
									<strong>Business Number:</strong> {cardDetails.bizNumber}
								</p>
								<p>
									<strong>Created At:</strong>{" "}
									{cardDetails.createdAt &&
										new Date(cardDetails.createdAt).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-5">
				{cardDetails.address && (
					<iframe
						title="Business Location"
						className="w-100 rounded"
						height="400"
						frameBorder="0"
						style={{ border: 0 }}
						src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAAQ4gsOXEoYqCR8jmtNKLu1BKjXlslLtM&q=${encodeURIComponent(
							`${cardDetails.address.street} ${cardDetails.address.houseNumber}, ${cardDetails.address.city}, ${cardDetails.address.state}, ${cardDetails.address.country}`
						)}`}
						allowFullScreen
					></iframe>
				)}
			</div>
		</div>
	);
}

export default CardDetails;
