class Ebook extends Book {
  static PROPERTYNAME = 'ebook';
  #fileType;

  constructor(book) {
    super(book);
    this.#fileType = book.fileType;
  }

  get fileType() {
    return this.#fileType;
  }

  writeSomething() {
    console.log('This is your ebook file type', this.#fileType);
  }

  getSavingsData() {
    return {
      id: this.id,
      title: this.title,
      authorId: this.authorId,
      price: this.price,
      bookType: this.bookType,
      fileType: this.#fileType,
    };
  }
}