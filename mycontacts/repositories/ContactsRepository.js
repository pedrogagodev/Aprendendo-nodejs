import { randomUUID } from "node:crypto";

const contacts = [
	{
		id: randomUUID(),
		name: "Pedro",
		email: "pedro@gmail.com",
		phone: "12313131",
		category_id: randomUUID(),
	},
];

class ContactsRepository {
	findAll() {
		return new Promise((resolve) => {
			resolve(contacts);
		});
	}
}

export default new ContactsRepository();
