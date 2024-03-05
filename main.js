const AUTHORS = 'authors';
const BOOKS = 'books';

let authorsArray = [];

const addAuthorForm = document.getElementById('add-author-form');

addAuthorForm.addEventListener('submit', onAuthorFormSubmit);

window.addEventListener('DOMContentLoaded', () => {
  authorsArray = getDataFromLocalStorage(AUTHORS);
  if (addAuthor.length > 0) {
    renderEntities(authorsArray);
  }
});

function onAuthorFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const authorObject = Object.fromEntries(data.entries());

  addAuthor(authorObject);
  resetForm(e);
}

function resetForm(e) {
  e.target.reset();
}

function addAuthor(author) {
  const currentAuthor = new Author(
    author.name,
    author.surname,
    author.alias,
    author.birthDate,
    author.email,
    author.address
  );

  authorsArray.push(currentAuthor);

  renderElement(currentAuthor);
  saveDataToLocalStorage(AUTHORS, authorsArray);
}

function saveDataToLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getDataFromLocalStorage(key) {
  if (localStorage.getItem(key) === null) return;
  const storedElementsArr = JSON.parse(localStorage.getItem(key));
  return storedElementsArr;
}

function renderEntities(entityList) {
  entityList.forEach((entity, i) => {
    entity.id = i + 1;
    renderElement(entity);
    console.log(entity);
  });
}

function renderElement(entity) {
  const listElement = document.getElementById('authors-list');
  const listItem = document.createElement('ol');

  listItem.innerHTML = createListItem(entity);
  listElement.append(listItem);
}

function createListItem(entity) {
  return `
    <p>${entity.id}:   <b>${entity.surname}</b>, ${entity.name}</p>
  `;
}
