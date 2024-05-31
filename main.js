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

function getAuthorObj(authorId) {
  return authorsArr.find((author) => author.id == authorId);
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
      const author = getAuthorObj(book.authorId);
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

function addFileTypeField() {
  DOMUtilities.removeAllChildElements(BOOK_TYPE_CONTAINER_ID);
  DOMUtilities.addLabel(BOOK_TYPE_CONTAINER_ID, 'File type', 'fileType');
  DOMUtilities.addSelect(
    BOOK_TYPE_CONTAINER_ID,
    FILE_TYPE_DROPDOWN_ID,
    'fileType'
  );
  Object.keys(FileTypes).forEach((key) => {
    DOMUtilities.addOptionToDropdown(
      FILE_TYPE_DROPDOWN_ID,
      key,
      FileTypes[key]
    );
  });
}

function addPagesNumberField() {
  DOMUtilities.removeAllChildElements(BOOK_TYPE_CONTAINER_ID);
  DOMUtilities.addLabel(
    BOOK_TYPE_CONTAINER_ID,
    'Number of pages',
    'numberOfPages'
  );
  DOMUtilities.addTextInput(BOOK_TYPE_CONTAINER_ID, 'numberOfPages');
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
