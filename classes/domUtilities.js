class DOMUtilities {
  static addOptionToDropdown(dropdownId, optionValue, textToPrint) {
    const select = document.getElementById(dropdownId);
    const currentOption = document.createElement('option');

    currentOption.value = optionValue;
    currentOption.innerText = textToPrint;

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

  static addTableRow(tableId, cellType, objectToPrint) {
    const tBody = document.getElementById(tableId);
    const tRow = document.createElement('tr');

    let actionCell = document.createElement(cellType);
    if (cellType === 'td') {
      const button = document.createElement('button');

      button.id = 'edit-book';
      button.value = objectToPrint.id;
      button.innerText = 'Edit';

      actionCell.append(button);
    }
    tRow.append(actionCell);

    Object.keys(objectToPrint).forEach((key) => {
      const tData = document.createElement(cellType);
      let value = objectToPrint[key] ?? '-';

      tData.innerText = value;
      tRow.append(tData);
    });
    tBody.append(tRow);
  }

  static addLabel(parentId, labelText, htmlFor) {
    const parentElement = document.getElementById(parentId);

    const label = document.createElement('label');
    label.htmlFor = htmlFor;
    label.innerText = labelText;

    parentElement.append(label);
  }

  static addSelect(parentId, selectId, fieldName) {
    const parentElement = document.getElementById(parentId);

    const select = document.createElement('select');
    select.id = selectId;
    select.name = fieldName;
    select.classList.add('dropdown');

    parentElement.append(select);
  }

  static addTextInput(parentId, fieldName) {
    const parentElement = document.getElementById(parentId);

    const textInput = document.createElement('input');
    textInput.name = fieldName;
    textInput.placeholder = 'Enter number of the pages';

    parentElement.append(textInput);
  }

  static removeAllChildElements(elementId) {
    document.getElementById(elementId).innerHTML = '';
  }

  static removeClassFromElement(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.remove(className);
  }

  static addClassToElement(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.add(className);
  }

  static duplicateChildNodes(currentParentId, newParentId, newNodeId) {
    const currentParendNode = document.getElementById(currentParentId);
    const newParendNode = document.getElementById(newParentId);

    const clonedCurrent = currentParendNode.cloneNode(true);
    clonedCurrent.id = newNodeId;

    const formElements = Array.from(
      clonedCurrent.querySelectorAll('label, input, select')
    );

    newParendNode.append(clonedCurrent);
  }
}
