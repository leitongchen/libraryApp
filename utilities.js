function processDataToBeSaved(array) {
	const processedArr = [];
	array.forEach((el) => {
		processedArr.push(el.getSavingsData());
	});
	return processedArr;
}

function saveDataToLocalStorage(key, array) {
	localStorage.setItem(key, JSON.stringify(array));
}

function fetchDataFromLocalStorage(key) {
	if (localStorage.getItem(key) === null) return;
	const storedElementsArr = JSON.parse(localStorage.getItem(key));
	return storedElementsArr;
}

function getEnumFromValues(arr) {
	const newEnum = {};
	arr.forEach((property) => {
		const cleanProp = property.trim();
		newEnum[cleanProp.toUpperCase()] = cleanProp;
	});
	return Object.freeze(newEnum);
}

function sortByName(a, b) {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}

function searchString(a, b) {
	return a.toLowerCase().includes(b.toLowerCase());
}

function findInstance(array, instanceId) {
	return array.find((el) => el.id == instanceId);
}

function getElement(elementId, containerId) {
	if (containerId) {
		const container = document.getElementById(containerId);
		return container.querySelector(`#${elementId}`);
	}
	return document.getElementById(elementId);
}
