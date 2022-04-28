import Service from "../services/bank-account.js";
import BankAccount from "../models/bank-account.js";

export default class BankAccountController {
    static async find(req, res, next) {
        const limitPerPage = req.query.limitPerPage ? parseInt(req.query.limitPerPage, 10) : 5;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        const description = req.query.description;
        const query = description ? 
            { description: { $regex: new RegExp(description), $options: "i" } } : {};

        const id = req.params.id;

        console.info(`Bank Accounts | GET ${ id ? '| ' + id : ''}`);

        try {
            const response = await Service.find(id, query, page, limitPerPage);
            const itemsCount = id ? 1 : page === 0 ? await Service.count(query) : null;
            return res.status(200).json({ 
                status: 200, 
                bankAccounts: response, 
                count: itemsCount,
                message: "Success" 
            });
        } catch (err) {
            console.error("Error - GET Bank Accounts: " + err);
            return res.status(400).json({ 
                status: 400, 
                message: err 
            });
        }
    }

    static async create(req, res, next) {
        console.info("Bank Accounts | POST");

        const newBankAccount = new BankAccount(
            {
                description: req.body.description,
                balance: req.body.balance
            }
        );

        try {
            const bankAccount = await Service.create(newBankAccount);
            return res.status(200).json({ 
                status: 200, 
                bankAccount, 
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
        console.info("Bank Accounts | PUT | " + id);

        try {
            const bankAccount = await Service.edit(id, req.body);
            return res.status(200).json({ 
                status: 200, 
                bankAccount, 
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
        console.info("Bank Accounts | DELETE | " + id);

        try {
            const bankAccount = await Service.remove(id);
            return res.status(200).json({ 
                status: 200, 
                bankAccount, 
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