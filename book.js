class Book {
  constructor(_title, _author) {
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
}
