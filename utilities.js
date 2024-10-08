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

function updateSelectOption(selectId) {
	const select = document.getElementById(selectId);
	select.loadOptions();
}

function getSelectedValuesFromSelect(selectId) {
	const select = document.getElementById(selectId);
	return Array.from(select.selectedOptions).map((x) => x.value ?? x.text);
}

function itBelongs(array, idToSearch) {
	return array.includes(idToSearch.toString());
}

function getEnumFromValues(arr) {
	const newEnum = {};
	arr.forEach((property) => {
		const cleanProp = property.trim();
		newEnum[cleanProp.toUpperCase()] = cleanProp;
	});
	return Object.freeze(newEnum);
}

function getOrderedEnumFromValues(arr) {
	const newEnum = {};
	arr.forEach((prop, index) => {
		const cleanProp = prop.trim();
		newEnum[index] = cleanProp;
	});
	return Object.freeze(newEnum);
}
