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

	delete(id) {
		return new Promise((resolve) => {
			contacts = contacts.filter((contact) => contact.id !== id);
			resolve();
		});
	}
}

export default new ContactsRepository();
