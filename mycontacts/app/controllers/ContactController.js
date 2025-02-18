import ContactsRepository from "../../repositories/ContactsRepository.js";

class ContactController {
	// List all records
	async index(request, response) {
		const contacts = await ContactsRepository.findAll();

		response.json(contacts);
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
