import BankAccount from "../models/bank-account.js";

export default class BankAccountService {
    static async count (query) {
        try {
            let itemsCount = 0;
            itemsCount = await BankAccount.count(query);
            return itemsCount;
        } catch (err) {
            console.log("BankAccountService Error - Count");
            throw err;            
        }
    }

    static async find (id, query, page, limit) {
        try {
            const skip = page * limit;
            let bankAccounts = [];
            
            if (!id) {
                bankAccounts = await BankAccount.find(query, null, { skip, limit });
            } else {
                bankAccounts = await BankAccount.findById(id);
            }

            return bankAccounts;
        } catch (err) {
            console.log("BankAccountService Error - Find");
            throw err;
        }
    }

    static async create(bankAccount) {
        try {
            const newBankAccount = await bankAccount.save();
            return newBankAccount;
        } catch (err) {
            console.log("BankAccountService Error - Create");
            throw err;
        }
    }

    static async edit(id, bankAccount) {
        try {
            const newBankAccount = await BankAccount.findByIdAndUpdate(id, bankAccount, {new: true});
            
            if (!newBankAccount) {
                console.log("BankAccountService Error - Edit");
                throw Error(`Cannot edit BankAccount with id=${id}. Maybe this BankAccount was not found!`)
            }
            
            return newBankAccount;
        } catch (err) {
            console.log("BankAccountService Error - Edit");
            throw err;
        }
    }

    static async remove(id) {
        try {
            const bankAccount = await BankAccount.findByIdAndRemove(id);
            
            if (!bankAccount) {
                console.log("BankAccountService Error - Delete");
                throw Error(`Cannot delete BankAccount with id=${id}. Maybe this BankAccount was not found!`)
            }

            return id;
        } catch (err) {
            console.log("BankAccountService Error - Delete");
            throw err;
        }
    }
}