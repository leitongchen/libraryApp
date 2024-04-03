class Author {
  constructor(_id, _name, _surname, _alias, _birthDate, _email, _address) {
    this.id = _id;
    this.name = _name;
    this.surname = _surname;
    this.alias = _alias;
    this.birthDate = _birthDate;
    this.email = _email;
    this.address = _address;
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    const birthYear = new Date(this.birthDate).getFullYear();
    return currentYear - birthYear; // TODO: should return real age
  }
}
