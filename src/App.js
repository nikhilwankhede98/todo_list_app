import React, { useState } from "react"
import logo from './logo.svg';
import { Header } from './components'
import { Homepage, Loginpage, SignupPage, TodosPage, TodoItemPage } from './pages'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn= {isLoggedIn} />
        <Routes>
          <Route 
            element={
              <Homepage />
            }
            path="/"
          />
          <Route 
            element={
              <Loginpage
                setIsLoggedIn= {setIsLoggedIn}
              />
            }
            path="/login"
          />
          <Route 
            element={
              <SignupPage />
            }
            path="/signup"
          />
          <Route 
            element={
              <TodosPage />
            }
            path="/todos"
          />
          <Route 
            element={
              <TodoItemPage />
            }
            path="/todo/:todoid"
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
