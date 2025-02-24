import axios from "axios";

const apiURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/";

export function getAllCards() {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL,
		headers: {},
	};

	return axios.request(config);
}

export function getCardById(id) {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL + id,
		headers: {},
	};

	return axios.request(config);
}

export function getMyCards() {
	let config = {
		method: "get",
		maxBodyLength: Infinity,
		url: apiURL + "my-cards",
		headers: {
			"x-auth-token": localStorage.getItem("token"),
		},
	};

	return axios.request(config);
}

export function addCard(data) {
	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: apiURL,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		data: data,
	};
	return axios.request(config);
}

export function updateCard(data, cardId) {
	let config = {
		method: "put",
		maxBodyLength: Infinity,
		url: apiURL + cardId,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		data: data,
	};
	return axios.request(config);
}

export function deleteCard(cardId, cardBizNum) {
	let config = {
		method: "delete",
		maxBodyLength: Infinity,
		url: apiURL + cardId,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
		data: JSON.stringify({
			bizNumber: cardBizNum,
		}),
	};
	return axios.request(config);
}

export function likeToggleCard(cardId) {
	let config = {
		method: "patch",
		maxBodyLength: Infinity,
		url: apiURL + cardId,
		headers: { "x-auth-token": localStorage.getItem("token") },
	};

	return axios.request(config);
}
