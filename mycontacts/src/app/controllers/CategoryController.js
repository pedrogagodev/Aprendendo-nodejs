import CategoriesRepository from "../../repositories/CategoriesRepository.js";

class CategoryController {
	async index(request, response) {
		const categories = await CategoriesRepository.findAll();

		response.json(categories);
	}
	async show(request, response) {
		const { id } = request.params;

		const category = await CategoriesRepository.findById(id);

		if (!category) {
			return response.status(404).json({ error: "Category not found" });
		}

		response.json(category);
	}

	async store(request, response) {
		const { name } = request.body;

		if (!name) {
			return response.status(404).json({ error: "Name is required" });
		}
		const categoryExists = await CategoriesRepository.findByName(name);

		if (categoryExists) {
			return response
				.status(404)
				.json({ error: "This categories has already been created" });
		}

		const category = await CategoriesRepository.create({ name });

		response.json(category);
	}
	async update(request, response) {
		// Edit a record
		const { id } = request.params;
		const { name } = request.body;

		const categoryExists = await CategoriesRepository.findById(id);
		if (!categoryExists) {
			return response.status(404).json({ error: "Category not found" });
		}

		if (!name) {
			return response.status(404).json({ error: "Name is required" });
		}
		const categoryByName = await CategoriesRepository.findByName(name);
		if (categoryByName && categoryByName.id !== id) {
			return response
				.status(404)
				.json({ error: "This categories has already been created" });
		}

		const category = await CategoriesRepository.update(id, {
			name,
		});

		response.json(category);
	}

	async delete(request, response) {
		// Delete a record
		const { id } = request.params;

		await CategoriesRepository.delete(id);
		response.sendStatus(204);
	}
}

export default new CategoryController();
