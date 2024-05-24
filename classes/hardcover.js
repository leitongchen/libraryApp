class Hardcover extends Book {
  static PROPERTYNAME = 'hardcover';
  #numberOfPages;

  constructor(book) {
    super(book);
    this.#numberOfPages = book.numberOfPages;
  }

  get numberOfPages() {
    return this.#numberOfPages;
  }

  doSomething() {
    console.log('This is the number of pages', this.#numberOfPages);
  }

  getSavingsData() {
    return {
      id: this.id,
      title: this.title,
      authorId: this.authorId,
      price: this.price,
      bookType: this.bookType,
      numberOfPages: this.#numberOfPages,
    };
  }
}
