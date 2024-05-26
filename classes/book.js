class Book {
  static #lastId = 0;

  #id;
  #title;
  #authorId;
  #price;
  #bookType;

  constructor(book) {
    if (book.id) Book.#lastId = book.id;

    this.#id = book.id ?? ++Book.#lastId;
    this.#title = book.title;
    this.#authorId = book.authorId;
    this.#price = book.price;
    this.#bookType = book.bookType;
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

  get bookType() {
    return this.#bookType;
  }

  getAuthorId() {
    return this.#authorId;
  }

  getSavingsData() {
    return {
      id: this.#id,
      title: this.#title,
      authorId: this.#authorId,
      bookType: this.#bookType,
      price: this.#price,
    };
  }
}
