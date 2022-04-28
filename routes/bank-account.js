import BankAccountController from "../controllers/bank-account.js";

export default {
    loadRouter: (router) => {
        router
            .get('/', BankAccountController.find)
            .get('/:id', BankAccountController.find)
            .post('/', BankAccountController.create)
            .put('/:id', BankAccountController.edit)
            .delete('/:id', BankAccountController.remove);

        return router;
    }
}