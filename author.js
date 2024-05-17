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

    this.#id = id ?? ++Author.#lastId;
    this.#name = name;
    this.#surname = surname;
    this.#birthDate = birthDate;
  }

  get id() {
    return this.#id;
  }

  get fullName() {
    return `${this.#surname}, ${this.#name}`;
  }

  get birthDate() {
    return this.#birthDate;
  }

  getSavingsData() {
    return {
      id: this.#id,
      name: this.#name,
      surname: this.#surname,
      birthDate: this.#birthDate,
    };
  }
}
