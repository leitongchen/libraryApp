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
