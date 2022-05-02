import Category from '../models/category.js';

export default class CategoryService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await Category.count(query);
            return itemsCount;
        } catch (err) {
            console.log('CategoryService Error - Count');
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = page * limit;
            let categories = [];
            
            if (!id) {
                categories = await Category.find(query, null, { skip, limit });
            } else {
                categories = await Category.findById(id);
            }

            return categories;
        } catch (err) {
            console.log('CategoryService Error - Find');
            throw err;
        }
    }

    static async create(category) {
        try {
            const newCategory = await category.save();
            return newCategory;
        } catch (err) {
            console.log('CategoryService Error - Create');
            throw err;
        }
    }

    static async edit(id, category) {
        try {
            const newCategory = await Category.findByIdAndUpdate(id, category, {new: true});
            
            if (!newCategory) {
                console.log('CategoryService Error - Edit');
                throw Error(`Cannot edit Category with id=${id}. Maybe this Category was not found!`)
            }
            
            return newCategory;
        } catch (err) {
            console.log('CategoryService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const category = await Category.findByIdAndRemove(id);
            
            if (!category) {
                console.log('CategoryService Error - Delete');
                throw Error(`Cannot delete Category with id=${id}. Maybe this Category was not found!`)
            }

            return id;
        } catch (err) {
            console.log('CategoryService Error - Delete');
            throw err;
        }
    }
}