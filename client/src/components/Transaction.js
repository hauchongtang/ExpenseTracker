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
    <>
      <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        <ul className='txts'>{transaction.text}</ul>
        <ul>
          <ul id='money'>{sign}${numberWithCommas(Math.abs(transaction.amount))}</ul>
          <ul id='dates'>{transaction.createdAt}</ul>
        </ul>
        <button onClick={handleDelete} className="delete-btn">
          ❌
      </button>
      </li>
    </>
  )
}