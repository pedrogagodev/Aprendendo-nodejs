import { response } from "express";
import ContactsRepository from "../../repositories/ContactsRepository.js";

class ContactController {
	// List all records
	async index(request, response) {
		const { orderBy } = request.query;
		const contacts = await ContactsRepository.findAll(orderBy);

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

	async store(request, response) {
		// Create a new record
		const { name, email, phone, category_id } = request.body;

		if (!name) {
			return response.status(404).json({ error: "Name is required" });
		}
		if (!email) {
			return response.status(404).json({ error: "E-mail is required" });
		}

		const contactExists = await ContactsRepository.findByEmail(email);

		if (contactExists) {
			return response
				.status(404)
				.json({ error: "This e-mail is already in use" });
		}

		const contact = await ContactsRepository.create({
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}

	async update(request, response) {
		// Edit a record
		const { id } = request.params;
		const { name, email, phone, category_id } = request.body;

		const contactExists = await ContactsRepository.findById(id);
		if (!contactExists) {
			return response.status(404).json({ error: "User not found" });
		}

		if (!name) {
			return response.status(404).json({ error: "Name is required" });
		}
		if (!email) {
			return response.status(404).json({ error: "E-mail is required" });
		}

		const contactByEmail = await ContactsRepository.findByEmail(email);
		if (contactByEmail && contactByEmail.id !== id) {
			return response
				.status(404)
				.json({ error: "This e-mail is already in use" });
		}

		const contact = await ContactsRepository.update(id, {
			name,
			email,
			phone,
			category_id,
		});

		response.json(contact);
	}

	async delete(request, response) {
		// Delete a record
		const { id } = request.params;

		await ContactsRepository.delete(id);
		response.sendStatus(204);
	}
}

export default new ContactController();
