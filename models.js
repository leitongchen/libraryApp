const AUTHORSKEY = 'authors';
const BOOKSKEY = 'books';

const AUTHORSTABLEBODYID = 'authors-table';

const BOOKSTABLEHEADERID = 'books-table-header';
const BOOKSTABLEBODYID = 'books-table';

const FILETYPEDROPDOWNID = 'file-type-field';
const BOOKTYPECONTAINER = 'book-type-sub-fields';


const BookTypes = getEnumFromValues(['ebook', 'hardcover']);
const FileTypes = getEnumFromValues(['epub', 'mobi', 'pdf', 'azw3']);

const BookTableKeys = getEnumFromValues(['id', 'title', 'author', 'bookType', 'numberOfPages', 'fileType', 'price'])