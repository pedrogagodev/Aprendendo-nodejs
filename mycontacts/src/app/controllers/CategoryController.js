import CategoriesRepository from "../../repositories/CategoriesRepository.js";

class CategoryController {
	async index(request, response) {
		const categories = await CategoriesRepository.findAll();

		response.json(categories);
	}

	async store(request, response) {
		const { name } = request.body;

		if (!name) {
			return response.status(404).json({ error: "Name is required" });
		}

		const category = await CategoriesRepository.create({ name });

		response.json(category);
	}
}

export default new CategoryController();
