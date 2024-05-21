const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

let authorsArr = [];
let booksArr = [];

const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

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
    const currentAuthor = new Author({
      id: author.id,
      name: author.name,
      surname: author.surname,
      birthDate: author.birthDate,
    });
    authorsArr.push(currentAuthor);
    DOMUtilities.renderListElement(
      'authors-list',
      PrintData.formatDataWithId(currentAuthor.id, currentAuthor.fullName)
    );
  });

  renderAuthorsDropdown();
}

function renderSavedBooks(savedBooks) {
  savedBooks?.forEach((book) => {
    const currentBook = new Book({
      id: book.id,
      title: book.title,
      authorId: book.authorId,
      price: book.price,
    });

    booksArr.push(currentBook);

    addBookRow(book);
  });
}

function addBookRow(book) {
  const author = getAuthorObj(book.authorId);
  const bookCopy = Object.assign({}, book);

  bookCopy.authorId = author?.fullName ?? '-';
  // delete bookCopy.authorId;

  // const tHeadValues = DOMUtilities.getTableHeaderValues('books-table-header');
  // console.log(tHeadValues, bookCopy);

  DOMUtilities.addTableRow(bookCopy, 'books-table');
}

function getAuthorObj(authorId) {
  return authorsArr.find((author) => author.id == authorId);
}

function renderAuthorsDropdown() {
  authorsArr.forEach((author) => {
    DOMUtilities.addOptionToDropdown(
      'author-dropdown',
      author.id,
      author.fullName
    );
  });
}

function addAuthor(author) {
  const currentAuthor = new Author({
    name: author.name,
    surname: author.surname,
    birthDate: author.birthDate,
  });
  authorsArr.push(currentAuthor);

  DOMUtilities.renderListElement(
    'authors-list',
    PrintData.formatDataWithId(currentAuthor.id, currentAuthor.fullName)
  );

  saveDataToLocalStorage(AUTHORSKEY, processDataToBeSaved(authorsArr));
  DOMUtilities.addOptionToDropdown(
    'author-dropdown',
    currentAuthor.id,
    currentAuthor.fullName
  );
}

function addBook(book) {
  const currentBook = new Book({
    title: book.title,
    authorId: book.author,
    price: book.price,
  });
  booksArr.push(currentBook);
  saveDataToLocalStorage(BOOKSKEY, processDataToBeSaved(booksArr));

  addBookRow(currentBook);
}
