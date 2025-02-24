import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { deleteUser, getUserById, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Profile.css";
import ConfirmModal from "../components/confirmModal";
import { toast } from "react-toastify";

function Profile() {
	const { isAuthenticated, userData, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	const [showConfDelete, setShowConfDelete] = useState(false);
	const [fullUserData, setFullUserData] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			getUserById(userData._id)
				.then((res) => setFullUserData(res.data))
				.catch((err) => console.log(err));
		}
	}, [isAuthenticated, userData]);

	const formik = useFormik({
		initialValues: {
			name: {
				first: fullUserData.name?.first || "",
				middle: fullUserData.name?.middle || "",
				last: fullUserData.name?.last || "",
			},
			phone: fullUserData.phone || "",
			email: fullUserData.email || "",
			password: "",
			image: {
				url: fullUserData.image?.url || "",
				alt: fullUserData.image?.alt || "",
			},
			address: {
				state: fullUserData.address?.state || "",
				country: fullUserData.address?.country || "",
				city: fullUserData.address?.city || "",
				street: fullUserData.address?.street || "",
				houseNumber: fullUserData.address?.houseNumber || "",
				zip: fullUserData.address?.zip || "",
			},
		},
		enableReinitialize: true,
		validationSchema: yup.object({
			name: yup.object().shape({
				first: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("First name is required"),
				middle: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters"),
				last: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Last name is required"),
			}),
			phone: yup
				.string()
				.matches(/^05\d{8}$/, "Must be a valid Israeli phone number")
				.required("Phone number is required"),
			email: yup.string().required("Email is required").email("Invalid email"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Must be at least 9 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
					"Password must contain uppercase, lowercase, number, and special character"
				),
			image: yup.object().shape({
				url: yup
					.string()
					.url("Must be a valid URL")
					.min(14, "Must be at least 14 characters")
					.required("Image URL is required"),
				alt: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Image alt text is required"),
			}),
			address: yup.object().shape({
				state: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("State is required"),
				country: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Country is required"),
				city: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("City is required"),
				street: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("Street is required"),
				houseNumber: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("House number is required"),
				zip: yup
					.string()
					.min(2, "Must be at least 2 characters")
					.max(256, "Must be less than 256 characters")
					.required("ZIP is required"),
			}),
		}),
		onSubmit: (values) => {
			updateUser(values, fullUserData._id)
				.then((res) => {
					setFullUserData(res.data);
					setIsEditing(false);
				})
				.catch((err) => toast.error(err.response.data));
		},
	});

	const handleEditToggle = () => setIsEditing(!isEditing);
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	const handleDeleteUser = () => {
		deleteUser(userData._id)
			.then(() => {
				logout();
				navigate("/");
			})
			.catch((err) => toast.error(err.response.data));
	};

	return (
		<>
			<div className="profile-page">
				<div className="profile-header">
					<img
						src={fullUserData.image?.url || "https://via.placeholder.com/150"}
						alt={fullUserData.image?.alt || "Profile Picture"}
						className="profile-picture"
					/>
					<h2>
						{fullUserData.name?.first}{" "}
						{fullUserData.name?.middle && fullUserData.name.middle}{" "}
						{fullUserData.name?.last}
					</h2>
					<p className="profile-email">Email: {fullUserData.email}</p>
					<p className="profile-phone">Phone: {fullUserData.phone}</p>
				</div>

				{isEditing ? (
					<form onSubmit={formik.handleSubmit} className="register-form">
						<h3 className="form-title">Register</h3>
						<div className="form-section">
							<h4>Personal Information</h4>
							<div className="form-grid">
								{["first", "middle", "last"].map((field) => (
									<div key={field} className="form-group">
										<label>{`${
											field.charAt(0).toUpperCase() + field.slice(1)
										} Name:`}</label>
										<input
											type="text"
											name={`name.${field}`}
											value={formik.values.name[field]}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.name?.[field] &&
											formik.errors.name?.[field] && (
												<div className="error-message">
													{formik.errors.name[field]}
												</div>
											)}
									</div>
								))}
							</div>
						</div>

						<div className="form-section">
							<h4>Contact Information</h4>
							<div className="form-group">
								<label>Phone:</label>
								<input
									type="tel"
									name="phone"
									value={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.phone && formik.errors.phone && (
									<div className="error-message">{formik.errors.phone}</div>
								)}
							</div>

							<div className="form-group">
								<label>Email:</label>
								<input
									type="email"
									name="email"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.email && formik.errors.email && (
									<div className="error-message">{formik.errors.email}</div>
								)}
							</div>

							<div className="form-group">
								<label>Password:</label>
								<input
									type="password"
									name="password"
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.password && formik.errors.password && (
									<div className="error-message">{formik.errors.password}</div>
								)}
							</div>
						</div>

						<div className="form-section">
							<h4>Address Details</h4>
							<div className="form-grid">
								{[
									"state",
									"country",
									"city",
									"street",
									"houseNumber",
									"zip",
								].map((field) => (
									<div key={field} className="form-group">
										<label>{`${
											field.charAt(0).toUpperCase() + field.slice(1)
										}:`}</label>
										<input
											type="text"
											name={`address.${field}`}
											value={formik.values.address[field]}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
										/>
										{formik.touched.address?.[field] &&
											formik.errors.address?.[field] && (
												<div className="error-message">
													{formik.errors.address[field]}
												</div>
											)}
									</div>
								))}
							</div>
						</div>

						<div className="form-section">
							<h4>Profile Picture</h4>
							<div className="form-grid">
								<div className="form-group">
									<label>Image URL:</label>
									<input
										type="url"
										name="image.url"
										value={formik.values.image.url}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.image?.url && formik.errors.image?.url && (
										<div className="error-message">
											{formik.errors.image.url}
										</div>
									)}
								</div>

								<div className="form-group">
									<label>Alt Text:</label>
									<input
										type="text"
										name="image.alt"
										value={formik.values.image.alt}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.image?.alt && formik.errors.image?.alt && (
										<div className="error-message">
											{formik.errors.image.alt}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="form-actions d-flex flex-row">
							<button
								type="submit"
								className="btn btn-success"
								disabled={!(formik.dirty && formik.isValid)}
							>
								Save
							</button>
							<button
								className="btn btn-dark"
								onClick={() => setShowConfDelete(true)}
							>
								Delete Account
							</button>
							<button
								type="button"
								className="btn btn-danger"
								onClick={handleEditToggle}
							>
								Cancel
							</button>
						</div>
					</form>
				) : (
					<div className="profile-actions">
						<button className="btn btn-primary" onClick={handleEditToggle}>
							Edit
						</button>
						<button className="btn btn-danger" onClick={handleLogout}>
							Logout
						</button>
					</div>
				)}
			</div>
			<ConfirmModal
				isOpen={showConfDelete}
				onClose={() => setShowConfDelete(false)}
				action={handleDeleteUser}
				title="Confirm Deletion"
				message="Are you sure you want to delete your account?"
			/>
		</>
	);
}

export default Profile;
