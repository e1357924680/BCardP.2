import axios from "axios";

const apiURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/";

export function loginUser(user) {
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: apiURL + "login",
		headers: {
			"Content-Type": "application/json",
		},
		data: user,
	};

	return axios.request(config);
}

export function registerUser(user) {
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: apiURL,
		headers: {
			"Content-Type": "application/json",
		},
		data: user,
	};

	return axios
		.request(config)
		.then((res) => {
			if (res.status === 201) {
				console.log(res);
				let loginConfig = {
					method: "post",
					maxBodyLength: Infinity,
					url: apiURL + "login",
					headers: {
						"Content-Type": "application/json",
					},
					data: { email: user.email, password: user.password },
				};
				console.log(loginConfig);

				return axios.request(loginConfig);
			}
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
}

export function getUserById(id) {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL + id,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
	};
	return axios.request(config);
}

export function getAllUsers() {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
	};
	return axios.request(config);
}

export function updateUser(user, id) {
	let config = {
		method: "put",
		maxBodyLength: Infinity,
		url: apiURL + id,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
		data: user,
	};
	return axios.request(config);
}

export function deleteUser(id) {
	let config = {
		method: "delete",
		maxBodyLength: Infinity,
		url: apiURL + id,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
		data: {},
	};

	return axios.request(config);
}

export function patchBusinessStatus(id) {
	let config = {
		method: "patch",
		maxBodyLength: Infinity,
		url: apiURL + id,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
	};

	return axios.request(config);
}
