import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const IncomeExpenses = () => {

  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(transaction => transaction.amount)

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1

  // Filter into groups: most,least
  const groups = transactions.map(transaction => transaction.text)
  function mostFrequent(array) {
    let map = array.map((a) => array.filter((b) => a === b).length);
    return array[map.indexOf(Math.max(...map))];
  }
  function leastFrequent(array) {
    let map = array.map((a) => array.filter((b) => a === b).length);
    return array[map.indexOf(Math.min(...map))];
  }

  return (
    <>
      <div className='inc-exp-container dark-mode light-mode'>
        <div>
          <h4>Income</h4>
          <p className='money plus'>{numberWithCommas(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className='money minus'>{numberWithCommas(expense)}</p>
        </div>
      </div>
      <h4>STATISTICS</h4>
      <div className='inc-exp-container dark-mode light-mode'>
        <div>
          <h4>Most</h4>
          <p className='most-used'>{mostFrequent(groups)}</p>
        </div>
        <div>
          <h4>Least</h4>
          <p className='least-used'>{leastFrequent(groups)}</p>
        </div>
      </div>
    </>
  )
}