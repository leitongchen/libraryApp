let authorsArr = [];
let booksArr = [];

let copyOfBooksToRender = [];

const booksTableHeaders = DOMUtilities.getTableHeaderValues(
	BOOKS_TABLE_HEADER_ID
);

function onFormSubmit(e, callback) {
	e.preventDefault();
	const data = new FormData(e.target);
	const newEntry = Object.fromEntries(data.entries());

	callback(newEntry);
	DOMUtilities.resetForm(e);
}

function addAuthor(author) {
	if (!isAuthorFormValid(author)) {
		console.log('!!! Cannot add an author. Please insert all data!');
		return;
	}

	const currentAuthor = new Author({
		name: author.name,
		surname: author.surname,
		birthDate: author.birthDate,
	});
	authorsArr.push(currentAuthor);

	saveDataToLocalStorage(AUTHORS_KEY, processDataToBeSaved(authorsArr));

	DOMUtilities.addOptionToDropdown(
		'create-author-dropdown',
		currentAuthor.id,
		PrintData.formatDataWithId(currentAuthor.id, currentAuthor.fullName)
	);

	DOMUtilities.addTableRow(
		AUTHORS_TABLE_BODY_ID,
		'td',
		currentAuthor.getSavingsData()
	);

	updateSelectOption('create-author-dropdown');
}

function addBook(book) {
	const selectedAuthors = getSelectedValuesFromSelect('create-author-dropdown');
	book.authorsId = selectedAuthors ?? [];

	if (!isBookFormValid(book)) {
		console.log('!!! Form data are required!');
		return;
	}

	const newBookInstance = getNewBookInstance(book);
	newBookInstance.authors = getAuthors(book.authorsId);

	booksArr.push(newBookInstance);
	copyOfBooksToRender.push(newBookInstance.getDataToRender(authorsArr));

	saveDataToLocalStorage(BOOKS_KEY, processDataToBeSaved(booksArr));
	renderSortedBooksTable(copyOfBooksToRender, getCurrentBookTableOrderValue());
}

function updateBook(updatedBook) {
	const selectedAuthors = getSelectedValuesFromSelect('edit-author-dropdown');
	updatedBook.authorsId = selectedAuthors ?? [];

	if (!updatedBook.authorsId.at(-1)) {
		console.log('Please selectat least an author');
		return;
	}

	const bookIndex = booksArr.findIndex((book) => updatedBook.id == book.id);
	const newBookInstance = getNewBookInstance(updatedBook, updatedBook.id);
	newBookInstance.authors = getAuthors(updatedBook.authorsId);

	booksArr.splice(bookIndex, 1, newBookInstance);

	copyOfBooksToRender = booksArr.map((book) => {
		return book.getDataToRender(authorsArr);
	});

	saveDataToLocalStorage(BOOKS_KEY, processDataToBeSaved(booksArr));
	renderSortedBooksTable(copyOfBooksToRender, getCurrentBookTableOrderValue());

	DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden');
}

function initiateSavedBooks(savedBooks) {
	savedBooks.forEach((book) => {
		const newBookInstance = getNewBookInstance(book, book.id);
		booksArr.push(newBookInstance);
	});
}

function renderSavedBooks() {
	copyOfBooksToRender = booksArr.map((book) => {
		return book.getDataToRender(authorsArr);
	});

	renderSortedBooksTable(copyOfBooksToRender, getCurrentBookTableOrderValue());
	Book.updateLastId(booksArr.at(-1)?.id ?? 0);
}

function initiateSavedAuthors(savedAuthors) {
	savedAuthors.forEach((author) => {
		const currentAuthor = new Author({
			id: author.id,
			name: author.name,
			surname: author.surname,
			birthDate: author.birthDate,
		});
		authorsArr.push(currentAuthor);

		DOMUtilities.addTableRow(AUTHORS_TABLE_BODY_ID, 'td', author);
	});
	renderAuthorsDropdown('create-author-dropdown');
}

function getArrayOfObjectsFromInstance(array) {
	let newArray = [];
	array.forEach((item) => {
		const newItem = item.getSavingsData();
		newArray.push(newItem);
	});
	return newArray;
}

function renderAuthorsDropdown(dropdownId) {
	DOMUtilities.removeAllChildElements(dropdownId);
	authorsArr.forEach((author) => {
		DOMUtilities.addOptionToDropdown(
			dropdownId,
			author.id,
			PrintData.formatDataWithId(author.id, author.fullName)
		);
	});
}

function getNewBookInstance(book) {
	let newBook;

	if (book.bookType === BookTypes.EBOOK) {
		newBook = new Ebook(book);
	} else if (book.bookType === BookTypes.HARDCOVER) {
		newBook = new Hardcover(book);
	}

	return newBook;
}

function addFileTypeField(
	bookTypeContainerId,
	fileTypeDropdownId,
	containerId
) {
	DOMUtilities.removeAllChildElements(bookTypeContainerId, containerId);
	DOMUtilities.addLabel(bookTypeContainerId, containerId, {
		labelText: 'File type',
		htmlFor: 'fileType',
	});
	DOMUtilities.addSelect(bookTypeContainerId, containerId, {
		selectId: fileTypeDropdownId,
		fieldName: 'fileType',
	});
	Object.keys(FileTypes).forEach((key) => {
		DOMUtilities.addOptionToDropdown(
			fileTypeDropdownId,
			key,
			FileTypes[key],
			containerId
		);
	});
}

function addPagesNumberField(bookTypeContainerId, containerId) {
	DOMUtilities.removeAllChildElements(bookTypeContainerId, containerId);
	DOMUtilities.addLabel(bookTypeContainerId, containerId, {
		labelText: 'Number of pages',
		htmlFor: 'numberOfPages',
	});
	DOMUtilities.addTextInput(bookTypeContainerId, containerId, {
		fieldName: 'numberOfPages',
	});
}

function filterBooks(e) {
	const filteredBooks = copyOfBooksToRender.filter((book) =>
		searchString(book.title, e.target.value)
	);
	renderSortedBooksTable(filteredBooks, getCurrentBookTableOrderValue());
}

function resetBooksSearch() {
	searchBookInput.value = '';
	renderSortedBooksTable(copyOfBooksToRender, getCurrentBookTableOrderValue());
}

function showEditBookModal(bookId) {
	DOMUtilities.removeClassFromElement('edit-book-modal-layover', 'hidden');
	const selectedBook = findInstance(booksArr, bookId);

	// prepare the fields
	renderAuthorsDropdown('edit-author-dropdown');
	renderBookTypeSubfield(
		selectedBook.bookType,
		BOOK_TYPE_SUBFIELD_ID,
		EDIT_BOOK_MODAL_FORM_ID
	);

	// compile the fields
	const editFormInputs = document
		.getElementById(EDIT_BOOK_MODAL_FORM_ID)
		.querySelectorAll('input, select');

	editFormInputs.forEach((item) => {
		if (item.id === 'edit-author-dropdown') {
			Array.from(item.options).forEach((option) => {
				if (itBelongs(selectedBook.authorsId, option.value)) {
					option.selected = true;
				}
				updateSelectOption('edit-author-dropdown');
			});
		} else {
			item.value = selectedBook[item.name];
		}
	});
}

function renderBookTypeSubfield(bookType, parentId, containerId) {
	if (bookType === BookTypes.EBOOK)
		addFileTypeField(parentId, FILE_TYPE_DROPDOWN_ID, containerId);
	else if (bookType === BookTypes.HARDCOVER)
		addPagesNumberField(parentId, containerId);
}

function getAuthorBooks(authorId) {
	const authorsBook = booksArr.filter((book) =>
		itBelongs(book.authorsId, authorId)
	);
	return authorsBook.at(-1) ? authorsBook : [];
}

function getAuthors(authorsIdArr) {
	const authorsList = authorsArr.filter((author) =>
		itBelongs(authorsIdArr, author.id)
	);
	return authorsList.at(-1) ? authorsList : [];
}

function isBookFormValid(book) {
	if (book.authorsId.at(-1) && book.bookType && book.price && book.title) {
		return true;
	}
	return false;
}

function isAuthorFormValid(authorForm) {
	if (authorForm.birthDate && authorForm.name && authorForm.surname) {
		return true;
	}
	return false;
}

function renderOrderByDropdown() {
	for (orderType in OrderBy) {
		DOMUtilities.addOptionToDropdown(
			'book-table-order-by',
			orderType,
			OrderBy[orderType]
		);
	}
}

function getCurrentBookTableOrderValue() {
	return document.getElementById('book-table-order-by').value;
}

function onOrderByChange() {
	renderSortedBooksTable(copyOfBooksToRender, getCurrentBookTableOrderValue());
}

function renderSortedBooksTable(books, order) {
	DOMUtilities.removeAllChildElements(BOOKS_TABLE_BODY_ID);

	let booksOrdered = [];

	if (order == 0) {
		booksOrdered = books.sort((a, b) => sortByName(a.title, b.title));
	} else if (order == 1) {
		booksOrdered = books.sort((a, b) => sortByName(b.title, a.title));
	}

	booksOrdered.forEach((book) => {
		DOMUtilities.addTableRow(BOOKS_TABLE_BODY_ID, 'td', book);
	});
}

function sortNameAscending(a, b, keyToOrder) {
	return a[keyToOrder] + b[keyToOrder];
	if (a[keyToOrder] < b[keyToOrder]) return -1;
}
