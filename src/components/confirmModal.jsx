import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/index.css";

function ConfirmModal({
	action,
	title = "Confirm Action",
	message = "Are you sure?",
	isOpen,
	onClose,
}) {
	const { theme } = useContext(ThemeContext);

	return (
		<div>
			{isOpen && (
				<div
					className="modal fade show d-block"
					tabIndex="-1"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					onClick={onClose}
				>
					<div
						className="modal-dialog modal-dialog-centered"
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`modal-content ${
								theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
							}`}
						>
							<div className="modal-header">
								<h5 className="modal-title">{title}</h5>
								<button
									type="button"
									className="btn-close"
									onClick={onClose}
									aria-label="Close"
								></button>
							</div>
							<div className="modal-body">
								<p>{message}</p>
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
								<button
									className="btn btn-danger"
									onClick={() => {
										action();
										onClose();
									}}
								>
									Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default ConfirmModal;
