class Book {
  static #lastId = 0;

  #id;
  #title;
  #authorId;
  #price;

  constructor(book) {
    if (book.id) Book.#lastId = book.id;

    this.#id = book.id ?? ++Book.#lastId;
    this.#title = book.title;
    this.#authorId = book.authorId;
    this.#price = book.price;
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
