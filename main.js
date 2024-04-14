const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
let booksArr = [];

let lastBookId = 0;
let lastAuthorId = 0;

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

  savedAuthors?.forEach(author => {
    const currentAuthor = new Author(author.id, author.name, author.surname, author.birthDate);
    authorsArr.push(currentAuthor);
    renderListElement(
      'authors-list',
      currentAuthor.getAuthorData()
    );
  })

  renderAuthorsDropdown();
}

function renderSavedBooks() {
  const savedBooks = getDataFromLocalStorage(BOOKSKEY);

  savedBooks?.forEach((book, i) => {
    const currentBook = new Book(book.id, book.title, book.authorId, book.price);

    booksArr.push(currentBook);

    addBookRow(currentBook);

  });
}

function addBookRow(book) {
  const author = getAuthorData(book.getAuthorId());

  const tBody = document.getElementById('books-table');
  const tRow = document.createElement('tr');

  Object.keys(book).forEach((key) => {
    const tData = document.createElement('td');
    let value = book[key] ?? '-';
    console.log(value);

    if (key == 'authorId') {
      value = author.getAuthorName();
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
  return authorsArr.find((author) => author.getId() == authorId);
}

function renderAuthorsDropdown() {
  authorsArr.forEach((author) => {
    addOptionToDropdown('author-dropdown', author.getId(), author.getAuthorName());
  });
}

function addOptionToDropdown(dropdownId, elementId, elementValue) {
  const select = document.getElementById(dropdownId);
  const currentOption = document.createElement('option');

  currentOption.value = elementId;
  currentOption.innerText = elementValue;

  select.append(currentOption);
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
  addOptionToDropdown('author-dropdown', currentAuthor.getId(), currentAuthor.getAuthorName());
}

function addBook(book) {
  const currentBook = new Book(
    getNewId(lastBookId),
    book.title,
    book.author,
    // book.publicationYear,
    // book.publisher,
    book.price
  );
  lastBookId++;
  booksArr.push(currentBook);
  saveDataToLocalStorage(BOOKSKEY, booksArr);

  addBookRow(currentBook);
}

function renderListElement(listId, textToPrint) {
  const newListItem = document.createElement('ol');
  const newParagraph = document.createElement('p');

  const list = document.getElementById(listId);

  newListItem.appendChild(newParagraph);
  newParagraph.innerText = textToPrint;

  list.append(newListItem);
}