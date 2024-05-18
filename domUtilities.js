class DOMUtilities {
  static renderListElement(listId, textToPrint) {
    const newListItem = document.createElement('ol');
    const newParagraph = document.createElement('p');

    const list = document.getElementById(listId);

    newListItem.appendChild(newParagraph);
    newParagraph.innerText = textToPrint.trim();

    list.append(newListItem);
  }

  static addOptionToDropdown(dropdownId, elementId, elementValue) {
    const select = document.getElementById(dropdownId);
    const currentOption = document.createElement('option');

    currentOption.value = elementId;
    currentOption.innerText = elementId + ': ' + elementValue;

    select.append(currentOption);
  }

  static resetForm(e) {
    e.target.reset();
  }

  static getTableHeaderValues(tableId) {
    const tHead = document.getElementById(tableId);
    const tHeadCellsArr = Array.from(tHead.children);

    const headerElements = [];
    tHeadCellsArr.forEach((cellValue) => headerElements.push(cellValue.id));
    return headerElements;
  }

  static addTableRow(objectToPrint, tableId) {
    const tBody = document.getElementById(tableId);
    const tRow = document.createElement('tr');

    Object.keys(objectToPrint).forEach((key) => {
      const tData = document.createElement('td');
      let value = objectToPrint[key] ?? '-';

      tData.innerText = value;
      tRow.append(tData);
    });
  
    tBody.append(tRow);
  }
}
