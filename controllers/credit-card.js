import Service from '../services/credit-card.js';
import CreditCard from '../models/credit-card.js';

export default class CreditCardController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const bankDescription = req.query.bankDescription;
        const bankId = req.query.bankId;
        

         let query = description ?
            { 
                description: { 
                    $regex: new RegExp(description), $options: 'i' 
                } 
            } : {};

        
        const id = req.params.id;

        if (id) {
            query.populate = 'bankAccount';
        } else {
            query.populate = {
                path: 'bankAccount'
            };
    
            if (bankDescription) {
                query.populate.match = {
                    description: { 
                        $regex: new RegExp(bankDescription), $options: 'i' 
                    } 
                }
            } 
            
            if (bankId) {
                query.populate.match = {
                    _id: bankId
                }
            }
        }

        console.info(`Credit Cards | GET ${id ? '| ' + id : ''}`);

        try {
            const response = await Service.find(id, query, page, limitPerPage);
            const itemsCount = id ? 1 : page === 0 ? await Service.count(query) : null;
            return res.status(200).json({
                status: 200,
                result: response,
                count: itemsCount,
                message: 'Success'
            });
        } catch (err) {
            console.error('Error - GET Credit Cards: ' + err);
            return res.status(400).json({
                status: 400,
                message: err
            });
        }
    }

    static async create(req, res, next) {
        console.info('Credit Cards | POST');

        const newCreditCard = new CreditCard(
            {
                description: req.body.description,
                bankAccount: req.body.bankAccount._id,
                balance: req.body.balance
            }
        );

        try {
            const creditCard = await Service.create(newCreditCard);
            return res.status(200).json({
                status: 200,
                result: creditCard,
                message: 'Success'
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
                message: 'Data to update can not be empty!'
            });
        }

        const id = req.params.id;
        console.info('Credit Cards | PUT | ' + id);

        if (req.body.bankAccount._id) {
            req.body.bankAccount = req.body.bankAccount._id
        }

        try {
            const creditCard = await Service.edit(id, req.body);
            return res.status(200).json({
                status: 200,
                result: creditCard,
                message: 'Success'
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
        console.info('Credit Cards | DELETE | ' + id);

        try {
            const creditCard = await Service.remove(id);
            return res.status(200).json({
                status: 200,
                result: creditCard,
                message: 'Success'
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