class BooksLibrary {
  constructor() {
    this.booksList = []
  }

  addBook() {
    const titleValue = document.getElementById('title-field').value.trim();
    const authorValue = document.getElementById('author-field').value.trim();
  
    const book = new Book(titleValue, authorValue);
    this.booksList.push(book);
    
    this.renderBook(book);
    addBookForm.reset();
  }

  renderBook(book) {
    const booksListEl = document.getElementById('books-list');
    //booksListEl.textContent = '';
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <p>${book.getBookDetails()}</p>
    `

    booksListEl.append(listItem);
  }

  static checkTitles(a, b) {
    return a.title === b.title;
  }
}