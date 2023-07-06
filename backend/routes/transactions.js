/* Defining a router object using the Express.js framework. It is importing functions from
two different controller files, `../controllers/income` and `../controllers/expense`, which likely
handle CRUD operations for income and expense data. */
const router = require('express').Router();

const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

router.get(router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
)

module.exports = router