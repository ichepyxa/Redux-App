import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'

const App = () => {

  const [value, setValue] = useState("")
  const [btnClick, setBtnClick] = useState("")

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)

  const addCash = (cash) => {
    dispatch({type: "ADD_CASH", payload: cash})
  }

  const getCash = (cash) => {
    dispatch({type: "GET_CASH", payload: cash})
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now() 
    }
    dispatch({type: "ADD_CUSTOMER", payload: customer})
  }

  const removeCustomer = (id) => {
    dispatch({type: "REMOVE_CUSTOMER", payload: id})
  }

  const openModal = (e) => {
    const modal = document.querySelector(".modal")
    modal.classList.add("active")

    if (e.target.name === "addCashBtn") {
      setBtnClick("addCash")
    } else if (e.target.name === "getCashBtn") {
      setBtnClick("getCash")
    }

    if (e.target.name === "addCustomerBtn") {
      setBtnClick("addCustomer")
    } else if (e.target.name === "removeCustomerBtn") {
      setBtnClick("removeCustomer")
    }
  }

  const closeModal = () => {
    const modal = document.querySelector(".modal")
    modal.classList.remove("active")
    
    if (btnClick === "addCash") {
      addCash(value)
    } else if (btnClick === "getCash") {
      getCash(value)
    }

    if (btnClick === "addCustomer") {
      addCustomer(value)
    }

    setValue("")
  }

  return (
    <div className="app">
      <h2 className="app__title">Банк</h2>
      <div className="app-btns">
        <button onClick={(e) => openModal(e)} name="addCashBtn" className="btns__btn btn">Начислить деньги</button>
        <button onClick={(e) => openModal(e)} name="getCashBtn" className="btns__btn btn">Списать деньги</button>
      </div>
      <h4 className="app__balance">Ваш баланс: {cash}</h4>
      <div className="divider" />
      <div className="app-btns">
        <button onClick={(e) => openModal(e)} name="addCustomerBtn" className="btns__btn btn">Добавить сотрудника</button>
      </div>
      <div className="app-customers">
        {customers.length > 0 
          ?
          customers.map(customer =>
            <h4 key={customer.id} onClick={() => removeCustomer(customer.id)} className="customers__item">{customer.name}</h4> 
          )
          :
          <h4 className="customers__item_none">Нету сотрудников</h4>
        }
      </div>

      <div className="modal">
        <div className="modal-body">
          <h2 className="modal__title">Введите значение</h2>
          <input 
            type="text" 
            className="modal__input"
            placeholder="Введите значение"
            value={value}
            onChange={(e) => setValue(e.target.value)} />
          <button onClick={closeModal} className="modal__btn btn">Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default App
