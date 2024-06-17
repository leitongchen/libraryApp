class DOMUtilities {
	static addOptionToDropdown(
		dropdownId,
		optionValue,
		textToPrint,
		specificContainerId
	) {
		const select = getParentElement(dropdownId, specificContainerId);
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
			const button = this.createEditIconButton(objectToPrint.id);
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

	static createEditIconButton(buttonValue) {
		const button = document.createElement('button');
		const icon = document.createElement('i');

		icon.classList.add('fa', 'fa-edit');
		button.value = buttonValue;

		button.append(icon);
		return button;
	}

	static addLabel(parentId, specificContainerId, options) {
		const parentElement = getParentElement(parentId, specificContainerId);

		const label = document.createElement('label');
		label.htmlFor = options.htmlFor;
		label.innerText = options.labelText;

		parentElement.append(label);
	}

	static addSelect(parentId, specificContainerId, options) {
		const parentElement = getParentElement(parentId, specificContainerId);

		const select = document.createElement('select');

		select.id = options.selectId;
		select.name = options.fieldName;

		select.classList.add('dropdown');

		parentElement.append(select);
	}

	static addTextInput(parentId, specificContainerId, attributes) {
		const parentElement = getParentElement(parentId, specificContainerId);

		const textInput = document.createElement('input');
		textInput.name = attributes.fieldName;
		textInput.disabled = attributes.disabled ?? null;

		parentElement.append(textInput);
	}

	static removeAllChildElements(elementId, specificContainerId) {
		const element = getParentElement(elementId, specificContainerId);
		element.innerHTML = '';
	}

	static removeClassFromElement(elementId, className, specificContainerId) {
		const element = getParentElement(elementId, specificContainerId);
		element.classList.remove(className);
	}

	static addClassToElement(elementId, className, specificContainerId) {
		const element = getParentElement(elementId, specificContainerId);
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
