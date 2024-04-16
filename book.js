class Book {
  constructor(id, title, authorId, price) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.price = price;
  }

  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get title() {
    return this._title;
  }
  set title(titleValue) {
    this._title = titleValue;
  }

  get authorId() {
    return this._authorId;
  }
  set authorId(authorId) {
    this._authorId = authorId;
  }

  get price() {
    return this._price;
  }
  set price(price) {
    this._price = price;
  }

  getBookTitle() {
    return this.title;
  }

  getFormattedBookData() {
    return `ID: ${this.id} - Title: ${this.title}`;
  }

  getAuthorId() {
    return this.authorId;
  }
}
