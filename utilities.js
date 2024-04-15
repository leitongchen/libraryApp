function saveDataToLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function fetchDataFromLocalStorage(key) {
  if (localStorage.getItem(key) === null) return;
  const storedElementsArr = JSON.parse(localStorage.getItem(key));
  return storedElementsArr;
}

function getIdFromLastItem(items) {
  if (items.length) {
    const lastId = items[items.length - 1].id;
    return lastId;
  }
  return 0;
}

function getNewId(lastItemId) {
  return lastItemId + 1;
}

function resetForm(e) {
  e.target.reset();
}

function addOptionToDropdown(dropdownId, elementId, elementValue) {
  const select = document.getElementById(dropdownId);
  const currentOption = document.createElement('option');

  currentOption.value = elementId;
  currentOption.innerText = elementValue;

  select.append(currentOption);
}
