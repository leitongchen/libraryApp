const books = [];
const authors = [];
 
let lastBookId = 1;
let lastAuthorId = 1;
 
button -> addEventHandler(addBook) => books.push({name: 'some title', authorId: 1, id: lastBookId++})
button -> addEventHandler(addAuthor) => authors.push({firstName: 'Hans', lastName: 'Wurst', id: lastAuthorId++ })
button -> addEventHandler(getBooks) => books.forEach(book => console.log(book.name))


// Forms 
// 1. Author
// 2. Book 

// Table to display the books 


// And then instead of books.push({name: 'some title', authorId: 1, id: lastBookId++} write new Book('some title', authorId: 1, lastBookId++)