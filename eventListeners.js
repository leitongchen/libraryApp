const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const searchBookInput = document.getElementById('book-search');
const searchBookCancel = document.getElementById('search-book-cancel');

const editBookFromTable = document.getElementById('books-table');

const bookTypeField = document.getElementById('book-type-dropdown');

window.addEventListener('DOMContentLoaded', () => {
  const savedAuthors = fetchDataFromLocalStorage(AUTHORSKEY) ?? [];
  const savedBooks = fetchDataFromLocalStorage(BOOKSKEY) ?? [];

  DOMUtilities.addTableRow(BOOKSTABLEHEADERID, 'th', BookTableKeys);
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

editBookFromTable.addEventListener('click', (e) => {
  const triggeredTag = e.target.tagName; 
  if (triggeredTag === 'BUTTON') {
    const bookId = e.target.value; 
    DOMUtilities.removeClassFromElement('edit-book-modal-layover', 'hidden');
    const selectedBook = findInstance(booksArr, bookId);
    console.log(bookId, selectedBook);
  }
})

document.getElementById('close-modal-button').addEventListener('click', (e) => {
  DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden');
})