import React, { useState, useEffect } from "react"
import { Header } from './components'
import { Homepage, Loginpage, SignupPage, TodosPage } from './pages'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./api/firebase"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn= {isLoggedIn} setIsLoggedIn= {setIsLoggedIn} />
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
                isLoggedIn= {isLoggedIn}
                setIsLoading= {setIsLoading}
                isLoading= {isLoading}
              />
            }
            path="/login"
          />
          <Route 
            element={
              <SignupPage 
                setIsLoading= {setIsLoading}
                isLoading= {isLoading}
              />
            }
            path="/signup"
          />
          <Route 
            element={
              <TodosPage
                isLoggedIn= {isLoggedIn}
                userId= {user?.uid || null}
                setIsLoading= {setIsLoading}
                isLoading= {isLoading}
              />
            }
            path="/todos"
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
