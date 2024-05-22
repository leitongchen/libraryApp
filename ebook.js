class Ebook extends Book {
  #fileType;

  get fileType() {
    return this.#fileType;
  }

  writeSomething() {
    return 'This is the filetype: ' + this.#fileType;
  }
}
