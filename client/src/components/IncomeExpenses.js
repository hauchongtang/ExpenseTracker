import React, { useContext } from 'react'
import { VictoryPie, VictoryLabel } from 'victory'
import { GlobalContext } from '../context/GlobalState'
import { numberWithCommas } from '../utils/format'

export const IncomeExpenses = () => {

  const { transactions } = useContext(GlobalContext)

  const amounts = transactions.map(transaction => transaction.amount)
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0).toFixed(2)

  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0).toFixed(2) * -1

  const result = [{ x: 'In', y: Math.round(income) }, { x: 'Out', y: Math.round(expense) }]

  // Filter into groups: most,least
  // const groups = transactions.map(transaction => transaction.text)
  // function mostFrequent(array) {
  //   let map = array.map((a) => array.filter((b) => a === b).length);
  //   return array[map.indexOf(Math.max(...map))];
  // }
  // function leastFrequent(array) {
  //   let map = array.map((a) => array.filter((b) => a === b).length);
  //   return array[map.indexOf(Math.min(...map))];
  // }

  return (
    <>
      <svg height={320} width={320}>
        <VictoryPie
          animate={{ onLoad: { duration: 1000 } }}
          standalone={false}
          width={320}
          height={320}
          colorScale={["tomato", "orange"]}
          data={result}
          innerRadius={75}
          style={{ fill: "white" }}
          labelRadius={({ innerRadius }) => innerRadius + 5}
        />
        <VictoryLabel
          animate={{ onLoad: { duration: 1000 } }}
          textAnchor="middle"
          style={{ fontSize: 36, fill: "grey" }}
          x={160} y={160}
          text="Balance"
        />
      </svg>
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
      {/* <h4>STATISTICS</h4>
      <div className='inc-exp-container dark-mode light-mode'>
        <div>
          <h4>Most</h4>
          <p className='most-used'>{mostFrequent(groups)}</p>
        </div>
        <div>
          <h4>Least</h4>
          <p className='least-used'>{leastFrequent(groups)}</p>
        </div>
      </div> */}
    </>
  )
}