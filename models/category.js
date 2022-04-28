import mongoose from "mongoose";

const Category = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        max: 100
    }
});

export default mongoose.model('Category', Category);