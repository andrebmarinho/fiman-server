import mongoose from 'mongoose';

const Transaction = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100
    },
    reference: {
        type: String,
        required: true,
        min: 7,
        max: 7
    },
    transactionDate: {
        required: true,
        type: Date
    },
    bankAccount: { 
        type: mongoose.Schema.Types.ObjectId, 
    },
    creditCard: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CreditCard'
    },
    transactionValue: {
        type: Number,
        required: true
    },
    income: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('Transaction', Transaction);