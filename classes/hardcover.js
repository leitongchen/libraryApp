class Hardcover extends Book {
	static PROPERTYNAME = 'hardcover';
	#numberOfPages;

	constructor(book) {
		super(book);
		this.#numberOfPages = book.numberOfPages;
	}

	get numberOfPages() {
		return this.#numberOfPages;
	}

	getSavingsData() {
		return {
			id: this.id,
			title: this.title,
			authorId: this.authorId,
			bookType: this.bookType,
			numberOfPages: this.#numberOfPages,
			fileType: '-',
			price: this.price,
		};
	}

	getDataToRender(authorsArray) {
		const author = findInstance(authorsArray, this.authorId);
		return {
			id: this.id,
			title: this.title,
			author: PrintData.formatFullName(author),
			bookType: this.bookType,
			numberOfPages: this.#numberOfPages,
			fileType: '-',
			price: this.price,
		};
	}
}
