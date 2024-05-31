const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const searchBookInput = document.getElementById('book-search');
const searchBookCancel = document.getElementById('search-book-cancel');

const bookTypeField = document.getElementById('book-type-dropdown');

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = fetchDataFromLocalStorage(AUTHORS_KEY) ?? [];
  const savedBooks = fetchDataFromLocalStorage(BOOKS_KEY) ?? [];

  DOMUtilities.addTableRow(BOOKS_TABLE_HEADER_ID, 'th', BookTableKeys);
  renderSavedAuthors(savedAuthors);
  initiateSavedBooks(savedBooks);
});

addAuthorForm.addEventListener('submit', function (e) {
  onFormSubmit(e, addAuthor);
});

addBookForm.addEventListener('submit', function (e) {
  onFormSubmit(e, addBook);
});

bookTypeField.addEventListener('change', (change) => {
  const bookType = change.target.value;

  if (bookType === BookTypes.EBOOK) {
    addFileTypeField();
  } else if (bookType === BookTypes.HARDCOVER) {
    addPagesNumberField();
  }
});

searchBookInput.addEventListener('keyup', (e) => filterBooks(e));
searchBookCancel.addEventListener('click', (e) => resetBooksSearch());
