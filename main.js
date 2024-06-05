let authorsArr = [];
let booksArr = [];

const booksTableHeaders = DOMUtilities.getTableHeaderValues(
  BOOKS_TABLE_HEADER_ID
);

function onFormSubmit(e, callback) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newEntry = Object.fromEntries(data.entries());

  callback(newEntry);
  DOMUtilities.resetForm(e);
}

function initiateSavedBooks(savedBooks) {
  savedBooks.forEach((book) => {
    const newBookInstance = addNewBookInstance(book);
    booksArr.push(newBookInstance);
  });

  renderSortedBooksTable(booksArr);
}

function renderSavedAuthors(savedAuthors) {
  savedAuthors.forEach((author) => {
    const currentAuthor = new Author({
      id: author.id,
      name: author.name,
      surname: author.surname,
      birthDate: author.birthDate,
    });
    authorsArr.push(currentAuthor);

    DOMUtilities.addTableRow(AUTHORS_TABLE_BODY_ID, 'td', author);
  });
  renderAuthorsDropdown();
}

function renderAuthorsDropdown() {
  authorsArr.forEach((author) => {
    DOMUtilities.addOptionToDropdown(
      'author-dropdown',
      author.id,
      PrintData.formatDataWithId(author.id, author.fullName)
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

  saveDataToLocalStorage(AUTHORS_KEY, processDataToBeSaved(authorsArr));

  DOMUtilities.addOptionToDropdown(
    'author-dropdown',
    currentAuthor.id,
    PrintData.formatDataWithId(currentAuthor.id, currentAuthor.fullName)
  );

  DOMUtilities.addTableRow(
    AUTHORS_TABLE_BODY_ID,
    'td',
    currentAuthor.getSavingsData()
  );
}

function addNewBookInstance(book) {
  let newBook;
  const bookObj = {
    title: book.title,
    authorId: book.authorId,
    price: book.price,
    bookType: book.bookType,
  };

  if (book.bookType === BookTypes.EBOOK) {
    newBook = new Ebook({
      ...bookObj,
      fileType: book.fileType,
    });
  } else if (book.bookType === BookTypes.HARDCOVER) {
    newBook = new Hardcover({
      ...bookObj,
      numberOfPages: book.numberOfPages,
    });
  }
  return newBook;
}

function renderSortedBooksTable(books) {
  DOMUtilities.removeAllChildElements(BOOKS_TABLE_BODY_ID);

  books
    .sort((a, b) => sortByName(a.title, b.title))
    .forEach((book) => {
      const author = findInstance(authorsArr, book.authorId);
      const bookCopy = book.getSavingsData();
      bookCopy.authorId = author.fullName;
      DOMUtilities.addTableRow(BOOKS_TABLE_BODY_ID, 'td', bookCopy);
    });
}

function addBook(book) {
  const newBookInstance = addNewBookInstance(book);
  booksArr.push(newBookInstance);

  saveDataToLocalStorage(BOOKS_KEY, processDataToBeSaved(booksArr));
  renderSortedBooksTable(booksArr);
}

function addFileTypeField(
  bookTypeContainerId,
  fileTypeDropdownId,
  containerId
) {
  DOMUtilities.removeAllChildElements(bookTypeContainerId, containerId);
  DOMUtilities.addLabel(
    bookTypeContainerId,
    'File type',
    'fileType',
    containerId
  );
  DOMUtilities.addSelect(
    bookTypeContainerId,
    fileTypeDropdownId,
    'fileType',
    containerId
  );
  Object.keys(FileTypes).forEach((key) => {
    DOMUtilities.addOptionToDropdown(
      fileTypeDropdownId,
      key,
      FileTypes[key],
      containerId
    );
  });
}

function addPagesNumberField(bookTypeContainerId, containerId) {
  DOMUtilities.removeAllChildElements(bookTypeContainerId, containerId);
  DOMUtilities.addLabel(
    bookTypeContainerId,
    'Number of pages',
    'numberOfPages',
    containerId
  );
  DOMUtilities.addTextInput(bookTypeContainerId, 'numberOfPages', containerId);
}

function filterBooks(e) {
  const filteredBooks = booksArr.filter((book) =>
    searchString(book.title, e.target.value)
  );
  renderSortedBooksTable(filteredBooks);
}

function resetBooksSearch() {
  searchBookInput.value = '';
  renderSortedBooksTable(booksArr);
}

function renderEditBookModal(bookId) {
  DOMUtilities.removeClassFromElement('edit-book-modal-layover', 'hidden');
  const selectedBook = findInstance(booksArr, bookId);

  DOMUtilities.removeAllChildElements('edit-form-modal');

  DOMUtilities.duplicateChildNodes(
    'create-book-form',
    'edit-form-modal',
    EDIT_BOOK_MODAL_FORM_ID
  );

  renderBookTypeSubfield(
    selectedBook.bookType,
    BOOK_TYPE_SUBFIELD_ID,
    EDIT_BOOK_MODAL_FORM_ID
  );

  const editBookForm = document.getElementById(EDIT_BOOK_MODAL_FORM_ID);
  const editFormInputs = editBookForm.querySelectorAll('input, select');

  editFormInputs.forEach((item) => {
    item.value = selectedBook[item.name];
  });
}
