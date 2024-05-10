class Author {
  static #lastId = 0;

  #id;
  #name;
  #surname;
  #birthDate;

  constructor(id, name, surname, birthDate) {
    if (id) {
      Author.#lastId = id;
    }

    this.#id = id ? id : ++Author.#lastId;
    this.#name = name;
    this.#surname = surname;
    this.#birthDate = birthDate;
  }

  getId() {
    return this.#id;
  }

  getAuthorName() {
    return `${this.#surname}, ${this.#name}`;
  }

  getAuthorData() {
    return `${this.#id}: ${this.getAuthorName()}`;
  }

  getObj() {
    return {
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      birthDate: this.#birthDate,
    };
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
}
