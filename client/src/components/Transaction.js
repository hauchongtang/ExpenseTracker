import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext)

  const sign = transaction.amount < 0 ? '-' : '+'

  const handleDelete = () => {
    deleteTransaction(transaction._id)
  }

  return (
    <li className={transaction.amount  < 0 ? 'minus' : 'plus'}>
      {transaction.text} 
      <span>
        {sign}${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button onClick={ handleDelete } className="delete-btn">
        X
      </button>
    </li>
  )
}