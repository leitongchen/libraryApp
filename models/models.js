const AUTHORS_KEY = 'authors';
const BOOKS_KEY = 'books';

const AUTHORS_TABLE_BODY_ID = 'authors-table';

const BOOKS_TABLE_HEADER_ID = 'books-table-header';
const BOOKS_TABLE_BODY_ID = 'books-table';

const FILE_TYPE_DROPDOWN_ID = 'file-type-field';
const BOOK_TYPE_SUBFIELD_ID = 'book-type-sub-fields';

const EDIT_BOOK_MODAL_FORM_ID = 'edit-book-form';

const BookTypes = getEnumFromValues(['ebook', 'hardcover']);
const FileTypes = getEnumFromValues(['epub', 'mobi', 'pdf', 'azw3']);

const BookTableKeys = getEnumFromValues([
	'id',
	'title',
	'author',
	'bookType',
	'numberOfPages',
	'fileType',
	'price',
]);

const OrderBy = getOrderedEnumFromValues(['Title A-Z', 'Title Z-A']);
