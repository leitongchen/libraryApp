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

	getDataToRender() {
		return {
			id: this.id,
			title: this.title,
			author: PrintData.printAuthorListAsText(this.authors),
			bookType: this.bookType,
			numberOfPages: '-',
			fileType: this.#fileType,
			price: this.price,
		};
	}
}
