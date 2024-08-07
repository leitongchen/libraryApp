class PrintData {
	static formatDataWithId(id, textToPrint) {
		return `ID: ${id} - ${textToPrint}`;
	}

	static formatFullName(author) {
		return `${author.surname}, ${author.name}`;
	}

	static printAuthorListAsText(authors) {
		const authorsNames = [];
		authors.forEach((author) => {
			authorsNames.push(this.formatFullName(author));
		});
		return authorsNames.join(' - ');
	}
}
