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

    this.#id = id ?? ++Book.#lastId;
    this.#title = title;
    this.#authorId = authorId;
    this.#price = price;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get authorId() {
    return this.#authorId;
  }

  get price() {
    return this.#price;
  }

  getAuthorId() {
    return this.#authorId;
  }

  getSavingsData() {
    return {
      id: this.#id,
      title: this.#title,
      authorId: this.#authorId,
      price: this.#price,
    };
  }
}
