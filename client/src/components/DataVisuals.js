import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory'

// use sample data
export const DataVisuals = () => {
  const { transactions } = useContext(GlobalContext)
  const mockData = [
    { x: 'Bus', y: 3 },
    { x: 'Income', y: 10 },
    { x: 'Others', y: 9 }
  ]

  // Find matching objects and add values together --> create an object for that category
  const texts = transactions.map(items => items.text)
  const amounts = transactions.map(items => items.amount)

  const dataset = texts.map((x, i) => ({ x, y: Math.abs(amounts[i]) }))

  const arr = dataset,
    result = [];

  arr.forEach(function (a) {
    if (!this[a.x]) {
      this[a.x] = { x: a.x, y: 0 };
      result.push(this[a.x]);
    }
    this[a.x].y += a.y;
  }, Object.create(null));

  console.log(result);

  console.log(texts)
  console.log(amounts)
  console.log(dataset)

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
    <div>
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
      <h4>Spent / Earned</h4>
      <VictoryChart domainPadding={25}>
        <VictoryBar
          theme={VictoryTheme.material}
          style={{ data: { fill: "rgb(255, 165, 0)" } }}
          data={result}
          colorScale={["tomato", "orange", "gold", "cyan", "navy", "purple", "yellow"]}
        />
      </VictoryChart>
    </div>
  )
}