const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];

const searchBookInput = document.getElementById('book-search');

const editBookFromTable = document.getElementById('books-table');

const bookTypeField = document.getElementById('book-type-dropdown');

window.addEventListener('DOMContentLoaded', () => {
	const savedAuthors = fetchDataFromLocalStorage(AUTHORS_KEY) ?? [];
	const savedBooks = fetchDataFromLocalStorage(BOOKS_KEY) ?? [];

	DOMUtilities.addTableRow(BOOKS_TABLE_HEADER_ID, 'th', BookTableKeys);
	renderSavedAuthors(savedAuthors);
	initiateSavedBooks(savedBooks);
});

addAuthorForm.addEventListener('submit', function (e) {
	onFormSubmit(e, addAuthor);
});

addBookForm.addEventListener('submit', function (e) {
	onFormSubmit(e, addBook);
});

bookTypeField.addEventListener('change', (change) => {
	const bookType = change.target.value;

	renderBookTypeSubfield(bookType, BOOK_TYPE_SUBFIELD_ID);
});

searchBookInput.addEventListener('keyup', (e) => filterBooks(e));

document.addEventListener('click', function (e) {
	const formBookTypeChangeTarget = e.target.closest(
		'#edit-book-form #book-type-dropdown'
	);

	const editBookButtonTarget = e.target.closest('#books-table button');

	const closeBookModalTarget = e.target.closest('#close-modal-button');

	const resetSearchButtonTarget = e.target.closest('#search-book-cancel');

	if (formBookTypeChangeTarget) {
		const bookType = formBookTypeChangeTarget.value;
		renderBookTypeSubfield(
			bookType,
			BOOK_TYPE_SUBFIELD_ID,
			EDIT_BOOK_MODAL_FORM_ID
		);
		return;
	}

	if (editBookButtonTarget) {
		showEditBookModal(editBookButtonTarget.value);
		return;
	}

	if (closeBookModalTarget) {
		DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden');
		return;
	}

	if (resetSearchButtonTarget) {
		resetBooksSearch();
		return;
	}
});

document.addEventListener('submit', function (e) {
	const saveBookModal = e.target.closest('#edit-book-form');

	if (saveBookModal) {
		onFormSubmit(e, updateBook);
	}
});
