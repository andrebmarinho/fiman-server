import mongoose from 'mongoose';

const CreditCard = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100
    },
    bankAccount: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'BankAccount', 
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export default mongoose.model('CreditCard', CreditCard);