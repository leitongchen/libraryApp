class Author {
  static #lastId = 0;

  #id;
  #name;
  #surname;
  #birthDate;

  constructor(_name, _surname, _birthDate) {
    this.#id = ++Author.#lastId;
    this.#name = _name;
    this.#surname = _surname;
    this.#birthDate = _birthDate;
    console.log(this.id);
  }

  // get id() {
  //   return this.#id;
  // }
  // set id(id) {
  //   this.#id = id;
  // }

  // get name() {
  //   return this.#name;
  // }
  // set name(name) {
  //   this.#name = name;
  // }

  // get surname() {
  //   return this.#surname;
  // }
  // set surname(surname) {
  //   this.#surname = surname;
  // }

  // get birthDate() {
  //   return this.#birthDate;
  // }
  // set birthDate(birthDate) {
  //   this.#birthDate = birthDate;
  // }

  getAuthorName() {
    return `${this.surname}, ${this.name}`;
  }

  getAuthorData() {
    return `${this.id}: ${this.getAuthorName()}`;
  }
}
