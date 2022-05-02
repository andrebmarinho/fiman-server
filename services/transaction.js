import Transaction from '../models/transaction.js';

export default class TransactionService {
    static async count(query) {
        try {
            let itemsCount = 0;
            itemsCount = await Transaction.count(query);
            return itemsCount;
        } catch (err) {
            console.log('TransactionService Error - Count');
            throw err;
        }
    }

    static async find(id, query, page, limit) {
        try {
            const skip = page * limit;
            let transactions = [];

            if (!id) {                    
                const populateCreditCard = query.populateCreditCard;
                delete query.populateCreditCard;

                const populateBankAccount = query.populateBankAccount;
                delete query.populateBankAccount;

                if (populateCreditCard.match) {
                    query.bankAccount = undefined;
                } else if (populateBankAccount.match) {
                    query.creditCard = undefined;
                }

                transactions = await Transaction.find(query, null, { skip, limit })
                    .populate(query.populateCreditCard)
                    .populate(query.populateBankAccount)
                    .exec();                
            } else {
                transactions = 
                    await Transaction.findById(id)
                        .populate(query.populateCreditCard)
                        .populate(query.populateBankAccount)
                        .exec();
            }

            return transactions;
        } catch (err) {
            console.log('TransactionService Error - Find');
            throw err;
        }
    }

    static async create(transaction) {
        try {
            const newTransaction = await transaction.save();
            return newTransaction;
        } catch (err) {
            console.log('TransactionService Error - Create');
            throw err;
        }
    }

    static async edit(id, transaction) {
        try {
            const newTransaction = await Transaction.findByIdAndUpdate(id, transaction, { new: true });

            if (!newTransaction) {
                console.log('TransactionService Error - Edit');
                throw Error(`Cannot edit Transaction with id=${id}. Maybe this Transaction was not found!`)
            }

            return newTransaction;
        } catch (err) {
            console.log('TransactionService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const transaction = await Transaction.findByIdAndRemove(id);

            if (!transaction) {
                console.log('TransactionService Error - Delete');
                throw Error(`Cannot delete Transaction with id=${id}. Maybe this Transaction was not found!`)
            }

            return id;
        } catch (err) {
            console.log('TransactionService Error - Delete');
            throw err;
        }
    }
}