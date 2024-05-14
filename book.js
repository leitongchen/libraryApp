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
}
