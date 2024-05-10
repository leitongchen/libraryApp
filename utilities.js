function processDataToBeSaved(array) {
  const processedArr = [];
  array.forEach((el) => {
    processedArr.push(el.getAuthorObj());
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

function getIdFromLastItem(items) {
  if (items.length) {
    const lastId = items[items.length - 1];
    console.log(lastId);
    return lastId;
  }
  return 0;
}

function getNewId(lastItemId) {
  return lastItemId + 1;
}
