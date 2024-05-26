const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const bookTypeField = document.getElementById('book-type-dropdown');

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = fetchDataFromLocalStorage(AUTHORSKEY) ?? [];
  const savedBooks = fetchDataFromLocalStorage(BOOKSKEY) ?? [];

  renderSavedAuthors(savedAuthors);
  renderSavedBooks(savedBooks);
  DOMUtilities.addTableRow(BOOKSTABLEHEADERID, 'th', BookTableKeys)
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
