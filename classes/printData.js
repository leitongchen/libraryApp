class PrintData {
  static formatDataWithId(id, textToPrint) {
    return `ID: ${id} - ${textToPrint}`;
  }

  static formatFullName(name, surname) {
    return `${surname}, ${name}`;
  }
}
