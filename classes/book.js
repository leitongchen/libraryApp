class Book {
	static #lastId = 0;

	#id;
	#title;
	#authorId;
	#price;
	#bookType;

	constructor(book) {
		this.#id = book.id ? +book.id : ++Book.#lastId;
		this.#title = book.title;
		this.#authorId = book.authorId;
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

	get authorId() {
		return this.#authorId;
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

	static updateLastId(lastId) {
		Book.#lastId = lastId;
	}

	getSavingsData() {
		return {
			id: this.#id,
			title: this.#title,
			authorId: this.#authorId,
			bookType: this.#bookType,
			price: this.#price,
		};
	}

	getDataToRender(authorsArray) {
		const author = findInstance(authorsArray, this.authorId);
		return {
			id: this.#id,
			title: this.#title,
			author: PrintData.formatFullName(author),
			bookType: this.#bookType,
			price: this.#price,
		};
	}
}
