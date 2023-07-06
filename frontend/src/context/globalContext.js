import React, { useContext, useState } from "react"
import axios from 'axios'

/* This is a React context provider and hook that manages the state of a budgeting application. It
defines a `GlobalProvider` component that wraps the application and provides access to functions and
data related to adding, getting, and deleting incomes and expenses, as well as calculating the total
income, total expenses, total balance, and transaction history. The `useGlobalContext` hook allows
components to access this state and functionality. The `BASE_URL` constant defines the base URL for
the API endpoints used to interact with the backend. */


const BASE_URL = "http://localhost:5001/api/v1/";


const GlobalContext = React.createContext()


/* #------> The addIncome function is an asynchronous function that sends a POST request to the server to add a new income.
 If there is an error, it sets the error state with the error message received from the server. 
 After adding the income, it calls the getIncomes function to retrieve all incomes.

#------>  The getIncomes function is an asynchronous function that sends a GET request to the server to retrieve all incomes.
 It sets the incomes state with the data received from the server response.

#------>  The deleteIncome function is an asynchronous function that sends a DELETE request to the server to delete an income
 with a specific id. After deleting the income, it calls the getIncomes function to retrieve the updated list of incomes.

#------>  The totalIncome function calculates the total income by iterating over the incomes array and summing up the amount
 property of each income object.

#------>  The addExpense function is similar to addIncome but for adding expenses.
#------>  The getExpenses function is similar to getIncomes but for retrieving expenses.
#------>  The deleteExpense function is similar to deleteIncome but for deleting expenses.

#------>  The totalExpenses function calculates the total expenses by iterating over the expenses array and
 summing up the amount property of each expense object.

#------> The totalBalance function calculates the total balance by subtracting the total expenses from the total income.

#------> The transactionHistory function combines the incomes and expenses arrays, sorts them based on the createdAt property
 in descending order, and returns the first three items of the sorted array.*/

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }
  
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        /*By calling getIncomes after deleting an income, you ensure that the UI is updated
         with the latest list of incomes, including the removed income. This helps to keep the
          application's state synchronized with the server and ensures that the user sees the
           most up-to-date information after performing a deletion. */
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
/*The component returns a GlobalContext.Provider component, providing all the
 state variables, functions, and error state as values to the context. The children
  prop is rendered as the children of the provider. */

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}