let authorsArr = [];
let booksArr = [];

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

    DOMUtilities.addTableRow(author, AUTHORSTABLEBODYID);
  });

  renderAuthorsDropdown();
}

function renderSavedBooks(savedBooks) {
  savedBooks.forEach((book) => {
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

  DOMUtilities.addTableRow(bookCopy, BOOKSTABLEBODYID);
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

  saveDataToLocalStorage(AUTHORSKEY, processDataToBeSaved(authorsArr));
  DOMUtilities.addOptionToDropdown(
    'author-dropdown',
    currentAuthor.id,
    currentAuthor.id + ': ' + currentAuthor.fullName
  );
  DOMUtilities.addTableRow(currentAuthor.getSavingsData(), AUTHORSTABLEBODYID);
}

function addBook(book) {
  console.log(book);
  const currentBook = new Book({
    title: book.title,
    authorId: book.author,
    price: book.price,
  });
  booksArr.push(currentBook);
  // console.log(currentBook);
  saveDataToLocalStorage(BOOKSKEY, processDataToBeSaved(booksArr));

  addBookRow(currentBook.getSavingsData());
}

function addFileTypeField() {
  document.getElementById(BOOKTYPEGROUP).innerHTML = '';
  DOMUtilities.addLabel(BOOKTYPEGROUP, 'File type', 'fileType');
  DOMUtilities.addSelect(BOOKTYPEGROUP, FILETYPEFIELDID, 'fileType');
  Object.keys(FileTypes).forEach((key) => {
    DOMUtilities.addOptionToDropdown(FILETYPEFIELDID, key, FileTypes[key]);
  });
}

function addPagesNumberField() {
  document.getElementById(BOOKTYPEGROUP).innerHTML = '';
  DOMUtilities.addLabel(BOOKTYPEGROUP, 'Number of pages', 'pagesNumber');
  DOMUtilities.addTextInput(BOOKTYPEGROUP, 'pagesNumber');
}
