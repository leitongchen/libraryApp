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
    this.saveBooksToLocalStorage();
  }

  renderBook(book, index) {
    const booksListEl = document.getElementById('books-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h3>${book.title}</h3>
      <span>${book.author}</span>
      <button id="delete-book" class="filled-button" onClick="booksLib.deleteBook(${index})">Delete</button>
    `

    booksListEl.append(listItem);
  }

  deleteBook(index) {
    this.booksList.splice(index, 1);
    this.updatesBooks(); 
  }

  updatesBooks() {
    const booksListEl = document.getElementById('books-list');
    booksListEl.innerHTML = '';
    this.saveBooksToLocalStorage();
    this.loadBooks();
  }

  saveBooksToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.booksList));
  }

  getBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    return storedBooks;
  }

  loadBooks() {
    const storedBooks = this.getBooksFromLocalStorage();
    
    if (storedBooks) {
      this.booksList = storedBooks;
      this.renderBooks(storedBooks);
      return;
    }
    return false; 
  }

  renderBooks(booksList) {
    booksList.forEach((book, index) => {
      console.log(book);
      this.renderBook(book, index);
    })
  }


  static checkTitles(a, b) {
    return a.title === b.title;
  }
}