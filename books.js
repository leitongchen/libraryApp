class BooksLibrary {
  constructor() {
    this.books = []
  }

  addBook() {
    const titleInput = document.getElementById('title-field');
    const titleValue = titleInput.value.trim();
    const authorInput = document.getElementById('author-field');
    const authorValue = authorInput.value.trim();
  
    console.log(titleValue, authorValue);

    // titleInput.textContent = '';
    // authorInput.textContent = '';
    addBookForm.reset();
  }

  static checkTitles(a, b) {
    return a.title === b.title;
  }
}