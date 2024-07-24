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

function updateBook(updatedBook) {
	const bookIndex = booksArr.findIndex((book) => updatedBook.id == book.id);
	const newBookInstance = getNewBookInstance(updatedBook, updatedBook.id);

	booksArr.splice(bookIndex, 1, newBookInstance);

	copyOfBooksToRender = booksArr.map((book) =>
		book.getDataToRender(authorsArr)
	);

	saveDataToLocalStorage(BOOKS_KEY, processDataToBeSaved(booksArr));
	renderSortedBooksTable(copyOfBooksToRender);

	DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden');
}

function initiateSavedBooks(savedBooks) {
	savedBooks.forEach((book) => {
		const newBookInstance = getNewBookInstance(book, book.id);
		booksArr.push(newBookInstance);
	});

	copyOfBooksToRender = booksArr.map((book) =>
		book.getDataToRender(authorsArr)
	);

	renderSortedBooksTable(copyOfBooksToRender);
	Book.updateLastId(booksArr.at(-1)?.id ?? 0);
}

function getArrayOfObjectsFromInstance(array) {
	let newArray = [];
	array.forEach((item) => {
		const newItem = item.getSavingsData();
		newArray.push(newItem);
	});
	return newArray;
}

function renderSavedAuthors(savedAuthors) {
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

function addAuthor(author) {
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

function getNewBookInstance(book) {
	let newBook;

	if (book.bookType === BookTypes.EBOOK) {
		newBook = new Ebook(book);
	} else if (book.bookType === BookTypes.HARDCOVER) {
		newBook = new Hardcover(book);
	}

	return newBook;
}

function renderSortedBooksTable(books) {
	DOMUtilities.removeAllChildElements(BOOKS_TABLE_BODY_ID);

	books
		.sort((a, b) => sortByName(a.title, b.title))
		.forEach((book) => {
			DOMUtilities.addTableRow(BOOKS_TABLE_BODY_ID, 'td', book);
		});
}

function addBook(book) {
	const selectedAuthors = getSelectedValuesFromSelect('create-author-dropdown');
	book.authorsId = selectedAuthors;

	const newBookInstance = getNewBookInstance(book);
	booksArr.push(newBookInstance);
	copyOfBooksToRender.push(newBookInstance.getDataToRender(authorsArr));

	saveDataToLocalStorage(BOOKS_KEY, processDataToBeSaved(booksArr));
	renderSortedBooksTable(copyOfBooksToRender);
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
	renderSortedBooksTable(filteredBooks);
}

function resetBooksSearch() {
	searchBookInput.value = '';
	renderSortedBooksTable(copyOfBooksToRender);
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
		item.value = selectedBook[item.name];
	});

	updateSelectOption('edit-author-dropdown');
	console.log(getElement('edit-author-dropdown'))
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
