import mongoose from "mongoose";

const BankAccount = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100
    },
    balance: {
        type: Number,
        required: true
    }
});

export default mongoose.model('BankAccount', BankAccount);