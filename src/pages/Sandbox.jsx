import { useContext, useEffect, useState } from "react";
import { FaTrash, FaBusinessTime, FaUser } from "react-icons/fa";
import {
	deleteUser,
	getAllUsers,
	patchBusinessStatus,
} from "../services/userService";
import { toast } from "react-toastify";
import ConfirmModal from "../components/confirmModal";
import { AuthContext } from "../context/AuthContext";

function Sandbox() {
	const { userData, isAuthenticated } = useContext(AuthContext);
	const [users, setUsers] = useState([]);
	const [currentAction, setCurrentAction] = useState(() => {});
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [showConfDelete, setShowConfDelete] = useState(false);

	useEffect(() => {
		getAllUsers()
			.then((res) => setUsers(res.data))
			.catch((err) => toast.error(err.response?.data));
	}, []);

	const handlePatchUser = async (userId) => {
		patchBusinessStatus(userId)
			.then((res) => {
				setUsers((prevUsers) =>
					prevUsers.map((user) =>
						user._id === userId
							? { ...user, isBusiness: res.data.isBusiness }
							: user
					)
				);
				toast.success(
					res.data.isBusiness
						? "User upgraded to Business successfully"
						: "User downgraded from Business successfully"
				);
			})
			.catch((err) => {
				toast.error(err.response?.data || "Failed to update user status");
			});
	};

	const handleDeleteUser = (userId) => {
		deleteUser(userId)
			.then(() => {
				toast.success("User Deleted Successfully");
				setUsers((prevUsers) =>
					prevUsers.filter((user) => user._id !== userId)
				);
			})
			.catch((err) =>
				toast.error(err.response?.data || "Failed to delete user")
			);
	};

	return (
		<>
			{isAuthenticated && userData.isAdmin ? (
				<div className="container mt-5">
					<h1 className="text-center mb-4">Admin Sandbox</h1>
					<div className="row g-3">
						{users.map((user) => (
							<div key={user._id} className="col-md-4">
								<div
									className="card shadow-sm"
									style={{
										background: `var(--background)`,
										color: `var(--text)`,
									}}
								>
									<div className="card-body">
										<h5 className="card-title">
											{user.name.first} {user.name.middle} {user.name.last}
										</h5>
										<p className="card-text">
											<strong>Email:</strong> {user.email}
											<br />
											<strong>Status:</strong>{" "}
											{user.isAdmin
												? "Admin User"
												: user.isBusiness
												? "Business User"
												: "Normal User"}
										</p>
										<div className="d-flex justify-content-between">
											<button
												className="btn btn-primary"
												onClick={() => {
													setCurrentAction(
														() => () => handlePatchUser(user._id)
													);
													setTitle(
														user.isBusiness ? "Downgrade User" : "Upgrade User"
													);
													setMessage(
														`Are you sure you want to ${
															user.isBusiness ? "downgrade" : "upgrade"
														} this user?`
													);
													setShowConfDelete(true);
												}}
												disabled={user.isAdmin}
											>
												{user.isBusiness ? <FaUser /> : <FaBusinessTime />}
												<span className="ms-2">
													{user.isBusiness ? "Downgrade" : "Upgrade"}
												</span>
											</button>
											<button
												className="btn btn-outline-danger"
												onClick={() => {
													setCurrentAction(
														() => () => handleDeleteUser(user._id)
													);
													setTitle("Delete User");
													setMessage(
														"Are you sure you want to delete this user?"
													);
													setShowConfDelete(true);
												}}
												disabled={user.isAdmin}
											>
												<FaTrash /> <span className="ms-2">Delete</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<ConfirmModal
						isOpen={showConfDelete}
						onClose={() => setShowConfDelete(false)}
						action={currentAction}
						title={title}
						message={message}
					/>
				</div>
			) : (
				<h1
					className="container d-flex justify-content-center align-items-center vh-100"
					style={{
						color: "var(--error)",
					}}
				>
					Must Login And Be An Admin
				</h1>
			)}
		</>
	);
}

export default Sandbox;
