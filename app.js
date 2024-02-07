const hello = 'Benvenuti';

document.getElementById('title').innerHTML = hello;

class Book {
  constructor(_title, _author) {
    // console.log('I am a new book');
    this.title = _title;
    this.author = _author;
  }

  get authorName() {
    return this.author;
  }

  get fullTitle() {
    return this.title;
  }

  getBookDetails() {
    return this.title + ', ' + this.author;
  }

  static checkTitles(a, b) {
    return a.title === b.title;
  }
}

let newBook1 = new Book('Orgoglio e pregiudizio', 'Jane Austen');
let newBook2 = new Book('La Divina Commedia', 'Dante Alighieri');

console.log(newBook1.getBookDetails());
console.log(newBook2.getBookDetails());
