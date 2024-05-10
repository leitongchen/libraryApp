class Book {
  constructor(id, title, authorId, price) {
    this._id = id;
    this._title = title;
    this._authorId = authorId;
    this._price = price;
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

  getFormattedBookData() {
    return `ID: ${this._id} - Title: ${this._title}`;
  }
}
