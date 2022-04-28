import Service from "../services/category.js";
import Category from "../models/category.js";

export default class CategoryController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const query = description ? 
            { description: { $regex: new RegExp(description), $options: "i" } } : {};

        const id = req.params.id;

        console.info(`Categories | GET ${ id ? '| ' + id : ''}`);

        try {
            const response = await Service.find(id, query, page, limitPerPage);
            const itemsCount = id ? 1 : page === 0 ? await Service.count(query) : null;
            return res.status(200).json({ 
                status: 200, 
                categories: response, 
                count: itemsCount,
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - GET Categories: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info("Categories | POST");

        const newCategory = new Category(
            {
                description: req.body.description
            }
        );

        try {
            const category = await Service.create(newCategory);
            return res.status(200).json({ 
                status: 200, 
                category, 
                message: "Success" 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async edit(req, res, next) {

        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }
        
        const id = req.params.id;
        console.info("Categories | PUT | " + id);

        try {
            const category = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                category, 
                message: "Success" 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async remove(req, res, next) {
        const id = req.params.id;
        console.info("Categories | DELETE | " + id);

        try {
            const category = await Service.remove(id);
            return res.status(200).json({ 
                status: 200, 
                category, 
                message: "Success" 
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }
}