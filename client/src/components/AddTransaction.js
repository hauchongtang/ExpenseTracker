import React, { useState, useContext } from 'react'
import { Button, UncontrolledCollapse, Card, CardBody, FormGroup, Label, Input } from 'reactstrap'
import { GlobalContext } from '../context/GlobalState'
import { PromiseProvider } from 'mongoose';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0)
  const [click, setClick] = useState(false)

  const { addTransaction } = useContext(GlobalContext)

  const handleButtonChange = (event) => {
    console.log(event.target.id)
    setText(event.target.id)
    setClick(true)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const onSubmit = event => {
    event.preventDefault()
    const newTransaction = {
      text,
      amount: +amount
    }
    addTransaction(newTransaction)
  }

  return (
    <>
      <h4>NEW TRANSACTION</h4>
      <h4>{text}</h4>
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
        CATAGORIES
      </Button>
      <UncontrolledCollapse toggler="#toggler">
        <Card>
          <CardBody>
            <Button id='Salary' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Salary</Button>
            <Button id='Bonuses' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Bonuses</Button>
            <Button id='Bus' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Bus</Button>
            <Button id='Train' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Train</Button>
            <Button id='Fuel' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Fuel</Button>
            <Button id='Food' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Food</Button>
            <Button id='Loans' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Loans</Button>
            <Button id='Groceries' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Groceries</Button>
            <Button id='Transfer' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Transfer</Button>
            <Button id='Others' onClick={handleButtonChange} active={(e) => text === e.target.id ? click : false}>Others</Button>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
      <div>
        <form onSubmit={onSubmit}>
          <FormGroup>
            <Input type="number" id="number" name="number" required value={amount} onChange={handleAmountChange} />
          </FormGroup>
          <Button color="primary">ADD</Button>
        </form>
      </div>
    </>
  )
}
