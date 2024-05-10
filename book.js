class Book {
  static #lastId = 0;

  #id;
  #title;
  #authorId;
  #price;

  constructor(id, title, authorId, price) {
    if (id) {
      Book.#lastId = id;
    }

    this.#id = id ? id : ++Book.#lastId;
    this.#title = title;
    this.#authorId = authorId;
    this.#price = price;
  }

  getId() {
    return this.#id;
  }

  getAuthorId() {
    return this.#authorId;
  }

  getFormattedBookData() {
    return `ID: ${this.#id} - Title: ${this.#title}`;
  }

  getObj() {
    return {
      id: this.#id,
      title: this.#title,
      authorId: this.#authorId,
      price: this.#price,
    };
  }

  // get id() {
  //   return this._id;
  // }
  // set id(id) {
  //   this._id = id;
  // }

  // get title() {
  //   return this._title;
  // }
  // set title(titleValue) {
  //   this._title = titleValue;
  // }

  // get authorId() {
  //   return this._authorId;
  // }
  // set authorId(authorId) {
  //   this._authorId = authorId;
  // }

  // get price() {
  //   return this._price;
  // }
  // set price(price) {
  //   this._price = price;
  // }
}
