import db from "../app/database/index.js";

class CategoriesRepository {
	async findAll() {
		const rows = await db.query("SELECT * FROM categories");

		return rows;
	}

	async create({ name }) {
		const [row] = await db.query(
			`
            INSERT INTO categories(name)
            VALUES($1)
            RETURNING *
            `,
			[name],
		);

		return row;
	}
}

export default new CategoriesRepository();
