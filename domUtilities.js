class DOMUtilities {
  static renderListElement(listId, textToPrint) {
    const newListItem = document.createElement('ol');
    const newParagraph = document.createElement('p');

    const list = document.getElementById(listId);

    newListItem.appendChild(newParagraph);
    newParagraph.innerText = textToPrint;

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
}
