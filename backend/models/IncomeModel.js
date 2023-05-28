/* This code is defining a Mongoose schema for an Income model. The schema defines the structure of the
Income model, including its properties (title, amount, type, date, category, and description) and
their data types, validation rules, and default values. The schema also includes timestamps to track
when the model was created and updated. Finally, the code exports the Income model using the
Mongoose model method, which takes two arguments: the name of the model ('Income') and the schema
that defines it (IncomeSchema). */

const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default:"income"
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Income', IncomeSchema)