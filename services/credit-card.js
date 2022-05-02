import CreditCard from '../models/credit-card.js';

export default class CreditCardService {
    static async count(query) {
        try {
            let itemsCount = 0;
            itemsCount = await CreditCard.count(query);
            return itemsCount;
        } catch (err) {
            console.log('CreditCardService Error - Count');
            throw err;
        }
    }

    static async find(id, query, page, limit) {
        try {
            const skip = page * limit;
            let creditCards = [];

            if (!id) {
                creditCards = await CreditCard.find(query, null, { skip, limit }).populate(query.populate).exec();
            } else {
                creditCards = await CreditCard.findById(id).populate(query.populate).exec();
            }

            return creditCards;
        } catch (err) {
            console.log('CreditCardService Error - Find');
            throw err;
        }
    }

    static async create(creditCard) {
        try {
            const newCreditCard = await creditCard.save();
            return newCreditCard;
        } catch (err) {
            console.log('CreditCardService Error - Create');
            throw err;
        }
    }

    static async edit(id, creditCard) {
        try {
            const newCreditCard = await CreditCard.findByIdAndUpdate(id, creditCard, { new: true });

            if (!newCreditCard) {
                console.log('CreditCardService Error - Edit');
                throw Error(`Cannot edit CreditCard with id=${id}. Maybe this CreditCard was not found!`)
            }

            return newCreditCard;
        } catch (err) {
            console.log('CreditCardService Error - Edit');
            throw err;
        }
    }

    static async remove(id) {
        try {
            const creditCard = await CreditCard.findByIdAndRemove(id);

            if (!creditCard) {
                console.log('CreditCardService Error - Delete');
                throw Error(`Cannot delete CreditCard with id=${id}. Maybe this CreditCard was not found!`)
            }

            return id;
        } catch (err) {
            console.log('CreditCardService Error - Delete');
            throw err;
        }
    }
}