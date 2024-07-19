const addAuthorForm = document.forms['author-form'];
const addBookForm = document.forms['book-form'];
const editBookForm = document.forms['edit-book-form'];

const searchBookInput = document.getElementById('book-search');

const booksTableList = document.getElementById('books-table');

const bookTypeField = document.getElementById('book-type-dropdown');
const editBookTypeField = document.getElementById('edit-book-type-dropdown');

const searchBookResetButton = document.getElementById('search-book-cancel');
const closeEditModalButton = document.getElementById('close-modal-button');

window.addEventListener('DOMContentLoaded', () => {
	const savedAuthors = fetchDataFromLocalStorage(AUTHORS_KEY) ?? [];
	const savedBooks = fetchDataFromLocalStorage(BOOKS_KEY) ?? [];

	DOMUtilities.addTableRow(BOOKS_TABLE_HEADER_ID, 'th', BookTableKeys);
	renderSavedAuthors(savedAuthors);
	initiateSavedBooks(savedBooks);

	authorsArr.forEach((author) => {
		author.books = getAuthorBooks(author.id);
	});

	console.log('AUTHORS', authorsArr);
});

addAuthorForm.addEventListener('submit', (e) => onFormSubmit(e, addAuthor));

addBookForm.addEventListener('submit', (e) => onFormSubmit(e, addBook));

editBookForm.addEventListener('submit', (e) => onFormSubmit(e, updateBook));

bookTypeField.addEventListener('change', (change) => {
	const bookType = change.target.value;

	renderBookTypeSubfield(bookType, BOOK_TYPE_SUBFIELD_ID);
});

searchBookInput.addEventListener('keyup', (e) => filterBooks(e));

searchBookResetButton.addEventListener('click', () => resetBooksSearch());

closeEditModalButton.addEventListener('click', () =>
	DOMUtilities.addClassToElement('edit-book-modal-layover', 'hidden')
);

editBookTypeField.addEventListener('change', (e) => {
	const bookType = e.target.value;
	renderBookTypeSubfield(
		bookType,
		BOOK_TYPE_SUBFIELD_ID,
		EDIT_BOOK_MODAL_FORM_ID
	);
});

booksTableList.addEventListener('click', (e) => {
	const editBookButtonTarget = e.target.closest('button');

	if (editBookButtonTarget) {
		showEditBookModal(editBookButtonTarget.value);
		return;
	}
});

function onSelectAuthors() {
	const select = document.getElementById('create-author-dropdown');
	console.log(Array.from(select.selectedOptions).map((x) => x.value ?? x.text));
}
