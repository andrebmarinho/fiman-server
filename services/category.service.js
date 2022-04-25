import Category from "../models/category.model.js";

export default class CategoryService {
    static async find (id, query, page, limit) {
        try {
            const skip = page * limit;
            let categories = [];
            if (!id) {
                categories = await Category.find(query, { skip, limit });
            } else {
                categories = await Category.findById(id);
            }

            return categories;
        } catch (err) {
            throw err;
        }
    }

    static async create(category) {
        try {
            const category = await Category.save(category);
            return category;
        } catch (err) {
            throw err;
        }
    }

    static async edit(id, category) {
        try {
            const category = await Category.findByIdAndUpdate(id, category, { useFindAndModify: false });
            
            if (!category) {
                throw Error(`Cannot edit Category with id=${id}. Maybe this Category was not found!`)
            }
            
            return category;
        } catch (err) {
            throw err;
        }
    }

    static async remove(id) {
        try {
            const category = await Category.findByIdAndRemove(id);
            
            if (!category) {
                throw Error(`Cannot delete Category with id=${id}. Maybe this Category was not found!`)
            }

            return id;
        } catch (err) {
            throw err;
        }
    }
}