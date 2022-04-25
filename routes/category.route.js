import CategoryController from "../controllers/category.controller.js";

export default {
    loadRouter: (router) => {
        router
            .get('/', CategoryController.find)
            .get('/:id', CategoryController.find)
            .post('/', CategoryController.create)
            .put('/:id', CategoryController.edit)
            .delete('/:id', CategoryController.remove);

        return router;
    }
}