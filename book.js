class Book {
  constructor(
    _id,
    _title,
    _authorId,
    // _publicationYear,
    // _publisher,
    _price,
  ) {
    this.id = _id;
    this.title = _title;
    this.authorId = _authorId;
    // this.publicationYear = _publicationYear;
    // this.publisher = _publisher;
    this.price = _price;
  }

  getBookTitle() {
    return this.title; 
  }

  getFormattedBookData() {
    return `ID: ${this.id} - Title: ${this.title}`;
  }

  getAuthorId() {
    return this.authorId;
  }

}



// #id;
// #title;
// #authorId;
// #price;

// constructor(
//   _id,
//   _title,
//   _authorId,
//   _price,
// ) {
//   this.#id = _id;
//   this.#title = _title;
//   this.#authorId = _authorId;
//   this.#price = _price;
// }

// get id() {
//   return this.#id;
// }
// set id(id) {
//   this.#id = id;
// }

// get title() {
//   return this.#title;
// }
// set title(titleValue) {
//   this.#title = titleValue;
// }

// get authorId() {
//   return this.#authorId;
// }
// set authorId(authorId) {
//   this.#authorId = authorId;
// }

// get price() {
//   return this.#price;
// }
// set price(price) {
//   this.#price = price;
// }

// getBookTitle() {
//   return this.#title; 
// }

// getFormattedBookData() {
//   return `ID: ${this.#id} - Title: ${this.#title}`;
// }

// getAuthorId() {
//   return this.#authorId;
// }