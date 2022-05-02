import TransactionController from '../controllers/transaction.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', TransactionController.find)
            .get('/:id', TransactionController.find)
            .post('/', TransactionController.create)
            .put('/:id', TransactionController.edit)
            .delete('/:id', TransactionController.remove);

        return router;
    }
}