class Author {
  static #lastId = 0;

  constructor(name, surname, birthDate) {
    this._id = ++Author.#lastId;
    this.name = name;
    this.surname = surname;
    this.birthDate = birthDate;
  }

  get id() {
    return this._id;
  }
  set id(id) {
    this._id = id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  get surname() {
    return this._surname;
  }
  set surname(surname) {
    this._surname = surname;
  }

  get birthDate() {
    return this._birthDate;
  }
  set birthDate(birthDate) {
    this._birthDate = birthDate;
  }

  getAuthorName() {
    return `${this.surname}, ${this.name}`;
  }

  getAuthorData() {
    return `${this.id}: ${this.getAuthorName()}`;
  }
}
