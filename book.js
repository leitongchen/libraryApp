class Book {
  constructor(
    _id,
    _title,
    _authorId,
    _publicationYear,
    _publisher,
    _price,
  ) {
    this.id = _id;
    this.title = _title;
    this.authorId = _authorId;
    this.publicationYear = _publicationYear;
    this.publisher = _publisher;
    this.price = _price;
  }

  getBookTitle() {
    return this.title; 
  }

  getFormattedBookData() {
    return `ID: ${this.id} - Title: ${this.title}`;
  }
}
