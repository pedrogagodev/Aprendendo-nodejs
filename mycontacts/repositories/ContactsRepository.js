import { randomUUID } from "node:crypto";

let contacts = [
	{
		id: randomUUID(),
		name: "Pedro",
		email: "pedro@gmail.com",
		phone: "12313131",
		category_id: randomUUID(),
	},
	{
		id: randomUUID(),
		name: "José",
		email: "José@gmail.com",
		phone: "123131322111",
		category_id: randomUUID(),
	},
];

class ContactsRepository {
	findAll() {
		return new Promise((resolve) => {
			resolve(contacts);
		});
	}

	findById(id) {
		return new Promise((resolve) => {
			resolve(contacts.find((contact) => contact.id === id));
		});
	}

	findByEmail(email) {
		return new Promise((resolve) => {
			resolve(contacts.find((contact) => contact.email === email));
		});
	}

	delete(id) {
		return new Promise((resolve) => {
			contacts = contacts.filter((contact) => contact.id !== id);
			resolve();
		});
	}
	create({ name, email, phone, category_id }) {
		return new Promise((resolve) => {
			const newContact = {
				id: randomUUID(),
				name,
				email,
				phone,
				category_id,
			};
			contacts.push(newContact)
			resolve(newContact);
		});
	}
}

export default new ContactsRepository();
