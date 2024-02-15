const booksLib = new BooksLibrary;

const addBookForm = document.getElementById('add-book-form');

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  booksLib.addBook(); 
});

window.addEventListener('DOMContentLoaded', () => {
  booksLib.loadBooks();
})