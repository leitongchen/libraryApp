const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const bookTypeField = document.getElementById('book-type-dropdown');

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = fetchDataFromLocalStorage(AUTHORSKEY) ?? [];
  const savedBooks = fetchDataFromLocalStorage(BOOKSKEY) ?? [];

  const sortedBooks = savedBooks.sort((a, b) => sortByName(a.title, b.title));

  DOMUtilities.addTableRow(BOOKSTABLEHEADERID, 'th', BookTableKeys);
  renderSavedAuthors(savedAuthors);
  renderSavedBooks(sortedBooks);
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
