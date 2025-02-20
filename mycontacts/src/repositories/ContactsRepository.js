import { randomUUID } from "node:crypto";

import db from "../app/database/index.js";

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
	async findAll(orderBy = "ASC") {
		const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
		const rows = await db.query(
			`SELECT * FROM contacts ORDER BY name ${direction}`,
		);
		return rows;
	}

	async findById(id) {
		const [row] = await db.query("SELECT * FROM contacts WHERE id = $1 ", [id]);
		return row;
	}

	async findByEmail(email) {
		const [row] = await db.query("SELECT * FROM contacts WHERE email = $1 ", [
			email,
		]);
		return row;
	}

	delete(id) {
		return new Promise((resolve) => {
			contacts = contacts.filter((contact) => contact.id !== id);
			resolve();
		});
	}
	async create({ name, email, phone, category_id }) {
		const [row] = await db.query(
			`
			INSERT INTO contacts(name, email, phone, category_id)
			VALUES($1, $2, $3, $4)
			RETURNING * 
			`,
			[name, email, phone, category_id],
		);
		return row;
	}
	async update(id, { name, email, phone, category_id }) {
		const [row] = await db.query(
			`
			UPDATE contacts
			SET name = $1, email = $2, phone = $3, category_id = $4
			WHERE id = $5
			RETURNING *
			`,
			[name, email, phone, category_id, id],
		);
		return row;
	}
}

export default new ContactsRepository();
