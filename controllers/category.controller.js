import Service from "../services/category.service.js";
import Category from "../models/category.model.js";

export default class CategoryController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const query = description ? 
            { description: { $regex: new RegExp(description), $options: "i" } } : {};

        const id = req.params.id;

        try {
            const categories = await Service.find(id, query, page, limitPerPage);
            return res.status(200).json({ 
                status: 200, 
                data: id ? categories[0] : categories, 
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - GET Categories: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: e.message 
            });
        }
    }

    static async create(req, res, next) {
        const newCategory = new Cate(
            {
                description: req.body.description
            }
        );

        try {
            const category = await Service.create(newCategory);
            return res.status(200).json({ 
                status: 200, 
                data: category, 
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - POST Category: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: e.message 
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

        try {
            const category = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                data: category, 
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - PUT Category: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: e.message 
            });
        }
    }

    static async remove(req, res, next) {
        const id = req.params.id;

        try {
            const category = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                data: category, 
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - DELETE Category: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: e.message 
            });
        }
    }
}