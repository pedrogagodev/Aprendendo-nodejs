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
}

export default new CategoryController();
