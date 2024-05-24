class Ebook extends Book {
  static PROPERTYNAME = 'ebook';
  #fileType;

  get fileType() {
    return this.#fileType;
  }

  writeSomething() {
    console.log('This is your ebook file type', this.#fileType);
  }
}
