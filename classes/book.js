class Book {
	static #lastId = 0;

	#id;
	#title;
	#authorsId;
	#price;
	#bookType;
	#authors;

	constructor(book) {
		this.#id = book.id ? +book.id : ++Book.#lastId;
		this.#title = book.title;
		this.#authorsId = book.authorsId;
		this.#price = book.price;
		this.#bookType = book.bookType;
	}

	get id() {
		return this.#id;
	}

	get title() {
		return this.#title;
	}
	set title(value) {
		this.#title = value;
	}

	get authorsId() {
		return this.#authorsId;
	}

	get price() {
		return this.#price;
	}
	set price(value) {
		this.#price = value;
	}

	get bookType() {
		return this.#bookType;
	}
	set bookType(value) {
		this.#bookType = value;
	}

	get authors() {
		return this.#authors;
	}
	set authors(authors) {
		this.#authors = authors;
	}

	static updateLastId(lastId) {
		Book.#lastId = lastId;
	}

	getSavingsData() {
		return {
			id: this.#id,
			title: this.#title,
			authorsId: this.#authorsId,
			bookType: this.#bookType,
			price: this.#price,
		};
	}

	getDataToRender(authorsArray) {
		const author = findInstance(authorsArray, this.authorsId);
		return {
			id: this.#id,
			title: this.#title,
			author: PrintData.formatFullName(author),
			bookType: this.#bookType,
			price: this.#price,
		};
	}
}
