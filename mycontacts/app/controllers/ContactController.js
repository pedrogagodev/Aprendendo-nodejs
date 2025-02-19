import ContactsRepository from "../../repositories/ContactsRepository.js";

class ContactController {
	// List all records
	async index(request, response) {
		const contacts = await ContactsRepository.findAll();

		response.json(contacts);
	}

	async show(request, response) {
		// List all users
		const { id } = request.params;

		const contact = await ContactsRepository.findById(id);

		if (!contact) {
			return response.status(404).json({ error: "User not found" });
		}

		response.json(contact);
	}

	store() {
		// Create a new record
	}

	update() {
		// Edit a record
	}

	async delete(request, response) {
		// Delete a record
		const { id } = request.params;

		const contact = await ContactsRepository.findById(id);

		if (!contact) {
			return response.status(404).json({ error: "User not found" });
		}

		await ContactsRepository.delete(id);
		response.sendStatus(204);
	}
}

export default new ContactController();
