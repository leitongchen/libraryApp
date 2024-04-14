class Author {
  constructor(_id, _name, _surname, _birthDate) {
    this.id = _id;
    this.name = _name;
    this.surname = _surname;
    this.birthDate = _birthDate;
  }


  getAuthorName() {
    return `${this.surname}, ${this.name}`;
  }

  getId() {
    return this.id;
  }

  getAuthorData() {
    return `${this.getId()}: ${this.getAuthorName()}`
  }
}
