const AUTHORS_KEY = 'authors';
const BOOKS_KEY = 'books';

const AUTHORS_TABLE_BODY_ID = 'authors-table';

const BOOKS_TABLE_HEADER_ID = 'books-table-header';
const BOOKS_TABLE_BODY_ID = 'books-table';

const FILE_TYPE_DROPDOWN_ID = 'file-type-field';
const BOOK_TYPE_CONTAINER_ID = 'book-type-sub-fields';

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
