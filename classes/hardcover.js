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
			authorsId: this.authorsId,
			bookType: this.bookType,
			numberOfPages: this.#numberOfPages,
			fileType: '-',
			price: this.price,
		};
	}

	getDataToRender() {
		return {
			id: this.id,
			title: this.title,
			author: PrintData.printAuthorListAsText(this.authors),
			bookType: this.bookType,
			numberOfPages: this.#numberOfPages,
			fileType: '-',
			price: this.price,
		};
	}
}
