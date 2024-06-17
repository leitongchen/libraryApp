class PrintData {
	static formatDataWithId(id, textToPrint) {
		return `ID: ${id} - ${textToPrint}`;
	}

	static formatFullName(author) {
		return `${author.surname}, ${author.name}`;
	}
}
