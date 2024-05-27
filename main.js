let authorsArr = [];
let booksArr = [];

const booksTableHeaders = DOMUtilities.getTableHeaderValues(BOOKSTABLEHEADERID);

function onFormSubmit(e, callback) {
  e.preventDefault();
  const data = new FormData(e.target);
  const newEntry = Object.fromEntries(data.entries());

  callback(newEntry);
  DOMUtilities.resetForm(e);
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

    DOMUtilities.addTableRow(AUTHORSTABLEBODYID, 'td', author);
  });
  renderAuthorsDropdown();
}

function renderSavedBooks(savedBooks) {
  savedBooks.forEach((book) => {
    const newBookInstance = addNewBookInstance(book);
    booksArr.push(newBookInstance);
    DOMUtilities.addTableRow(
      BOOKSTABLEBODYID,
      'td',
      newBookInstance.getSavingsData()
    );
  });
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

  saveDataToLocalStorage(AUTHORSKEY, processDataToBeSaved(authorsArr));
  DOMUtilities.addOptionToDropdown(
    'author-dropdown',
    currentAuthor.id,
    PrintData.formatDataWithId(currentAuthor.id, currentAuthor.fullName)
  );
  DOMUtilities.addTableRow(
    AUTHORSTABLEBODYID,
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

function addBook(book) {
  const newBookInstance = addNewBookInstance(book);
  booksArr.push(newBookInstance);

  saveDataToLocalStorage(BOOKSKEY, processDataToBeSaved(booksArr));
  DOMUtilities.removeAllChildElements(BOOKSTABLEBODYID);

  booksArr
    .sort((a, b) => sortByName(a.title, b.title))
    .forEach((book) => {
      DOMUtilities.addTableRow(BOOKSTABLEBODYID, 'td', book.getSavingsData());
    });
}

function addFileTypeField() {
  DOMUtilities.removeAllChildElements(BOOKTYPECONTAINER);
  DOMUtilities.addLabel(BOOKTYPECONTAINER, 'File type', 'fileType');
  DOMUtilities.addSelect(BOOKTYPECONTAINER, FILETYPEDROPDOWNID, 'fileType');
  Object.keys(FileTypes).forEach((key) => {
    DOMUtilities.addOptionToDropdown(FILETYPEDROPDOWNID, key, FileTypes[key]);
  });
}

function addPagesNumberField() {
  DOMUtilities.removeAllChildElements(BOOKTYPECONTAINER);
  DOMUtilities.addLabel(BOOKTYPECONTAINER, 'Number of pages', 'numberOfPages');
  DOMUtilities.addTextInput(BOOKTYPECONTAINER, 'numberOfPages');
}
