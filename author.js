class Author {
  constructor(_id, _name, _surname, _birthDate) {
    this.id = _id;
    this.name = _name;
    this.surname = _surname;
    this.birthDate = _birthDate;
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(this.birthDate).getFullYear();
    return currentYear - birthYear; // TODO: should return real age
  }
}
