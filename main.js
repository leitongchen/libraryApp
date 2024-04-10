const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
const booksArr = [];

let lastBookId;
let lastAuthorId;

const addAuthorForm = document.getElementById('add-author-form');
const addBookForm = document.getElementById('add-book-form');

addAuthorForm.addEventListener('submit', onAuthorFormSubmit);
addBookForm.addEventListener('submit', onBookBormSubmit);

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = getDataFromLocalStorage(AUTHORSKEY);
  if (savedAuthors) {
    authorsArr = savedAuthors;
    renderEntities(authorsArr);
  }

  lastAuthorId = getIdFromLastItem(authorsArr);
  lastBookId = getIdFromLastItem(booksArr);

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
  const author = Object.fromEntries(data.entries());

  addAuthor(author);
  resetForm(e);
}

function onBookBormSubmit(e) {
  e.preventDefault(); 
  const data = new FormData(e.target);
  const book = Object.fromEntries(data.entries());

  console.log(book);
  addBook(book);
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

function addBook(book) {
  const currentBook = new Book(
    getNewId(lastBookId),
    book.title,
    book.author,
    book.publicationYear,
    book.publisher,
    book.price, 
  )
  lastBookId++;
  booksArr.push(currentBook);

  console.log( 'books array: ',booksArr)
}