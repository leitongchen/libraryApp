const authorsArray = [];

const addAuthorForm = document.getElementById('add-author-form');

addAuthorForm.addEventListener('submit', onAuthorFormSubmit);

function onAuthorFormSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const authorObject = Object.fromEntries(data.entries());

  addAuthor(authorObject);
  resetForm(e);
}

function resetForm(e) {
  e.target.reset();
}

function addAuthor(author) {
  const currentAuthor = new Author(
    author.name,
    author.surname,
    author.alias,
    author.birthDate,
    author.email,
    author.address
  );

  authorsArray.push(currentAuthor);
}

document.getElementById('test-button').addEventListener('click', (e) => {
  authorsArray.forEach((author) => {
    console.log(author.getAge());
  });
});
