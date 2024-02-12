const hello = 'Benvenuti';

document.getElementById('title').innerHTML = hello;

let newBook1 = new Book('Orgoglio e pregiudizio', 'Jane Austen');
let newBook3 = new Book('Orgoglio e pregiudizio', 'Jane Austen');
let newBook2 = new Book('La Divina Commedia', 'Dante Alighieri');

console.log(newBook1.getBookDetails());
console.log(newBook2.getBookDetails());

console.log(Book.checkTitles(newBook1, newBook3));
