import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Register.css";
import { toast } from "react-toastify";

function Register() {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: { first: "", middle: "", last: "" },
			phone: "",
			email: "",
			password: "",
			image: { url: "", alt: "" },
			address: {
				state: "",
				country: "",
				city: "",
				street: "",
				houseNumber: "",
				zip: "",
			},
			isBusiness: false,
		},
		validationSchema: yup.object({
			name: yup.object().shape({
				first: yup.string().min(2).max(256).required("First name is required"),
				middle: yup.string().min(2).max(256),
				last: yup.string().min(2).max(256).required("Last name is required"),
			}),
			phone: yup
				.string()
				.matches(/^05\d{8}$/, "Must be a valid phone number")
				.required("Phone number is required"),
			email: yup.string().email("Invalid email").required("Email is required"),
			password: yup
				.string()
				.min(9, "Must be at least 9 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
					"Password must contain uppercase, lowercase, number, and special character"
				)
				.required("Password is required"),
			image: yup.object().shape({
				url: yup.string().url("Must be a valid URL").min(14),
				alt: yup.string().min(2).max(256),
			}),
			address: yup.object().shape({
				state: yup.string().min(2).max(256),
				country: yup.string().min(2).max(256).required("Country is required"),
				city: yup.string().min(2).max(256).required("City is required"),
				street: yup.string().min(2).max(256).required("Street is required"),
				houseNumber: yup
					.string()
					.min(1)
					.max(256)
					.required("House number is required"),
				zip: yup.string().min(2).max(256).required("ZIP is required"),
			}),
			isBusiness: yup.boolean(),
		}),
		onSubmit: (values) => {
			registerUser(values)
				.then((res) => {
					if (res.data) {
						login(res.data);
						navigate("/");
					}
				})
				.catch((err) => toast.error(err.response.data));
		},
	});

	return (
		<div className="register-page">
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
						{["state", "country", "city", "street", "houseNumber", "zip"].map(
							(field) => (
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
							)
						)}
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
								<div className="error-message">{formik.errors.image.url}</div>
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
								<div className="error-message">{formik.errors.image.alt}</div>
							)}
						</div>
					</div>
				</div>

				<div className="form-section">
					<input
						type="checkbox"
						className="ms-3"
						id="isBusiness"
						name="isBusiness"
						checked={formik.values.isBusiness}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<label htmlFor="isBusiness">I Am A Business</label>
				</div>

				<div className="form-actions">
					<button
						className="btn btn-success"
						type="submit"
						disabled={!(formik.dirty && formik.isValid)}
					>
						Register
					</button>
					<Link to="/login" className="secondary-link">
						Already have an account? Login
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
