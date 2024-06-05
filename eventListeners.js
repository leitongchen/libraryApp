const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const searchBookInput = document.getElementById('book-search');
const searchBookCancel = document.getElementById('search-book-cancel');

const editBookFromTable = document.getElementById('books-table');

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

  renderBookTypeSubfield(bookType, BOOK_TYPE_SUBFIELD_ID);
});

searchBookInput.addEventListener('keyup', (e) => filterBooks(e));
searchBookCancel.addEventListener('click', (e) => resetBooksSearch());

document.getElementById('close-modal-button').addEventListener('click', (e) => {
  DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden');
});

document.addEventListener('click', function (e) {
  const bookTypeTarget = e.target.closest('#book-type-dropdown');
  const editBookTarget = e.target.closest('button');

  if (bookTypeTarget) {
    const bookType = bookTypeTarget.value;
    renderBookTypeSubfield(
      bookType,
      BOOK_TYPE_SUBFIELD_ID,
      EDIT_BOOK_MODAL_FORM_ID
    );
    return;
  }

  if (editBookTarget) {
    renderEditBookModal(editBookTarget.value);
    return;
  }
});
