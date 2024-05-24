class Author {
  static #lastId = 0;

  #id;
  #name;
  #surname;
  #birthDate;

  constructor(author) {
    if (author.id) Author.#lastId = author.id;

    this.#id = author.id ?? ++Author.#lastId;
    this.#name = author.name;
    this.#surname = author.surname;
    this.#birthDate = author.birthDate;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get surname() {
    return this.#surname;
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
