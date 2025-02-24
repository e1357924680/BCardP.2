import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { toast } from "react-toastify";

const LoginModal = () => {
	const { login } = useContext(AuthContext);
	const { theme } = useContext(ThemeContext);
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
		formik.resetForm();
	};

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required("Email is required").email("Invalid email"),
			password: yup
				.string()
				.required("Password is required")
				.min(9, "Must be at least 9 characters")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
					"Password must contain uppercase, lowercase, number, and special character"
				),
		}),
		onSubmit: (values) => {
			loginUser(values)
				.then((res) => {
					if (res.data.length) {
						login(res.data);
						toggleModal();
						navigate("/");
					}
				})
				.catch((err) => toast.error(err.response.data));
		},
	});

	return (
		<div>
			<button
				className="btn btn-outline-primary mx-2"
				onClick={toggleModal}
				style={{
					backgroundColor: theme === "dark" ? "#34495e" : "#e3f2fd",
					color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
				}}
			>
				Login
			</button>

			{isModalOpen && (
				<div
					className="modal fade show d-block"
					tabIndex="-1"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1050,
					}}
					onClick={toggleModal}
				>
					<div
						className="modal-dialog modal-dialog-centered"
						style={{
							maxWidth: "400px",
							width: "90%",
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`modal-content rounded-3 ${
								theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
							}`}
						>
							<div className="modal-header">
								<h5 className="modal-title">Login</h5>
								<button
									type="button"
									className="btn-close"
									onClick={toggleModal}
									aria-label="Close"
									style={{
										backgroundColor: theme === "dark" ? "#c0392b" : "#e74c3c",
									}}
								></button>
							</div>

							<div className="modal-body p-4">
								<form onSubmit={formik.handleSubmit}>
									<div className="mb-3">
										<label htmlFor="email" className="form-label">
											Email
										</label>
										<input
											id="email"
											name="email"
											type="email"
											className={`form-control ${
												formik.touched.email && formik.errors.email
													? "is-invalid"
													: ""
											}`}
											placeholder="name@example.com"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												backgroundColor:
													theme === "dark" ? "#2c3e50" : "#ffffff",
												color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
												borderColor: theme === "dark" ? "#76659f" : "#8f7bbe",
											}}
										/>
										{formik.touched.email && formik.errors.email && (
											<div className="invalid-feedback">
												{formik.errors.email}
											</div>
										)}
									</div>

									<div className="mb-3">
										<label htmlFor="password" className="form-label">
											Password
										</label>
										<input
											id="password"
											name="password"
											type="password"
											className={`form-control ${
												formik.touched.password && formik.errors.password
													? "is-invalid"
													: ""
											}`}
											placeholder="Password"
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											style={{
												backgroundColor:
													theme === "dark" ? "#2c3e50" : "#ffffff",
												color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
												borderColor: theme === "dark" ? "#76659f" : "#8f7bbe",
											}}
										/>
										{formik.touched.password && formik.errors.password && (
											<div className="invalid-feedback">
												{formik.errors.password}
											</div>
										)}
									</div>

									<button
										type="submit"
										className="btn w-100 py-2"
										style={{
											backgroundColor: theme === "dark" ? "#3498db" : "#2980b9",
											color: "#ffffff",
										}}
										disabled={!formik.dirty || !formik.isValid}
									>
										Login
									</button>

									<div className="text-center mt-3">
										<Link
											to="/register"
											style={{
												color: theme === "dark" ? "#8f7bbe" : "#3498db",
											}}
										>
											New User? Register Now!
										</Link>
									</div>
								</form>
							</div>

							<div className="modal-footer border-0">
								<button
									className="btn btn-secondary w-100"
									onClick={toggleModal}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default LoginModal;
