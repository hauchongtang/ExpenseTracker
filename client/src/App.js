import React from 'react';
import { NaviBar } from './components/NavBar'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'
// import { PopChart } from './components/PopChart'

import { GlobalProvider } from './context/GlobalState'

import 'bootstrap/dist/css/bootstrap.min.css'
import './dark.css';

function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <NaviBar />
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
