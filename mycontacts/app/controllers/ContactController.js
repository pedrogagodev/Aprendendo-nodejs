class ContactController {
	index(request, response) {
		// List all records
		response.send("Send from Contact Controller");
	}

	show() {
		// List all users
	}

	store() {
		// Create a new record
	}

	update() {
		// Edit a record
	}

	delete() {
		// Delete a record
	}
}

export default new ContactController();
