class Hardcover extends Book {
  static PROPERTYNAME = 'hardcover';
  #numberOfPages;

  get numberOfPages() {
    return this.#numberOfPages;
  }

  doSomething() {
    console.log('This is the number of pages', this.#numberOfPages);
  }
}
