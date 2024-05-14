const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
let booksArr = [];

const addAuthorForm = document.getElementById('add-author-form');
const addBookForm = document.getElementById('add-book-form');

addAuthorForm.addEventListener('submit', function (e) {
  onFormSubmit(e, addAuthor);
});
addBookForm.addEventListener('submit', function (e) {
  onFormSubmit(e, addBook);
});

function onFormSubmit(e, callback) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newEntry = Object.fromEntries(data.entries());

  callback(newEntry);
  DOMUtilities.resetForm(e);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = fetchDataFromLocalStorage(AUTHORSKEY);
  const savedBooks = fetchDataFromLocalStorage(BOOKSKEY);

  renderSavedAuthors(savedAuthors);
  renderSavedBooks(savedBooks);
});

function renderSavedAuthors(savedAuthors) {
  savedAuthors?.forEach((author) => {
    const currentAuthor = new Author(
      author.id,
      author.name,
      author.surname,
      author.birthDate
    );
    authorsArr.push(currentAuthor);
    DOMUtilities.renderListElement(
      'authors-list',
      currentAuthor.getAuthorData()
    );
  });

  renderAuthorsDropdown();
}

function renderSavedBooks(savedBooks) {
  savedBooks?.forEach((book) => {
    const currentBook = new Book(
      book.id,
      book.title,
      book.authorId,
      book.price
    );

    booksArr.push(currentBook);

    addBookRow(book);
  });
}

function addBookRow(book) {
  const author = getAuthorObj(book.authorId);

  const tBody = document.getElementById('books-table');
  const tRow = document.createElement('tr');

  Object.keys(book).forEach((key) => {
    const tData = document.createElement('td');
    let value = book[key] ?? '-';

    if (key == 'authorId') {
      value = author.getAuthorName();
    }

    tData.innerText = value;
    tRow.append(tData);
  });

  tBody.append(tRow);
}

function getAuthorObj(authorId) {
  return authorsArr.find((author) => author.getId() == authorId);
}

function renderAuthorsDropdown() {
  authorsArr.forEach((author) => {
    DOMUtilities.addOptionToDropdown(
      'author-dropdown',
      author.getId(),
      author.getAuthorName()
    );
  });
}

function addAuthor(author) {
  const currentAuthor = new Author(
    null,
    author.name,
    author.surname,
    author.birthDate
  );
  authorsArr.push(currentAuthor);

  DOMUtilities.renderListElement(
    'authors-list',
    `
    ${currentAuthor.getAuthorName()}
    `
  );

  saveDataToLocalStorage(AUTHORSKEY, processDataToBeSaved(authorsArr));
  DOMUtilities.addOptionToDropdown(
    'author-dropdown',
    currentAuthor.getId(),
    currentAuthor.getAuthorName()
  );
}

function addBook(book) {
  const currentBook = new Book(null, book.title, book.author, book.price);
  booksArr.push(currentBook);
  saveDataToLocalStorage(BOOKSKEY, processDataToBeSaved(booksArr));

  addBookRow(currentBook);
}
