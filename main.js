const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
let booksArr = [];

let lastBookId;
let lastAuthorId;

const addAuthorForm = document.getElementById('add-author-form');
const addBookForm = document.getElementById('add-book-form');

addAuthorForm.addEventListener('submit', onAuthorFormSubmit);
addBookForm.addEventListener('submit', onBookBormSubmit);

window.addEventListener('DOMContentLoaded', () => {
  renderSavedAuthors();
  renderSavedBooks();

  lastAuthorId = getIdFromLastItem(authorsArr);
  lastBookId = getIdFromLastItem(booksArr);
});

function renderSavedAuthors() {
  const savedAuthors = getDataFromLocalStorage(AUTHORSKEY);
  if (savedAuthors) {
    authorsArr = savedAuthors;
    authorsArr.forEach((author) => {
      renderListElement(
        'authors-list',
        `
        ${author.id}:   ${author.surname}, ${author.name}
        `
      );
    });
  }
  renderAuthorsDropdown();
}

function renderSavedBooks() {
  const savedBooks = getDataFromLocalStorage(BOOKSKEY);

  savedBooks?.forEach((book, i) => {
    const currentBook = new Book(book.id, book.title, book.authorId, book.publicationYear, book.publisher, book.price);
    booksArr.push(currentBook);

    renderListElement(
      'books-list',
      currentBook.getFormattedBookData()
    );
    addBookRow(currentBook);

  });
}

function addBookRow(book) {
  const tBody = document.getElementById('books-table');
  const tRow = document.createElement('tr');

  // console.log(book);
  Object.keys(book).forEach((key) => {
    const tData = document.createElement('td');
    let value = book[key];

    if (key == 'authorId') {
      value = formatAuthorsData(value);
    }

    tData.innerText = value;
    tRow.append(tData);
  });

  tBody.append(tRow);
}

function formatAuthorsData(authorId) {
  const authors = getAuthorData(authorId);
  let authorDataToPrint = [];
  authors.forEach((author) => {
    const authorData = `${author.name} ${author.surname}`;
    authorDataToPrint.push(authorData);
  });
  return authorDataToPrint;
}

function getAuthorData(authorId) {
  return authorsArr.filter((author) => author.id == authorId);
}

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

function renderListElement(listId, textToPrint) {
  const newListItem = document.createElement('ol');
  const newParagraph = document.createElement('p');

  const list = document.getElementById(listId);

  newListItem.appendChild(newParagraph);
  newParagraph.innerText = textToPrint;

  list.append(newListItem);
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

  renderListElement(
    'authors-list',
    `
  ${currentAuthor.id}:   ${currentAuthor.surname}, ${currentAuthor.name}
`
  );
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
    book.price
  );
  lastBookId++;
  booksArr.push(currentBook);
  saveDataToLocalStorage(BOOKSKEY, booksArr);
  //console.log(currentBook.getBookTitle());
}
