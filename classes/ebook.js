class Ebook extends Book {
	static PROPERTYNAME = 'ebook';
	#fileType;

	constructor(book) {
		super(book);
		this.#fileType = book.fileType;
	}

	get fileType() {
		return this.#fileType;
	}
	set fileType(value) {
		this.#fileType = value;
	}

	getSavingsData() {
		return {
			id: this.id,
			title: this.title,
			authorsId: this.authorsId,
			bookType: this.bookType,
			numberOfPages: '-',
			fileType: this.#fileType,
			price: this.price,
		};
	}

	getDataToRender(authorsArray) {
		// const author = findInstance(authorsArray, this.authorsId);
		return {
			id: this.id,
			title: this.title,
			author: this.authorsId,
			bookType: this.bookType,
			numberOfPages: '-',
			fileType: this.#fileType,
			price: this.price,
		};
	}
}
