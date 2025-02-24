import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function CreateCardModal({ action, show, setShowModal, theme, currentCard }) {
	const modalBgColor = theme === "dark" ? "#2c3e50" : "#ffffff";
	const modalTextColor = theme === "dark" ? "#ecf0f1" : "#2c3e50";

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			image: {
				url: currentCard?.image?.url || "",
				alt: currentCard?.image?.alt || "",
			},
			title: currentCard?.title || "",
			description: currentCard?.description || "",
			subtitle: currentCard?.subtitle || "",
			phone: currentCard?.phone || "",
			email: currentCard?.email || "",
			web: currentCard?.web || "",
			address: {
				state: currentCard?.address?.state || "",
				country: currentCard?.address?.country || "",
				city: currentCard?.address?.city || "",
				street: currentCard?.address?.street || "",
				houseNumber: currentCard?.address?.houseNumber || "",
				zip: currentCard?.address?.zip || "",
			},
		},
		validationSchema: Yup.object({
			image: Yup.object().shape({
				url: Yup.string()
					.url("Must be a valid URL")
					.required("Image URL is required"),
				alt: Yup.string().max(256),
			}),
			title: Yup.string().min(2).max(256).required("Title is required"),
			subtitle: Yup.string().min(2).max(256).required("Subtitle is required"),
			phone: Yup.string().min(9).max(11).required("Phone is required"),
			address: Yup.object().shape({
				street: Yup.string().required("Street is required"),
				country: Yup.string().required("Country is required"),
				city: Yup.string().required("City is required"),
			}),
		}),
		onSubmit: (values) => {
			action(values);
			formik.resetForm({ values: formik.initialValues });
		},
	});

	const onClose = () => {
		formik.resetForm({ values: formik.initialValues });
		setShowModal(false);
	};

	return (
		<div
			className={`modal fade ${show ? "show" : ""}`}
			style={{
				display: show ? "block" : "none",
				backgroundColor: "rgba(0,0,0,0.5)",
			}}
			tabIndex="-1"
			aria-modal="true"
			role="dialog"
			onClick={onClose}
		>
			<div
				className="modal-dialog modal-dialog-centered"
				role="document"
				style={{
					maxWidth: "400px",
					width: "90%",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className="modal-content border-0 shadow"
					style={{
						borderRadius: "12px",
						backgroundColor: modalBgColor,
						color: modalTextColor,
					}}
				>
					<form onSubmit={formik.handleSubmit}>
						<button
							type="button"
							className="btn-close"
							style={{ filter: theme === "dark" ? "invert(1)" : "none" }}
							aria-label="Close"
							onClick={onClose}
						/>

						<div
							style={{
								position: "relative",
								height: "180px",
								overflow: "hidden",
								backgroundColor: "#ddd",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{formik.values.image.url ? (
								<img
									src={formik.values.image.url}
									alt={formik.values.image.alt || "preview"}
									className="img-fluid"
									style={{ objectFit: "cover", width: "100%", height: "100%" }}
								/>
							) : (
								<div style={{ color: "#888" }}>No image selected</div>
							)}
						</div>

						<div
							className="modal-body"
							style={{
								maxHeight: "70vh",
								overflowY: "auto",
							}}
						>
							<div className="mb-3">
								<label htmlFor="image.url" className="form-label">
									Image URL
								</label>
								<input
									id="image.url"
									name="image.url"
									type="text"
									className="form-control"
									placeholder="https://example.com/image.jpg"
									value={formik.values.image.url}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.image?.url && formik.errors.image?.url && (
									<div className="text-danger small">
										{formik.errors.image.url}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="image.alt" className="form-label">
									Image Alt (Description)
								</label>
								<input
									id="image.alt"
									name="image.alt"
									type="text"
									className="form-control"
									placeholder="Short description for accessibility"
									value={formik.values.image.alt}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>

							<div className="mb-3">
								<label htmlFor="title" className="form-label fw-bold">
									Title
								</label>
								<input
									id="title"
									name="title"
									type="text"
									className="form-control"
									placeholder="Card Title"
									style={{ fontWeight: "bold" }}
									value={formik.values.title}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.title && formik.errors.title && (
									<div className="text-danger small">{formik.errors.title}</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="description" className="form-label">
									Description
								</label>
								<textarea
									id="description"
									name="description"
									className="form-control"
									rows={2}
									placeholder="Enter card description"
									value={formik.values.description}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.description && formik.errors.description && (
									<div className="text-danger small">
										{formik.errors.description}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="subtitle" className="form-label">
									Subtitle
								</label>
								<input
									id="subtitle"
									name="subtitle"
									type="text"
									className="form-control"
									placeholder="Subtitle"
									value={formik.values.subtitle}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.subtitle && formik.errors.subtitle && (
									<div className="text-danger small">
										{formik.errors.subtitle}
									</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="phone" className="form-label">
									Phone
								</label>
								<input
									id="phone"
									name="phone"
									type="text"
									className="form-control"
									placeholder="(123) 456-7890"
									value={formik.values.phone}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.phone && formik.errors.phone && (
									<div className="text-danger small">{formik.errors.phone}</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									className="form-control"
									placeholder="example@domain.com"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.email && formik.errors.email && (
									<div className="text-danger small">{formik.errors.email}</div>
								)}
							</div>

							<div className="mb-3">
								<label htmlFor="web" className="form-label">
									Website
								</label>
								<input
									id="web"
									name="web"
									type="text"
									className="form-control"
									placeholder="https://..."
									value={formik.values.web}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.web && formik.errors.web && (
									<div className="text-danger small">{formik.errors.web}</div>
								)}
							</div>

							<p className="fw-bold mt-4 mb-2">Address</p>

							<div className="mb-3">
								<label htmlFor="address.street" className="form-label">
									Street *
								</label>
								<input
									id="address.street"
									name="address.street"
									type="text"
									className="form-control"
									placeholder="123 Main St"
									value={formik.values.address.street}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.address?.street &&
									formik.errors.address?.street && (
										<div className="text-danger small">
											{formik.errors.address.street}
										</div>
									)}
							</div>

							<div className="row">
								<div className="col-6 mb-3">
									<label htmlFor="address.houseNumber" className="form-label">
										House #
									</label>
									<input
										id="address.houseNumber"
										name="address.houseNumber"
										type="number"
										className="form-control"
										placeholder="#"
										value={formik.values.address.houseNumber || ""}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
								<div className="col-6 mb-3">
									<label htmlFor="address.zip" className="form-label">
										Zip
									</label>
									<input
										id="address.zip"
										name="address.zip"
										type="number"
										className="form-control"
										placeholder="12345"
										value={formik.values.address.zip || ""}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-6 mb-3">
									<label htmlFor="address.city" className="form-label">
										City *
									</label>
									<input
										id="address.city"
										name="address.city"
										type="text"
										className="form-control"
										placeholder="Anytown"
										value={formik.values.address.city}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.address?.city &&
										formik.errors.address?.city && (
											<div className="text-danger small">
												{formik.errors.address.city}
											</div>
										)}
								</div>
								<div className="col-6 mb-3">
									<label htmlFor="address.country" className="form-label">
										Country *
									</label>
									<input
										id="address.country"
										name="address.country"
										type="text"
										className="form-control"
										placeholder="Country"
										value={formik.values.address.country}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
									/>
									{formik.touched.address?.country &&
										formik.errors.address?.country && (
											<div className="text-danger small">
												{formik.errors.address.country}
											</div>
										)}
								</div>
							</div>

							<div className="mb-3">
								<label htmlFor="address.state" className="form-label">
									State
								</label>
								<input
									id="address.state"
									name="address.state"
									type="text"
									className="form-control"
									placeholder="State"
									value={formik.values.address.state}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>
						</div>

						<div
							className="modal-footer border-0 d-flex justify-content-between"
							style={{
								backgroundColor: theme === "dark" ? "#34495e" : "#f8f9fa",
								borderBottomLeftRadius: "12px",
								borderBottomRightRadius: "12px",
							}}
						>
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={!formik.isValid || !formik.dirty}
							>
								Done
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreateCardModal;
