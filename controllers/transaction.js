import Service from '../services/transaction.js';
import Transaction from '../models/transaction.js';

export default class TransactionController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const reference = req.query.reference;
        const transactionDate = req.query.transactionDate;

        const bankDescription = req.query.bankDescription;
        const bankId = req.query.bankId;
        
        const creditCardDescription = req.query.creditCardDescription;
        const creditCardId = req.query.creditCardId;
        
         let query = description ?
            { 
                description: { 
                    $regex: new RegExp(description), $options: 'i' 
                } 
            } : {};

        if (reference) {
            query.reference = reference;
        }

        if (transactionDate) {
            query.transactionDate = {
                $gte: new Date(transactionDate), 
                $lte: new Date(transactionDate)
            }
        }
        
        const id = req.params.id;

        if (id) {
            query.populateCreditCard = 'creditCard';
            query.populateBankAccount = 'bankAccount';
        } else {
            query.populateBankAccount = {
                path: 'bankAccount'
            };

            query.populateCreditCard = {
                path: 'creditCard'
            };
    
            if (bankDescription) {
                query.populateBankAccount.match = {
                    description: { 
                        $regex: new RegExp(bankDescription), $options: 'i' 
                    } 
                }
            } 

            if (creditCardDescription) {
                query.populateCreditCard.match = {
                    description: { 
                        $regex: new RegExp(creditCardDescription), $options: 'i' 
                    } 
                }
            } 
            
            if (bankId) {
                query.populateBankAccount.match = {
                    _id: bankId
                }
            }

            if (creditCardId) {
                query.populateCreditCard.match = {
                    _id: creditCardId
                }
            }
        }

        console.info(`Transactions | GET ${id ? '| ' + id : ''}`);

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
            console.error('Error - GET Transactions: ' + err);
            return res.status(400).json({
                status: 400,
                message: err
            });
        }
    }

    static async create(req, res, next) {
        console.info('Transactions | POST');

        const newTransaction = new Transaction(
            {
                description: req.body.description,
                reference: req.body.reference,
                transactionDate: req.body.transactionDate,
                bankAccount: req.body.bankAccount,
                creditCard: req.body.creditCard,
                transactionValue: req.body.transactionValue
            }
        );

        try {
            const transaction = await Service.create(newTransaction);
            return res.status(200).json({
                status: 200,
                result: transaction,
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
        console.info('Transactions | PUT | ' + id);

        if (req.body.bankAccount?._id) {
            req.body.bankAccount = req.body.bankAccount._id
        }

        if (req.body.creditCard?._id) {
            req.body.creditCard = req.body.creditCard._id
        }

        try {
            const transaction = await Service.edit(id, req.body);
            return res.status(200).json({
                status: 200,
                result: transaction,
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
        console.info('Transactions | DELETE | ' + id);

        try {
            const transaction = await Service.remove(id);
            return res.status(200).json({
                status: 200,
                result: transaction,
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