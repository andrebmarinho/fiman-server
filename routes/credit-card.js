import CreditCardController from '../controllers/credit-card.js';

export default {
    loadRouter: (router) => {
        router
            .get('/', CreditCardController.find)
            .get('/:id', CreditCardController.find)
            .post('/', CreditCardController.create)
            .put('/:id', CreditCardController.edit)
            .delete('/:id', CreditCardController.remove);

        return router;
    }
}