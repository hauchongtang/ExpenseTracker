import React from 'react';
import { NaviBar } from './components/NavBar'
import { Balance } from './components/Balance'
import { IncomeExpenses } from './components/IncomeExpenses'
import { TransactionList } from './components/TransactionList'
import { AddTransaction } from './components/AddTransaction'
import NavBar from "./components/navbarlogin";
import { Router, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import history from "./utils/history";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from './components/Dashboard'

// import { PopChart } from './components/PopChart

import { GlobalProvider } from './context/GlobalState'

import 'bootstrap/dist/css/bootstrap.min.css'
import './dark.css';

function App() {
  return (
    <>
      <div>
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <PrivateRoute path="/" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
      <GlobalProvider>
        <div className="container">
          <NaviBar />
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    </>
  );
}

export default App;
