const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
const booksArr = [];

let lastBoodId;
let lastAuthorId;

const addAuthorForm = document.getElementById('add-author-form');

addAuthorForm.addEventListener('submit', onAuthorFormSubmit);

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = getDataFromLocalStorage(AUTHORSKEY);
  if (savedAuthors) {
    authorsArr = savedAuthors;
    renderEntities(authorsArr);
  }

  lastAuthorId = getIdFromLastItem(authorsArr);
  lastBoodId = getIdFromLastItem(booksArr);

  // render dropdown with list of authors
  // multiple selection should be possible
  // save authors selection as array

  renderAuthorsDropdown();
});

function renderAuthorsDropdown() {
  authorsArr.forEach((author) => {
    addAnAuthorToDropdown(author);
  });
}

function addAnAuthorToDropdown(author) {
  const select = document.getElementById('author-dropdown');

  const currentOption = document.createElement('option');

  currentOption.value = author.id;
  currentOption.innerText = `${author.name}, ${author.surname}`;

  console.log(currentOption);
  select.append(currentOption);
}

function renderEntities(entityList) {
  entityList.forEach((entity, i) => {
    renderElement(entity);
  });
}

function renderElement(entity) {
  const newListItem = document.createElement('ol');
  const newParagraph = document.createElement('p');

  const list = document.getElementById('authors-list');

  newListItem.appendChild(newParagraph);
  newParagraph.innerText = getAuthorData(entity);

  list.append(newListItem);
}

function getAuthorData(entity) {
  return `
    ${entity.id}:   ${entity.surname}, ${entity.name}
  `;
}

function onAuthorFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const authorObject = Object.fromEntries(data.entries());

  addAuthor(authorObject);
  resetForm(e);
}

function addAuthor(author) {
  const currentAuthor = new Author(
    getNewId(lastAuthorId),
    author.name,
    author.surname,
    author.birthDate
  );
  lastAuthorId++;
  authorsArr.push(currentAuthor);

  renderElement(currentAuthor);
  saveDataToLocalStorage(AUTHORSKEY, authorsArr);
  addAnAuthorToDropdown(currentAuthor);
}
